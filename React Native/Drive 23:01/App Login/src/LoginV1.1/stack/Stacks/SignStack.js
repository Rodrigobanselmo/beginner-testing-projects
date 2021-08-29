import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignIn_Inicial from '../../screens/SignIn/SignIn_Inicial';
import SignIn_Conect from '../../screens/SignIn/SignIn_Conect';
import SignIn_Register from '../../screens/SignIn/SignIn_Register';

const SignInStack = createStackNavigator();

const SignStack = ({navigation}) => (
    <SignInStack.Navigator headerMode='none' initialRouteName={"SignIn_Inicial"}>
        <SignInStack.Screen name="SignIn_Inicial" component={SignIn_Inicial}/>
        <SignInStack.Screen name="SignIn_Conect" component={SignIn_Conect}/>
        <SignInStack.Screen name="SignIn_Register" component={SignIn_Register}/>
    </SignInStack.Navigator>
);

export default SignStack;