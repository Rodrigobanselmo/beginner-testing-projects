import React , { useLayoutEffect, useState } from 'react';
import { Dimensions, View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView,  RefreshControl, Image, Animated,Easing, StatusBar } from 'react-native';
import BarberItem from '../../components/Barber/BarberItem'
import { useSelector, useDispatch } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Note from '../../assets/note.svg' ;
import LinearGradient from 'react-native-linear-gradient';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {BoxShadow} from 'react-native-shadow'
import {Avatar} from 'react-native-paper';
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef
} from 'react-native-shared-element';

const DetailsScreen = ({navigation,route}) => {


  const {item} =route.params;
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const VISIBLE_ITEMS = 3;
  const [search, setsearch] = useState('')


    return (
      <View style={{backgroundColor:'#262626',flex:1}}>
      <AntDesign style={{position:'absolute', top:20,left:20,zIndex:20}} underlayColor='#121212' name="arrowleft" size={22} backgroundColor="#121212" color='#eee' onPress={() => navigation.goBack()}/>
      <SharedElement id={`ìtem.${item.name}.image`} style={{height:windowHeight, width:windowWidth, resizeMode:'cover'}}>
        <Image source={item.image} style={{height:windowHeight, width:windowWidth, resizeMode:'cover'}}/>
      </SharedElement>
      <StatusBar hidden={true}/>
        <View style={[StyleSheet.absoluteFill,{backgroundColor:'rgb(0,0,0,1)'}]}>
          <LinearGradient
            colors={['transparent', '#000', '#000']}
            style={{position:'absolute',left:0,right:0,bottom:0,height:windowHeight/3.5}}
          />
        </View>
{/*           <LinearGradient
            colors={['#262626', '#121212']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          > */}
           

            <View style={{flex:1,justifyContent:'flex-end', padding:20,position:'absolute',left:0,right:0,bottom:0}}>
            <SharedElement id={`ìtem.${item.name}.name`}>
                    <Text numberOfLines={1} adjustsFontSizeToFit style={{fontSize:36,fontWeight:'bold',color:'#fff',textTransform:'uppercase',marginBottom:20}} >{item.name}</Text>
            </SharedElement>
              <Text style={{color:'#ccc', fontSize:16, paddingBottom:5, marginLeft:10}}>Time do projeto</Text>
              <View style={{ flexDirection:'row'}}>
                {[0,0,0,0,0].map((item,index)=> {
                    return (
                      <View style={{zIndex:10-index,marginLeft:index === 0?0:-22, marginTop:10, height:52,width:52,borderRadius:25,backgroundColor:'#121212',justifyContent:'center',alignItems:'center'}} key={index} >
                        <Image style={{ width: 45, height: 45, borderRadius: 20/* , borderWidth: 2,borderColor: '#000' */}}  source={{ uri: 'https://lh3.googleusercontent.com/a-/AOh14GgChlnCBMpoyym8PK_zVJbr-Un1IHPiT0zt7eyW_JY=s96-c' }} size={45} />
                      </View>
                    )
                  })

                }

              </View>
            </View>


      </View>
    );
};

DetailsScreen.sharedElements = (route, otherRoute, showing) => {
    const {item} = route.params;

    return [{id:`item.${item.name}.image`},{id:`item.${item.name}.name`}]
}

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});
