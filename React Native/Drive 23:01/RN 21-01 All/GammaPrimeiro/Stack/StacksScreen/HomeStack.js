import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../Screen/Tab/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text,View } from 'react-native';
import Note from '../../assets/note.svg' ;

  

const HomeStack = createStackNavigator();

 export default function HomeStackScreen({navigation}) {
  
    return (
      <HomeStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor:'#04D9B2',
        },
        headerTintColor: '#262626',
        headerTitleStyle: 'bold',
        headerShown:false
      }
  
      }>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#04D9B2" color='#262626' onPress={() => navigation.openDrawer()}> 
            </Icon.Button>
          ),
          headerRight: () => (
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <EvilIcons.Button name="search"  size={29} backgroundColor="#04D9B2" color='#262626' onPress={() => navigation.openDrawer()}/> 
{/*             <MaterialCommunityIcons.Button name="shopping-outline" size={25} backgroundColor="#055902" color='#fff' onPress={() => navigation.openDrawer()}/>  */}
            </View>
          ),
          title: 'Sou Verde',
          headerTitleAlign: 'left',
        }}/>
      </HomeStack.Navigator>
    );
  }


