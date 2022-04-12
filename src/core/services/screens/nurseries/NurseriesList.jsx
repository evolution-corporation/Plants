import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Text, Image, Platform, ActivityIndicator, TouchableOpacity} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { i18n, database } from '~services'

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
        let sub = database.nurseries.getNurseries({ filter: route.params.filter, onCallback: (nurseries) => {
          if (isFocused) setNurseriesList(nurseries);
        } });
        setIsLoading(false);
        return ()=>{
          sub()
        }
    },[])

    const Nurserie = ({ nurserie }) => {
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
          <TouchableOpacity style={styles.background} onPress={() => navigation.navigate('Nurserie', { ...nurserie })}>
            <Image source={{ uri: `data:image/png;base64, ${nurserie.image}` }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{nurserie.title}</Text>
              <Text style={styles.type}>
                {nurserie.typePlant
                  .map((type) => (i18n.t(type)))
                  .join(', ')}
              </Text>
              <Text style={styles.adress}>{`${nurserie.adress.city} ${nurserie.adress.street}`}</Text>
            </View>
          </TouchableOpacity>
        );
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
                renderItem={({ item }) => <Nurserie nurserie={item} />}
            />
        </View>
    )
}