import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from '../../Screen/Tab/DetailsScreen';
import AgricultorScreen from '../../Screen/Tab/AgricultorScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text,View } from 'react-native';
import Note from '../../assets/note.svg' ;


const DetailsStack = createStackNavigator();


 export default function DetailsStackScreen({navigation}) {
  
    return (
      <DetailsStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor:'#04D9B2',
        },
        headerTintColor: '#262626',
        headerTitleStyle: 'bold',
      }
  
      }>
        <DetailsStack.Screen name="Details" component={DetailsScreen}options={{
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#04D9B2" color='#262626' onPress={() => navigation.openDrawer()}> 
            </Icon.Button>
          ),
          headerRight: () => (
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Icon.Button name="md-search-sharp" size={25} backgroundColor="#04D9B2" color='#262626' onPress={() => navigation.openDrawer()}/> 
            </View>
          ),
          title: 'Membros',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor:'#04D9B2',
          },
        }}/>
        <DetailsStack.Screen name="Agricultor" component={AgricultorScreen}options={{
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#04D9B2" color='#262626' onPress={() => navigation.openDrawer()}> 
            </Icon.Button>
          ),
          headerRight: () => (
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <View style={{backgroundColor:'#cc0000', borderRadius:15, height:18, width:18, alignItems:'center', justifyContent:'center', marginRight:-32, marginBottom:18, zIndex:1}}>
                  <Text style={{color:'#262626', fontSize:12}}>1</Text>
              </View>
            <Note fill={'#262626'} width="27" height="27" style={{marginRight:35}} />
            <View style={{backgroundColor:'#cc0000', borderRadius:15, height:18, width:18, alignItems:'center', justifyContent:'center', marginRight:-40, marginBottom:18, zIndex:1}}>
                  <Text style={{color:'#262626', fontSize:12}}>1</Text>
              </View>
            <MaterialCommunityIcons.Button name="shopping-outline" size={25} backgroundColor="#04D9B2" color='#262626' onPress={() => navigation.openDrawer()}/> 
            </View>
          ),
          title: 'Agricultor',
          headerTitleAlign: 'left',
        }}/>
      </DetailsStack.Navigator>
    );
  }

  