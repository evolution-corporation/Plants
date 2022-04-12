import React, { useEffect, useState } from 'react'
import { Text, Platform, StyleSheet, Image, View, Dimensions, ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { PlantImageSmall, Overlay, BackCross } from '~components'
import { database } from '~services'

import { UserInfo, BackGroundMarkerCard } from './components'

export default function({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    const isFocused = useIsFocused()

    const styles = StyleSheet.create({
        background: {
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            padding: 15,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            bottomPadding: 35,
            minHeight: 200
        },
        image: {
            width: Dimensions.get('screen').width - 30,
            height: Dimensions.get('screen').width - 30,
            borderRadius: 30,
            borderColor: '#FFFFFF'
        },
        plantImage: {
            transform: [{ scale: 2 }],
            position: 'absolute',
            bottom: 10,
            right: 10
        },
        info: {
            width: '100%',
            height: 70,
            marginVertical: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',

        },
        userInfo: {
            flex: 1,
        },
        plantInfo: {
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingTop: 7
        },
        name: {
            color: '#000000',
            fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
            fontWeight: '500',
            fontSize: 14
        },
        price: {
            color: '#000000',
            fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
            fontWeight: '500',
            fontSize: 14
        },
        message: {
            color: '#0D0D0D',
            fontFamily: Platform.OS === 'android' ? 'Roboto-Meduim' : 'System',
            fontSize: 12, 
            fontWeight: '500',
            backgroundColor: '#F0F0F0',
            padding: 17,
            borderRadius: 15,
            width: '100%'
        },
        backCross: {
            width: 35,
            height: 35,
            borderRadius: 17.5,
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            top: 0,
            right: 0,
        }
    })

    useEffect(()=>{
        let isActivate = true
        database.getPlantData(route.params.id).then((plant) => {
            if (isActivate) {
                navigation.setParams(plant)
                setIsLoading(false)
            }
        })
        return ()=>{
            isActivate = false
            setIsLoading(true)
        }
    }, [setIsLoading])

    if (isLoading) {
        return (
            <Overlay>
                <View style={styles.background} >
                    <ActivityIndicator size={'large'} color={'#86B738'}/>
                </View>
            </Overlay>
        ) 
    }

    return (
        <Overlay>
            <BackGroundMarkerCard style={styles.background} price={route.params.price}>
                <View>
                    <Image style={styles.image} source={{ uri: `data:image/png;base64, ${route.params.photo}` }} />
                    <PlantImageSmall style={styles.plantImage} type={route.params.type}/>
                    <BackCross style={styles.backCross} color={'gray'}/>
                </View>
                <View style={styles.info}>
                    <UserInfo users={route.params.owners} style={styles.userInfo} />
                    <View style={styles.plantInfo}>
                        <Text style={styles.name}>{route.params.name}</Text>
                        <Text style={styles.price}>{route.params.price ? `${new Money(route.params.price.price, route.params.price.currency)}` : null}</Text>
                    </View>
                </View>
                {
                    route.params.message ? <Text style={styles.message}>{route.params.message}</Text> : null
                }
            </BackGroundMarkerCard>
        </Overlay>
    )
}

class Money {
    constructor(count, currency) {
        this.count = count
        this.currency = currency
        switch (currency) {
            case ('RUB'):
                this.symbolCurrency = '₽'
                this.symbolPosition = 'rigth'
                break
            case ('USD'):
                this.symbolCurrency = '$'
                this.symbolPosition = 'left'
                break;
            default:
                this.symbolCurrency = currency
                this.symbolPosition = 'rigth'
        }
    }


    toString() {
        if (this.symbolPosition == 'left') {
            return `${this.symbolCurrency} ${this.count}`
        }
        return `${this.count} ${this.symbolCurrency}`
    }
}