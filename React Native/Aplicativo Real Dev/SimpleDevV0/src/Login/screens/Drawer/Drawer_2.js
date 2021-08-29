/* eslint-disable no-unused-vars */
import React, {useState,useContext,useRef,useEffect} from 'react';
import {ThemeContext} from "styled-components";
import {SafeAreaView, StyleSheet,StatusBar,Dimensions, Text,Animated,View, ScrollView} from 'react-native';
import {useReactModal} from '../../context/ModalContext'
import styled from "styled-components";
import {Header} from '../../components/basicComponents/Header';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Card from './card'
import {v4} from "uuid";
import { TouchableOpacity,TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

const ContainerSafe = styled(SafeAreaView)`
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  background-color:${({theme})=>theme.background.back};
  background-color:${({theme})=>theme.background.card};
`;

const CheckListData = 
{title:"PGR",id:'1',data:[
  {group:'Limpeza e organização do local de trabalho',id:'1',questions:[
    {action:{YES:{rec:''},NO:{child:'1.1.1'},NA:0},text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos .',id:'1.1'},
    {action:{YES:{risk:'1'},NO:0,NA:0},parent:'1.1',text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos .',id:'1.1.1'},
    {action:{YES:0,NO:0,NA:0},text:'Os trabalhadores, que lidam com substância químicas perigosas, recebem treinamento quanto aos riscos que estas substâncias representaram para a saúde e quanto às formas seguras de manipulação.',id:'1.2'},
    {action:{YES:0,NO:0,NA:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:'1.3'},
    {action:{YES:0,NO:0,NA:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:v4()},
    {action:{YES:0,NO:0,NA:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:v4()},
  ]},
  {group:'Ruído',id:2,questions:[
    {action:{YES:{rec:''},NO:{child:'2.1.1'},NA:0},text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos .',id:'2.1'},
    {action:{YES:{risk:'2'},NO:0,NA:0},parent:'2.1',text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos .',id:'2.1.1'},
    {action:{YES:0,NO:0,NA:0},text:'Os trabalhadores, que lidam com substância químicas perigosas, recebem treinamento quanto aos riscos que estas substâncias representaram para a saúde e quanto às formas seguras de manipulação.',id:'2.2'},
    {action:{YES:0,NO:0,NA:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:'2.3'},
    {action:{YES:0,NO:0,NA:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:v4()},
    {action:{YES:0,NO:0,NA:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:v4()},
  ]},
]}

const CHECK_LIST_RESPONSE = [
  data={id:1}
]

const RISK_FACTORS = [
  {id:'1',text:'Riscos 1',CA:{num:'',desc:''},generator:''}
]


export default function App() {
  
  changeNavigationBarColor('#0d0d0d', false)


  const windowHeight = Dimensions.get('window').height
  const [key, setKey] = useState(1);

  const title = CheckListData.title

  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const dispatch = useDispatch();
  const answers = useSelector(state => state.answer);

  useEffect(() => {
    !answers?.data && dispatch({type: 'CREATE_CHECKLIST',payload:CheckListData})
  }, [])

  function ConfirmNav() {
    
  }

  return (
    <ContainerSafe >
      <StatusBar backgroundColor={themeContext.background.card} barStyle="dark-content"/>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}}>
      <Header text={title} type="Back" secondIcon/>
      <View style={{height:(windowHeight-60),width:'100%'}}>
        {answers?.data && <Card CheckListData={answers} _key={key} dispatch={dispatch}/>}
      </View>
      </ScrollView>
    </ContainerSafe>
    
  );
}

const styles = StyleSheet.create({});
