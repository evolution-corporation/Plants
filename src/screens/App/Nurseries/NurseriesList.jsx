import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Text, Image, Platform, ActivityIndicator, TouchableOpacity} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { nurseries, i18n } from '~services'
import { NurseriesMenu } from '~components'

export default function ({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(true)
    const [nurseriesList, setNurseriesList] = useState([])
    const isFocused = useIsFocused()
    const styles = StyleSheet.create({
      background: {
        backgroundColor: '#FFFFFF',
        flex: 1,
      },
      button: {
        position: 'absolute',
        bottom: 25,
        right: 25,
      },
    });

    useEffect(()=>{
        nurseries.getNurseries().then((result)=> {
            if (isFocused) {
                setNurseriesList(result)
                setIsLoading(false)
            }
        })
        return ()=>{

        }
    },[setIsLoading])

    const Nurseries = ({ name, image, types, adress, id }) => {
        const styles = StyleSheet.create({
            background: {
                width: '100%',
                height: 85,
                flexDirection: 'row',
                alignItems: 'center', 
                //backgroundColor: 'red',
                paddingLeft: 22
            },
            image: {
                width: 55,
                height: 55,
                borderRadius: 27.5,
                backgroundColor: '#C4C4C4'
            },
            info: {
                height: '100%',
                flex: 1,
                borderBottomColor: '#ECECEC',
                borderBottomWidth: 1,
                marginLeft: 15,
                paddingVertical: 20,
                justifyContent: 'space-between'
            },
            name: {
                fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
                fontSize: 11,
                fontWeight: '400',
                color: '#131313',
            },
            type: {
                fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
                fontSize: 10,
                fontWeight: '500',
                color: '#E9A82A'
            },
            adress: {
                fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
                fontSize: 11,
                fontWeight: '400',
                color: '#C4C4C4'
            }
        })

        return (
            <TouchableOpacity style={styles.background} onPress={()=>navigation.navigate('Nurserie', { id })}>
                <Image source={{ uri: image }} style={styles.image}/>
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.type}>{Object.keys(types).map(type=>(types[type] ? i18n.t(type) : null)).filter(item => item != null).join(', ')}</Text>
                    <Text style={styles.adress}>{adress}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    
    if (isLoading) {
        return (
          <View style={[styles.background, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator color={'#86B738'} size={'large'} />
          </View>
        );
    }
    return (
        <View style={[styles.background]}>
            <FlatList 
                data={nurseriesList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Nurseries name={item.name} image={item.image} types={item.type} adress={item.adress} id={item.id}/>}
            />
        </View>
    )
}