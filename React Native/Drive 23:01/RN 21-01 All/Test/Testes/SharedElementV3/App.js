import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Principal from './Principal';
import Secundaria from './Secundaria';
import { enableScreens } from 'react-native-screens'
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';
enableScreens();
const Stack = createSharedElementStackNavigator();


 export default function App() {
  
    return (

      <NavigationContainer>
      <Stack.Navigator headerMode='none' initialRouteName='Principal'>
        <Stack.Screen name="Principal" component={Principal}  />
        <Stack.Screen 
        name="Secundaria" 
        component={Secundaria}
        options={()=>({
          gestureEnabled:false,
          transitionSpec:{
            open:{animation: 'timing',config:{duration: 800}},
            close:{animation: 'timing',config:{duration: 800}}
          },
          cardStyleInterpolator:({current:{progress}})=>{
            return {
              cardStyle:{opacity:progress,}
            }
          }
        })}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
  }

  