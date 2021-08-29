import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { NavigationContainer } from '@react-navigation/native'

/* import {store, persistor } from './store'; */

import MainStack from './Stack/MainStack';


export default () => {
  return(
/*     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> */
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
/*       </PersistGate>
    </Provider> */
  );
}
