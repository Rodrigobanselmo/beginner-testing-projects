import React , { useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView,TextInput, Image,ImageBackground,StatusBar, Dimensions, Animated} from 'react-native';
import BarberItem from '../../components/Barber/BarberItem'
import { useSelector, useDispatch } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SvgADM from '../../assets/documento.svg' ;
import SvgGP from '../../assets/gestao.svg' ;
import SvgCHIP from '../../assets/chip2.svg' ;
import SvgMARK from '../../assets/quadro-e-pincel.svg' ;
import SvgP from '../../assets/employees2.svg' ;
import LinearGradient from 'react-native-linear-gradient';
import { Avatar } from 'react-native-paper';

const HomeScreen = ({navigation}) => {

      const windowWidth = Dimensions.get('window').width;
      const HEADERTop = 140;
      const scrollY = new Animated.Value(0)
      const diffClampScrollY = Animated.diffClamp(scrollY,0,HEADERTop)
    
      const headerTop = diffClampScrollY.interpolate({  //inferio
        inputRange:[0,HEADERTop],
        outputRange:[HEADERTop,0],
      })
      
      const animal = Animated.event([
        {nativeEvent: {contentOffset:{y:scrollY}} }
      ],
      {useNativeDriver: false})


    return (



      <View style={styles.container}>
          <StatusBar backgroundColor='#262626' barStyle="light-content"/>
          <View style={{width:'100%',backgroundColor:'#121212',transform: [{ translateY: 0 }], position:'absolute',top:0,left:0,zIndex:2}}>
              <View style={{flex:1, flexDirection:'row'}}>
                <Image source={require('../../assets/gammaengenharia.png')}style={{height:180,width:180,position:'absolute', top:-55, left:30, opacity:1,transform: [{ rotateZ: '0deg' }]}}resizeMode="contain"/>
                <Ionicons.Button style={{marginLeft:10,marginTop:9}} underlayColor='#121212' name="ios-menu" size={26} backgroundColor="#121212" onPress={() => navigation.openDrawer()}> </Ionicons.Button>
                <Ionicons style={{marginLeft:300,marginTop:18}} name="paper-plane-outline" size={22} backgroundColor="#121212" color='#eee' onPress={() => navigation.openDrawer()}> </Ionicons>
              </View>
              <Animated.ScrollView style={{marginTop:24,height:headerTop}} horizontal={true} showsHorizontalScrollIndicator={false} >
          
          <View style={{alignItems:'center', backgroundColor:'transparent'}}>
            <View style={{marginLeft:15, marginBottom:3, marginRight:6, height: 79, width:79, borderRadius:50, borderWidth:1, borderColor:'#037F8C', justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor:'#04D9B2', height: 69, width:69, borderRadius:50, borderWidth:3, borderColor:'#04D9B2', justifyContent:'center',alignItems:'center'}}>
                <MaterialCommunityIcons name="crown" size={45} backgroundColor="#121212" color='#121212' />
              </View>
            </View>
            <Text style={{color: '#04D9B2', marginTop:3,fontSize:12.5}}>Presidência</Text>
          </View>

          <View style={{alignItems:'center', backgroundColor:'transparent'}}>
            <View style={{ marginHorizontal:6, marginBottom:5, height: 79, width:79, borderRadius:50, borderWidth:1, borderColor:'#037F8C', justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor:'#04D9B2', height: 69, width:69, borderRadius:50, borderWidth:3, borderColor:'#04D9B2', justifyContent:'center',alignItems:'center'}}>
              <FontAwesome5 name="money-check-alt" size={33} backgroundColor="#121212" color='#121212' />
              </View>
            </View>
            <Text style={{color: '#04D9B2', marginTop:3,fontSize:12.5}}>ADM-Fin</Text>
          </View>

          <View style={{alignItems:'center', backgroundColor:'transparent'}}>
            <View style={{ marginHorizontal:6, marginBottom:5, height: 79, width:79, borderRadius:50, borderWidth:1, borderColor:'#037F8C', justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor:'#04D9B2', height: 69, width:69, borderRadius:50, borderWidth:3, borderColor:'#04D9B2', justifyContent:'center',alignItems:'center'}}>
                <FontAwesome5 name="laptop-code" size={33} backgroundColor="#121212" color='#121212' />
              </View>
            </View>
            <Text style={{color: '#04D9B2', marginTop:3,fontSize:12.5}}>Realizações</Text>
          </View>




          <View style={{alignItems:'center', backgroundColor:'transparent'}}>
            <View style={{marginHorizontal:6, marginBottom:5, height: 79, width:79, borderRadius:50, borderWidth:1, borderColor:'#037F8C', justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor:'#04D9B2', height: 69, width:69, borderRadius:50, borderWidth:3, borderColor:'#04D9B2', justifyContent:'center',alignItems:'center'}}>
                <SvgMARK fill='#121212'  width="45" height="45" />
              </View>
            </View>
            <Text style={{color: '#04D9B2', marginTop:3,fontSize:12.5}}>Marketing</Text>
          </View>

          <View style={{alignItems:'center', backgroundColor:'transparent'}}>
            <View style={{marginHorizontal:10, marginBottom:5, height: 79, width:79, borderRadius:50, borderWidth:1, borderColor:'#037F8C', justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor:'#04D9B2', height: 69, width:69, borderRadius:50, borderWidth:3, borderColor:'#04D9B2', justifyContent:'center',alignItems:'center'}}>
                <Ionicons name="people" size={37} backgroundColor="#121212" color='#121212' />
              </View>
            </View>
            <Text style={{color: '#04D9B2', marginTop:0,fontSize:12.5}}>Gestão de</Text>
            <Text style={{color: '#04D9B2', marginTop:-3,fontSize:12.5}}>Pessoas</Text>
          </View>








{/* 



          <View style={{alignItems:'center', backgroundColor:'transparent'}}>
            <View style={{marginLeft:20, marginRight:10, height: 100, width:100, borderRadius:50, borderWidth:1, borderColor:'#037F8C', justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor:'#262626', height: 90, width:90, borderRadius:50, borderWidth:3, borderColor:'#04D9B2', justifyContent:'center',alignItems:'center'}}>
                <SvgP  width="585" height="55" />
              </View>
            </View>
            <Text style={{color: '#eee', marginTop:7}}>Presidência</Text>
          </View>

          <View style={{alignItems:'center', backgroundColor:'transparent'}}>
            <View style={{marginHorizontal:10, height: 100, width:100, borderRadius:50, borderWidth:1, borderColor:'#037F8C', justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor:'#262626', height: 90, width:90, borderRadius:50, borderWidth:3, borderColor:'#04D9B2', justifyContent:'center',alignItems:'center'}}>
                <SvgCHIP  width="60" height="60" />
              </View>
            </View>
            <Text style={{color: '#eee', marginTop:7}}>Realizações</Text>
          </View>

          <View style={{alignItems:'center', backgroundColor:'transparent'}}>
            <View style={{marginHorizontal:10, height: 100, width:100, borderRadius:50, borderWidth:1, borderColor:'#037F8C', justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor:'#262626', height: 90, width:90, borderRadius:50, borderWidth:3, borderColor:'#04D9B2', justifyContent:'center',alignItems:'center'}}>
                <SvgADM  width="58" height="58" />
              </View>
            </View>
            <Text style={{color: '#eee', marginTop:7}}>ADM-Fin</Text>
          </View>
          <View style={{alignItems:'center', backgroundColor:'transparent'}}>
            <View style={{marginHorizontal:10, height: 100, width:100, borderRadius:50, borderWidth:1, borderColor:'#037F8C', justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor:'#262626', height: 90, width:90, borderRadius:50, borderWidth:3, borderColor:'#04D9B2', justifyContent:'center',alignItems:'center'}}>
                <SvgP  width="585" height="55" />
              </View>
            </View>
            <Text style={{color: '#eee', marginTop:7}}>Presidência</Text>
          </View>

          <View style={{alignItems:'center', backgroundColor:'transparent'}}>
            <View style={{marginHorizontal:10, height: 100, width:100, borderRadius:50, borderWidth:1, borderColor:'#037F8C', justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor:'#262626', height: 90, width:90, borderRadius:50, borderWidth:3, borderColor:'#04D9B2', justifyContent:'center',alignItems:'center'}}>
                <SvgCHIP  width="60" height="60" />
              </View>
            </View>
            <Text style={{color: '#eee', marginTop:7}}>Realizações</Text>
          </View>

          <View style={{alignItems:'center', backgroundColor:'transparent'}}>
            <View style={{marginHorizontal:10, height: 100, width:100, borderRadius:50, borderWidth:1, borderColor:'#037F8C', justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor:'#262626', height: 90, width:90, borderRadius:50, borderWidth:3, borderColor:'#04D9B2', justifyContent:'center',alignItems:'center'}}>
                <SvgADM  width="58" height="58" />
              </View>
            </View>
            <Text style={{color: '#eee', marginTop:7}}>ADM-Fin</Text>
          </View>
 */}















        </Animated.ScrollView>
              <LinearGradient style={{height:4,width:'100%',opacity:0.29, zIndex:2}}  colors={['#000','#121212']} />
          </View>

           <Animated.ScrollView style={{marginTop:-4}}
              scrollEventThrottle={16}
              onScroll={animal}>

           <View style={{height:1000,width:500,backgroundColor:'#121212'}}></View>
           </Animated.ScrollView>

      </View>

    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    backgroundColor:'#121212'
    /*     justifyContent: 'center', */
    
  },
});


{/* <Avatar.Image source={require('../../assets/26214-cenoura-cebola-e-batata-embora-todos-p-article_block_media-2.jpg')} size={75}/> */}