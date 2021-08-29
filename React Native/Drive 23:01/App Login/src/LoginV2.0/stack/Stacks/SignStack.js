import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignIn_Inicial from '../../screens/SignIn/SignIn_Inicial';
import SignIn_Conect_1 from '../../screens/SignIn/SignIn_Conect_1';
import SignIn_Conect_2 from '../../screens/SignIn/SignIn_Conect_1';
import SignIn_Register_1 from '../../screens/SignIn/SignIn_Register_1';
import SignIn_Register_2 from '../../screens/SignIn/SignIn_Register_2';

const SignInStack = createStackNavigator();

const SignStack = ({navigation}) => (
    <SignInStack.Navigator headerMode='none' initialRouteName={"SignIn_Inicial"}>
        <SignInStack.Screen name="SignIn_Conect_1" component={SignIn_Conect_1}/>
        <SignInStack.Screen name="SignIn_Inicial" component={SignIn_Inicial}/>
        <SignInStack.Screen name="SignIn_Conect_2" component={SignIn_Conect_2}/>
        <SignInStack.Screen name="SignIn_Register_1" component={SignIn_Register_1}/>
        <SignInStack.Screen name="SignIn_Register_2" component={SignIn_Register_2}/>
    </SignInStack.Navigator>
);

export default SignStack;