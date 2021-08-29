import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import VerificationScreen from '../../screens/Verification/VerificationScreen';


const VerificationStack = createStackNavigator();

const VerificationStackNav = ({navigation}) => (
    <VerificationStack.Navigator headerMode='none' initialRouteName={"VerificationScreen"}>
        <VerificationStack.Screen name="VerificationScreen" component={VerificationScreen} />
    </VerificationStack.Navigator>
);

export default VerificationStackNav;