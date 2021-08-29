import React, { useState, useEffect } from 'react'
import { View, Text, Alert, Keyboard, Modal, TouchableWithoutFeedback,FlatList,Animated } from 'react-native';
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

  const scrollY = React.useRef(new Animated.Value(0)).current

  function handleContinue() {
  }
  
  const DATA = [...'123456789012345436547532421'];

  const SPACING = 20;
  const CARD_HEIGHT = 80;
  const ITEM_SIZE = CARD_HEIGHT + SPACING;

  return (
    <Animated.FlatList
      data={DATA}
      // horizontal
      keyExtractor={(_,index)=>index.toString()}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: {y:scrollY} }}],
        { useNativeDriver: true }
      )}
      contentContainerStyle={{
        padding:SPACING,
        paddingTop:theme.statusHeight
      }} 
      renderItem={({item,index})=>renderItem({
        item,
        index,
        scrollY,
        CARD_HEIGHT,
        SPACING,
        ITEM_SIZE
      })}
    />
  )
}

export function renderItem({item, index, scrollY, ITEM_SIZE, CARD_HEIGHT, SPACING}) {
  
  console.log(index)
  const inputRange = [-1, 0, ( ITEM_SIZE * parseInt(index) ), ( ITEM_SIZE * (parseInt(index) + 2) )]

  const scale = scrollY.interpolate({
    inputRange,
    outputRange:[ 1, 1, 1, 0]
  })

  return (
    <Animated.View style={{transform:[{scale}],height:CARD_HEIGHT,marginBottom:SPACING,width:'100%',backgroundColor:'green'}}/>
  )
}
