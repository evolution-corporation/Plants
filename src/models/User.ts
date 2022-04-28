import auth from '@react-native-firebase/auth'

export enum UserCategory {
  BLOGGER = 'blogger',
  COMMUNITY = 'community',
  ORGANIZATION = 'organization',
  EDITOR = 'editor',
  WRITER = 'writer',
  GARDENER = 'gardener',
  FLOWER_MAN = 'theFlowerMan',
  PHOTOGRAPHER = 'photographer',
  NONE = '',
}

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum UserRole {
  USER,
  ADMIN,
  NO_REGISTRATION,
}

type DefaultImage = ''
const defaultImage: DefaultImage = ''



interface GetUserByIdOptions {
  getPlants?: boolean
  is_minimum_data?: boolean
}

interface GetUserByNickName {
  getPlants?: boolean
  is_minimum_data?: boolean
  strong?: boolean
  limit?: number
}


interface UserConstructor {
  uid: string,
  nickName: string,
  image: string | URL | null,
  role: string | UserRole,
  status?: string,
  gender?: string | UserGender,
  category?: string | UserCategory,
  plantCount?: number,
  birthday: Date | string,
  plants?: Array<any>
}

interface UserUpdate {
  nickName?: string,
  image?: string,
  status?: string,
  gender?: UserGender,
  category?:  UserCategory,
  birthday?: Date,
}

interface UserCreate {
  nick_name: string
  birthday?: Date
  status?: string
  gender?: UserGender
  category?: UserCategory
}

export default class User {
  public readonly uid: string
  public nickName?: string
  public readonly role: UserRole
  public image?: URL | DefaultImage
  public status?: string
  public category?: UserCategory
  public gender?: UserGender
  public plantCount?: number
  public plants?: Array<any>
  public birthday?: Date
  protected readonly onToken?: {():Promise<string> }
  
  constructor(data: UserConstructor, options?: { onGetTokenCallback: {():Promise<string> } }) {
    this.uid = data.uid
    this.nickName = data.nickName
    this.status = data.status
    if (typeof data.role == 'string') {
      switch (data.role) {
        case ('NO_REGISTRATION'):
          this.role = UserRole.NO_REGISTRATION
          break;
        case ('USER'):
          this.role = UserRole.USER
          break;
        case ('ADMIN'):
          this.role = UserRole.ADMIN
          break;
        default:
          this.role = UserRole.USER
      }
    } else {
      this.role = data.role
    }
    if (typeof data.category == 'string') {
      switch (data.category) {
        case 'NULL':
          this.category = UserCategory.NONE
          break;
        case 'BLOGGER':
          this.category = UserCategory.BLOGGER
          break;
        case 'COMMUNITY':
          this.category = UserCategory.COMMUNITY
          break;
        case 'ORGANIZATION':
          this.category = UserCategory.ORGANIZATION
          break;
        case 'EDITOR':
          this.category = UserCategory.EDITOR
          break;
        case 'WRITER':
          this.category = UserCategory.WRITER
          break;
        case 'GARDENER':
          this.category = UserCategory.GARDENER
          break;
        case 'FLOWER_MAN':
          this.category = UserCategory.FLOWER_MAN
          break;
        case 'PHOTOGRAPHER':
          this.category = UserCategory.PHOTOGRAPHER
          break;
        default:
          this.category = undefined
      }
    } else {
      this.category = data.category
    }
    if (typeof data.gender == 'string') {
      switch (data.gender) {
        case 'MALE':
          this.gender = UserGender.MALE
          break;
        case 'FEMALE':
          this.gender = UserGender.FEMALE
          break;
        case 'OTHER':
          this.gender = UserGender.OTHER
          break;
        default:
          this.gender = undefined
      }
    }
    if (typeof data.image == 'string') {
      this.image = new URL(`user/${data.image}`, process.env.imageURL)
    } else {
      if (data.image instanceof URL) {
        this.image = data.image
      } else {
        this.image = defaultImage
      }
    }
    if (typeof data.birthday == 'string') {
      this.birthday = new Date(Date.parse(data.birthday))
    } else {
      this.birthday = data.birthday
    }
    if (data.plantCount != undefined){
      this.setPlants(data.plantCount, data.plants)
    }
    if (options?.onGetTokenCallback != undefined) {
      this.onToken = options.onGetTokenCallback
    }
  }
  
  protected setPlants(countPlants: number, plants?: Array<any>) {
    this.plantCount = countPlants
    if (plants != undefined) {
      this.plants = plants
    }
  }
  
