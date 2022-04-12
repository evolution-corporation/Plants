import React, { useState, memo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { i18n } from '~services';

export default function Status({ getStatus, status, style }) {
  const [isEdit, setIsEdit] = useState(false);
  const [_status, set_Status] = useState(status);

  const styles = StyleSheet.create({
    background: {
      backgroundColor: 'red',
    },
    status: {
      color: '#FFB746',
      fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'System',
      fontSize: 13,
      lineHeight: 16,
      fontWeight: '500',
    },
    editor: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#FFB746',
      borderRadius: 10,
      backgroundColor: 'rgba(248, 248, 248, 0.5);',
      height: 52,
      paddingTop: 6,
      paddingHorizontal: 7,
    },
  });
  if (isEdit) {
    return (
      <View style={[style, styles.background]}>
        <TextInput
          placeholder={status}
          style={[styles.status, styles.editor]}
          value={_status}
          onChangeText={set_Status}
          onBlur={() => {
            setIsEdit(false);
            getStatus(_status);
          }}
        />
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsEdit(true);
        }}
      >
        <Text style={styles.status}>
          {_status ?? i18n.t('dce5d009-ca96-4e18-ae0c-00f04524d230')}
        </Text>
      </TouchableOpacity>
    );
  }
}

//export default memo(Status)
