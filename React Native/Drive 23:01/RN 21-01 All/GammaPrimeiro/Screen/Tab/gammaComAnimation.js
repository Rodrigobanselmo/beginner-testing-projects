

 import React, { useEffect, useState, useRef } from 'react';
 import { Dimensions, View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView,  RefreshControl, Image, Animated,Easing, StatusBar } from 'react-native';
 import LinearGradient from 'react-native-linear-gradient';
 import { ProgressCircle } from 'react-native-svg-charts'
import Donut from '../../components/donut'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BoxShadow} from 'react-native-shadow'
import StarEmpty from '../../assets/account.svg';
import Svg from 'react-native-svg';
 ////


 export default ({navigation}) => {
 
  const HEADER = 68;
  const HEADERTop = 69;
  const scrollY = new Animated.Value(0)
  const diffClampScrollY = Animated.diffClamp(scrollY,0,HEADERTop)

  const headerTop = diffClampScrollY.interpolate({  //inferio
    inputRange:[0,HEADERTop],
    outputRange:[0,-HEADERTop],
  })

  const headerY = scrollY.interpolate({  //inferio
    inputRange:[0,180],
    outputRange:[HEADER,0],
    extrapolate: 'clamp'
  })
  const headerYSup = scrollY.interpolate({  //inferio
    inputRange:[0,180],
    outputRange:[HEADER,0],
    extrapolate: 'clamp'
  })

  const animationInterpolado = scrollY.interpolate({  //inferio
    inputRange:[0,180],
    outputRange:[1.17,1],
    extrapolate: 'clamp'
  })

  const headerA = scrollY.interpolate({  //inferio
    inputRange:[500,590],
    outputRange:[-100,0],
    extrapolate: 'clamp'
  })

  const headerT = scrollY.interpolate({  //inferio
    inputRange:[510,1510],
    outputRange:[0,1000],
    extrapolate: 'clamp'
  })

/*   const headerA = diffClampScrollY.interpolate({  //inferio
    inputRange:[0,69],
    outputRange:[0,-69],
  }) */

/*   const scaleAnimation = () => {
    return Animated.timing(scaleV, {
      delay: 0,
      toValue: 2,
      duration:800,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const animationInterpoladoScale = scaleV.interpolate({  //inferio
    inputRange:[1,1.5,2],
    outputRange:[1,1.25,1],
    extrapolate: 'clamp'
  })
 */





  React.useEffect(() => {
    
    scrollY.addListener((v) => {
/*       console.log(v.value) */

if (v.value>=470 && scrollTop != true) {
/*   setscrollTop(true) */

} else if (v.value<470 && scrollTop != false) {
/*   setscrollTop(false) */
}
    }, []);

  return () => {
    scrollY.removeAllListeners();
  };
});



    const [refreshing, setRefreshing] = React.useState(false);
  
    const onRefresh = React.useCallback(() => {

        setRefreshing(false)
          FlatMounthRef.current.scrollTo({x: 0, y: 240, animated: true}) //scrollto é uma função do proprio scrowview //animated opcional
          setprogressBar(true)
    }, []);

    const FlatMounthRef = useRef(null);
    const screenWidth = Dimensions.get('window').width;
    const [scrollTop, setscrollTop] = useState(1)
    const [heighHeader, setheighHeader] = useState(0)
    const [progressBar, setprogressBar] = useState(true)
    const [posY, setposY] = useState(200)
    const alturaRef = React.useRef();

    const shadowOpt = {
      width:screenWidth*.95*.68,
      height:40,
      color:"#04D9B2",
      border:20,
      radius:20,
      opacity:0.07,
      x:0,
      y:0,
      style:{marginVertical:5},
  }
  
  const animated = React.useRef(new Animated.Value(0)).current;

  const animation2 = () => {
    return Animated.timing(animated, {
      delay: 300,
      toValue:0,
      duration:800,
      useNativeDriver: true,
    }).start();
  };



  const animation = (toValue,duration) => {
    return Animated.timing(animated, {
      delay: 300,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };



    const scrollFlatlistToMonth = () => {  //faz com que na hora de carregar mande o scrol para a posição certa e nao fique no inicial padrao embora o mes esteja selecionado corretamente
    
      FlatMounthRef.current.scrollTo({x: 0, y: 240, animated: true}) //scrollto é uma função do proprio scrowview //animated opcional
        
   
    }


    const scrollFlatlistToMonth2 = (e) => {  //faz com que na hora de carregar mande o scrol para a posição certa e nao fique no inicial padrao embora o mes esteja selecionado corretamente
        
        let posX = e.nativeEvent.contentOffset.y


        if (posX==0) {
          onRefresh();

        }  else if (posX<240) {
          FlatMounthRef.current.scrollTo({x: 0, y: 240, animated: true}) //scrollto é uma função do proprio scrowview //animated opcional
        }


      }

      const scrollFlatlistToMonth3 = (e) => {  //faz com que na hora de carregar mande o scrol para a posição certa e nao fique no inicial padrao embora o mes esteja selecionado corretamente
        

        console.log(e.nativeEvent.contentOffset.y)
        
/*         let posX = 


        if (posX<200 && posX>50) {
          setscrollTop((1-e.nativeEvent.contentOffset.y/200)*0.4+1)
          setheighHeader((1-e.nativeEvent.contentOffset.y/200)*90)
          if (alturaRef?.current) {
          alturaRef.current.setNativeProps({
            height:(1-e.nativeEvent.contentOffset.y/200)*90
          });
        }

        }

        if (posX==0) {
          setprogressBar(false)
        } */

      }

      

    useEffect(() => {
        setTimeout(() => {
            scrollFlatlistToMonth()
        }, 10); 
        }, [])
    
const animal = Animated.event([
  {nativeEvent: {contentOffset:{y:scrollY}} }
],
{useNativeDriver: false})

     return (

       <View style={[styles.View, {backgroundColor:'#121212'}]} >
         <StatusBar barStyle={'light-content'} backgroundColor='#121212'/>
{/* {scrollTop===true?  */}
{/*  <Animated.View style={{zIndex:1000 ,transform: [{ translateY: headerA }],justifyContent:'flex-end', alignItems:'center',height:830, width:screenWidth*3, position:'absolute', left:-screenWidth,top:-770, backgroundColor:'#262626', borderBottomRightRadius:5000, borderBottomLeftRadius:5000}} >
 <SimpleLineIcons name="arrow-down" size={23} color='#eee' style={{marginBottom:9}}></SimpleLineIcons>
 </Animated.View> */}
{/*   :null} */}
<Animated.View style={{height:69,width:'100%',backgroundColor:'#121212',transform: [{ translateY: headerA }], position:'absolute',top:0,left:0,zIndex:2}}>

<View style={{flex:1, flexDirection:'row'}}>
           <Image 
            source={require('../../assets/gammaengenharia.png')}
            style={{height:180,width:180,position:'absolute', top:-55, left:30, opacity:1,transform: [{ rotateZ: '0deg' }]}}
            resizeMode="contain"
            />
{/*                        <View style={{height:70,width:50,backgroundColor:'#262626',position:'absolute', top:-0, left:10}}/> */}

                       <Ionicons.Button style={{marginLeft:10,marginTop:9}} underlayColor='#121212' name="ios-menu" size={25} backgroundColor="#121212" onPress={() => navigation.openDrawer()}> </Ionicons.Button>
                       <Ionicons style={{marginLeft:300,marginTop:18}} underlayColor='#121212' name="paper-plane-outline" size={22} backgroundColor="#121212" color='#eee' onPress={() => navigation.openDrawer()}> </Ionicons>
           </View>
           <LinearGradient style={{height:4,width:'100%',opacity:0.29, zIndex:2}}  colors={['#000','#121212']} />
</Animated.View>

{/* <Animated.View style={{zIndex:1000 ,transform: [{ translateY: headerA }],justifyContent:'center', alignItems:'center',height:50, width:50, position:'absolute', left:20,top:20, backgroundColor:'#121212', borderRadius:13}} >
 <Ionicons name="ios-menu" size={30} color='#eee'></Ionicons>
 </Animated.View> */}

{/*  <View style={{flexDirection:'row', height:100,width:screenWidth,backgroundColor:'#262626',justifyContent:'flex-start', alignItems:'center'}}>
 <Ionicons name="ios-menu" size={30} color='#eee'></Ionicons>
 <Image 
            source={require('../Horta/assets/gammaengenharia.png')}
            style={{height:250,width:250}}
            resizeMode="contain"
            />
 </View> */}
  
          <Animated.ScrollView 
          ref={FlatMounthRef}
          style={{flex:1, marginTop:-4}} 
          alwaysBounceVertical={false} 
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={scrollFlatlistToMonth2}
          scrollEventThrottle={16}
          onScroll={animal}
          scrollEnabled={refreshing==true?false:true}
          decelerationRate='fast'
          >

            <View style={{justifyContent:'flex-end', alignItems:'center',height:830, width:screenWidth*3, position:'absolute', left:-screenWidth,top:-300, backgroundColor:'#262626', borderBottomRightRadius:5000, borderBottomLeftRadius:5000}} >
{/*             <Ionicons name="ios-menu" size={30} color='#eee' style={{position:'absolute',top:550,left:screenWidth*1.14}}></Ionicons> */}
            <View>
                <View style={{justifyContent:'center', alignItems:'center', height:0, width:screenWidth, flexDirection:'row', marginBottom:60}}>

                  <View style={{justifyContent:'center', alignItems:'center', height:30, width:30, backgroundColor:'transparent',flexGrow:1}}>
                    <Text style={{color:'#ccc', fontWeight:'bold', fontSize:20}}>26</Text>
                    <Text style={{color:'#ccc', fontWeight:'normal', fontSize:11}}>MEMBROS</Text>
                  </View>


                  <View style={{justifyContent:'center', alignItems:'center', height:30, width:30, backgroundColor:'transparent',flexGrow:1}}>

                  <Donut animationInterpolado={animationInterpolado} percentage={16264.00} color={'#04D9B2'} delay={1000} max={21000.00} radius={79} /* scrollView={scrollTop} */ animated={animated} animation={animation}/>
                  </View>
                  
                  <View style={{justifyContent:'center', alignItems:'center', height:30, width:30, backgroundColor:'transparent',flexGrow:1}}>
                  <Text style={{color:'#ccc', fontWeight:'bold', fontSize:20}}>5</Text>
                    <Text style={{color:'#ccc', fontWeight:'normal', fontSize:11}}>PROJETOS</Text>
                  </View>
                </View>

                <Animated.View style={{justifyContent:'center', alignItems:'center', height:headerYSup, width:screenWidth/* , backgroundColor:'red' */}}/>

                <View style={{justifyContent:'center', alignItems:'center', width:screenWidth, flexDirection:'row', marginTop:35, marginBottom:19}}>
                  <View style={{justifyContent:'center', alignItems:'center', marginRight:20}}>
{/*                     <Text style={{color:'#ccc', fontWeight:'normal', fontSize:12, marginBottom:-3}}>Projetos</Text>
                    <Text style={{color:'#ccc', fontWeight:'normal', fontSize:12, marginBottom:3}}>finalizados</Text>
                    <View style={{height:(11), marginBottom:3, borderTopEndRadius:30, borderBottomStartRadius:30, width:110, backgroundColor:'transparent', borderWidth:0.5, borderColor:'#fff'}}><View style={{flex:1, width:90, backgroundColor:'#04D9B2', borderBottomStartRadius:30, borderTopEndRadius:30}}/></View>
                    <Text style={{color:'#bbb', fontWeight:'normal', fontSize:10}}>9/10 finalizados</Text>
 */}


<Text style={{color:'#ccc', fontWeight:'normal', fontSize:12, marginBottom:3}}>Finalizados</Text>
                    <View style={{height:(11), marginBottom:3, borderTopEndRadius:30, borderBottomStartRadius:30, width:110, backgroundColor:'transparent', borderWidth:0.5, borderColor:'#fff'}}><View style={{flex:1, width:70, backgroundColor:'#04D9B2', borderBottomStartRadius:30, borderTopEndRadius:30}}/></View>
                    <Text style={{color:'#bbb', fontWeight:'normal', fontSize:10, marginBottom:-10}}>9/10 Projetos</Text>


                  </View>
                  <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'#ccc', fontWeight:'normal', fontSize:12, marginBottom:3}}>Faturamento</Text>
                    <View style={{height:(11), marginBottom:3, borderTopEndRadius:30, borderBottomStartRadius:30, width:110, backgroundColor:'transparent', borderWidth:0.5, borderColor:'#fff'}}><View style={{flex:1, width:70, backgroundColor:'#04D9B2', borderBottomStartRadius:30, borderTopEndRadius:30}}/></View>
                    <Text style={{color:'#bbb', fontWeight:'normal', fontSize:10, marginBottom:-10}}>77/100 porcento</Text>

                  </View>
                  <View style={{justifyContent:'center', alignItems:'center', marginLeft:20}}>
{/*                     <Text style={{color:'#ccc', fontWeight:'normal', fontSize:12, marginBottom:-5}}>Membros</Text>
                    <Text style={{color:'#ccc', fontWeight:'normal', fontSize:12, marginBottom:3}}>que executam</Text>
                    <View style={{height:(11), marginBottom:3, borderTopEndRadius:30, borderBottomStartRadius:30, width:110, backgroundColor:'transparent', borderWidth:0.5, borderColor:'#fff'}}><View style={{flex:1, width:80, backgroundColor:'#04D9B2', borderBottomStartRadius:30, borderTopEndRadius:30}}/></View>
                    <Text style={{color:'#bbb', fontWeight:'normal', fontSize:10}}>22/20 execuntando</Text> */}

<Text style={{color:'#ccc', fontWeight:'normal', fontSize:12, marginBottom:3}}>Execuntando</Text>
                    <View style={{height:(11), marginBottom:3, borderTopEndRadius:30, borderBottomStartRadius:30, width:110, backgroundColor:'transparent', borderWidth:0.5, borderColor:'#fff'}}><View style={{flex:1, width:70, backgroundColor:'#04D9B2', borderBottomStartRadius:30, borderTopEndRadius:30}}/></View>
                    <Text style={{color:'#bbb', fontWeight:'normal', fontSize:10, marginBottom:-10}}>22/20 membros</Text>

                  </View>

                </View>
                <Animated.View  style={{height:headerY/* ,transform: [{ translateY: headerY }] */,justifyContent:'center', alignItems:'center', width:screenWidth/* , backgroundColor:'red' */}}/>
                </View>
                <SimpleLineIcons name="arrow-down" size={23} color='#eee' style={{marginBottom:9}}></SimpleLineIcons>
            </View>

            <View style={{height:230, width:screenWidth*0.95, backgroundColor:'#262626', marginTop:550, marginLeft:screenWidth*0.025, padding:10, borderRadius:17, overflow:'hidden'}} >
            

            <Image 
            source={require('../../assets/gamma.png')}
            style={{height:250,width:250,position:'absolute', bottom:-30, left:-70, opacity:0.1,transform: [{ rotateZ: '0deg' }]}}
            resizeMode="contain"
            />

            <View style={{justifyContent:'center', alignItems:'center',width:'100%', flexDirection:'row', marginTop:0, marginBottom:0, height:20}}>
            <SimpleLineIcons name="arrow-left" size={18} color='#eee' style={{position:'absolute', top:0, left:0}}></SimpleLineIcons>
              <Text style={{color:'#aaa', fontWeight:'600', fontSize:12, marginBottom:-3}}>VEJA OS JORNAIS MAIS ANTIGOS</Text>
              <SimpleLineIcons name="arrow-right" size={18} color='#eee' style={{position:'absolute', top:0, right:0}}></SimpleLineIcons>
            </View>

              <Text style={{color:'#aaa', fontWeight:'bold', fontSize:38, marginBottom:-3, alignSelf:'center', marginTop:9, color:'#04D9B2', opacity:0.96}}>Jornal Gamma</Text>
              <Text style={{color:'#aaa', fontWeight:'bold', fontSize:16, marginBottom:-3, alignSelf:'center', marginTop:9, color:'#eee', opacity:0.96}}>24 de outubro de 2020   Edição nº27</Text>

              <View style={{justifyContent:'center', alignItems:'center',width:'100%', marginTop:30, marginBottom:0}}>
              <BoxShadow setting={shadowOpt} >
                <TouchableOpacity onPress={()=>console.log(scrollY)} style={{width:'100%', height:40, backgroundColor:'#eee', borderRadius:30, justifyContent:'center'}}>
                <Text style={{color:'#aaa', fontWeight:'bold', fontSize:16, marginBottom:0, alignSelf:'center', marginTop:0, color:'#262626', opacity:0.96}}>SAIBA MAIS</Text>
                </TouchableOpacity>
                </BoxShadow>
            </View>


            </View>

{/*           <LinearGradient colors={['#fff','#000']} height={2000} width={500}/> */}
            <View  height={2000} width={500}/>
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
 
 
