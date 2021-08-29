import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from '../../Screen/Tab/DetailsScreen';
import AgricultorScreen from '../../Screen/Tab/AgricultorScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text,View } from 'react-native';
import Note from '../../assets/note.svg' ;

const DetailsStack = createStackNavigator();


 export default function DetailsStackScreen({navigation, route}) {
  

    return (
      <DetailsStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor:'#055902',
        },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold',
      }
      }
      data={route.params.data}>
        <DetailsStack.Screen name="Agricultor"  component={AgricultorScreen} options={{
          title: 'Agricultor',
          headerTitleAlign: 'left',
          headerShown: false,
          
        }}
        />
      </DetailsStack.Navigator>
    );
  }

  