

 import React, { useEffect, useState, useRef } from 'react';
 import { Dimensions, View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView,  RefreshControl, Image, } from 'react-native';
 import LinearGradient from 'react-native-linear-gradient'
 import { ProgressCircle } from 'react-native-svg-charts'
import Donut from './donut'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {BoxShadow} from 'react-native-shadow'
import Animated from 'react-native-reanimated';
 ////


 export default () => {
 

    const HEADER = 70;
    const scrollY = new Animated.Value(0)
    const diffClampScrollY = Animated.diffClamp(scrollY,0,HEADER)
    const headerY = Animated.interpolateNode(diffClampScrollY, {
      inputRange:[0,HEADER],
      outputRange:[0,-HEADER]
    })

    const scrollFlatlistToMonth = () => {  //faz com que na hora de carregar mande o scrol para a posição certa e nao fique no inicial padrao embora o mes esteja selecionado corretamente
    
   
    }


/*     const scrollFlatlistToMonth2 = (e) => {  //faz com que na hora de carregar mande o scrol para a posição certa e nao fique no inicial padrao embora o mes esteja selecionado corretamente
        
        let posX = e.nativeEvent.contentOffset.y



        if (posX==0) {
          onRefresh();
        }  else if (posX<200) {
          FlatMounthRef.current.scrollTo({x: 0, y: 200, animated: true}) //scrollto é uma função do proprio scrowview //animated opcional
        }


      } */
      

/*     useEffect(() => {
        setTimeout(() => {
            scrollFlatlistToMonth()
        }, 10); 
        }, []) */
    


     return (

       <View style={[styles.View, {backgroundColor:'#121212'}]} >

      <Animated.View style={{position:'absolute', left:0,top:0, height:HEADER, backgroundColor:'red',zIndex:1000, elevation:100, width:'100%',transform: [{ translateY: headerY }]}}></Animated.View>

          <Animated.ScrollView 
          style={{flex:1}} 
          decelerationRate='fast'
          bounces={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset:{y:scrollY}} }
          ])}
          >

          <LinearGradient colors={['#fff','#000']} height={2000} width={500}/>

          </Animated.ScrollView>

       </View>
     );
 }; 
 
 
 const styles = StyleSheet.create({
   View: {
     justifyContent: 'center',
     alignItems: 'center',
     flex: 1,
   },
   container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Container_View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:10
},
Pasta_View: {
    justifyContent: 'center',
    alignItems: 'center',
},
NoPasta_Text: {
    fontSize: 20,
},
Folder_View: {
    justifyContent:'flex-start',
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 0,
    flexDirection: 'row',  
},
Folder_Text: {
    fontSize: 21,
    fontWeight: 'normal',
},
Pastas_FlatList: {
    flex: 1,
    width: '100%',
},
Add_TouchableOpacity: {
    position: 'absolute',
    right: 35,
    bottom: 35,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',

},
Add_TouchableOpacityinside: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',

},
 });
 
 
 