import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../../components/DrawerContent';
import MainTabScreen from './TabNavigator';
import SupportScreen from '../../Screen/Drawer/SupportScreen';
import SettingsScreen from '../../Screen/Drawer/SettingsScreen';
import BookmarkScreen from '../../Screen/Drawer/BookmarkScreen';
import DetailsStack from '../StacksScreen/DetailsStack';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <Drawer.Navigator
        initialRouteName="HomeDrawer"  
drawerStyle={{
  backgroundColor: '#fff',
  width: '85%',
}}
        drawerContent={props => <DrawerContent {...props} />} 
      >
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="DetailsStack" component={DetailsStack} />
      </Drawer.Navigator>
  );
}