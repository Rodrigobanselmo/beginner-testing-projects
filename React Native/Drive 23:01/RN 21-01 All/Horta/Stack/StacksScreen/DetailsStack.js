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
          backgroundColor:'#055902',
        },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold',
      }
  
      }>
        <DetailsStack.Screen name="Details" component={DetailsScreen}options={{
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#055902" color='#fff' onPress={() => navigation.openDrawer()}> 
            </Icon.Button>
          ),
          headerRight: () => (
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <View style={{backgroundColor:'#cc0000', borderRadius:15, height:18, width:18, alignItems:'center', justifyContent:'center', marginRight:-32, marginBottom:18, zIndex:1}}>
                  <Text style={{color:'#fff', fontSize:12}}>1</Text>
              </View>
            <Note fill={'#fff'} width="27" height="27" style={{marginRight:35}} />
            <View style={{backgroundColor:'#cc0000', borderRadius:15, height:18, width:18, alignItems:'center', justifyContent:'center', marginRight:-40, marginBottom:18, zIndex:1}}>
                  <Text style={{color:'#fff', fontSize:12}}>1</Text>
              </View>
            <MaterialCommunityIcons.Button name="shopping-outline" size={25} backgroundColor="#055902" color='#fff' onPress={() => navigation.openDrawer()}/> 
            </View>
          ),
          title: 'Shop',
          headerTitleAlign: 'left',
          height:200,
          headerStyle: {
            height:100,
            backgroundColor:'#055902',
          },
          headerShown: false
        }}/>
        <DetailsStack.Screen name="AgricultorScreen" component={AgricultorScreen} options={{
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#055902" color='#fff' onPress={() => navigation.openDrawer()}> 
            </Icon.Button>
          ),
          headerRight: () => (
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <View style={{backgroundColor:'#cc0000', borderRadius:15, height:18, width:18, alignItems:'center', justifyContent:'center', marginRight:-32, marginBottom:18, zIndex:1}}>
                  <Text style={{color:'#fff', fontSize:12}}>1</Text>
              </View>
            <Note fill={'#fff'} width="27" height="27" style={{marginRight:35}} />
            <View style={{backgroundColor:'#cc0000', borderRadius:15, height:18, width:18, alignItems:'center', justifyContent:'center', marginRight:-40, marginBottom:18, zIndex:1}}>
                  <Text style={{color:'#fff', fontSize:12}}>1</Text>
              </View>
            <MaterialCommunityIcons.Button name="shopping-outline" size={25} backgroundColor="#055902" color='#fff' onPress={() => navigation.openDrawer()}/> 
            </View>
          ),
          title: 'Agricultor',
          headerTitleAlign: 'left',
          headerShown: false
        }}/>
      </DetailsStack.Navigator>
    );
  }

  