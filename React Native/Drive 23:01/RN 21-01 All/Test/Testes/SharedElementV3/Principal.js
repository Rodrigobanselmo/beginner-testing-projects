import React , { useLayoutEffect, useState } from 'react';
import { Dimensions, View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView,  RefreshControl, Image, Animated,Easing, StatusBar } from 'react-native';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import {SharedElement} from 'react-navigation-shared-element';
const Principal = ({navigation}) => {

  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const IMAGE_WIDTH =windowWidth*0.78
  const IMAGE_HEIGHT =IMAGE_WIDTH*1.5
  const VISIBLE_ITEMS = 3;


  const data = [{image:require('../GammaPrimeiro/assets/4.jpg'),name:'Imagem',key:132432},
  {image:require('../GammaPrimeiro/assets/various-organic-fruits-5SUBCAL.jpg'),name:'Imagem 2',key:25232532},
  {image:require('../GammaPrimeiro/assets/vegetables-PD2XTQH.jpg'),name:'Imagem 3',key:3234325},
  {image:require('../GammaPrimeiro/assets/woman-selling-organic-vegetables-to-man-244X2Z3.jpg'),name:'Imagem 5',key:443324325},
  {image:require('../GammaPrimeiro/assets/farmer-is-carrying-crate-full-of-vegetables-Y6GPLEF.jpg'),name:'EVEREST',key:523432432}]

  const [activeIndex, setactiveIndex] = useState(0)
  const animatedValue = React.useRef(new Animated.Value(0)).current
  const reactiveAnimated = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue:reactiveAnimated,
      duration:300,
      useNativeDriver:true
    }).start();
  }, [])

    const setactiveSlide = React.useCallback((newIndex) => {
      setactiveIndex(newIndex);
      reactiveAnimated.setValue(newIndex)
    })

    return (

      <FlingGestureHandler key='LEFT' direction={Directions.LEFT} onHandlerStateChange={ev=>{
        if (ev.nativeEvent.state === State.END) {
          if (activeIndex === data.length-1) {
            return;
          }
          setactiveSlide(activeIndex+1)
        }
      }} >
        <FlingGestureHandler key='RIGHT' direction={Directions.RIGHT} onHandlerStateChange={ev=>{
        if (ev.nativeEvent.state === State.END) {
          if (activeIndex === 0) {
            return;
          }
          setactiveSlide(activeIndex-1)
        }
      }} >

      <SafeAreaView style={{flex:1,backgroundColor:'#121212'}}>
      <StatusBar hidden={true}/>
        <TouchableOpacity onPress={() => navigation.navigate('Secundaria')}>
          <Text>NEXT</Text>
          </TouchableOpacity>
       
        <View>
        {data.map((item,index)=> {
           const inputRange = [index - 1, index,index+1]
           const translateY = animatedValue.interpolate({
             inputRange,
             outputRange:[-30,0,30]
           })
           const translateX = animatedValue.interpolate({
             inputRange,
             outputRange:[30,0,-30]
           })

           const opacity = animatedValue.interpolate({
             inputRange,
             outputRange:[0.9-1/VISIBLE_ITEMS,1,0]
           })

           const scale = animatedValue.interpolate({
             inputRange,
             outputRange:[0.88,1,1.2]
           })

           if (index >= activeIndex - 1 && index <= activeIndex+VISIBLE_ITEMS) {

             return (
               <Animated.View  key={index} style={{position:'absolute',opacity, transform: [{translateX},{scale}],zIndex:data.length-index,elevation:data.length-index, left:(windowWidth-IMAGE_WIDTH)/2, top:200}}>
                <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Secundaria',{item: data[activeIndex]})} /* style={{backgroundColor:'red',zIndex:10000}} */ >
                  <SharedElement id={`item.${item.key}.image`} style={{height:IMAGE_HEIGHT, width:IMAGE_WIDTH, resizeMode:'cover',borderRadius:16}}>
                    <Image source={item.image} style={{height:IMAGE_HEIGHT, width:IMAGE_WIDTH, resizeMode:'cover',borderRadius:16}}/>
                  </SharedElement>      
                  <View  style={{position:'absolute',bottom:20,left:20}}>
                  <SharedElement id={`item.${item.key}.name`}>
                    <Text style={{fontSize:36,fontWeight:'bold',color:'#fff',textTransform:'uppercase'}} >{item.name}</Text>
                  </SharedElement>
                    
                  </View>
                </TouchableOpacity>
              </Animated.View>
              )
            }
              
            })

            }
        </View>



      </SafeAreaView>
</FlingGestureHandler>
</FlingGestureHandler>
    );
};

export default Principal;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});
