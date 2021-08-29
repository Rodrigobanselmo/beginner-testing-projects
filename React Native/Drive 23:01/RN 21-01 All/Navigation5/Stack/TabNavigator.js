import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './StacksScreen/HomeStack';
import DetailsStack from './StacksScreen/DetailsStack';
import ExploreStack from './StacksScreen/ExploreStack';
import ProfileStack from './StacksScreen/ProfileStack';
  

const Tab = createMaterialBottomTabNavigator();

export default function MainTabScreen() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor="#fff"
        
      >
        <Tab.Screen
          name="Feed"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: '#262626',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={DetailsStack}
          options={{
            tabBarLabel: 'Details',
            tabBarColor: '#038C8C',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-notifications" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: '#04D9B2',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-person" color={color} size={26} />
            ),
          }}
        />
                <Tab.Screen
          name="Explore"
          component={ExploreStack}
          options={{
            tabBarLabel: 'Explore',
            tabBarColor: '#01402E',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-aperture" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }




