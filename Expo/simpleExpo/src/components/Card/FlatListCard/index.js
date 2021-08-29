import React, { useState, useEffect } from 'react'
import { View, Text, Alert, Keyboard, Modal, TouchableWithoutFeedback,useWindowDimensions,Animated } from 'react-native';
import styled from "styled-components/native";
import Toast from 'react-native-toast-message';
import { Button } from '../../Form/Button';
import { Header } from '../../Main/Header';
import {ThemeContext} from "styled-components";
import { RFValue } from 'react-native-responsive-fontsize';
import { RenderCard } from '../../Card/RenderCard';


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

export function FlatListCard({navigation}) {
  
  const theme = React.useContext(ThemeContext)
  const window = useWindowDimensions();
  const scrollX = React.useRef(new Animated.Value(0)).current

  function handleContinue() {
  }
  
  const DATA = [...'123456789012345436547532421'];

  const SPACING = RFValue(20);
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
        SPACING={SPACING}
        ITEM_SIZE={ITEM_SIZE}
      />}
    />
  )
}
