import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';

import Preload from '../Screen/Preload';
import MyDrawer from './Stacks/MyDrawer';
import SignStack from './Sign/SignStack';

const MainStack = createStackNavigator();

export default () => (
    <MainStack.Navigator headerMode='none' >
        <MainStack.Screen name="Preload" component={Preload} />
        <MainStack.Screen name="SignStack" component={SignStack} />
        <MainStack.Screen name="MyDrawer" component={MyDrawer} />
    </MainStack.Navigator>
);