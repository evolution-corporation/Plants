import React, { useEffect, useReducer, useRef } from 'react'
import { ScrollView, StyleSheet, Image, Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import { BackLeaves } from '~components'
import { i18n } from '~services'
import { actions } from '~store'
import { MapPart, AskedButton, TextAndImageAndButton } from '~components'

export default function ({ route, navigation }) {
    const reduxDispathch = useDispatch()
    const scroll = useRef()
    const [state, dispatch] = useReducer((state, { type, payload })=>{
        switch (type) {
            case 'Asked#1':
                return { asked1: payload }
            case 'Asked#2':
                return { asked1: state.asked1, asked2: payload }
            case 'Asked#3':
                return { asked1: state.asked1, asked2: state.asked2, asked3: payload }
            case 'Asked#4': 
                return { ...state, asked4: payload }
            }
    }, {  })
    const styles = StyleSheet.create({
        background: {
            paddingHorizontal: 30,
            flex: 1
        },
        image: {
            width: Dimensions.get('screen').width - 120,
            height: Dimensions.get('screen').width - 120,
            alignSelf: 'center'
        }
    })

    const createReservePoint = async (payload) => {
        if (payload) await reduxDispathch(actions.addReserveMarker(route.params.coordinate)).unwrap();
        dispatch({ type: 'Asked#4', payload })
    }

    useEffect(()=> {
        scroll.current.scrollToEnd({ animated: true })
    },[state])

    return (
        <BackLeaves>
            <ScrollView
                ref={scroll}
                style={styles.background}
                contentContainerStyle={{ paddingBottom: 50 }}
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                <AskedButton onChange={(payload)=>dispatch({ type: 'Asked#1', payload })} text={{ title: i18n.t('4ba851d2-71a6-4375-8cfd-ea32c6db7afe'), topButton: i18n.t('Yes'), bottomButton: i18n.t('register') }} />
                {
                    state.asked1 == undefined ? null :
                    state.asked1 ? 
                        <AskedButton onChange={(payload)=>dispatch({ type: 'Asked#2', payload })} text={{ title: i18n.t('584e5550-73f2-4b37-b38e-293388e4cf88'), topButton: i18n.t('Yes'), bottomButton: i18n.t('3f04a506-7afe-4ec8-8eb7-46783578dbc0') }} /> :
                        <MapPart coordinate={route.params?.coordinate} title={i18n.t('04590caa-1fe2-4d79-8bbc-ed75d8ca4470')} onPress={()=>navigation.navigate('MapConfirmation', { coordinate: route.params?.coordinate })}/>
                }
                {
                    state.asked2 == undefined ? null :
                    state.asked2 ?
                        <MapPart coordinate={route.params?.coordinate} title={i18n.t('9c9de8c6-be1a-4968-9261-d908384da724')} onPress={()=>{reduxDispathch(actions.showInstruction());navigation.navigate('MapConfirmation', { coordinate: route.params?.coordinate })}}/> :
                        <AskedButton onChange={(payload)=> {if (payload) navigation.navigate('Nurseries', { screen: 'NurseriesList', params: { coordinate: route.params?.coordinate } }); dispatch({ type: 'Asked#3', payload })}} text={{ title: i18n.t('88e306de-0678-4dcb-bb3a-a40129d68772'), topButton: i18n.t('3ed8ca1b-1191-4631-9b75-dbe1b3cccc23'), bottomButton: i18n.t('bca7b99a-06b1-46b1-b583-e2d28a88b502') }} fullWidth={'all'}/>
                }
                {
                    state.asked3 != undefined && route.params?.coordinate ? 
                    <AskedButton onChange={createReservePoint} text={{ title: i18n.t('8c66baf3-c1e1-4056-9248-b879f5ab81b4'), topButton: i18n.t('Yes'), bottomButton: i18n.t('416e9830-724d-401e-89e5-20010c1b44f9') }} fullWidth={'bottom'}/>
                    : null
                }
                {
                    state.asked4 == undefined ? null :
                    state.asked4 ?
                        <TextAndImageAndButton textTitle={i18n.t('20867a6a-45b6-410a-b17c-b336e1a88076')} textButton={i18n.t('d690f597-53d8-49fb-8ae4-80176d051ecb')} image={<Image source={require('~assets/Plant.png')} style={styles.image}/>} onPress={()=>navigation.navigate('PlantMap')} /> :
                        <TextAndImageAndButton textTitle={i18n.t('ee5d22fc-188b-4e73-a481-35dfac3ef6c4')} textButton={i18n.t('e08b935f-ecb5-4d12-8b3b-e2f3a21f9be3')} image={<Image source={require('~assets/NoPlant.png')} style={styles.image}/>} onPress={()=>navigation.navigate('PlantMap')} />
                }
            </ScrollView>
        </BackLeaves>
    )
}