  public async update(data: UserUpdate): Promise<void> {
    if (this.onToken == undefined) throw new Error('Don`t can get token')
    const url = new URL(`user/${this.uid}`, process.env.API_URL)
    const token = await this.onToken()
    if (data.image != undefined) {
      if (!data.image.includes('data:image/') && !data.image.includes('base64')) {
        const formData = new FormData()
        formData.append('image', data.image)
        const request = await fetch(url.toJSON(), {
          method: 'PUT',
          headers: {
            'app': 'Plants',
            'authorization': token,
            'Content-Type': 'form/multipart'
          },
          body: formData
        })
        if (!request.ok) throw new Error(String(request.status))
        data.image = undefined
        const result = (await request.json()).result
        this.image = new URL(result.image, process.env.imageURL)
        await this.update(data)
        return
      }
    }
    const request = await fetch(url.toJSON(), {
      method: 'PUT',
      headers: {
        'app': 'Plants',
        'authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!request.ok) throw new Error(String(request.status))
    const result = (await request.json()).result
    const fieldsData = Object.keys(data)
    for (let [resultElementName, resultElementValue] of Object.entries(result)) {
        if (fieldsData.includes(resultElementName)) {
          switch (resultElementName) {
            case 'image':
              this.image = new URL(String(resultElementValue), process.env.imageURL)
              break;
            case 'category':
              switch (resultElementValue) {
                case 'NULL':
                  this.category = UserCategory.NONE
                  break;
                case 'BLOGGER':
                  this.category = UserCategory.BLOGGER
                  break;
                case 'COMMUNITY':
                  this.category = UserCategory.COMMUNITY
                  break;
                case 'ORGANIZATION':
                  this.category = UserCategory.ORGANIZATION
                  break;
                case 'EDITOR':
                  this.category = UserCategory.EDITOR
                  break;
                case 'WRITER':
                  this.category = UserCategory.WRITER
                  break;
                case 'GARDENER':
                  this.category = UserCategory.GARDENER
                  break;
                case 'FLOWER_MAN':
                  this.category = UserCategory.FLOWER_MAN
                  break;
                case 'PHOTOGRAPHER':
                  this.category = UserCategory.PHOTOGRAPHER
                  break;
                default:
                  this.category = undefined
              }
              break;
            case 'gender':
              switch (resultElementValue) {
                case 'MALE':
                  this.gender = UserGender.MALE
                  break;
                case 'FEMALE':
                  this.gender = UserGender.FEMALE
                  break;
                case 'OTHER':
                  this.gender = UserGender.OTHER
                  break;
                default:
                  this.gender = undefined
              }
              break;
            case 'birthday':
              this.birthday = new Date(Date.parse(String(resultElementValue)))
              break;
            case 'nickName':
              this.nickName = String(resultElementValue)
              break;
            case 'status':
              this.status = String(resultElementName)
              break;
          }
        }
      }
    return
  }
  
  public static async create(data: UserCreate): Promise<User> {
    const fireBaseAuth = auth()
    if (fireBaseAuth.currentUser == null) throw new Error('Not found current user')
    const token = await fireBaseAuth.currentUser.getIdToken()
    const url = new URL('/user', process.env.API_URL)
    const request = await fetch(url.toJSON(), {
      method: 'POST',
      headers: {
        'app': 'Plants',
        'authorization': token.toString(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!request.ok) throw new Error(String(request.status))
    const result = (await request.json()).result
    return new User(result, { onGetTokenCallback: fireBaseAuth.currentUser.getIdToken })
  }
  
  public static async authUser(): Promise<User> {
    const fireBaseAuth = auth()
    if (fireBaseAuth.currentUser == null) throw new Error('Not found current user')
    const token = await fireBaseAuth.currentUser.getIdToken()
    const url = new URL('/auth', process.env.API_URL)
    const request = await fetch(url.toJSON(), {
      method: 'GET',
      headers: {
        'app': 'Plants',
        'authorization': token.toString()
      }
    })
    if (!request.ok) throw new Error('Server Error')
    const result = (await request.json()).result
    return new User(result, { onGetTokenCallback: fireBaseAuth.currentUser.getIdToken })
  }
  
  public static async getUserById(id: string, options?: GetUserByIdOptions): Promise<User> {
    const url = new URL(`/user/${id}`, process.env.API_URL)
    url.searchParams.set('get_plants', String(options?.getPlants ?? false))
    url.searchParams.set('is_minimum_data', String(options?.is_minimum_data ?? false))
    const request = await fetch(url.toJSON(), {
      method: 'GET',
      headers: {
        'app': 'Plants'
      }
    })
    if (!request.ok) throw new Error(String(request.status))
    const result = (await request.json()).result
    return new User(result)
  }
  
  public static async getUsersByNickName(nickName: string, options?: GetUserByNickName): Promise<Array<User>>{
    const url = new URL(`/users.search/${nickName}`, process.env.API_URL)
    url.searchParams.set('get_plants', String(options?.getPlants ?? false))
    url.searchParams.set('is_minimum_data', String(options?.is_minimum_data ?? false))
    url.searchParams.set('strong', String(options?.strong ?? false))
    url.searchParams.set('limit', String(options?.limit ?? 20))
    const request = await fetch(url.toJSON(), {
      method: 'GET',
      headers: {
        'app': 'Plants'
      }
    })
    if (!request.ok) throw new Error(String(request.status))
    const result = (await request.json()).result
    return JSON.parse(result).map((data: any) => new User(data as UserConstructor))
  }
  
  public static async checkNickNameUnique(nickName: string): Promise<boolean> {
    const url = new URL(`checkNickName/${nickName}`, process.env.API_URL)
    const request = await fetch(url.toJSON(), {
      method: 'GET',
      headers: {
        'app': 'Plants'
      }
    })
    if (!request.ok) throw new Error(String(request.status))
    return (await request.json()).result
  }
}