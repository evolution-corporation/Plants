import React from 'react'
import { Dimensions, Image, StyleSheet, View, Text, Platform, Linking } from 'react-native'
import { TextHref } from '~components'
import EvolutionBigLogo from '~assets/EvolutionBigLogo.svg';
import { i18n } from '~services';
import { useHeaderHeight } from '@react-navigation/elements';

export default function ({  }) {
    const headerHeight = useHeaderHeight();
    const styles = StyleSheet.create({
      background: {
        paddingTop: headerHeight,
        paddingHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 40,
        flex: 1,
        backgroundColor: '#FFFFFF'
      },
      image: {
        width: Dimensions.get('screen').width - 80,
        height: Dimensions.get('screen').width - 80,
        marginBottom: 50
      },
      text: {
        fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 15,
        color: 'rgba(64, 64, 64, 0.71)',
        textAlign: 'center',
      },
      href: {
        color: '#506531',
        fontWeight: '700',
        fontSize: 14,
      },
    });
    return (
        <View style={styles.background}>
            
                <Image source={require('~assets/GreenPlanetAboutUs.png')} resizeMode={'cover'} />
                <View>
                <EvolutionBigLogo style={{ alignSelf: 'center' }}/>
                <Text style={[styles.text, { marginTop: 20 }]}>{i18n.t('74219071-c9c5-422d-bb3a-ddacff7ef9f2')}</Text>
                <Text style={[styles.text, { marginVertical: 10 }]}>{i18n.t('0cd041cd-7486-40e1-b983-19da19b3bbc0')}</Text>
                <Text style={[styles.text, {  }]}>{i18n.t('22b49c4f-299f-4899-b320-ad774be2a99d')()}</Text>
                </View>
            <TextHref text={'evolution.one'} style={styles.href} event={()=>Linking.openURL('https://evolution.one')}/>           
        </View>
    )
}