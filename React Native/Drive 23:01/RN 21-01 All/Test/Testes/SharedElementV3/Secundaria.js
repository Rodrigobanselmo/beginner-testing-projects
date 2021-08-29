import React , { useLayoutEffect, useState } from 'react';
import { Dimensions, View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView,  RefreshControl, Image, Animated,Easing, StatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable'

const Secundaria = ({navigation,route}) => {

  const topRef = React.useRef();
  const bottomRef = React.useRef();
  const {item} =route.params;
  const windowWidth = Dimensions.get('window').widthr
  const windowHeight = Dimensions.get('window').height
  const VISIBLE_ITEMS = 3;
  const [search, setsearch] = useState('')

    return (
      <View style={{backgroundColor:'#262626',flex:1}}>
      <StatusBar hidden={true}/>
        <SharedElement id={`item.${item.key}.image`} style={{height:windowHeight, width:windowWidth, resizeMode:'cover'}}>
          <Image source={item.image} style={{height:windowHeight, width:windowWidth, resizeMode:'cover'}}/>
        </SharedElement>
        <Animatable.View animation='fadeIn' duration={1500} delay={700} ref={topRef} style={[StyleSheet.absoluteFill,{backgroundColor:'#00000077'}]}>
          <LinearGradient
            colors={['transparent', '#000', '#000']}
            style={{position:'absolute',left:0,right:0,bottom:0,height:windowHeight/3.5}}
          />
          <AntDesign style={{position:'absolute', top:20,left:20,zIndex:20}} underlayColor='#121212' name="arrowleft" size={22} backgroundColor="#121212" color='#eee' onPress={() => {Promise.all([bottomRef.current.fadeOut(600),topRef.current.fadeOut(600)]).then(()=>{navigation.goBack()})}}/>
        </Animatable.View>
        <View style={{flex:1,justifyContent:'flex-end', padding:20,position:'absolute',left:0,right:0,bottom:0}}>
          <View style={{alignItems:'flex-start'}}>
            <SharedElement id={`item.${item.key}.name`}>
                    <Text numberOfLines={1} adjustsFontSizeToFit style={{fontSize:36,fontWeight:'bold',color:'#fff',textTransform:'uppercase',marginBottom:20}} >{item.name}</Text>
            </SharedElement>
          </View>
          <Animatable.View animation='fadeIn' duration={1500} delay={800} ref={bottomRef}>
            <Text style={{color:'#ccc', fontSize:16, paddingBottom:5, marginLeft:10}}>Time do projeto</Text>
            <View style={{ flexDirection:'row'}}>
              {[0,0,0,0,0].map((item,index)=> {
                return (
                  <View style={{zIndex:10-index,marginLeft:index === 0?0:-22, marginTop:10, height:52,width:52,borderRadius:25,backgroundColor:'#121212',justifyContent:'center',alignItems:'center'}} key={index} >
                      <Image style={{ width: 45, height: 45, borderRadius: 20/* , borderWidth: 2,borderColor: '#000' */}}  source={{ uri: 'https://lh3.googleusercontent.com/a-/AOh14GgChlnCBMpoyym8PK_zVJbr-Un1IHPiT0zt7eyW_JY=s96-c' }} size={45} />
                    </View>
                  )
                })}
            </View>
          </Animatable.View>
        </View>
      </View>
    );
};

Secundaria.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  return [{id:`item.${item.key}.image`},{id:`item.${item.key}.name`}]
}

export default Secundaria;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});
