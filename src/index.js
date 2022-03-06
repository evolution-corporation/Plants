import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import { Provider } from 'react-redux';
import store from '~store';
import MainAppScreenStack from '~screens';

export default function () {
  const navigationRef = useNavigationContainerRef();

  useReduxDevToolsExtension(navigationRef);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <MainAppScreenStack />
      </NavigationContainer>
    </Provider>
  );
}
