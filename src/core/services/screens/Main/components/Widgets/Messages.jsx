import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Messages from '~assets/Messages.svg';
import { i18n } from '~services';
import { Widget, TextHref  } from '~components';

export default function MessagesWidget({ style, index=0, onPress, isCompact = false }) {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    background: {
      backgroundColor: '#4598E9',
    },
    title: {
      color: '#FFFFFF',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
      fontSize: 18,
      fontWeight: '700',
    },
    descriprion: {
      color: '#FFFFFF',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 11,
      fontWeight: '500',
    },
    goOver: {
      alignSelf: 'flex-start',
      marginTop: 5,
      color: '#E67B16',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'System',
      fontSize: 11,
      fontWeight: '700',
    },
  });
  useEffect(() => {
    return () => {};
  }, [isCompact]);

  return (
    <Widget
      onPress={() => {
        onPress();
        // navigation.navigate('ChatList');
      }}
      style={[style, styles.background]}
      isCompact={isCompact}
      key={'Messages'}
      index={index}>
      <Messages />
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <Text style={styles.title}>{i18n.t('Messages')}</Text>
        <Text style={styles.descriprion}>{i18n.t('0ca5097f-6f96-461e-9103-3c8dfaabc155')}</Text>
        <TextHref style={styles.goOver} text={i18n.t('GoOver')} event={() => {onPress(); navigation.navigate('ChatList');}}/>
      </View>
    </Widget>
  );
}