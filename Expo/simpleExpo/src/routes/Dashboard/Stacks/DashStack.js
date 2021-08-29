import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Card from '../../../screens/Card';

const DashStack = createStackNavigator();

const Stack = ({navigation}) => (
    <DashStack.Navigator headerMode='none' initialRouteName={"Splash"}>
        <DashStack.Screen name="Card" component={Card} options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}/>
    </DashStack.Navigator>
);

export default Stack;
