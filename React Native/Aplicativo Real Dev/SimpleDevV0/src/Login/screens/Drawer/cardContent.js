/* eslint-disable no-unused-vars */
import React, {useState,useContext,useRef,useEffect} from 'react';
import {ThemeContext} from "styled-components";
import {SafeAreaView, StyleSheet,StatusBar,Dimensions, Text,View, ScrollView} from 'react-native';
import {useReactModal} from '../../context/ModalContext'
import styled from "styled-components/native";
import {Header} from '../../components/basicComponents/Header';
import {v4} from "uuid";
import {ButtonInitial,IconButton,ButtonAnimated} from '../../components/basicComponents/Button';
import Icons from '../../components/Icons'

import { TouchableOpacity,TextInput } from 'react-native-gesture-handler';

const TextQuestion = styled.Text`
  text-align:center;
  font-size:15px;
`;


const ViewTextContent = styled.View`
/*   background-color: ${({theme})=>theme.background.lineActive}; */
  background-color:#fff; 
  padding:20px;
  margin:15px 15px;
  border-radius:10px;
`;


const TextGroup = styled.Text`
  width:75%;
  color: ${({theme})=>theme.text.third};
`;

const TextProgress = styled.Text`
  width:auto;
  color: ${({theme})=>theme.text.third};
`;



export function CheckList({item,group,groupId,onAnimatedFlip,index,data,dispatch}) {
  


  const windowHeight = Dimensions.get('window').height

  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();

  function onAnswer(peek) {
    dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
  }

  return (
    <View style={{flex:1}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:15}}>
          <TextGroup ellipsizeMode={'tail'} numberOfLines={1} >{group}</TextGroup>
          <TextProgress>{`${index+1}/${data.length}`}</TextProgress>
      </View>
      <ViewTextContent style={{elevation:5}}>
        <TextQuestion style={{lineHeight:20}}>{item.text}</TextQuestion>
      </ViewTextContent>
      <View style={{flex:1,justifyContent:'flex-start',marginHorizontal:20}}>
        <ButtonInitial
          secondary={item?.selected && item.selected == 'yes' ? true : false}
          onPress={()=>onAnswer('yes')}
          scale={0.67}
          elevation={true}
          text='SIM'
          />
        <ButtonInitial
          secondary={item?.selected && item.selected == 'no' ? true : false}
          onPress={()=>onAnswer('no')}
          scale={0.67}
          elevation={true}
          text='NÃO'
          />
        <ButtonInitial
          secondary={item?.selected && item.selected == 'na' ? true : false}
          onPress={()=>onAnswer('na')}
          scale={0.67}
          elevation={true}
          text='N.A.'
        />
      </View>
      <View style={{flexDirection:'row',justifyContent:'flex-start',marginHorizontal:15}}>
        <View style={{flexDirection:'row',flex:1}}>
          <IconButton
            iconName='Camera'
            onPress={()=>onAnimatedFlip(180)}
            style={{marginRight:5}}
            warn={''}
            info={''}
            color={themeContext.text.third}
          />
          <IconButton
            iconName='Doc'
            onPress={()=>onAnimatedFlip(180)}
            style={{marginRight:5}}
            color={themeContext.text.third}
          />
        </View>
        <IconButton
            iconName='Warn'
            onPress={()=>onAnimatedFlip(180)}
            style={{marginRight:-5}}
            color={themeContext.text.third}
          />
      </View>
      </View>
    
  )
}

export function Observation({item,group,onAnimatedFlip,setValue,value}) {
  


  const windowHeight = Dimensions.get('window').height

  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();

  function ConfirmNav() {
    
  }

  return (
    <View >
      <View>
        <Text onPress={()=>onAnimatedFlip(0)}>Go Back</Text>
        <TextInput 
          value={value}
          onChangeText={(value)=>{setValue(value)}}
          placeholder="E-mail"
          style={{flex: 1,paddingLeft: 10,color: '#000',}}
          autoCapitalize="none"
          returnKeyType="done"
        />
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({

  textInput: {flex: 1,paddingLeft: 10,color: '#000',},
});
