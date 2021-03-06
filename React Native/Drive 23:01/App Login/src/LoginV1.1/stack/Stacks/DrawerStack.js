import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../../components/stackComponents/DrawerContent';
import { CardStyleInterpolators } from '@react-navigation/stack';
import TabStack from './TabStack';
import ConfigScreen from '../../screens/Drawer/ConfigScreen';
import Drawer_2 from '../../screens/Drawer/Drawer_2';

const Drawer = createDrawerNavigator();

export default function App({route}) {
  return (
      <Drawer.Navigator initialRouteName={route.params?.screen ? route.params.screen : "TabStack"}  drawerStyle={{backgroundColor: '#fff', width: '80%', maxWidth:330,minWidth:310}} drawerContent={props => <DrawerContent {...props} />} >
          <Drawer.Screen name="TabStack" component={TabStack} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
          <Drawer.Screen name="ConfigScreen" component={ConfigScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
          <Drawer.Screen name="Drawer_2" component={Drawer_2} />
      </Drawer.Navigator>
  );
}