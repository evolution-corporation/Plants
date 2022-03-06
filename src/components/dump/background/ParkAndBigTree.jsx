import React, { memo } from 'react'
import { StyleSheet, View, ImageBackground, SafeAreaView, Dimensions, Platform, Image } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements';

export function ParkAndBigTree({ children, image, style }) {
    const headerHeight = useHeaderHeight()
    const styles = StyleSheet.create({
      imageBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#FFFFFF'
      },
      safeAreaView: {
        position: 'absolute',
        top: Platform.OS == 'android' ?  headerHeight : 0,
        width: '100%',
        height: '30%'
      },
      treeImage: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
      },
      bottom: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          
      },
      image: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
      },
      bottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: style.padding,
        paddingBottom: style.paddingBottom,
        paddingHorizontal: style.paddingHorizontal,
        paddingBottom: style.paddingVertical,
        zIndex: 1
      }
    });

    return(
        <View style={{ flex: 1 }}>
            <ImageBackground style={styles.imageBackground} source={require('./assets/ParkAndBigTree.png')}>
                <ImageBackground source={require('./assets/Tree.png')} style={styles.treeImage}>
                    <SafeAreaView style={[style, styles.safeAreaView]}>
                    {Array.isArray(children) ? children.slice(0, children.length - 1) : children}
                    </SafeAreaView>
                </ImageBackground>
                <Image source={image} style={styles.image}/>
                <View style={styles.bottom}>{Array.isArray(children) ? children.slice(children.length - 1) : null}</View>
            </ImageBackground>
        </View>
    )
}

export default memo(ParkAndBigTree)