import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Splash from '../../../screens/Splash';

const DashStack = createStackNavigator();

const Stack = ({navigation}) => (
    <DashStack.Navigator headerMode='none' initialRouteName={"Splash"}>
        <DashStack.Screen name="Splash" component={Splash} options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}/>
    </DashStack.Navigator>
);

export default Stack;
