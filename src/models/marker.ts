import AsyncStorage from '@react-native-async-storage/async-storage';
import UUID from 'react-native-uuid'
import { ReserveMarkerData, PlantData, GeoPoint } from './type'

import Plant from './plant'

export default class ReserveMarker{
    public static async getReserveMarkersUser(): Promise<Array<ReserveMarker>> {
        const listReserveMarker: Array<ReserveMarkerData> = JSON.parse(await AsyncStorage.getItem('@listReserveMarker') ?? '[]').map((item: { id: string, coordinate: GeoPoint, timeCreate: number }) => ({
            id: item.id,
            coordinate: item.coordinate,
            timeCreate: new Date(item.timeCreate)
        })).filter((marker: ReserveMarkerData) => {
            const timeDelete: Date = new Date(marker.timeCreate)
            const toDay: Date = new Date()
            toDay.setHours(0, 0, 0, 0)
            timeDelete.setDate(marker.timeCreate.getDate() + 7)
            return toDay.getTime() >= timeDelete.getTime()
        })
        AsyncStorage.setItem('@listReserveMarker', JSON.stringify(listReserveMarker))
        return listReserveMarker.map((marker: ReserveMarkerData) => new ReserveMarker({ id: marker.id, coordinate: marker.coordinate, timeCreate: marker.timeCreate }))
    }

    public id: string
    public coordinate: GeoPoint
    public timeCreate: Date

    constructor({ id, coordinate, timeCreate }: { id?: string, coordinate: GeoPoint, timeCreate?: Date }) {
        this.id = id ?? UUID.v4().toString()
        this.coordinate = coordinate
        if (!timeCreate) {
            timeCreate = new Date()
            timeCreate.setHours(0, 0, 0, 0)
        } 
        this.timeCreate = timeCreate
    }

    public async delete(): Promise<void> {
        const listReserveMarker: Array<ReserveMarkerData> = JSON.parse(await AsyncStorage.getItem('@listReserveMarker') ?? '[]').map((item: { id: string, coordinate: GeoPoint, timeCreate: number }) => ({
            id: item.id,
            coordinate: item.coordinate,
            timeCreate: new Date(item.timeCreate)
        })).filter((marker: ReserveMarkerData) => {
            if (marker.id == this.id) return false
            const timeDelete: Date = new Date(marker.timeCreate)
            const toDay: Date = new Date()
            toDay.setHours(0, 0, 0, 0)
            timeDelete.setDate(marker.timeCreate.getDate() + 7)
            return toDay.getTime() >= timeDelete.getTime()
        })
        AsyncStorage.setItem('@listReserveMarker', JSON.stringify(listReserveMarker))
    }

    public plantingPlant(): {(plantData: PlantData): Promise<Plant>} {
        return async (plantData) => {
            const plant = await Plant.createPlant({ ...plantData, coordinate: this.coordinate })
            this.delete()
            return plant
        }
    }
}