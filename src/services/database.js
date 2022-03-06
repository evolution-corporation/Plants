import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

class Tables {
  constructor({ name }) {
    this.tableName = name
    this.collection = firestore().collection(this.tableName)
  }

  normolizatorData = (data) => {
    if ( data instanceof Date) {
      return firestore.Timestamp.fromDate(data)
    }
    return data
  }

  getRowById = async ({ id }) => {
    const row = await this.collection.doc(id).get()
    return row.data()
  }

  getRowByField = async ({field = {}}) => {
    const fieldName = Object.keys(field)[0]
    const value = field[fieldName]
    let data = {}
    const row = await this.collection.where(fieldName, '==', value).get()
    if (row.empty) return null
    row.forEach(querySnapshot => {
      data = {id: querySnapshot.id, ...querySnapshot.data()}
    })
    return data
  }
  
  getRows = async () => {
    const data = []
    const rows = await this.collection.get()
    if (rows.empty) return []
    rows.forEach(row => {
      data.push({ id: row.id, ...row })
    })
    return data
  }

  getRowsByFilter = async ({ where={field: null, type: null, value: null} }) => {
    const data = []
    if (where.field == null || where.type == null) return await this.getRows()
    let rows = await this.collection.where(where.field, where.type, where.value).get()
    if (rows.empty) return []
    rows.forEach(row => {
      data.push({ id: row.id, ...row.data() })
    })
    return data
  }

  createRow = async ({ data, id=uuid.v4() }) => {
    const row = await this.collection.add(data)
    return row.id
  }

  editRow = async ({ data, id }) => {
    await this.collection.doc(id).update(data)
  }

  subscribeUpdateRow = ({ id, callback, onError = console.error }) => {
    return this.collection.doc(id).onSnapshot(querySnapshot => callback(querySnapshot.data()), onError)
  }

  pushDataArray = async ({ id, data={} }) => {
    const fields = Object.keys(data)
    if (fields.length == 0) return
    const field = fields[0]
    for (let name of Object.keys(data[field])) {
      data[field][name] = this.normolizatorData(data[field][name])
    }
    data[field] = firestore.FieldValue.arrayUnion(data[field])
    await this.collection.doc(id).update(data)
  }

  
}

class UsersChatsTable extends Tables {
  constructor () {
    super({ name: 'Users' })
  }
  getUserByUid = async ({ uid }) => {
    return this.getRowById({ id: uid })
  }
}

class User extends UsersChatsTable {
  constructor({ uid }) {
    super()
    this.uid = uid
  }

  _getDataUser = async () => {
    const data = await this.getUserByUid({ uid: this.uid })
    this.photo = data.photo
    this.name = data.name ?? data.login
  }

  getCompact = () => {
    return { name: this.name, photo: this.photo }
  }
}

class ChatsTable extends Tables {
  constructor(){
    super({ name: 'Chats'})
    this.accountUid = auth()._user?.uid
  }
  
  setAccounUid() {
    this.accountUid = auth()._user?.uid
  }

  getChatsOfUser = async () => {
    const chats = await this.getRowsByFilter({ where: { field: 'owners', type: 'array-contains', value: this.accountUid } })
    for (let i in chats) {
      let chat = chats[i]
      if (chat.owners.length == 2) {
        let interlocutor = new User({ uid: chat.owners[0] == this.accountUid ? chat.owners[1] : chat.owners[0] })
        await interlocutor._getDataUser()
        chat.photo = interlocutor.photo
        chat.name = interlocutor.name
        chat.userId = interlocutor.uid
      }
      chats[i] = chat
    }
    return chats
  }

  subscribeGetMessageByChat = ({ id, callback }) => {
    const returnMessages = (chatData) => {
      callback(chatData.messages?.map(item => ({...item, isMy: this.accountUid == item.owner})) ?? [])
    }
    return this.subscribeUpdateRow({ id, callback: returnMessages })
  }

  getChatsBetweenMeAndUser = async ({ uid }) => {
    let chat = await this.getRowByField({field: { owners: [uid, this.accountUid] }})
    if (chat) return chat
    return await this.getRowByField({field: { owners: [this.accountUid, uid] }})
  }

