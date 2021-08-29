import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../../Screen/Sign/SplashScreen';
import SignInScreen from '../../Screen/Sign/SignInScreen';
import SignUpScreen from '../../Screen/Sign/SignUpScreen';
import Permission from '../../Screen/Sign/Permission';

const RootStack = createStackNavigator();

const SignStack = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="Permission" component={Permission}/>
    </RootStack.Navigator>
);

export default SignStack;