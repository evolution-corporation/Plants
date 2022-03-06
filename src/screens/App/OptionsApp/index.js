import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Switch } from 'react-native' 
import { i18n } from '~services'
import { BaseButtonOption, DropList, SelectLanguage, SelectWidgets } from './components'
import { User, Language, Widgets, Exit, Info } from './assets'
import { useDispatch } from 'react-redux'
import { actions } from '~store'

export default function ({ navigation, route }) {
    const [dropListOpen, setDropListOpen] = useState()
    const dispatch = useDispatch()
    const styles = StyleSheet.create({
        background: {
            flex: 1, 
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 30,
            justifyContent: 'space-between',
            paddingBottom: 50,
            paddingTop: 25
        },
        user: {
            width: '100%',
        }
    })

    return (
        <View style={styles.background}>
            <View>
                <BaseButtonOption name={i18n.t('867e8ac1-e368-48ff-a58c-e6c3d8488752')} image={<User />} style={styles.user} onPress={()=>navigation.navigate('Social',{screen: 'EditProfile'})}/>
                <DropList name={i18n.t('690aecd6-4b1c-4f17-8030-f346482dd787')} image={<Language />} description={i18n.t('99be490a-ccac-4621-a8f4-7214cc5427f8')} onOpen={()=>setDropListOpen('Language')} isShowDropList={dropListOpen == 'Language'}>
                    <SelectLanguage />
                </DropList>
                <DropList name={i18n.t('235cbe64-508c-4b00-8073-95970854493a')} image={<Widgets />} description={i18n.t('1069ef95-c854-426b-8f59-452e514009bb')} onOpen={()=>setDropListOpen('Widgets')} isShowDropList={dropListOpen == 'Widgets'}>
                    <SelectWidgets />
                </DropList>
                {/* <DropList name={i18n.t('14a95611-ead7-4527-8509-fa83153e52fd')} image={<Widgets />} description={i18n.t('13addcf8-cc13-471c-bf20-18135652053a')} onOpen={()=>setDropListOpen('ViewApp')} isShowDropList={dropListOpen == 'ViewApp'}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{i18n.t('5e43717c-40eb-4714-8ad1-8046554fc430')}</Text><Switch />
                    </View>
                </DropList> */}
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
                    <BaseButtonOption name={i18n.t('ccb2564c-f87d-465a-8737-a9f4c886cae8')} image={<Info />} style={styles.user} onPress={()=>navigation.navigate('AboutUs')}/>
                    <BaseButtonOption name={i18n.t('exit')} image={<Exit />} style={{ color: '#E67B16' }} onPress={()=>dispatch(actions.sigOut())}/>
            </View>
        </View>
    )
}