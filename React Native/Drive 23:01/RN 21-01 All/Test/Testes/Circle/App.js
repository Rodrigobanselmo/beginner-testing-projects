

 import React, { useEffect, useState, useRef } from 'react';
 import { Dimensions, View, SafeAreaView, Text, StyleSheet, FlatList, TouchableHighlight, ScrollView,  RefreshControl } from 'react-native';
 import LinearGradient from 'react-native-linear-gradient';
 import { ProgressCircle } from 'react-native-svg-charts'
import Donut from './donut'
import DonutS from './donutS'
import DonutSD from './donutSD'
import Icon from 'react-native-vector-icons/Ionicons';

 ////


 export default () => {
 

    const [refreshing, setRefreshing] = React.useState(false);
  
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
  
      setTimeout(() => {
        setRefreshing(false)
          FlatMounthRef.current.scrollTo({x: 0, y: 270, animated: true}) //scrollto é uma função do proprio scrowview //animated opcional
        
      }, 500);
    }, []);

    const FlatMounthRef = useRef(null);
    const screenWidth = Dimensions.get('window').width;
    const [scrollTop, setscrollTop] = useState(1)
    const [heighHeader, setheighHeader] = useState(0)
    const [progressBar, setprogressBar] = useState(0.77)
    const [posY, setposY] = useState(270)

    const scrollFlatlistToMonth = () => {  //faz com que na hora de carregar mande o scrol para a posição certa e nao fique no inicial padrao embora o mes esteja selecionado corretamente
    
      FlatMounthRef.current.scrollTo({x: 0, y: 270, animated: true}) //scrollto é uma função do proprio scrowview //animated opcional
        
   
    }


    const scrollFlatlistToMonth2 = (e) => {  //faz com que na hora de carregar mande o scrol para a posição certa e nao fique no inicial padrao embora o mes esteja selecionado corretamente
        
        let posX = e.nativeEvent.contentOffset.y



        if (posX==0) {
          onRefresh();
        }  else if (posX<270) {
          FlatMounthRef.current.scrollTo({x: 0, y: 270, animated: true}) //scrollto é uma função do proprio scrowview //animated opcional
        }


      }

      const scrollFlatlistToMonth3 = (e) => {  //faz com que na hora de carregar mande o scrol para a posição certa e nao fique no inicial padrao embora o mes esteja selecionado corretamente
        



        let posX = e.nativeEvent.contentOffset.y

        setposY(posX)

        if (posX<270 && posX>50) {
          setscrollTop((1-e.nativeEvent.contentOffset.y/270)*0.4+1)
          setheighHeader((1-e.nativeEvent.contentOffset.y/270)*90)

          if (posX <= posY) {
            setprogressBar((1-e.nativeEvent.contentOffset.y/270)*0.77)
          }

        }

        if (posX==270) {
          setprogressBar(0.77)
        }

      }


    useEffect(() => {
        setTimeout(() => {
            scrollFlatlistToMonth()
        }, 10); 
        }, [])
    


     return (

       <View style={[styles.View, {backgroundColor:'#121212'}]} >



          <ScrollView 
          ref={FlatMounthRef}
          style={{flex:1}} 
          alwaysBounceVertical={false} 
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={scrollFlatlistToMonth2}
          onScroll={scrollFlatlistToMonth3}
          scrollEnabled={refreshing==true?false:true}
          >

            <View style={{justifyContent:'flex-end', alignItems:'center',height:800, width:screenWidth*4, position:'absolute', left:-screenWidth*1.5,top:-320, backgroundColor:'#1e1e1e', borderBottomRightRadius:5000, borderBottomLeftRadius:5000}} >
                <View style={{justifyContent:'center', alignItems:'center', height:180, width:screenWidth, flexDirection:'row', marginBottom:30}}>

{/*                   <View style={{justifyContent:'center', alignItems:'center', height:30, width:30, backgroundColor:'transparent',flexGrow:1}}></View> */}
{/*                   <ProgressCircle style={{ height: scrollTop, width:scrollTop, flexGrow:1}} belowChart={false} progress={progressBar} strokeWidth={10} progressColor={`#04D9B2`} /> */}
                  <Donut percentage={16264.00} color={'#04D9B2'} delay={500 + 100} max={21000.00} radius={75} scrollView={scrollTop}/>
{/*                   <View style={{justifyContent:'center', alignItems:'center', height:30, width:30, backgroundColor:'transparent',flexGrow:1}}></View> */}
                </View>

                <View style={{justifyContent:'center', alignItems:'center', height:(heighHeader), width:screenWidth/* , backgroundColor:'red' */}}/>

                <View style={{justifyContent:'center', alignItems:'center', width:screenWidth, flexDirection:'row',marginTop:-140}}>
                <DonutS percentage={9} color={'#ccc'} delay={500 + 100} max={10} radius={55} scrollView={scrollTop}/>
                <View style={{justifyContent:'center', alignItems:'center', height:(heighHeader), width:heighHeader/5+150/* , backgroundColor:'red' */}}/>
                <DonutSD percentage={75} color={'#ccc'} delay={500 + 100} max={75} radius={55} scrollView={scrollTop}/>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', height:(heighHeader), width:screenWidth/* , backgroundColor:'red' */}}/>
                <Icon name="ios-menu" size={25} backgroundColor="#055902" color='#fff'> 
            </Icon>


            </View>
{/*           <LinearGradient colors={['#fff','#000']} height={2000} width={500}/> */}
            <View  height={2000} width={500}/>
          </ScrollView>

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
 });
 
 
 