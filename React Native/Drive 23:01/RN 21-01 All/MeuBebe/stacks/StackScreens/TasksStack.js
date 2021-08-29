import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import {View,TouchableOpacity} from 'react-native';
import PastaScreen from '../../pages/PastaScreen';
import ListScreen from '../../pages/ListScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Vetor from '../../assets/kanban.svg';
import useColor from '../../styles/useColor'

const MainStack = createStackNavigator();

export default function DetailsStackScreen({navigation}) {
    const [colors] = useColor();
    
  return (
      <MainStack.Navigator initialRouteName='Tarefas' screenOptions={{
        headerStyle:{
            backgroundColor: '#fff',
        },
        headerTintColor: '#202020',
    }}>
        <MainStack.Screen name="Tarefas" component={PastaScreen} 
            options={{
                headerLeft: () => (
                    <TouchableOpacity style={{marginLeft:20}} onPress={() => navigation.openDrawer()}>
                        <Ionicons name="ios-menu" color='#202020' size={30} > </Ionicons>
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{marginRight:20,flexDirection:'row'}} onPress={() => navigation.openDrawer()}>
                        <View style={{justifyContent:'center',alignItems:'center', marginRight:15}} >
                            <Entypo name="share" color='#202020' size={22} > </Entypo>
                        </View>

                        <View style={{justifyContent:'center',alignItems:'center', marginRight:15}} >
                            <Vetor width="20" height="20" fill="#262626"/>
                        </View>

                        <View style={{justifyContent:'center',alignItems:'center'}} >
                            <Entypo name="edit" color='#202020' size={20} > </Entypo>
                        </View>
                    </TouchableOpacity>
                ),
                headerTitleAlign: 'left',
                headerShown: true,
/*                 headerBackground: props => <View backgroundColor='rgba(245, 245, 247, 1)' flex={1} />, */
                headerBackground: props => <View backgroundColor={colors.background} flex={1} />,
                headerTitleAllowFontScaling: true,
                headerTitleStyle: {fontSize: 22},
                headerStyle: {height:60},
                title:'Pastas'
                
                
            }}
        />
        <MainStack.Screen name="Lista" component={ListScreen}             
            options={{
                headerTitleAlign: 'center',
                headerShown: true,
                headerBackground: props => <View backgroundColor={colors.background} flex={1} />,
                headerTitleAllowFontScaling: true,
                headerTitleStyle: {fontSize: 22}
                

            }}
        />
    </MainStack.Navigator>
  );
}