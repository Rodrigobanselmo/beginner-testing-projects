import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TabBar from '../../componentes/Gradiente/TabBar';
import GradienteStack from './GradienteStack';
import GradienteStack2 from './GradienteStack2';
import GradienteStack3 from './GradienteStack3';

export default createBottomTabNavigator({
    GradienteStack,  //isso aqui tem que ter o mesmo nome que o route
    GradienteStack2,
    GradienteStack3  //isso aqui tem que ter o mesmo nome que o route
}, {
    tabBarComponent: props => (
        <TabBar
            {...props}
            items={[
                {
                    type:'regular',
                    text:'Duas Cores',
                    icon:require('../../assets/canceldark.png'),
                    route:'GradienteStack'
                },
                {
                    type:'regular',
                    text:'Mais Cores',
                    icon:require('../../assets/canceldark.png'),
                    route:'GradienteStack2'
                },
                {
                    type:'regular',
                    text:'Por Transp.',
                    icon:require('../../assets/canceldark.png'),
                    route:'GradienteStack3'
                },

            ]}
        />
    )
});











/* 
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../../componentes/Gradiente/TabBar';

import TabHomeScreen from '../../screens/Gradiente/GradienteScreen';
import TabAboutScreen from '../../screens/Gradiente/GradienteScreen1';
import TabConfigScreen from '../../screens/Gradiente/GradienteScreen2';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator
        initialRouteName="TabHome"
        tabBar={(props) => <CustomTabBar {...props} />}
    >
        <Tab.Screen name="TabAbout" component={TabAboutScreen} options={{tabBarLabel:'Sobre'}} />
        <Tab.Screen name="TabHome" component={TabHomeScreen} options={{tabBarLabel:'Home'}} />
        <Tab.Screen name="TabConfig" component={TabConfigScreen} options={{tabBarLabel:'Config'}} />
    </Tab.Navigator>
); */