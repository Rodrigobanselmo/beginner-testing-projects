import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HortaScreen from '../../Screen/Tab/HortaScreen';
import Icon from 'react-native-vector-icons/Ionicons';
  
  

const ProfileStack = createStackNavigator();

 export default function HortaStackScreen({navigation}) {
  
    return (
      <ProfileStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor:'#161616',
        },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold'
      }
  
      }>
        <ProfileStack.Screen name="Profile" component={HortaScreen} options={{
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#161616" onPress={() => navigation.openDrawer()}> </Icon.Button>
          ),
          headerTitleAlign: 'left',
          headerShown: false
        }}/>
      </ProfileStack.Navigator>
    );
  }


  