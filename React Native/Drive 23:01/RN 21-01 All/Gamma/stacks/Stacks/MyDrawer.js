import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../../components/Drawer/DrawerContent';
import TasksStack from '../StackScreens/TasksStack';



const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <Drawer.Navigator
        initialRouteName="Tarefas"  
        drawerContent={props => <DrawerContent {...props} />} 
      >
          <Drawer.Screen name="TasksStack" component={TasksStack} />
      </Drawer.Navigator>
  );
}