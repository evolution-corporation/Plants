import React, { useState, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { i18n, database } from '~services';

import { InputValue } from './dump';

export default function ({ initialLogin, onChange, style, setPermission }) {
  const [status, setStatus] = useState(true);
  const isFocused = useIsFocused();

  let timer = null;

  const isOk = (value) => {
    setPermission(true);
    onChange(value);
  };
  const isNoOk = () => {
    setStatus(false);
    setPermission(false);
  };

  const check = async (_login) => {
    _login = _login.toLowerCase()
    if (isFocused) {
      setPermission(false);
      setStatus(true);
      if (_login == initialLogin) return isOk(_login);
      if (_login.replace(' ', '') == '' || _login.length <= 2) return isNoOk();
      if (_login.length >= 30) return isNoOk();
      if (!/^[a-zA-Z0-9._]+$/.test(_login)) return isNoOk();
      if (timer) clearTimeout(timer);
      timer = setTimeout(async () => {
        const result = await database.checkLogin(_login);
        if (!result.empty) return isNoOk();
        return isOk(_login);
      }, 400);
    }
  };

  return (
    <InputValue
      onChange={check}
      title={i18n.t('login')}
      initValue={initialLogin}
      style={[style, { borderWidth: status ? 0 : 1, borderColor: 'red' }]}
    />
  );
}
