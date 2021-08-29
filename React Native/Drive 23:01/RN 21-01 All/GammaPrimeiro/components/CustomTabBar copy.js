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
import { Text, Image, View } from 'react-native';

const TabArea = styled.View`
    height: 55px;
    background-color: #262626;
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
    background-color: #262626;
    border-radius: 35px;
    border: 2.5px solid #04D9B2;
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
            <TabItem style={{borderTopWidth:2.5, borderTopColor:'#04D9B2'}} onPress={()=>goTo('Home')}>
                <TodayIcon style={{opacity: state.index===0? 1 : 0.7}} width="24" height="24" fill="#04D9B2" />
                {state.index===0? 
                <Text style={{fontSize:12, color: '#04D9B2', marginTop:-3}}>Mural</Text>
                : null}
            </TabItem>
            <TabItem style={{borderTopWidth:2.5, borderTopColor:'#04D9B2'}} onPress={()=>goTo('Search')}>
                <Ionicons name="people" color={'#04D9B2'} size={25} style={{opacity: state.index===1? 1 : 0.5}} />
                {state.index===1? 
                <Text style={{fontSize:12, color: '#04D9B2', marginTop:-3}}>Membros</Text>
                : null}
            </TabItem>


            <View >
                <View style={{borderTopWidth:2.5, borderTopColor:'#04D9B2',width:100, position:'absolute', top:0, zIndex:0}}/>
                      <TabItemCenter onPress={()=>goTo('Appointments')}>
                {state.index===2? 
                <Image source={require('../assets/gamma.png')} resizeMode="contain" style={{width:50, height:50, zIndex:1}}/>
                : 
                <Image source={require('../assets/gamma3.png')} resizeMode="contain" style={{width:50, height:50, zIndex:1}}/>
                }
                            </TabItemCenter>
            </View>


            <TabItem style={{borderTopWidth:2.5, borderTopColor:'#04D9B2'}} onPress={()=>goTo('Favorites')}>
              <Ionicons name="md-bar-chart" color={'#04D9B2'} size={25} style={{opacity: state.index===3? 1 : 0.5}} />
                {state.index===3? 
                <Text style={{fontSize:12, color: '#04D9B2', marginTop:-1}}>Projetos</Text>
                : null}
            </TabItem>
            <TabItem style={{borderTopWidth:2.5, borderTopColor:'#04D9B2'}} onPress={()=>goTo('Profile')}>
                <Ionicons name="ios-person" color={'#04D9B2'} size={25} style={{opacity: state.index===4? 1 : 0.5}} />
                {state.index===4? 
                <Text style={{fontSize:12, color: '#04D9B2', marginTop:-1}}>Profile</Text>
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

