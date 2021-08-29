import React, { useContext } from 'react';
import styled from 'styled-components/native';

import Legumes from '../assets/legumes.svg';
import Legumes1 from '../assets/legumes1.svg';
import Legumes2 from '../assets/legumes2.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Hand from '../assets/hand.svg' ;
import { Text } from 'react-native';

const TabArea = styled.View`
    height: 60px;
    background-color: #055902;
    flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #055902;
    margin-top: -20px;
`;
const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default ({ state, navigation }) => {

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('Home')}>
                <Ionicons name="ios-home" color={'#FFFFFF'} size={24} style={{opacity: state.index===0? 1 : 0.5}} />
                {state.index===0? 
                <Text style={{fontSize:12, color: '#fff', marginTop:-3}}> Home</Text>
                : null}
            </TabItem>
            <TabItem onPress={()=>goTo('Search')}>
                <Entypo name="shop" color={'#FFFFFF'} size={25} style={{opacity: state.index===1? 1 : 0.5}} />
                {state.index===1? 
                <Text style={{fontSize:12, color: '#fff', marginTop:-3}}>shop</Text>
                : null}
            </TabItem>
            <TabItemCenter onPress={()=>goTo('Appointments')}>
                {state.index===2? 
                <Legumes2 width="32" height="32" />
                : 
                <Legumes1 width="32" height="32" fill="#055902" />
                }
            </TabItemCenter>
            <TabItem onPress={()=>goTo('Favorites')}>
                <Hand style={{opacity: state.index===3? 1 : 0.7}} width="24" height="24" fill="#FFFFFF" />
                {state.index===3? 
                <Text style={{fontSize:12, color: '#fff', marginTop:-1}}>Aprenda</Text>
                : null}
            </TabItem>
            <TabItem onPress={()=>goTo('Profile')}>
                <Ionicons name="ios-person" color={'#FFFFFF'} size={25} style={{opacity: state.index===4? 1 : 0.5}} />
                {state.index===4? 
                <Text style={{fontSize:12, color: '#fff', marginTop:-1}}>Profile</Text>
                : null}
            </TabItem>
        </TabArea>
    );
}


/* 
const Tab = createMaterialBottomTabNavigator();

export default function MainTabScreen() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: '#262626',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-home" color={color} size={26}/>
            ),
          }}
        />
        <Tab.Screen
          name="Feira"
          component={DetailsStack}
          options={{
            tabBarLabel: 'Feira',
            tabBarColor: '#038C8C',
            tabBarIcon: ({ color }) => (
              <Entypo name="shop" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Minha Horta"
          component={ProfileStack}
          options={{
            tabBarLabel: 'Minha Horta',
            tabBarColor: '#04D9B2',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-person" color={color} size={26} />
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
              <Hand fill={color} width="24" height="24" />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
 */

