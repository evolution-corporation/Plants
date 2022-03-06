import React, { useEffect, useReducer, useRef, useMemo } from 'react'
import { ScrollView, StyleSheet, Image, Dimensions, Text, Platform, View, Switch } from 'react-native'
import { useDispatch } from 'react-redux'
import { BackLeaves, CardTextInput, EditButton, Phone, PhotoButton, TextInputColor } from '~components'
import { geocoding, i18n } from '~services'
import { actions } from '~store'
import { NurseriesAddInfoPart, SelectTypePlant, ColorButton, MapConfirmation } from '~components';

let reRender = 0;

export default function ({ route, navigation }) {
    const reduxDispathch = useDispatch()
    const scroll = useRef()
    const [state, dispatch] = useReducer(
      (_state, { type, payload }) => {
        switch (type) {
          case 'showNameInput':
            return { ..._state, showNameInput: true };
          case 'showContactInfo':
            return { ..._state, showContactInfo: true, isEditName: false };
          case 'openMap':
            return { ..._state, showMap: true };
          case 'closeMap':
            return { ..._state, showMap: false };
          case 'showDescriptionInput':
            return { ..._state, showDescriptionInput: true, isEditContactInfo: false };
          case 'showImage':
            return { ..._state, showImage: true, isEditDescription: false };
          case 'showRegisterButton':
            return { ..._state, showRegisterButton: true };
          
          case 'editPlantType':
            const plantType = { ..._state.plantType };
            if (typeof plantType[payload] == 'undefined') {
              plantType[payload] = true;
            } else {
              plantType[payload] = !plantType[payload];
            }
            return { ..._state, plantType };
          case 'editName':
            return { ..._state, name: payload };
          case 'editPhone':
            return { ..._state, phone: payload };
          case 'setAdress':
            return { ..._state, adress: payload.adress, coordinate: payload.coordinate, showMap: false };
          case 'editSite': {
            return { ..._state, site: payload };
          }
          case 'editDescription': {
            return { ..._state, description: payload };
          }
          case 'setImage': {
            return { ..._state, image: payload };
          }
          case 'setIsDelivery': {
            return { ..._state, isDelivery: payload };
          }

          case 'isEditName':
            return { ..._state, isEditName: payload };
          case 'isEditContactInfo':
            return { ..._state, isEditContactInfo: payload };
          case 'isEditDescription':
            return { ..._state, isEditDescription: payload };
          default:
            return { ..._state };
        }
      },
      {
        plantType: {},
        isEditName: true,
        isEditContactInfo: true,
        isEditDescription: true,
        showMap: false,
        showContactInfo: false,
        showNameInput: false,
        showDescriptionInput: false,
        showImage: false,
        image: null,
        isDelivery: false,
      },
    );

    const plantTypeText = useMemo(()=>(Object.keys(state.plantType).map(type=>(state.plantType[type] ? i18n.t(type) : null)).filter(item => item != null ).join(', ')), [state])

    const styles = StyleSheet.create({
      background: {
        paddingHorizontal: 30,
        flex: 1,
        justifyContent: 'space-between'
      },
      selectTypePlant: {
        width: Dimensions.get('screen').width,
        paddingHorizontal: -30,
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
        height: 250,
      },
      lastStep: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: state.image ? 'space-between' : 'center',
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
      regButton: {

      },
      buttomText: {
        marginTop: 5,
        fontFamily: Platform.OS == 'android' ? 'Roboto-Medium': 'System',
        fontSize: 11,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center'
      }
    });

    useEffect(()=> {
        scroll.current.scrollToEnd({ animated: true })
    },[state])
    

    return (
      <BackLeaves>
        <MapConfirmation
          visable={state.showMap}
          onClose={() => dispatch({ type: 'closeMap' })}
          onPress={async (coordinate) => {
            const adress = await geocoding.getAdress(coordinate, i18n.currentLocale());
            dispatch({ type: 'setAdress', payload: { coordinate, adress } });
          }}
        />
        <ScrollView
          ref={scroll}
          contentContainerStyle={[styles.background, { paddingBottom: 50 }]}
          pagingEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View>
            <NurseriesAddInfoPart
              onPress={() => dispatch({ type: 'showNameInput' })}
              title={
                !state.showNameInput
                  ? i18n.t('8083cb88-add7-465d-8ac8-6a9dfc71afcc')
                  : i18n.t('17d5655e-05a5-46d5-8217-64a86cf23550')
              }
              key={'Type'}>
              <SelectTypePlant
                onPress={(payload) => dispatch({ type: 'editPlantType', payload })}
                style={styles.selectTypePlant}
                multiSelect={true}
                colorStyle={'greenTransparent/white'}
              />
              <Text style={styles.selectTypePlantName}>{plantTypeText}</Text>
            </NurseriesAddInfoPart>
            <NurseriesAddInfoPart
              onPress={state.name ? () => dispatch({ type: 'showContactInfo' }) : null}
              title={i18n.t('Title')}
              hiddenTitle={true}
              visable={state.showNameInput}
              key={'Title'}>
              {state.isEditName ? (
                <TextInputColor
                  onChangeValue={(payload) => dispatch({ type: 'editName', payload })}
                  placeholder={i18n.t('deafe553-0fa4-4adb-a6a4-368ae986e256')}
                  initValue={state.name ?? ''}
                  onBlur={state.showContactInfo ? () => dispatch({ type: 'isEditName', payload: false }) : null}
                  autoFocus={true}
                />
              ) : (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.title}>{state.name}</Text>
                  <EditButton onPress={() => dispatch({ type: 'isEditName', payload: true })} />
                </View>
              )}
            </NurseriesAddInfoPart>
            <NurseriesAddInfoPart
              onPress={
                state.adress && state.phone?.length > 5 ? () => dispatch({ type: 'showDescriptionInput' }) : null
              }
              title={i18n.t('ec6db89a-e9d7-4927-8024-93dd3bc32a56')}
              hiddenTitle={true}
              visable={state.showContactInfo}
              key={'ContactInfo'}>
              {state.isEditContactInfo ? (
                <View>
                  <Phone
                    returnPhone={(payload) => dispatch({ type: 'editPhone', payload })}
                    initPhone={state.phone}
                    onBlur={state.showMessage ? () => dispatch({ type: 'isEditContactInfo', payload: false }) : null}
                  />
                  <TextInputColor
                    placeholder={i18n.t('Adress')}
                    initValue={
                      state.adress ? `${state.adress.city}, ${state.adress.street}, ${state.adress.number}` : ''
                    }
                    onPress={() => dispatch({ type: 'openMap' })}
                    style={{ marginVertical: 10 }}
                  />
                  <TextInputColor
                    onChangeValue={(payload) => dispatch({ type: 'editSite', payload })}
                    placeholder={i18n.t('Site')}
                    initValue={state.site ?? ''}
                  />
                  <Text style={styles.textDescription}>{i18n.t('dffd8517-4771-4d34-aee4-16f9701c8169')}</Text>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={styles.contactInfo}>
                      {i18n.t('Phone')} {state.phone}
                    </Text>
                    <Text style={styles.contactInfo}>
                      {state.adress ? `${state.adress.city}, ${state.adress.street}, ${state.adress.number}` : ''}
                    </Text>
                    <Text style={styles.contactInfo}>{state.site}</Text>
                  </View>
                  <EditButton onPress={() => dispatch({ type: 'isEditContactInfo', payload: true })} />
                </View>
              )}
            </NurseriesAddInfoPart>
            <NurseriesAddInfoPart
              visable={state.showDescriptionInput}
              title={i18n.t('Description')}
              rigthTitle={
                state.showImage ? (
                  <EditButton onPress={() => dispatch({ type: 'isEditDescription', payload: true })} />
                ) : null
              }
              onPress={state.description ? () => dispatch({ type: 'showImage' }) : null}>
              {state.isEditDescription ? (
                <CardTextInput
                  onChange={(payload) => dispatch({ type: 'editDescription', payload })}
                  placeholder={i18n.t('4bf1973f-b16f-4830-96c2-d76f08b53792')}
                  style={styles.description}
                  initValue={state.description}
                />
              ) : (
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                  <Text style={styles.contactInfo}>{state.description}</Text>
                </View>
              )}
            </NurseriesAddInfoPart>
            <NurseriesAddInfoPart
              visable={state.showImage}
              title={!state.image ? i18n.t('e027bc61-baac-4b1f-a009-cd7c83b1f3a6') : null}
              onPress={state.image ? () => dispatch({ type: 'showRegisterButton' }) : null}
              childrenStyle={styles.lastStep}>
              <PhotoButton
                style
                setPhoto={(payload) => dispatch({ type: 'setImage', payload })}
                initImage={state.image}
              />
              {state.image ? (
                <View style={styles.delivery}>
                  <Text style={styles.deliveryTitle}>{i18n.t('Delivery')}</Text>
                  <Switch
                    onValueChange={(payload) => dispatch({ type: 'setIsDelivery', payload })}
                    value={state.isDelivery}
                    trackColor={{ false: '#777779', true: '#FFFFFF' }}
                    thumbColor={state.isDelivery ? '#FFD200' : '#FFFFFF'}
                  />
                </View>
              ) : null}
            </NurseriesAddInfoPart>
          </View>
          {state.showRegisterButton ? (
            <View>
              <ColorButton text={i18n.t('register')} style={styles.regButton} event />
              <Text style={styles.buttomText}>{i18n.t('0c055e5e-cb51-41c4-bc4a-adf58c23aab6')}</Text>
            </View>
          ) : null}
        </ScrollView>
      </BackLeaves>
    );
}