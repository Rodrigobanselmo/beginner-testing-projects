import React, { useState, useEffect } from 'react'
import { View, Text, Alert, Keyboard, Modal, TouchableWithoutFeedback,useWindowDimensions,Animated } from 'react-native';
import styled from "styled-components/native";
import Toast from 'react-native-toast-message';
import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Main/Header';
import {ThemeContext} from "styled-components";
import { RFValue } from 'react-native-responsive-fontsize';
import { RenderCard } from '../../components/Card/RenderCard';


const SafeContainer = styled.SafeAreaView`
  display: flex;
  flex: 1;
  padding-top: ${({theme})=>theme.statusHeight}px;
  padding-bottom: 20px;
`;
const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 0 18px;
`;

export default function Home({navigation}) {
  
  const theme = React.useContext(ThemeContext)
  const window = useWindowDimensions();
  const scrollX = React.useRef(new Animated.Value(0)).current

  function handleContinue() {
  }
  
  const DATA = [...'123456789012345436547532421'];

  const CARD_HEIGHT = window.height;
  const ITEM_SIZE = window.width;

  return (
    <Animated.FlatList
      data={DATA}
      horizontal
      keyExtractor={(_,index)=>index.toString()}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: {x:scrollX} }}],
        { useNativeDriver: true }
      )}
      contentContainerStyle={{
        paddingTop:theme.statusHeight
      }} 
      pagingEnabled
      renderItem={({item,index})=><RenderCard
        item={item}
        index={index}
        scrollX={scrollX}
        CARD_HEIGHT={CARD_HEIGHT}
        ITEM_SIZE={ITEM_SIZE}
      />}
    />
  )
}

export function renderItem({item, index, scrollX, ITEM_SIZE, CARD_HEIGHT, SPACING}) {
  
  console.log(2)

  const FIRST_NODE = ( ITEM_SIZE * ( parseInt(index) ) )
  const SECOND_NODE = ( ITEM_SIZE * (parseInt(index + 1) ) )
  const THIRD_NODE = ( ITEM_SIZE * (parseInt(index + 2) ) )
  const inputRange = [-1, 0,  FIRST_NODE ,SECOND_NODE, THIRD_NODE ]
  const inputOpacity = [-1, 0,  FIRST_NODE ,SECOND_NODE, SECOND_NODE+1 ]

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange:[ 0, 0, 0, ITEM_SIZE, 0]
  })

  const scale = scrollX.interpolate({
    inputRange,
    outputRange:[ 1, 1, 1, 0.8, 1]
  })

  const opacity = scrollX.interpolate({
    inputRange:inputOpacity,
    outputRange:[ 1, 1, 1, 0.7, 0]
  })

  return (
    <Animated.View style={{height:CARD_HEIGHT,transform:[{translateX},{scale}],opacity,padding:50,width:ITEM_SIZE}}>
      <Inside/>
      <View style={{flex:1,backgroundColor:`#${index}${index}${index}`}}/>
    </Animated.View>
  )
}

export function Inside() {
  const window = useWindowDimensions();
  const [state, setstate] = useState(null)

  return (
    <Text onPress={()=>{
      setstate(Math.random())
      console.log(Math.random())
    }}>{window.width}</Text>
  )
}
//transform:[{scale}],