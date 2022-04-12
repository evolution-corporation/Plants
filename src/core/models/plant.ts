import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import UUID from 'react-native-uuid'; 
import { UserData, PlantData, Adress, StatusLoadingData, PlantCatrgory, GeoPoint } from './type'


import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import type { FirebaseStorageTypes } from '@react-native-firebase/storage'

const nameCollection = 'Plants'

export default class Plant{
    private static collection = firestore().collection(nameCollection)

    public static async getUserPlantsData(user: UserData): Promise<Array<PlantData>> {
        const plantsList: Array<PlantData> = []
        const collectionDocument = await this.collection.where('owners', 'array-contains', user.id).get()
        for (let document of collectionDocument.docs) {
            const documentData: FirebaseFirestoreTypes.DocumentData = document.data()
            let category: PlantCatrgory = PlantCatrgory.CONIFEROUS

            switch (documentData.category) {
                case PlantCatrgory.DECIDUOUS:
                    category = PlantCatrgory.DECIDUOUS
                    break;
                case PlantCatrgory.FLOWER:
                    category = PlantCatrgory.FLOWER
                    break;
                case PlantCatrgory.FRUIT:
                    category = PlantCatrgory.FRUIT
                    break
            }
            const imageUrl = storage().ref(`/image/plants/${documentData.imageId}`).toString()
            let owners: Array<UserData> = []
            if (documentData.owners.length == 1) {
                owners.push(user)
            }
            plantsList.push({ 
                id: document.id,
                category: category,
                coordinate: { 
                    latitude: documentData.coordinate.latitude , 
                    longitude: documentData.coordinate.longitude
                },
                dateOfPlanting: documentData.dateOfPlanting.toDate(),
                name: documentData.name,
                message: documentData.message,
                imageUrl: imageUrl,
                owners: owners,
                country: documentData.adress.country
            })
        }
        return plantsList
    }

    public static async getUserPlant(userId: string): Promise<Array<Plant>> {
        const plantsList: Array<Plant> = []
        const collectionDocument = await this.collection.where('owners', 'array-contains', userId).get()
        for (let document of collectionDocument.docs) {
            plantsList.push(new Plant(document.id))
        }
        return plantsList
    }

    public static async createPlant(plantData: PlantData, adress?: Adress): Promise<Plant> {
        const coordinate: FirebaseFirestoreTypes.GeoPoint = new firestore.GeoPoint(plantData.coordinate.latitude, plantData.coordinate.longitude)
        const collection: FirebaseFirestoreTypes.QuerySnapshot = await this.collection.where('coordinate', '==', coordinate).get()
        if (!collection.empty) {
            plantData.coordinate = {
                latitude: plantData.coordinate.latitude + Math.pow(-1, Math.round(Math.random())) * Math.random() * Math.pow(10, -3),
                longitude: plantData.coordinate.longitude + Math.pow(-1, Math.round(Math.random())) * Math.random() * Math.pow(10, -3)   
            }
        } 
        const document = this.collection.doc()
        const imageId = UUID.v4
        const image = storage().ref(`/image/plant/${imageId}`).putFile(plantData.imageUrl)
        await document.update({
            dateOfPlanting: new firestore.Timestamp(Date.now() / 1000, 0),
            name: plantData.name,
            imageId: imageId,
            category: plantData.category,
            coordinate: plantData.coordinate,
            owners: plantData.owners.map(userData => userData.id),
            message: plantData.message,
            country: adress?.country ?? 'Earth',
        })
        return new Plant(document.id)
    }

    private readonly document: FirebaseFirestoreTypes.DocumentReference
    public statusLoading: StatusLoadingData = StatusLoadingData.NOT_LOADING
    public readonly id: string
    public dateOfPlanting?: Date
    public name?: string
    public imageUrl?: string
    public category?: PlantCatrgory
    public coordinate?: GeoPoint
    public owners?: Array<UserData>
    public message?: string
    public country?: string

    constructor(id: string) {
        this.id = id
        this.document = Plant.collection.doc(this.id)
        this.document.onSnapshot((document: FirebaseFirestoreTypes.DocumentSnapshot) => this.updateDate(document))
    }

    private updateDate(data: FirebaseFirestoreTypes.DocumentSnapshot): void {
        this.statusLoading = StatusLoadingData.LOADING
        const documentData = data.data()
        if (documentData) {
            this.imageUrl = documentData.imageUrl
            this.name = documentData.name
            this.category = documentData.category
            this.coordinate = documentData.coordinate
        }
    }

    
}