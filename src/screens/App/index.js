import React, { useCallback } from 'react';
import { Platform, StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BackArrow, UserHeaderInfo, SearchButton, SearchInput } from '~components'
import { i18n } from '~services'

import Main from '../Main';
import Social from '../Social';
import PlantRegistration from './PlantRegistration';
import PlantCard from './PlantCard';
import MarkerMap from './MarkerMap';
import HelpPlant from './HelpPlant';
import PlantMap from '../PlantMap';
import PlantReserved from './PlantReserved';
import Nurseries from '../nurseries'
import OptionsApp from './OptionsApp';
import AboutUs from './AboutUs'
import ChatList from './ChatList.jsx'
import Chat from './Chat.jsx'
import { useSelector } from 'react-redux';
// import EditProfile from './Social/EditProfile';

const { Group, Navigator, Screen } = createNativeStackNavigator();

export default function ({}) {
  const user = useSelector(state => state.user)

  const styles = StyleSheet.create({
  buttonGoBackInCircule: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#86B738'
  },
  greenHeader: {
     backgroundColor: '#86B738',
  },
  greenHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
    fontWeight: '600'
  },
  headerStyleTransparent: {
    color: '#EFEFEF',
    fontWeight: '600',
    fontSize: 18,
    fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
  },
  });

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
    >
      <Screen
        component={Main}
        name={'Main'}
      />
      <Screen component={Social} name={'Social'} />
      <Screen component={PlantRegistration} name={'PlantRegistration'} />
      <Screen component={HelpPlant} name={'HelpPlant'} />
      <Group 
        screenOptions={() => ({
              presentation: 'transparentModal',
            })}>
        <Screen
            name={'PlantCard'}
            component={PlantCard}
            getId={({ params })=>(params.id)}
          />
        <Screen 
          name={'PlantReserved'}
          component={PlantReserved}
          getId={({ params })=>(params.id)}
        />
      </Group>
      <Screen
        name={'PlantMap'}
        component={PlantMap}
        options={({ navigation, route })=>({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackVisible: false,
          title: null,
          //headerLeft: () => <BackArrow goBack={navigation.goBack} style={styles.buttonGoBackInCircule}/>
        })}
      />
      <Screen
        name={'MarkerMap'}
        component={MarkerMap}
        initialParams={{ coordinate: { latinude: 0, longitude: 0 }, markers: [] }}
        options={({ navigation, route })=>({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackVisible: false,
          title: null,
          // headerLeft: () => <BackArrow goBack={navigation.goBack} style={styles.buttonGoBackInCircule}/>
        })}
      />
      <Screen
        name={'Nurseries'}
        component={Nurseries}
      />
      <Screen
        name={'OptionsApp'}
        component={OptionsApp}
        options={({ navigation, route })=>({
          headerShown: true,
          headerStyle: styles.greenHeader,
          headerTitleStyle: styles.greenHeaderTitle,
          headerTitleAlign: 'center',
          title: i18n.t('9f11225b-d870-42be-8a98-c59a7c9c428f'),
          headerLeft: ()=>(<BackArrow goBack={navigation.goBack}/>)
        })}
      />
      {/* <Group
        screenOptions={({ navigation, route }) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft: () => <BackArrow goBack={navigation.goBack} />,
          headerBackVisible: false,
          headerTitleStyle: styles.headerStyleTransparent,
        })}
      >
        <Screen
          name="EditProfile"
          component={EditProfile}
          initialParams={{ permision: false, isPress: false, updateParent: true }}
          options={({ navigation, route }) => ({
            title: i18n.t('14093b80-9aac-4b17-81e3-22d9da9f1dc4'),
            headerRight: () =>
              route.params.permision ? (
                <ReadyButton
                  onPress={() => navigation.setParams({ isPress: true })}
                />
              ) : null,
          })}
        />
      </Group> */}
      <Screen
        component={AboutUs}
        name={'AboutUs'}
        options={({ navigation })=> ({
          headerShown: true,
            title: i18n.t('ccb2564c-f87d-465a-8737-a9f4c886cae8'),
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerLeft: () => <BackArrow color={'DarkGreen'} />,
            headerBackVisible: false,
            headerTitleStyle: { color: "#506531", fontFamily: Platform.OS == 'android' ? 'Roboto-Bold' : 'System', fontSize: 24, fontWeight: '700'},
        })}
      />
      <Screen
        component={ChatList}
        name={'ChatList'}
        initialParams={{ isSearch: false }}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerBackVisible: false,
          headerStyle: styles.greenHeader,
          headerTitleStyle: styles.greenHeaderTitle,
          headerTitleAlign: 'center',
          headerTitle: route.params.isSearch ? 
            () => <SearchInput 
              onChange={(text)=>navigation.setParams({ searchName: text })} 
              onBlur={() => (
                !route.params.searchName ?
                  navigation.setParams({ isSearch: false })
                  : null
                )} 
            /> : 
            ()=> <UserHeaderInfo />,
          headerLeft: () => <BackArrow color={'white'} goBack={route.params.isSearch ? ()=>navigation.setParams({ isSearch: false }) : null } />,
          headerRight: ()=> <SearchButton onPress={()=>navigation.setParams({ isSearch: true })} onChange={route.params.isSearch} />
        })}
      />
      <Screen
        name={'Chat'}
        component={Chat}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerBackVisible: false,
          headerStyle: styles.greenHeader,
          headerTitleStyle: styles.greenHeaderTitle,
          headerTitleAlign: 'center',
          headerTitle: ()=> {
            if (route.params.members) {
              if (route.params.members.length == 2) {
                const interlocutor = route.params.members.filter(uid => uid != user.uid)[0]
                return(<UserHeaderInfo name={route.params.name} photo={route.params.photo} uid={interlocutor}/>)
              } else {
                return null
              }
            } else {
              return(<UserHeaderInfo name={route.params.name} photo={route.params.photo} uid={route.params.userId}/>)
            }
            
          },
          headerLeft: () => <BackArrow color={'white'} />,
          headerRight: ()=> null
        })}
      />
      
    </Navigator>
  );
}
