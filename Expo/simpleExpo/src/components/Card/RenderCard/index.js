import React, { useState, useEffect } from 'react'
import { View, Text, Alert, Keyboard, Modal, TouchableWithoutFeedback,useWindowDimensions,Animated } from 'react-native';
import styled from "styled-components/native";
import Toast from 'react-native-toast-message';
import { Button } from '../../Form/Button';
import { Header } from '../../Main/Header';
import {ThemeContext} from "styled-components";
import { RFValue } from 'react-native-responsive-fontsize';


export function RenderCard({item, index, scrollX, ITEM_SIZE, CARD_HEIGHT}) {
  
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
      {/* <Inside/> */}
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