  sendMessages = async ({ chatId=null, userId=null, message }) => {
    if (chatId) {
      try {
        await this.pushDataArray({ id: chatId, data: { messages: {...message, owner: this.accountUid, date: new Date() } } })
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const chat = await this.getChatsBetweenMeAndUser({ userId })
        await this.pushDataArray({ id: chat.id, data: {...message, owner: this.accountUid, date: new Date() } })
      } catch (error) {
        console.log(error)
      }
    }
  }

  createChat = async ({ userId }) => {
    return await this.createRow({
      data: {
        owners: [userId, this.accountUid]
    } }) 
  }

  subscribeEvent = async ({ callback }) => {
    const chats = await this.getChatsOfUser()
    const subscribe = []

    for (let chat of chats) {
      subscribe.push(
        this.subscribeUpdateRow({ id: chat.id, callback: (chatData) => {
          const lastMessages = chatData.messages[chatData.messages.length - 1]
          if (lastMessages.owner != this.accountUid) callback(lastMessages)
        } })
      )
    }
    
    return () => subscribe.map(subs => subs())
  }
}

class NurseriesTable extends Tables {
  constructor(){
    super({ name: 'Nurseries' })
    
  }

  create = async ({ name, type, phone, adress, site, description, image, delivery }) => {
    return await this.createRow({ data: {
      name, 
      type, 
      phone, 
      adress, 
      site, 
      description, 
      image, 
      delivery
    } })
  }
}


async function onAuthChanged(onChange) {
  auth().onAuthStateChanged(onChange);
}

async function authenticateUser(status) {
  // Получаем значение вошел в систему или вышел пользователь из системы.

  if (status) {
    // Пользователь вошел в систему / пользователь уже был в системе
    const uid = status.uid;
    // По uid ищем пользователя в firestore и меняем состояние компонента
    let user = await getUserData(); //firestore().collection('Users').doc(uid).get();
    // Если документ с uid пользователя не будет найден в firestore, то он автоматически создаться
    return {
      user: { ...user } ?? { login: undefined, birthday: undefined, uid },
    };
  } else {
    // Пользователь вышел из системы / пользователя не было в системе
    return { user: null };
  }
}

async function requestsSMS(phone) {
  return await auth().signInWithPhoneNumber(phone);
}

async function checkLogin(login) {
  return await firestore()
    .collection('Users')
    .where('login', '==', login)
    .get();
}

async function getUserDataFirebase() {
  return auth()._user._user;
}

