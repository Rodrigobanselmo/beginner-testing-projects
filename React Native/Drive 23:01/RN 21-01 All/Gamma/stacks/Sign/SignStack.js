import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../../pages/Sign/SplashScreen';
import SignInScreen from '../../pages/Sign/SignInScreen';

const RootStack = createStackNavigator();

const SignStack = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
    </RootStack.Navigator>
);

export default SignStack;