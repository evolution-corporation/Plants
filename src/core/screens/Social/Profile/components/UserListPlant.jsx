import React, { useState, useEffect, memo } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { PlantInfo } from './dump';
import { PlantPlanet } from './assets';
import { TextHref } from '~components';
import { i18n } from '~services';
import { useNavigation } from '@react-navigation/native';

export function UserListPlant({ plants, uid, name, style }) {
  const [groupPlants, setGroupPlants] = useState([]);
  const navigation = useNavigation()
  const styles = StyleSheet.create({
    background: {
      backgroundColor: '#FFFFFF',
      flex: 1,
      paddingLeft: 12,
      paddingRight: 17,
      paddingBottom: 62,
      paddingTop: 12,
    },
    topBottom: {
      borderRadius: 20,
      height: 93,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 8,
      paddingTop: 13,
      paddingLeft: 28,
      paddingRight: 7,
      elevation: 3,
      shadowColor: '#000000',
      backgroundColor: '#FFFFFF'
    },
    topBottomText: {
      justifyContent: 'space-between',
      paddingBottom: 10,
      flex: 1,
    },
    topBottomTextHeader: {
      color: '#2B2A29',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 12,
      lineHeight: 14,
      fontWeight: '600',
      textAlign: 'left',
    },
    topBottomTextCountPlant: {
      color: '#75B904',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
      fontSize: 24,
      fontWeight: '700',
    },
    topBottomImage: {
      alignSelf: 'flex-end',
    },
    backgroundListPlanet: {
      backgroundColor: '#EAEAEA',
      borderRadius: 20,
      flex: 1,
      marginTop: 16,
      paddingBottom: 38,
    },
    backgroundListHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      height: 34,
    },
    listPlantOwner: {
      color: '#2B2A29',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontWeight: '600',
      fontSize: 12,
      lineHeight: 14,
      textAlign: 'left',
    },
    listPlantOpenMap: {
      color: '#75B904',
      fontSize: 12,
      fontWeight: '600',
    },
    listPlant: {
      flex: 1,
    },
  });
  const myUid = useSelector((state) => state.user.uid);
  const SectionHeader = ({ title }) => {
    const styles = StyleSheet.create({
      background: {
        flex: 1,
        height: 31,
        justifyContent: 'center',
        paddingLeft: 26,
        backgroundColor: '#F9F9F9',
      },
      text: {
        color: '#577334',
        fontSize: 12,
        lineHeight: 14,
        fontWeight: '400',
        fontFamily: Platform.OS === 'android' ? 'Roboto-Regular' : 'System',
      },
    });
    return (
      <View style={styles.background}>
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  };

  useEffect(() => {
    const _plants = [];
    for (let plant of plants) {
      let date = i18n.strftime(new Date(plant.date), '%-d %b %Y');
      let index = _plants.findIndex((item) => item.title == date);
      if (index !== -1) {
        _plants[index].data.push(plant);
      } else {
        _plants.push({ title: date, data: [plant] });
      }
    }
    setGroupPlants(_plants);
    return () => {};
  }, [setGroupPlants]);

  return (
    <View style={[style, styles.background]}>
      <TouchableOpacity style={styles.topBottom} onPress={()=>{navigation.navigate('Raiting')}}>
        <View style={styles.topBottomText}>
          <Text style={styles.topBottomTextHeader}>
            {i18n.t('fdfe3cdd-9a9f-435e-9573-df0821d87f9f')}
          </Text>
          <Text style={styles.topBottomTextCountPlant}>{plants.length}</Text>
        </View>
        <PlantPlanet style={styles.topBottomImage} />
      </TouchableOpacity>

      <View style={styles.backgroundListPlanet}>
        <View style={styles.backgroundListHeader}>
          <Text style={styles.listPlantOwner}>
            {i18n.t('57274234-e643-46d9-b9da-30b4030f890b', {
              name: myUid == uid ? i18n.t('myTree') : name,
            })}
          </Text>
          { plants.length > 0 ?
          <TextHref
            style={styles.listPlantOpenMap}
            event={() => {
              navigation.navigate('MarkerMap', { markers: plants, coordinate: plants[0].coordinate })
            }}
            text={i18n.t('d88a0752-695b-408a-90e7-6f306f474599')}
          /> : null
          }
        </View>
        <SectionList
          sections={groupPlants}
          style={styles.listPlant}
          renderItem={({ item }) => (
            <PlantInfo
              coordinate={item.coordinate}
              name={item.name}
              type={item.type}
              country={item.country}
              id={item.id}
              onPress={()=>{navigation.push('MarkerMap', { coordinate: item.coordinate, markers: plants });}}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <SectionHeader title={title} />
          )}
          refreshing={true}
          stickySectionHeadersEnabled={true}
        />
      </View>
    </View>
  );
}

export default memo(UserListPlant);
