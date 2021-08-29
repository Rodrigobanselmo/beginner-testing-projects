import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CustomTabBar from '../components/CustomTabBar';

import HomeStack from '../navigators/HomeStack';
import WorkoutStack from '../navigators/WorkoutStack';
import MyWorkoutsStack from '../navigators/MyWorkoutsStack';



// aqui temos o tab entao quando mudamos algo, mudamos o tab em relação a uma tela somente se feita com screen se for feito em baixo vai pra todos
export default createBottomTabNavigator({
    HomeStack,
    WorkoutStack:{
        screen:WorkoutStack,
        navigationOptions:{
            tabBarVisible:false
        }
    },
    MyWorkoutsStack
}, {
    tabBarComponent: props => (
        <CustomTabBar
            {...props}
            items={[
                {
                    type:'regular',
                    text:'Início',
                    icon:require('../assets/home.png'),
                    route:'HomeStack'
                },
                {
                    type:'big',
                    icon:require('../assets/dumbbell.png'),
                    route:'WorkoutStack'
                },
                {
                    type:'regular',
                    text:'Meus Treinos',
                    icon:require('../assets/myworkouts.png'),
                    route:'MyWorkoutsStack'
                }
            ]}
        />
    )
});