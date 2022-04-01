import React, { useRef, useState } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ColorButton, TextHref } from '~elements/buttons'
import i18n from '~i18n';
import Logo from '~assets/logo/TreeLogo_White_Medium.svg';
import { AuthType } from '~models/type';
import { IconName } from '~icons'

import type { FC } from 'react'
import type { ViewStyle } from 'react-native'

interface props {
    editLayout: Function,
    style?: ViewStyle
}

const styles = StyleSheet.create({
    background: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
      backgroundColor: 'green',
      paddingHorizontal: 30,
    },
    carouselText: { 
      marginBottom: 50
    },
    signInBottom: { 
      marginVertical: 10,
      backgroundColor: '#EFEFEF' ,
    },
    logo: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    textHref: {
      color: '#FFFFFF',
      fontSize: 13,
      fontWeight: '500',
      marginTop: 22
    }
  });

const messages: Array<string> = ['8dd3819b-83e6-4cd6-930e-194758735bd9', '8ef09926-fc2e-4435-9dd6-b7d89ae57212']

const ChoosingTheLoginMethod: FC<props> = ({ editLayout }: props) => {
    const [carouselIndex, setCarouselIndex] = useState<number>(0)
    const carouselRef = useRef<Carousel<string>>(null)

    const phoneSignIn = () => {
        editLayout(AuthType.PHONE)
    }

    const googleSignIn = () => {
        editLayout(AuthType.GOOGLE)
    }

    return ( 
        <View style={styles.background}>
            <Logo />
            <Carousel 
                data={messages}
                renderItem={({ item, index }) => (
                    <Text style={styles.carouselText}>{i18n.t(item)}</Text>
                )}
                loop={true}
                autoplay={true}
                horizontal={true}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={200}
                ref={carouselRef}
            />
            <Pagination 
                activeDotIndex={carouselIndex}
                dotsLength={messages.length}
            />
            <View style={{ width: '100%', backgroundColor: 'red' }}>
                <ColorButton
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', borderColor: '#FFFFFF', borderWidth: 1 }}
                    onPress={()=> googleSignIn()}
                    styleOptions={{ icon: IconName.GOOGLE }}
                    text={i18n.t('e1c98b9a-ac6d-4355-96c5-190f770257d2')}
                />
                <ColorButton
                    text={i18n.t('32c66492-e9c6-4cf6-a3f1-fd6003e8e2df')}
                    style={{ marginVertical: 10,  }}
                    onPress={() => phoneSignIn()}
                />
                <TextHref style={styles.textHref} text={i18n.t('af79d9f6-539c-410a-ab73-fbad37dde206')} onPress={() => phoneSignIn}/>
            </View>
        </View>
    )
}

export default ChoosingTheLoginMethod