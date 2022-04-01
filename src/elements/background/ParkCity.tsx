import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, StatusBar, KeyboardAvoidingView } from 'react-native';
import  { SafeAreaView }  from  'react-native-safe-area-context' ; 
import { useNavigation } from '@react-navigation/native';
import type { ViewStyle } from 'react-native'
import type { ReactNode, FC } from 'react'
import type { StackNavigationOptions } from '@react-navigation/stack';

interface OptionsScreen {
  style?: ViewStyle,
  children: ReactNode,
  useNavigator?: boolean
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    image: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    page: {
      position: 'absolute',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      top: 0,
      left: 0,
    },
  });

const screenOptions: StackNavigationOptions = {
  headerShown: false
}

const ParkCity: FC<OptionsScreen> = ({ children, style, useNavigator=true }: OptionsScreen) => {
  if (useNavigator) {
    const navigation = useNavigation()
    useEffect(()=>{
    navigation?.setOptions(screenOptions)
    return () => {

    }
  }, [navigation])
  }

  return (
    <View style={styles.background}>
      <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} />
      <ImageBackground
        source={require('./assets/ParkCity.png')}
        style={styles.image}
        
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={40} style={[style, { flex: 1 }]}>
            {children}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}


export default ParkCity