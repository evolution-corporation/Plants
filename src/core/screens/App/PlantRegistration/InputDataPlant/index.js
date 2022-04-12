import React, { useReducer, useEffect } from 'react';
import { StyleSheet, Text, Platform, Dimensions, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ParkAndBigTree, TextInputColor, ColorButton } from '~components';
import { i18n } from '~services';
import { actions } from '~store';
import { SelectTypePlant } from '~components';

export default function ({ route, navigation }) {
  const [state, dispatch] = useReducer(
    (_state, { type, payload }) => {
      switch (type) {
        case 'name':
          return { ..._state, name: payload };
        case 'type':
          return { ..._state, type: payload };
      }
    },
    { type: null, name: '' },
  );
  const dispatchRedux = useDispatch();
  const isShowInstruction = useSelector(state => state.navigator.isShowInstruction)
   const images = {
     Tree: require('../assets/Tree.png')
   }

  const styles = StyleSheet.create({
    background: {
      justifyContent: 'space-between',
      paddingHorizontal: 30,
      paddingBottom: 57,
    },
    textTitle: {
      marginVertical: 20,
      fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
      fontWeight: '700',
      fontSize: 18,
      color: '#FFFFFF',
    },
    SelectTypePlant: {
      marginHorizontal: -30,
    },
    textInput: {
      width: '100%',
      marginBottom: 62,
      backgroundColor: '#EFEFEF',
      borderWidth: 0,
      color: '#4C4C4C'
    },
    image: {
      maxHeight: Dimensions.get('screen').height - 525,
      alignSelf: 'center',
    },
    button: {
      marginVertical: 50,
      width: '100%',
      
    },
  });

  useEffect(() => {
      dispatchRedux(actions.createPlant(route.params.coordinate));
      if (route.params.reserveMarker) {
        dispatchRedux(actions.addPlantData({ reserveMarker: route.params.reserveMarker }))
      }
    return () => {};
  }, [dispatch]);

  return (
    <ParkAndBigTree style={styles.background} image={state.type ? images[state.type == 'Flower' ? 'Flower' : 'Tree'] : null}>
      <Text style={[styles.textTitle, { marginTop: 0 }]}>
        {i18n.t('8934edc2-64d4-4a74-bb3d-e41412374a31')}
      </Text>
      <SelectTypePlant
        style={styles.SelectTypePlant}
        onPress={(value) => dispatch({ type: 'type', payload: value })}
      />
      <Text style={styles.textTitle}>
        {i18n.t('b041a34b-39a9-402a-b5ba-160b0ee2e658')}
      </Text>
      <TextInputColor
        style={styles.textInput}
        initValue={''}
        onChangeValue={(value) => dispatch({ type: 'name', payload: value })}
        placeholder={null}
      />
      <ColorButton
        text={i18n.t('continue')}
        backgroundColor={'#EFEFEF'}
        style={styles.button}
        color={'#4C4C4C'}
        event={state.name && state.type ? () => {
          dispatchRedux(actions.addPlantData(state));
          navigation.navigate(isShowInstruction ? 'Instruction' : 'CreatePhoto');
        } : null}
      />
    </ParkAndBigTree>
  );
}
