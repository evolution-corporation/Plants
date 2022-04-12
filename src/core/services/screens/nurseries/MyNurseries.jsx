import React, { useEffect, useReducer, useRef, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, Dimensions, Text, Platform, View, Switch, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { BackLeaves, CardTextInput, Phone, PhotoButton, TextInputColor } from '~components'
import { i18n } from '~services'
import { actions } from '~store'
import { MessageInfo } from '~containers/Nurseries'
import { NurseriesAddInfoPart, SelectTypePlant, ColorButton, MapConfirmation } from '~components';
import TrashIcon from '~assets/Trash.svg'

export default function ({ route, navigation }) {
    const reduxDispathch = useDispatch()
    const scroll = useRef()
    const isCompact = useSelector(state => state.navigator.compact)
    const [state, dispatch] = useReducer(
      (_state, { type, payload }) => {
        switch (type) {
          case 'showPart': {
            _state[`show${payload}`] = true
            return { ..._state, addPartData: payload, isEdit: payload };
          }
          case 'openMap':
            return { ..._state, showMap: true };
          case 'closeMap':
            return { ..._state, showMap: false };
          case 'showRegisterButton':
            return { ..._state, showRegisterButton: true, onClickandLoadImage: true };

          case 'editPlantType':
            const plantType = { ..._state.plantType };
            if (typeof plantType[payload] == 'undefined') {
              plantType[payload] = true;
            } else {
              plantType[payload] = !plantType[payload];
            }
            return { ..._state, plantType, edit: true };
          case 'editData':
            return { ..._state, ...payload, edit: true };
          case 'setAdress':
            return { ..._state, adress: payload.adress, coordinate: payload.coordinate, showMap: false, edit: true };

          case 'isEdit':
            return { ..._state, isEdit: payload };
          case 'setStatus': 
            return { ..._state, status: payload};
          case 'allOpen': {
            return { ..._state, ...payload, showTitle: true, showDescription: true, showImage: true }
          }

          case 'saveData': {
            return { ..._state, edit: false};
          }
          default:
            return { ..._state };
        }
      },
      {
        isEdit: '',
        showMap: false,
        showContactInfo: false,
        showTitle: false,
        showDescription: false,
        showImage: false,
        onClickandLoadImage: false,

        plantType: {},
        image: null,
        adress: null,
        isDelivery: false,
        title: '',
        description: '',
        phone: '',

        addPartData: 'PlantType',
        ...route.params
      },
      (state)=>{
        const isTitle = route.params.title ? true : false
        const isContactInfo = route.params.coordinate && route.params.phone && isTitle ? true : false
        const isDescription = route.params.description && isContactInfo ? true : false;
        const isImage = route.params.image && isDescription ? true : false
        const isRegisterButton = isImage
        const isNew = route.params.id ? false : true
        return {
          ...state,
          showTitle: isTitle,
          showContactInfo: isContactInfo,
          showDescription: isDescription,
          showImage: isImage,
          showRegisterButton: isRegisterButton,
          isNew,
          edit: isNew,
          onClickandLoadImage: !isNew,
        };
      }
    );

    const plantTypeText = useMemo(()=>(Object.keys(state.plantType).map(type=>(state.plantType[type] ? i18n.t(type) : null)).filter(item => item != null ).join(', ')), [state])
    
    const styles = StyleSheet.create({
      background: {
        // paddingHorizontal: 30,
        flex: 1,
        justifyContent: 'space-between',
      },
      selectTypePlant: {
        width: Dimensions.get('screen').width,
        marginHorizontal: -30,
      },
      selectTypePlantName: {
        color: '#FFFFFF',
        fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
        fontWeight: '600',
        fontSize: 12,
        marginTop: 14,
      },
      title: {
        color: '#FFFFFF',
        fontFamily: Platform.OS == 'android' ? 'Roboto-Bold' : 'System',
        fontSize: 24,
        fontWeight: '700',
      },
      inputAdress: {
        backgroundColor: 'rgba(240, 242, 238, 0.19)',
        borderWidth: 1,
        borderColor: '#CBE1A8',
        height: 45,
        color: '#FFFFFF',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      textDescription: {
        alignSelf: 'flex-end',
        color: '#E8F1DA',
        fontSize: 11,
        fontWeight: '500',
        fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
      },
      contactInfo: {
        fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
        fontSize: 13,
        fontWeight: '500',
        color: '#FFFFFF',
      },
      description: {
        width: '100%',
        height: isCompact ? 200 : 250,
      },
      lastStep: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: state.onClickandLoadImage ? 'space-between' : 'center',
      },
      delivery: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
      },
      deliveryTitle: {
        fontFamily: Platform.OS == 'android' ? 'Roboto-Bold' : 'System',
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 25,
      },
      regButton: {},
      buttomText: {
        marginTop: 5,
        fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
        fontSize: 11,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
      },
      deleteButton: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 9,
      },
      deleteButtonText: {
        color: '#E67B16',
        fontFamily: Platform.OS == 'android' ? 'Roboto-Medium' : 'System',
        fontSize: 13,
        fontWeight: '600',
      },
    });

    useEffect(()=> {
        scroll.current?.scrollToEnd({ animated: true })
    },[state])
  

    const create = async () => {
      try {
        dispatch({ type: 'setStatus', payload: 'loading' })
        await reduxDispathch(
          actions.creatNurserie({
            title: state.title,
            typePlant: state.plantType,
            image: state.image,
            coordinate: state.coordinate,
            adress: state.adress,
            phone: state.phone,
            description: state.description,
            site: state.site,
            isDelivery: state.isDelivery,
          }),
        ).unwrap();
        dispatch({ type: 'setStatus', payload: 'OK' });
      } catch (error) {
        
      }
    }

    const updateData = async () => {
      try {
        reduxDispathch(
          actions.editNurserieData({
            title: state.title,
            typePlant: state.plantType,
            image: state.image,
            coordinate: state.coordinate,
            adress: state.adress,
            phone: state.phone,
            description: state.description,
            site: state.site,
            isDelivery: state.isDelivery,
          }),
        ).unwrap();
          if (Platform.OS == 'android') {
            ToastAndroid.show(i18n.t('e9f51aa6-371f-47ef-9b12-91492627abaf'), ToastAndroid.BOTTOM)
          }
          dispatch({ type: 'saveData' })
      } catch (error) {
        
      }
    }

    const deleteN = async () => {
      Alert.alert(
        i18n.t('a983b0ea-5735-4459-9c52-39f80b256f61'), 
        i18n.t('6d10bc1d-dfaa-4bc6-a072-07f38b188e47'), 
        [
          { text: i18n.t('Yes'), onPress: async () => { await reduxDispathch(actions.deleteNurserie()).unwrap(); navigation.goBack()} },
          { text: i18n.t('No') }
      ], 
        { cancelable: true }
      );
    };

    if (state.status) return <MessageInfo status={state.status}/>

    return (
      <BackLeaves style={{ flex: 1 }}>
        <MapConfirmation
          visable={state.showMap}
          onClose={() => dispatch({ type: 'closeMap' })}
          returnAdress={true}
          onPress={async (coordinate, adress) => {
            dispatch({ type: 'setAdress', payload: { coordinate, adress: { country: adress.country, city: adress.locality, street: adress.thoroughfare, name: adress.name } } });
          }}
        />
        <ScrollView
          ref={scroll}
          contentContainerStyle={[styles.background, { paddingBottom: 50 }]}
          pagingEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View>
            <NurseriesAddInfoPart
              onPress={() => dispatch({ type: 'showPart', payload: 'Title' })}
              title={
                !state.showTitle
                  ? i18n.t('8083cb88-add7-465d-8ac8-6a9dfc71afcc')
                  : i18n.t('17d5655e-05a5-46d5-8217-64a86cf23550')
              }
              key={'Type'}
              isEdit={false}
              hideButton={state.showTitle}>
              <View>
                <SelectTypePlant
                  onPress={(payload) => dispatch({ type: 'editPlantType', payload })}
                  style={styles.selectTypePlant}
                  multiSelect={true}
                  colorStyle={'greenTransparent/white'}
                  initValue={state.plantType}
                />
                <Text style={styles.selectTypePlantName}>{plantTypeText}</Text>
              </View>
            </NurseriesAddInfoPart>

            <NurseriesAddInfoPart
              onPress={() => dispatch({ type: 'showPart', payload: 'ContactInfo' })}
              title={i18n.t('Title')}
              hiddenTitle={true}
              visable={state.showTitle}
              key={'Title'}
              isEdit={true}
              editMode={state.addPartData == 'Title' || state.isEdit == 'Title'}
              onPressEdit={() => dispatch({ type: 'isEdit', payload: 'Title' })}
              permission={state.title.length > 0 && state.title.length <= 20}
              hideButton={state.showContactInfo}>
              <TextInputColor
                onChangeValue={(title) => dispatch({ type: 'editData', payload: { title } })}
                placeholder={i18n.t('deafe553-0fa4-4adb-a6a4-368ae986e256')}
                initValue={state.title ?? ''}
                onBlur={() => dispatch({ type: 'isEdit', payload: null })}
                autoFocus={true}
                maxLength={20}
              />
              <Text style={styles.title}>{state.title}</Text>
            </NurseriesAddInfoPart>

            <NurseriesAddInfoPart
              permission={state.phone.length >= 10 && state.coordinate != undefined}
              onPress={() => dispatch({ type: 'showPart', payload: 'Description' })}
              title={i18n.t('ec6db89a-e9d7-4927-8024-93dd3bc32a56')}
              hiddenTitle={true}
              visable={state.showContactInfo}
              key={'ContactInfo'}
              isEdit={true}
              editMode={state.addPartData == 'ContactInfo' || state.isEdit == 'ContactInfo'}
              onPressEdit={() => dispatch({ type: 'isEdit', payload: 'ContactInfo' })}
              hideButton={state.showDescription}>
              <View>
                <Phone
                  returnPhone={(phone) => dispatch({ type: 'editData', payload: { phone } })}
                  initPhone={state.phone}
                  onBlur={() => dispatch({ type: 'isEdit', payload: null })}
                />
                <TextInputColor
                  placeholder={i18n.t('Adress')}
                  initValue={state.adress ? `${state.adress.city}, ${state.adress.street}, ${state.adress.name}` : ''}
                  onPress={() => dispatch({ type: 'openMap' })}
                  style={{ marginVertical: 10 }}
                />
                <TextInputColor
                  onChangeValue={(site) => dispatch({ type: 'editData', payload: { site } })}
                  placeholder={i18n.t('Site')}
                  initValue={state.site}
                  onBlur={() => dispatch({ type: 'isEdit', payload: null })}
                />
                <Text style={styles.textDescription}>{i18n.t('dffd8517-4771-4d34-aee4-16f9701c8169')}</Text>
              </View>
              <View>
                <Text style={styles.contactInfo}>
                  {i18n.t('Phone')} {state.phone}
                </Text>
                <Text style={styles.contactInfo}>
                  {state.adress ? `${state.adress.city}, ${state.adress.street}, ${state.adress.name}` : ''}
                </Text>
                <Text style={styles.contactInfo}>{state.site}</Text>
              </View>
            </NurseriesAddInfoPart>

            <NurseriesAddInfoPart
              visable={state.showDescription}
              permission={state.description.length > 0 && state.description.length <= 240}
              title={i18n.t('Description')}
              onPress={() => dispatch({ type: 'showPart', payload: 'Image' })}
              isEdit={true}
              editMode={state.addPartData == 'Description' || state.isEdit == 'Description'}
              onPressEdit={() => dispatch({ type: 'isEdit', payload: 'Description' })}
              hideButton={state.showImage}>
              <CardTextInput
                onChange={(description) => dispatch({ type: 'editData', payload: { description } })}
                placeholder={i18n.t('4bf1973f-b16f-4830-96c2-d76f08b53792')}
                style={styles.description}
                initValue={state.description}
              />
              <Text style={styles.contactInfo}>{state.description}</Text>
            </NurseriesAddInfoPart>

            <NurseriesAddInfoPart
              permission={state.image ? true : false}
              visable={state.showImage}
              title={!state.image ? i18n.t('e027bc61-baac-4b1f-a009-cd7c83b1f3a6') : null}
              onPress={() => {dispatch({ type: 'showRegisterButton' });}}
              isEdit={false}
              hideButton={state.showRegisterButton}>
              <View style={styles.lastStep}>
                <PhotoButton
                  setPhoto={(image) => dispatch({ type: 'editData', payload: { image } })}
                  initImage={state.image ? `data:image/png;base64, ${state.image}` : null}
                  noReturnInit={state.image ? true : false}
                />
                {state.onClickandLoadImage? (
                  <View style={styles.delivery}>
                    <Text style={styles.deliveryTitle}>{i18n.t('Delivery')}</Text>
                    <Switch
                      onValueChange={(isDelivery) => dispatch({ type: 'editData', payload: { isDelivery } })}
                      value={state.isDelivery}
                      trackColor={{ false: '#777779', true: '#FFFFFF' }}
                      thumbColor={state.isDelivery ? '#FFD200' : '#FFFFFF'}
                    />
                  </View>
                ) : null}
              </View>
            </NurseriesAddInfoPart>
          </View>
          <View style={{ paddingHorizontal: 30 }}>
          {state.isNew && state.showRegisterButton ? (
            <View>
              <ColorButton text={i18n.t('register')} style={styles.regButton} event={create} />
              <Text style={styles.buttomText}>{i18n.t('0c055e5e-cb51-41c4-bc4a-adf58c23aab6')}</Text>
            </View>
          ) : null}
          {!state.isNew && state.edit ? (
            <ColorButton
              text={i18n.t('f525720a-1fee-433d-84c3-2f83fc3c8bff')}
              style={styles.regButton}
              event={updateData}
            />
          ) : null}
          {!state.isNew && !state.edit ? (
            <TouchableOpacity style={styles.deleteButton} onPress={deleteN}>
              <TrashIcon />
              <Text style={styles.deleteButtonText}>{i18n.t('66ef0f9c-47c6-4df4-8c8d-622b313e90a9')}</Text>
            </TouchableOpacity>
          ) : null}
          </View>
        </ScrollView>
      </BackLeaves>
    );
}