async function addUserData(_data, isGet = false) {
  try {
    const data = {... _data}
    for (let key of Object.keys(data)) {
      if (data[key] instanceof Date) {
        data[key] = new firestore.Timestamp(Math.ceil(data[key] / 1000), 0)
      }
    }
    if (
      (await firestore().collection('Users').doc(auth()._user.uid).get()).data()
    ) {
      await firestore().collection('Users').doc(auth()._user.uid).update(data);
    } else {
      await firestore().collection('Users').doc(auth()._user.uid).set(data);
    }
    if (isGet) {
      return await getUserData();
    } else {
      return true
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

async function getUserData(uid = auth()._user.uid, compact=false) {
  if (!uid) { uid = auth()._user.uid }
  const plants = [];
  if (compact) {
    return {
      ...(await firestore().collection('Users').doc(uid).get()).data(),
      uid,
    };
  }
  const data = await firestore()
    .collection('Plants')
    .where('owners', 'array-contains', uid)
    .get();
  let _data = null;
  data.forEach((documentSnapshot) => {
    _data = documentSnapshot.data();
    plants.push({
      ..._data,
      id: documentSnapshot.id,
      coordinate: {
        longitude: _data.coordinate.longitude,
        latitude: _data.coordinate.latitude,
      },
      date: _data.date._seconds * 1000,
    });
  });
  return {
    ...(await firestore().collection('Users').doc(uid).get()).data(),
    uid,
    plants,
  };
}

async function addPlant(plant) {
  try {
    const data = {...plant}
    data.date = new firestore.Timestamp(Math.ceil(data.date / 1000), 0)
    data.coordinate = new firestore.GeoPoint(data.coordinate.latitude, data.coordinate.longitude),
    data.owners = [auth()._user.uid]
    data.status = 'Plant'
    await firestore().collection('Plants').add(data)
    // следующий код необходим для счетчика растений пользоватлея
    getUserData(null, compact = true).then((data)=>{
      if (data.plantCount) {
        firestore().collection('Users').doc(data.uid).update({ plantCount: data.plantCount + 1 })
      } else {
        firestore().collection('Users').doc(data.uid).update({ plantCount: 1 })
      }
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

async function getPlantData(id) {
  const plant = (await firestore().collection('Plants').doc(id).get()).data()
  for (let i in plant.owners) {
    const user = await getUserData(plant.owners[i])
    plant.owners[i] = user
  }
  return plant

}

function getSubscriptionsMarkersEdition(onChange) {
  return firestore()
    .collection('Plants')
    .onSnapshot((querySnapshot) => {
      const markers = [];
      querySnapshot.forEach((documentSnapshot) => {
        const data = documentSnapshot.data();
        markers.push({
          ...data,
          id: documentSnapshot.id,
          coordinate: {
            longitude: data.coordinate.longitude,
            latitude: data.coordinate.latitude,
          },
        });
      });
      onChange(markers);
    }, console.error);
}

async function checkCoordinate(coordinate) {
  const result = await firestore().collection('Plants').where('coordinate', '==', new firestore.GeoPoint(coordinate.latitude, coordinate.longitude)).get()
  return !result.empty
}

async function getRaiting(timePeriod=null) {
  const today = new Date()
  const userIndex = {}
  const usersList = []
  let plantList = []
  switch (timePeriod) {
    case 'week': 
      const startWeek = new firestore.Timestamp(
        Math.ceil(+(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1 - today.getDay())) / 1000),
        0)
        plantList = await firestore().collection('Plants').where('date', '>=', startWeek).get()
        break;
    case 'month': 
        const startMonth = new firestore.Timestamp(
          Math.ceil(+(new Date(today.getFullYear(), today.getMonth(), 0)) / 1000),
          0)
          plantList = await firestore().collection('Plants').where('date', '>=', startMonth).get()
          break
    case 'allTime':
      plantList = await firestore().collection('Users').orderBy('plantCount', 'desc').limit(50).get()
      plantList.forEach(document => { usersList.push({ count: document.data().plantCount, uid: document.id }) })
      for (let i in usersList) {
        usersList[i] = { ...await getUserData(usersList[i].uid), count: usersList[i].count }
      }
      return usersList
  }
  plantList.forEach(document => {
    const users = document.data().owners
    for(let user of users) {
      if (userIndex[user] !== undefined) {
        usersList[userIndex[user]].count += 1
      } else {
        usersList.push({ count: 1, uid: user })
        userIndex[user] = usersList.length - 1
      }
    }
  })
  let myScore = null
  for (let i in usersList) {
    usersList[i] = { ... usersList[i], ...await getUserData(usersList[i].uid)}
    if (myScore == null && usersList[i].uid == auth()._user.uid) {
      myScore = usersList[i].count
    }
  }
  usersList.sort((a, b) => (a.count < b.count ? 1 : -1))
  return {userList: usersList.slice(0, 50), myScore}
}

async function findUser({ name }) {
  const users = []
  const usersDocs = await firestore().collection('Users').where('login', '>=', name).get()
  if (users.empty) return []
  usersDocs.forEach(user => {
    users.push({ uid: user.id, ...user.data() })
  })
  return users
}


function exitAccount() {
  auth().signOut();
}



export default {
  onAuthChanged,
  authenticateUser,
  requestsSMS,
  checkLogin,
  getUserDataFirebase,
  addUserData,
  getUserData,
  getSubscriptionsMarkersEdition,
  exitAccount,
  addPlant,
  getPlantData,
  checkCoordinate,
  getRaiting,
  findUser,

  chat: new ChatsTable(),
  nurseries: new NurseriesTable()
};
