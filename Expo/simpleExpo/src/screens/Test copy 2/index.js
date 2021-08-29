import React, { useState, useEffect } from 'react'
import { View, Text, Alert, Keyboard, Modal, TouchableWithoutFeedback,useWindowDimensions,Animated } from 'react-native';
import styled from "styled-components/native";
import Toast from 'react-native-toast-message';
import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Main/Header';
import {ThemeContext} from "styled-components";


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

  const SPACING = 20;
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
        // padding:SPACING,
        paddingTop:theme.statusHeight
      }} 
      pagingEnabled
      renderItem={({item,index})=>renderItem({
        item,
        index,
        scrollX,
        CARD_HEIGHT,
        SPACING,
        ITEM_SIZE
      })}
    />
  )
}

export function renderItem({item, index, scrollX, ITEM_SIZE, CARD_HEIGHT, SPACING}) {
  
  console.log(index)
  const inputRange = [-1, 0, ( ITEM_SIZE * parseInt(index)+150 )  , ( ITEM_SIZE * (parseInt(index) + 1) )]

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange:[ 0, 0, 0, -1000]
  })

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange:[ 1, 1, 1, 0.5]
  })

  return (
    <Animated.View style={{height:CARD_HEIGHT,transform:[{translateY}],opacity,padding:10,width:ITEM_SIZE}}>
      <View style={{flex:1,backgroundColor:'green'}}/>
    </Animated.View>
  )
}
//transform:[{scale}],