import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import UUID from 'react-native-uuid'; 
import Plant from './plant'
import { UserData, PlantData, StatusLoadingData, UserCategory, UserGender, UserRole, StausQuery } from './type'

import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import type { FirebaseStorageTypes } from '@react-native-firebase/storage'


const nameCollection = 'Users'

export default class User implements UserData{
    public static colection: FirebaseFirestoreTypes.CollectionReference = firestore().collection(nameCollection)

    public static async checknUniqueNickName(nickName: string): Promise<boolean> {
        const collection: FirebaseFirestoreTypes.QuerySnapshot = await this.colection.where('nickName', '==', nickName).get()
        return collection.empty
    }
    
    private readonly document: FirebaseFirestoreTypes.DocumentReference
    public statusLoading: StatusLoadingData = StatusLoadingData.NOT_LOADING
    public readonly id: string
    public nickName?: string
    public birtday?: Date
    public name?: string
    public imageUrl?: string
    private imageReference?: FirebaseStorageTypes.Reference 
    public category?: UserCategory
    public role: UserRole = UserRole.USER
    public gender: UserGender = UserGender.OTHER
    
    constructor(id: string) {
        this.id = id
        this.document = User.colection.doc(this.id)
        this.document.onSnapshot((document: FirebaseFirestoreTypes.DocumentSnapshot) => this.updateDate(document))
    }

    private async updateDate(data: FirebaseFirestoreTypes.DocumentSnapshot): Promise<void> {
        this.statusLoading = StatusLoadingData.LOADING
        const documentData: FirebaseFirestoreTypes.DocumentData | undefined = data.data()
        if (documentData) {
            this.nickName = documentData.nickName
            this.birtday = documentData.birtday.toDate()
            this.name = documentData.name
            switch (documentData.gender) {
                case UserGender.MALE:
                    this.gender = UserGender.MALE
                    break;
                case UserGender.FEMALE:
                    this.gender = UserGender.FEMALE
                    break;
                default:
                    this.gender = UserGender.OTHER
                    break;
            }
            switch (documentData.role) {
                case UserRole.ADMIN:
                    this.role = UserRole.ADMIN
                    break;
                default:
                    this.role = UserRole.USER
                    break
            }
            switch (documentData.category) {
                case UserCategory.BLOGER:
                    this.category = UserCategory.BLOGER
                    break;
                case UserCategory.COMMUNITY:
                    this.category = UserCategory.COMMUNITY
                    break;
                case UserCategory.ORGANIZATION:
                    this.category = UserCategory.ORGANIZATION
                    break;
                case UserCategory.EDITOR:
                    this.category = UserCategory.EDITOR
                    break;
                case UserCategory.WRITER:
                    this.category = UserCategory.WRITER
                    break;
                case UserCategory.GARDENER:
                    this.category = UserCategory.GARDENER
                    break;
                case UserCategory.THEFLOWERMAN:
                    this.category = UserCategory.THEFLOWERMAN
                    break;
                case UserCategory.THEFLOWERMAN:
                    this.category = UserCategory.THEFLOWERMAN
                    break;
                default:
                    this.category = UserCategory.NONE
                    break;
            }
            if (documentData.imageId) {
                this.imageReference = storage().ref(`/image/users/${documentData.imageId}`)
                this.imageUrl = this.imageReference.toString()
            }
        }
        this.statusLoading = StatusLoadingData.LOADED
    }

    public async updateImage({ imageBase64, imageUri }: { imageBase64?: string, imageUri?: string, imageBlob?: Blob }): Promise<StausQuery> {
        try {
            if (this.imageReference) {
                if (imageBase64) {
                    this.imageReference.putString(imageBase64, 'base64')
                } else
                if (imageUri) {
                    this.imageReference.putFile(imageUri)
                }
            } else {
                const uuid = UUID.v4()
                const referens = storage().ref(`/image/user/${uuid}`)
                if (imageBase64) {
                    referens.putString(imageBase64, 'base64')
                } else
                if (imageUri) {
                    referens.putFile(imageUri)
                }
                await this.document.update({ imageId: uuid })
            }
            return StausQuery.SUCCESS
        } catch (error) {
            console.error('User Model. Failed to upload image', error)
            throw error
        }
    }

    public async editData(data: UserData): Promise<StausQuery> {
        try {
            if (data.imageUrl) this.updateImage({ imageUri: data.imageUrl })
            await this.document.update(data)
            return StausQuery.SUCCESS
        } catch (error) {
            console.error('User Model. Failed to update data', error)
            throw new Error()
        }
    }

    public getUserData(): UserData {
        return {
            id: this.id,
            birtday: this.birtday,
            category: this.category,
            gender: this.gender,
            imageUrl: this.imageUrl,
            name: this.name,
            nickName: this.nickName
        }
    }

    public async getPlants(): Promise<Array<PlantData>> {
        return await Plant.getUserPlantsData(this.getUserData())
    }
}