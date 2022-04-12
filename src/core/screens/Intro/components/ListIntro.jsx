import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Marker, Oxygen, WorldChat } from './assets';
import { ColorButton } from '~components';
import { i18n } from '~services';

/** Component
 * @prop {string} this.props.page Текущая странцица
 * @param {function} this.props.event Событие которое произойдет после того как пользователь нажмет кнопку в конце
 */

export default class extends Component {
  constructor(props) {
    super(props);
    this.page0 = new Animated.Value(1);
    this.page1 = new Animated.Value(0);
    // this.page2 = new Animated.Value(0);
    // this.page3 = new Animated.Value(0);
  }

  render() {
    return (
      <View style={[this.props.style]}>
        <Animated.View style={[this.styles.page, { opacity: this.page0, justifyContent: 'flex-end', paddingBottom: 100  }]}>
          <Text style={[this.styles.text, { fontSize: 28, width: 300 }]}>{i18n.t('f5c18015-15f7-4d64-a05f-0fae8b64d1d8')}</Text>
        </Animated.View>

        <Animated.View style={[this.styles.page, { opacity: this.page1 }]}>
          <Text style={this.styles.text}>{i18n.t('03d9d661-8143-4617-a330-ad14e9865493')}</Text>
          <Marker />
          <ColorButton
            event={this.props.event}
            style={{ backgroundColor: '#EFEFEF', width: '100%' }}
            text={i18n.t('bf874cc6-3cad-41f8-ab99-6bdcc4fa43dc')}
          />
        </Animated.View>

        {/* <Animated.View style={[this.styles.page, { opacity: this.page2 }]}>
          <Text style={this.styles.text}>
            {i18n.t('4fd87f7c-3a4f-4d7f-95ba-0affaea7246a')}
          </Text>
          <Oxygen />
        </Animated.View>
        <Animated.View style={[this.styles.page, { opacity: this.page3 }]}>
          <Text style={this.styles.text}>
            {i18n.t('e2bce56d-1c41-4903-a211-c6fe68901ba0')}
          </Text>
          <WorldChat />
          <ColorButton
            event={this.props.event}
            style={{ backgroundColor: '#EFEFEF', width: '100%' }}
            text={{ ru: 'Начать пользоваться' }[i18n.locale]}
          />
        </Animated.View> */}
      </View>
    );
  }

  styles = StyleSheet.create({
    text: {
      color: '#FFFFFF',
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: '700',
      fontFamily: 'Gilroy',
      textAlign: 'center',
      marginBottom: 30,
    },
    page: {
      position: 'absolute',
      alignItems: 'center',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
    },
  });

  componentDidUpdate(prevProps) {
    switch (this.props.page) {
      case 1:
        Animated.timing(this.page0, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false,
        }).start();
        Animated.timing(this.page1, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }).start();
        break;
      // case 2:
      //   Animated.timing(this.page1, {
      //     toValue: 0,
      //     duration: 600,
      //     useNativeDriver: false,
      //   }).start();
      //   Animated.timing(this.page2, {
      //     toValue: 1,
      //     duration: 600,
      //     useNativeDriver: false,
      //   }).start();
      //   break;
      // case 3:
      //   Animated.timing(this.page2, {
      //     toValue: 0,
      //     duration: 600,
      //     useNativeDriver: false,
      //   }).start();
      //   Animated.timing(this.page3, {
      //     toValue: 1,
      //     duration: 600,
      //     useNativeDriver: false,
      //   }).start();
      //   break;
    }
  }
}
