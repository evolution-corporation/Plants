import React, { useReducer, useMemo } from 'react';
import { FlatList, Text, Platform, StyleSheet, View } from 'react-native';
import { SelectButton, PlantImageSmall } from './dump';
import { i18n } from '~services';

const listPlants = ['Shrub', 'Сoniferous', 'Deciduous', 'Flower', 'Fruit'];

export default function ({ style, onPress, multiSelect=false, colorStyle='white/green', initValue={} }) {
  const [state, dispatch] = useReducer((_state, { name }) => {
    const temp = multiSelect ? { ..._state } : {};
    temp[name] = !_state[name];
    return temp;
  }, initValue);

  const styles = StyleSheet.create({
    background: {
      height: 50,
      justifyContent: 'center',
      overflow: 'visible',
    },
    image: {
      marginBottom: 1,
      maxHeight: 33,
      maxWidth: 33,
      marginRight: 5,
    },
    backgroundButton: {
      height: 47,
      marginHorizontal: 5,
      paddingHorizontal: 7,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    text: {
      fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
      fontSize: 13,
      fontWeight: '700',
    },
  });

  const setValue = (value) => {
    dispatch({ name: value });
    onPress(value);
    
  };

  const color = useMemo(()=>{
    let text = {}
    let background = {}
    switch (colorStyle) {
      case 'white/green': 
        text.select ='#FFFFFF'
        text.noSelect = '#577334'
        background.select = '#86B738'
        background.noSelect = 'rgba(255, 255, 255, 0.9)'
        break;
      case 'greenTransparent/white':
        text.select = '#577334';
        text.noSelect = '#577334';
        background.select = '#FFFFFF';
        background.noSelect = 'rgba(255, 255, 255, 0.5)';
        break
      default:
        text.select ='#FFFFFF'
        text.noSelect = '#000000'
        background.select = '#000000'
        background.noSelect = '#FFFFFF'
        break; 
    }
    return {
      text: (value) => (value ? text.select : text.noSelect),
      background: (value) => (value ? background.select : background.noSelect),
    };
  }, [colorStyle])


  const renderItem = ({ item, index }) => {
    return (
      <SelectButton
        isSelected={state[item]}
        style={[styles.backgroundButton, { marginLeft: index == 0 ? Math.abs(style?.marginHorizontal ?? 0) : 5 }]}
        setSelected={() => setValue(item)}
        selectColor={color.background(true)}
        noSelectColor={color.background(false)}>
        <PlantImageSmall type={item} style={styles.image} />
        <Text style={[styles.text, { color: color.text(state[item]) }]}>{i18n.t(item)}</Text>
      </SelectButton>
    );
  };

  return (
    <View style={[style, styles.background]}>
      <FlatList
        renderItem={renderItem}
        horizontal={true}
        data={listPlants}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
