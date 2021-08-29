import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../Screen/HomeScreen';
import DetailsScreen from '../../Screen/DetailsScreen';
  
  

const Stack = createStackNavigator();

export default function MyStack() {
  
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor:'#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold'
      }
  
      }>
        <Stack.Screen name="Home" component={HomeScreen} options={{}}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{}}/>  
      </Stack.Navigator>
    );
  }