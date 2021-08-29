import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Preload from '../screens/Inicio/Preload';
import StarterStack from './StarterStack';
import Gradiente from './GradienteNav/GradienteTab';

const MainStack = createStackNavigator({
    Preload,
    StarterStack,
    Gradiente

}, {
    initialRouteName:'Preload',
    defaultNavigationOptions:{
        headerShown:false 
    }
});

export default createAppContainer(MainStack);