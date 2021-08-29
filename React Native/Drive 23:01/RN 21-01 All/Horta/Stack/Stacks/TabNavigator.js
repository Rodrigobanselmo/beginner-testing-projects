import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
    View, 
} from 'react-native';
import CustomTabBar from '../../components/CustomTabBar';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeStack from '../StacksScreen/HomeStack';
import DetailsStack from '../StacksScreen/DetailsStack';
import ExploreStack from '../StacksScreen/ExploreStack';
import ProfileStack from '../StacksScreen/ProfileStack';
import HortaScreen from '../StacksScreen/HortaStack';


const Tab = createBottomTabNavigator();


export default () => (
    <Tab.Navigator tabBar={true ? props=> <CustomTabBar {...props} /> :props=> <View {...props} /> }>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Search" component={DetailsStack} />
        <Tab.Screen name="Appointments" component={ExploreStack} />
        <Tab.Screen name="Favorites" component={ProfileStack} />
        <Tab.Screen name="Profile" component={HortaScreen} />
    </Tab.Navigator>
);







