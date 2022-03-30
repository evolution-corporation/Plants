
export enum UserCategory { 
    BLOGER = 'blogger', 
    COMMUNITY = 'community', 
    ORGANIZATION = 'organization', 
    EDITOR = 'editor', 
    WRITER = 'writer', 
    GARDENER = 'gardener', 
    THEFLOWERMAN = 'theFlowerMan', 
    PHOTOGRAPHER = 'photographer',
    NONE = '',
}

export enum UserGender { 
    MALE = 'male', 
    FEMALE = 'female', 
    OTHER = 'other' 
}

export enum UserRole {
    USER = 'user', 
    ADMIN = 'admin'
}

export enum StatusLoadingData {
    NOT_LOADING = 'notLoading',
    LOADING = 'loading',
    LOADED = 'loaded'
}

export enum StausQuery {
    SUCCESS = 'success',
    REJECT = 'reject',
}

export enum PlantCatrgory {
    CONIFEROUS = 'coniferous',
    DECIDUOUS = 'deciduous',
    FLOWER = 'flower',
    FRUIT = 'fruit'
}

export interface GeoPoint {
    latitude: number,
    longitude: number
}

export interface UserData {
    readonly id: string
    nickName?: string
    birtday?: Date
    name?: string
    imageUrl?: string
    category?: UserCategory
    gender?: UserGender 
}

export interface PlantData {
    readonly id: string
    dateOfPlanting: Date
    name: string
    imageUrl: string
    category: PlantCatrgory
    coordinate: GeoPoint
    owners: Array<UserData>
    message?: string
    country?: string
}

export interface Adress {
    country?: string,
    city?: string,
    street?: string,
    name?: string
}

export interface ReserveMarkerData {
    id: string,
    coordinate: GeoPoint,
    timeCreate: Date
}

export enum AuthType {
    PHONE = 'phone',
    GOOGLE = 'google'
}

export type AuthAccountData = { type:  AuthType.PHONE, phone: string } | { type: AuthType.GOOGLE, googleId: string } 

export enum AuthStatus {
    NOT_DEFINITELY = 'notDefinitely',
    AUTHORIZED = 'authorized',
    NO_AUTHORIZED = 'noAuthorized',
}

