import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { Image, View} from 'react-native';
import PastaScreen from '../pages/PastaScreen';
import ListScreen from '../pages/ListScreen';
import EditNoteScreen from '../pages/EditNoteScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const MainStack = createStackNavigator();

/* function LogoTitle() {
    return (
<LinearGradient height={55} colors={['#ff5049','#FEBD03','#67BF5E','#3587F2']}
      />
    );
  } */



/*   function LogoTitle() {
    return (
      <Image
        style={{ width: 400}}
        source={require('../assets/kkk.jpeg')}
      />
    );
  } */

export default () => (
    <MainStack.Navigator initialRouteName='Tarefas' screenOptions={{
        headerStyle:{
            backgroundColor: 'transparent',
            
            
        },
        headerTintColor: '#202020',
    }}>
        <MainStack.Screen name="Tarefas" component={PastaScreen} 
            options={{
                headerLeft: () => (
                    <Icon.Button name="ios-menu" color='#202020' size={24} backgroundColor="transparent" /* onPress={() => navigation.openDrawer()} */> </Icon.Button>
                ),
                headerTitleAlign: 'center',
                headerShown: true,
                headerBackground: props => <View backgroundColor='rgba(245, 245, 247, 1)' flex={1} />,
                headerTitleAllowFontScaling: true,
                headerTitleStyle: {fontSize: 22}
                
                
            }}
        />
        <MainStack.Screen name="Lista" component={ListScreen}             
            options={{
                headerTitleAlign: 'center',
                headerShown: true,
                headerBackground: props => <View backgroundColor='rgba(245, 245, 247, 1)' flex={1} />,
                headerTitleAllowFontScaling: true,
                headerTitleStyle: {fontSize: 22}
                
/*                 headerShown: false */
            }}
        />
        <MainStack.Screen name="EditNote" component={EditNoteScreen} />
    </MainStack.Navigator>
);


//options={{headerShown: false}} 