import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';

import PastaScreen from '../pages/PastaScreen';
import ListScreen from '../pages/ListScreen';
import EditNoteScreen from '../pages/EditNoteScreen';


const MainStack = createStackNavigator();

export default () => (
    <MainStack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor: '#222'

        },
        headerTintColor: '#04dcbc'
    }}>
        <MainStack.Screen name="Pasta" component={PastaScreen} />
        <MainStack.Screen name="Lista" component={ListScreen} />
        <MainStack.Screen name="EditNote" component={EditNoteScreen} />
    </MainStack.Navigator>
);