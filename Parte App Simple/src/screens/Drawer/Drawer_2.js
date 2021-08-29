/* eslint-disable no-unused-vars */
import React, {useState,useContext,useRef,useEffect} from 'react';
import {ThemeContext} from "styled-components";
import {SafeAreaView, StyleSheet,StatusBar,Dimensions, Text,Animated,View, ScrollView} from 'react-native';
import {useReactModal} from '../../context/ModalContext'
import styled from "styled-components";
import {Header} from '../../components/basicComponents/Header';
import changenavigationBarColor from 'react-native-navigation-bar-color';
import Card from './card'
import {v4} from "uuid";
import { TouchableOpacity,TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

const ContainerSafe = styled(SafeAreaView)`
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  background-color:${({theme})=>theme.background.card};
`;

const CheckListData =
{title:"PGR",id:'1',data:[
  {group:'Limpeza e organização do local de trabalho',id:'1',questions:[
    {action:{yes:{rec:''},no:{child:'1.1.1'},na:0},text:'0As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos .',id:'1.1'},
  ]}
]}

const CHECK_LIST_MODEL = [
  {id:'1',groupId:'1',questionId:'1.1',selected:'',obs:'Aenean quam nunc, mattis necc mauris varius feugiat ut non velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat, eros at interdum congue, orci felis commodo sem, lacinia pulvinar nibh sapien sed sem. Mauris.'}
]

const RISK_FACTORS = [
  {id:'1',text:'Riscos 1',CA:{num:'',desc:''},generator:''}
]


export default function App() {

  changenavigationBarColor('#0d0d0d', false)


  const windowHeight = Dimensions.get('window').height

  const title = CheckListData.title

  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const dispatch = useDispatch();
  const answers = useSelector(state => state.answer);

  useEffect(() => {
    !answers?.data && dispatch({type: 'CREATE_CHECKLIST',payload:CheckListData})
  }, [])

  function Confirmnav() {

  }

  return (
    <ContainerSafe >
      <StatusBar backgroundColor={themeContext.background.card} barStyle="dark-content"/>
{/*       <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%',flex:1,flexDirection:'column'}}> */}
      <Header text={title} type="Back" secondIcon/>
      <View style={{height:(windowHeight-60),width:'100%'}}>
        {answers?.data && <Card CHECK_LIST_MODEL={CHECK_LIST_MODEL} CheckListData={answers} dispatch={dispatch}/>}
      </View>
{/*       </ScrollView> */}
    </ContainerSafe>

  );
}

const styles = StyleSheet.create({});
