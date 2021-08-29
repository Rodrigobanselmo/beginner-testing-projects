import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../../Screen/Tab/ExploreScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const ExploreStack = createStackNavigator();


 export default function ExploreStackScreen({navigation}) {
  
    return (
      <ExploreStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor:'#055902',
        },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold'
      }
  
      }>
        <ExploreStack.Screen name="Minha Horta" component={ExploreScreen}options={{
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#055902" onPress={() => navigation.openDrawer()}> </Icon.Button>
          ),
          headerRight: () => (
            <EvilIcons.Button name="search" size={29} backgroundColor="#055902" color='#fff' onPress={() => navigation.openDrawer()}/> 
          ),
          headerTitleAlign: 'center',
          headerShown: true,
          headerTitleAlign: 'left',
        }}/>
      </ExploreStack.Navigator>
    );
  }

  