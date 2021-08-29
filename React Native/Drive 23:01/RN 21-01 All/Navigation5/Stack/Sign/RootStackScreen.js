import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../../Screen/Sign/SplashScreen';
import SignInScreen from '../../Screen/Sign/SignInScreen';
import SignUpScreen from '../../Screen/Sign/SignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;