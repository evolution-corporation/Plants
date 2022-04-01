import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Platform } from 'react-native'

import { i18n } from '~services'
import { ParkAndBigTree, TextHref, SelectElemet } from '~components'
import { ShowList } from './components'
import ColorButton from 'src/elements/buttons/ColorButton';

export default function ({ navigation, route }) {
    const image = [
        require('./assets/Image1.png'), 
        require('./assets/Image2.png'), 
        require('./assets/Image3.png'), 
        require('./assets/Image4.png'), 
        require('./assets/Image5.png'), 
        require('./assets/Image6.png')
    ]
    const styles = StyleSheet.create({
        background: {
            paddingHorizontal: 30,
        },
        secondHead: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        skip: {
            fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
            fontWeight: '500',
            color: '#FFFFFF',
            fontSize: 15,
        },
        step: {
            color: '#FFFFFF',
            fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
            fontSize: 19,
            fontWeight: '700'
        },
        textContainer: {
            marginTop: 30,
            marginHorizontal: -30
        },
        topView: {
            flex: 1,
            justifyContent: 'space-between'
        },
        text: {
            fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
            fontWeight: '500',
            fontSize: 19,
            lineHeight: 19,
            color: '#FFFFFF',
            marginHorizontal: 30,
        },
        selectElemet: {
            flexDirection: 'row',
            bottom: 40,
            position: 'absolute',
            alignSelf: 'center'
        },
        circle: { 
            height: 7, 
            width: 7, 
            borderRadius: 3.5, 
            marginHorizontal: 3.5 }
    })
    
    const editPage = () => {
        navigation.setParams({ page: route.params.page + 1 })
    }

    return (
        <ParkAndBigTree image={image[route.params.page - 1]} style={styles.background}>           
            <View style={styles.secondHead}>
                <Text style={styles.step}>{i18n.t('Step', { count: route.params.page })}</Text>
                <TextHref event={()=>navigation.navigate('CreatePhoto')} style={styles.skip} text={i18n.t('Skip')} />
            </View>
            <View style={styles.topView}>
                <ShowList style={styles.textContainer} page={route.params.page - 1}>
                    <Text style={styles.text}>{i18n.t('ad830b24-602e-42ff-99aa-ea685f2c148f')}</Text>
                    <Text style={styles.text}>{i18n.t('6a37fbdb-827d-4e22-83a1-46ffb4e9550d')}</Text>
                    <Text style={styles.text}>{i18n.t('e3f587af-5d0b-4ba8-8677-8bd1580a167d')}</Text>
                    <Text style={styles.text}>{i18n.t('79621511-3dd7-471b-b05e-25f11f921b22')}</Text>
                    <Text style={styles.text}>{i18n.t('33a8cdb5-d957-4116-be87-7cceac607202')}</Text>
                    <Text style={styles.text}>{i18n.t('5a782246-0374-4c1a-914d-d9f8c347361c')}</Text>
                </ShowList>
                <ColorButton text={i18n.t('next')} event={route.params.page == 6 ? ()=>navigation.navigate('CreatePhoto') : editPage}/>
            </View>
            <View style={styles.selectElemet}>
                <SelectElemet isSelected={route.params.page == 1} selectColor={'#4B780F'} noSelectColor={'#FFFFFF'} style={styles.circle}/>
                <SelectElemet isSelected={route.params.page == 2} selectColor={'#4B780F'} noSelectColor={'#FFFFFF'} style={styles.circle}/>
                <SelectElemet isSelected={route.params.page == 3} selectColor={'#4B780F'} noSelectColor={'#FFFFFF'} style={styles.circle}/>
                <SelectElemet isSelected={route.params.page == 4} selectColor={'#4B780F'} noSelectColor={'#FFFFFF'} style={styles.circle}/>
                <SelectElemet isSelected={route.params.page == 5} selectColor={'#4B780F'} noSelectColor={'#FFFFFF'} style={styles.circle}/>
                <SelectElemet isSelected={route.params.page == 6} selectColor={'#4B780F'} noSelectColor={'#FFFFFF'} style={styles.circle}/>
            </View>
        </ParkAndBigTree>
    )
}