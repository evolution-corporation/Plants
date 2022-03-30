import React from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1, maxWidth: Dimensions.get('window').width, fontSize: 20 }}
        source={{
          uri: `${Platform.OS === 'android' ? 'file:///android_asset' : ''}/documents/${
            route.params.document == 'politikaKonfidentsialnosti'
              ? 'politikaKonfidentsialnostiDlya'
              : 'polzovatelskoeSoglashenieDlya'
          }.html`,
        }}
      />
    </View>
  );
}
