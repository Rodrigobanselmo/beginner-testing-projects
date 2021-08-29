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
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef
} from 'react-native-shared-element';
const DetailsScreen = ({navigation}) => {

  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const IMAGE_WIDTH =windowWidth*0.78
  const IMAGE_HEIGHT =IMAGE_WIDTH*1.5
  const VISIBLE_ITEMS = 3;


  const data = [{image:require('../../assets/4.jpg'),name:'Imagem 1'},
  {image:require('../../assets/various-organic-fruits-5SUBCAL.jpg'),name:'Imagem 2'},
  {image:require('../../assets/vegetables-PD2XTQH.jpg'),name:'Imagem 3'},
  {image:require('../../assets/farmer-is-carrying-crate-full-of-vegetables-Y6GPLEF.jpg'),name:'Imagem 4'},
  {image:require('../../assets/woman-selling-organic-vegetables-to-man-244X2Z3.jpg'),name:'Imagem 5'},
  {image:require('../../assets/farmer-is-carrying-crate-full-of-vegetables-Y6GPLEF.jpg'),name:'Imagem 6'},
  {image:require('../../assets/4.jpg'),name:'Imagem 7'},
  {image:require('../../assets/farmer-is-carrying-crate-full-of-vegetables-Y6GPLEF.jpg'),name:'EVEREST'}]

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
        <TouchableOpacity onPress={() => navigation.navigate('Agricultor')}>
          <Text>NEXT</Text>
          </TouchableOpacity>
       

        <FlatList
          data={data}
          keyExtractor={(item) => item.name}
          scrollEnabled={false}
          contentContainerStyle={{flex:1,alignItems:'center',justifyContent:'center'}}
          CellRendererComponent={({ index ,item, children, style, ...props }) => {
            const newStyle = [
                style,{zIndex:data.length-index,elevation:data.length-index, left:-IMAGE_WIDTH/2, top:-IMAGE_HEIGHT/2},
              ];
            return (
              <View index={index} {...props} style={newStyle} >
                {children}
              </View>
            )
          }}
          renderItem={({item,index}) => {
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
              outputRange:[0.9-1/ VISIBLE_ITEMS,1,0]
            })

            const scale = animatedValue.interpolate({
              inputRange,
              outputRange:[0.88,1,1.2]
            })

            return(
              <Animated.View  style={{position:'absolute', opacity, transform: [{translateX},{scale}]}}>
                <TouchableOpacity onPress={() => navigation.navigate('Agricultor',{item})} /* style={{backgroundColor:'red',zIndex:10000}} */ >
                  <SharedElement id={`ìtem.${item.name}.image`} style={{height:IMAGE_HEIGHT, width:IMAGE_WIDTH, resizeMode:'cover',borderRadius:16}}>
                    <Image source={item.image} style={{height:IMAGE_HEIGHT, width:IMAGE_WIDTH, resizeMode:'cover',borderRadius:16}}/>
                  </SharedElement>      
                  <View  style={{position:'absolute',bottom:20,left:20}}>
                  <SharedElement id={`ìtem.${item.name}.name`}>
                    <Text style={{fontSize:36,fontWeight:'bold',color:'#fff',textTransform:'uppercase'}} >{item.name}</Text>
                  </SharedElement>
                    
                  </View>
                </TouchableOpacity>
              </Animated.View>
            )
          }}
          />

      </SafeAreaView>
</FlingGestureHandler>
</FlingGestureHandler>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});
