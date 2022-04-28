import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


// import { Account } from './models'
class Tables {
  constructor({ name }) {
    this.tableName = name
    this.collection = firestore().collection(this.tableName)
    
  }

  getOwnerId = () => {
    return auth()._user?.uid
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

  createRow = async ({ data, returnRow = false }) => {
    try {
      const checkData = {}
      for (let field of Object.keys(data)) {
        if (data[field]) {
          checkData[field] = data[field]
        }
      }
      const row = await this.collection.add(checkData)
      if (returnRow) {
        return row
      }
      return row.id
    } catch (error) {
      console.error(error)
      return null
    }
    
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

  deleteRow = async ({ id }) => {
    try {
      await this.collection.doc(id).delete()
    } catch (error) {
      console.error(error)
    }    
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
    this.photo = data.avatar
    this.name = data.name ?? data.login
  }

  getCompact = () => {
    return { name: this.name, photo: this.avatar }
  }
}

class ChatsTable extends Tables {
  constructor(){
    super({ name: 'Chats'})
  }
  

  cryptoText (text, key){
    let cryptoMessage = ''
    for (let index in text) {
      let code = text.charCodeAt(index) + key.charCodeAt(index % key.length)
      cryptoMessage += String.fromCharCode(code)
    }
    return cryptoMessage
  }

  decryptoText(cryptoMessage, key) {
    let text = ''
    for (let index in cryptoMessage) {
      let code = cryptoMessage.charCodeAt(index) - key.charCodeAt(index % key.length)
      text += String.fromCharCode(code)
    }
    return text
  }

  getChatsOfUser = async () => {
    const chats = await this.getRowsByFilter({ where: { field: 'members', type: 'array-contains', value: this.getOwnerId() } })
    for (let i in chats) {
      let chat = chats[i]
      if (chat.members.length == 2) {
        let interlocutor = new User({ uid: chat.members[0] == this.getOwnerId() ? chat.members[1] : chat.members[0] })
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
    const subscribe = this.collection.doc(id).collection('messages').orderBy('date').onSnapshot((collection) => callback(collection.docs.map(doc => {
      const message = doc.data().message
      if (message.type == 'text') {
        message.text = this.decryptoText(message.text, id)
      }
      return ({
        message: message,
        id: doc.id,
        owner: doc.data().owner,
        isMy: this.getOwnerId() == doc.data().owner
      })
    })))

    return subscribe
  }

  getChatsBetweenMeAndUser = async ({ uid }) => {
    let chats = await this.collection.where('members', 'array-contains', this.getOwnerId()).get()
    chats = chats.docs.filter(doc => doc.data().members.includes(uid))
    for (let chat of chats) {
      if (chat.data().members.length == 2) {
        
        return chat
      }
    }
    return undefined
  }

  sendMessages = async ({ chatId=null, userId=null, message }) => {
    let chat = null
    if (!chatId) {
      chat = (await this.getChatsBetweenMeAndUser({ uid: userId })) ?? await this.createChat({ userId })
      chatId = chat.id
    } else {
      chat = await this.collection.doc(chatId).get()
    }
    try {
      if (message.type == 'text') {
        message.text = this.cryptoText(message.text, chatId)
      }
      await this.collection.doc(chatId).collection('messages').add({ message, owner: this.getOwnerId(), date: new Date() })
      await this.collection.doc(chatId).update({ lastMessageText: message.text })
      const secondUser = chat.data().members.filter(id => id != this.getOwnerId())
    } catch (error) {
      console.error(error)
    }
  }

  createChat = async ({ userId }) => {
    return await this.createRow({ data: { members: [userId, this.getOwnerId()]}, returnRow: true })
  }

  subscribeEvent = async ({ callback }) => {
    const chats = await this.getChatsOfUser()
    const subscribe = []
    for (let chat of chats) {
      subscribe.push(
        this.collection.doc(chat.id).onSnapshot((doc)=>{
          const data = doc.data()
          callback({
            lastMessage: this.decryptoText(data.lastMessageText, doc.id),
            id: doc.id,
            name: chat.name,
            photo: chat.photo,
            members: data.members
          })
        })
      )
    }
    
    return () => subscribe.map(subs => subs())
  }

  subscribeGetChatId({ uid, callback }) {
    return this.collection.where('members', 'array-contains', this.getOwnerId()).onSnapshot(colletion => {
      const docs = colletion.docs
      for (let doc of docs) {
        if (doc.data().members.includes(uid)) {
          callback(doc.id)
        }
      }
    })
  }

  // async subscribeLastMessage({ callback }){
  //   let subsMessages = []
  //   const chats= await this.getChatsOfUser()
  //   for (let chat of chats) {
  //     subsMessages.push(this.subscribeGetLastMessage({ chat, callback }))
  //   }
  //   return () => {
  //     for (let sub of subsMessages) {
  //       sub()
  //     }
  //   }
  // }

  // subscribeGetLastMessage({ chat, callback }) {
  //   return this.collection.doc(chat.id).collection('messages').orderBy('date', 'desc').limit(1).onSnapshot((docs) => {
  //     console.log(docs)
  //   })
  // }

}

class NurseriesTable extends Tables {
  constructor(){
    super({ name: 'Nurseries' })    
  }

  create = async (data) => {
    const typePlant = []
    for (let type of Object.keys(data.typePlant)) {
      if (data.typePlant[type]) typePlant.push(type)
    }
    await this.createRow({ data: { ...data, owner: this.getOwnerId(), visual: true, typePlant, site: data.site ?? null } })
    return await this.getMyNurserie()
  }

  getMyNurserie = async () => {
    const nurserie = await this.getRowByField({ field: { owner: this.getOwnerId() } })
    if (!nurserie) return null
    nurserie.plantType = Object.fromEntries(nurserie.typePlant.map(typePlant => ([typePlant, true])))
    return nurserie
  }

  updateData = async ({ data }) => {
    const typePlant = []
    if (data.typePlant) {
      for (let type of Object.keys(data.typePlant)) {
        if (data.typePlant[type]) typePlant.push(type)
      }
      data.typePlant = typePlant
    }
    return await this.editRow({ data: { ...data}, id: data.id })
  }

  delete = async ({ id }) => {
    // await this.editRow({ id, data: { 
    //   adress: firestore.FieldValue.delete(), 
    //   coordinate: firestore.FieldValue.delete(), 
    //   typePlant: firestore.FieldValue.delete() } })
    await this.deleteRow({ id })
    // await this.editRow({ id, data: { visual: false } })
  }

  getNurseries = ({ filter: { isDelivery, typePlant }, onCallback }) => {
    let nurseries = this.collection
    if (isDelivery) {
      nurseries = nurseries.where('isDelivery', '==', true)
    }
    if (typePlant) {
      nurseries = nurseries.where('plantType', 'array-contains-any', typePlant)
    }
    return nurseries.onSnapshot((collection) => {
      onCallback(collection.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
     
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
    return { user: null }
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


async function exitAccount() {
  await auth().signOut();
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
