import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import gammaComAnimation from '../../Screen/Tab/gammaComAnimation';
import Icon from 'react-native-vector-icons/Ionicons';

const ExploreStack = createStackNavigator();


 export default function ExploreStackScreen({navigation}) {
  
    return (
      <ExploreStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor:'#04D9B2',
        },
        headerTintColor: '#262626',
        headerTitleStyle: 'bold'
      }
  
      }>
        <ExploreStack.Screen name="Explore" component={gammaComAnimation}options={{
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#04D9B2" color={'#262626'}  onPress={() => navigation.openDrawer()}> </Icon.Button>
          ),
          headerTitleAlign: 'left',
          headerShown: false
        }}/>
      </ExploreStack.Navigator>
    );
  }

  