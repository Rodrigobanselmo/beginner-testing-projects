/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import {ThemeContext} from "styled-components";
import {Dimensions,View, } from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import styled,{css} from "styled-components/native";
import {ButtonInitial,IconButton} from '../../../components/basicComponents/Button';
import Icons from '../../../components/Icons'
import {Modal} from './comp'
import {Ascendent} from '../../../helpers/Sort'
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import clone from 'clone';
import { useNavigation } from '@react-navigation/native';
import { lighten,darken } from 'polished';
import useTimeOut from '../../../hooks/useTimeOut'

import { TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native-gesture-handler';

const EquivalentTouch = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 10px;
  margin-bottom: 5px;
  margin-top: 5px;
  background-color: ${({theme})=>theme.background.paper};
  border: 1px solid ${({theme})=>theme.background.line};
  border-radius: 10px;

  ${props => props.confirmed && css`
    background-color: ${({theme})=>theme.primary.lighter};
  `}
`;

const InputTextDesc = styled.TextInput`
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
  max-height:200px;
  border-radius: 10px;
  color: ${({theme})=>theme.text.primary};
  background-color: ${({theme})=>darken(0.01,theme.background.paper)};
  border: 2px solid ${({theme})=>theme.background.line};

  ${props => props.windowHeight >700 && css`
    max-height:300px;
  `}
`;

const Circle = styled.View`
  height: 20px;
  width: 20px;
  border: 1px solid ${({theme})=>theme.background.line};
  background-color: ${({theme,active})=>!active?theme.background.paper:theme.primary.lighter};
  border-radius:20px;
  margin-right:10px;
  opacity:0.7;
  elevation:2;
`;

const Group = styled.Text`
  color: ${({theme})=>theme.text.secondary};
  font-size:15px;
  flex:1;
  text-align-vertical: center;
`;

const ContainerGroup = styled.TouchableOpacity`
  justify-content:center;
  border: 2px solid ${({theme})=>theme.background.line};
  align-items: center;
  flex-direction: row;
  padding: 10px 5px 10px 10px;
  background-color: ${({theme})=>theme.background.paper};
  margin-bottom:8px;
  border-radius:10px;
`;

const TextQuestion = styled(Animatable.Text)`
  text-align:center;
  font-size:16px;

  ${props => props.windowHeight <700 && css`
    line-height:20px;
  `}
  ${props => props.windowHeight >700 && css`
    line-height:22px;
    font-size:18px;
  `}
  ${props => props.windowHeight >800 && css`
    line-height:26px;
    font-size:20px;
  `}
`;

const TextSubQuestion = styled.Text`
  text-align:left;
  font-size:13px;
    margin-top:8px;
  margin-bottom:-5px;

  ${props => props.margin && css`
    margin-top:10px;
    margin-top:5px;
    margin-bottom:-10px;
  `}
`;

const ViewTextContent = styled.View`
/*   background-color: ${({theme})=>theme.background.lineActive}; */
  background-color: ${({theme})=>theme.background.paper};
  padding:20px;
  margin:15px 15px;
  border-radius:10px;


  ${props => props.windowHeight <700 && css`
  `}
  ${props => props.windowHeight >700 && css`
    flex:1;
    justify-content:center;
  `}
  ${props => props.windowHeight >800 && css`
  `}
  ${props => props.flexNot && css`
    flex:0;
    justify-content:center;
  `}
`;

const TextGroup = styled.Text`
  width:75%;
  color: ${({theme})=>theme.text.third};
  font-size:15px;
`;

const TextProgress = styled.Text`
  width:auto;
  color: ${({theme})=>theme.text.third};
  ${props => props.windowHeight >700 && css`
    font-size:16px;
  `}
  ${props => props.windowHeight >800 && css`
    font-size:17px;
  `}
  ${props => props.button && css`
    color: ${({theme})=>theme.primary.textInside};
    font-size:13px;
  `}
`;

export function CardCheckList({isMother,activeIndex,groupIndex,setactiveSlide,item,group,groupId,onAnimatedFlip,index,data,dispatch,model,answer,sheetRef}) {

  const windowHeight = Dimensions.get('window').height
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const risk = useSelector(state => state.risk);
  const riskAnswer = useSelector(state => state.riskAnswer);
  const riskData = useSelector(state => state.riskData);
  const obs = useSelector(state => state.obs);
  const answers = useSelector(state => state.answer);
  const employeeChosen = useSelector(state => state.employeeChosen);
  const checklist = useSelector(state => state.checklist);
  const navigation = useNavigation();
  
  const [onTimeOut,onClearTime] = useTimeOut();

  // console.log('periculoso',checklist?.periculoso)
  // console.log('risk',risk)
  // console.log('riskData',riskData)

  const questionIndexParent = item?.parent ? checklist.data[groupIndex].questions[checklist.data[groupIndex].questions.findIndex(i=>i.id==item.parent)]?.type == 'mult' : false

  function onAnswer(peek,selected) {
    
    dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId,per:questionIndexParent}})//item == {action:{},id:'',parent?,hide?,... }
    function setAnswer() {
      var newAnswer = {groupId:groupId,questionId:item.id,selected:peek}
      var list = [...answers]
      list = clone(list)

      var indexAnswer = list.findIndex(i=>i.groupId == groupId&&i.questionId == item.id)
      if (indexAnswer != -1) {
          if (list[indexAnswer]?.selected == peek) { //selecionar reposta ja selecionada
              //list.splice(indexAnswer, 1);
              if (list[indexAnswer].selected) delete list[indexAnswer]['selected']
          } else { //selecionar outra resposta
              list[indexAnswer] = {...list[indexAnswer],...newAnswer}
          }
      } else { //nenhum selecionada
          list.push({...newAnswer})
      }
      return [...list];
    }

    function onJumpData() {
      return checklist.data[groupIndex]?.jump ?checklist.data[groupIndex].jump:[]
    }
  
    function filterJump() {
      var newData = [...checklist.data[groupIndex].questions]
      newData = clone(newData)
      var mother = false

      const newAnswers = [...setAnswer()]
      newData.filter(i=>(i?.mother || i?.subMother)).map(i=>{
            if (newAnswers.findIndex(fi=>fi.questionId==i.id) == -1 || (newAnswers.findIndex(fi=>fi.questionId==i.id) != -1 && !newAnswers[newAnswers.findIndex(fi=>fi.questionId==i.id)]?.selected)) mother = true
        })
      if (mother) newData = [...checklist.data[groupIndex].questions.filter(i=>i?.mother || i?.subMother)]
      else {
        onJumpData().map(i=>{
          const ansInd = newAnswers.findIndex(fi=>fi.questionId==i.questionId)
          if (ansInd == -1 || (newAnswers[ansInd] && (newAnswers[ansInd].selected == i.selected || !newAnswers[ansInd].selected || (Array.isArray(newAnswers[ansInd].selected) && newAnswers[ansInd].selected.includes(i.selected))))) {
            if (i?.g && i.g.length > 0) newData = [...newData.filter(fi=>fi.id==i.questionId||!i.g.includes(fi.group))]
            if (i?.q && i.q.length > 0) newData = [...newData.filter(fi=>!i.q.includes(fi.id))]
          }
        })
      }
      return [...newData]
    }

    function filterExcludeJump() {
      const array = [];
      const arrayAll = [];
      const arrayParent = [];
      const jump = [];
      filterJump().map((item)=>{
        jump.push(item.id) //notJump
      })
      checklist.data[groupIndex].questions.map(itm=>{
        if (!jump.includes(itm.id)) {
          array.push(itm.id)
          arrayAll.push(itm)
        }
        // if (itm?.parent && !jump.includes(itm?.parent) && !arrayParent.includes(itm?.parent)) {
        if (itm?.parent) {
          if (!arrayParent.includes(itm.parent) &&  !jump.includes(itm.parent)) {
            array.push(itm.id)
            arrayAll.push(itm)
          } 
          else if (itm?.subParent) {
            itm.subParent.map(sub=>{
              if (!arrayParent.includes(sub) &&  !jump.includes(sub)) {
                array.push(itm.id)
                arrayAll.push(itm)
              } 
            })
          }
        }
      })
      return [array,arrayAll]
    }

    function onGoBack() {
      if (peek === 'goBack') {
        if (isMother || ( item?.mother|| item?.subMother)) setactiveSlide(0)
        dispatch({type: 'CHECKLIST_BACK',payload:{itemId:item.id,groupId,parentId:item.parent}})
        dispatch({type: 'ANSWER_CLEAN_PARENT',payload:{parentId:item.parent,groupId,itemId:item.id}})
      }
    }

    function onChild() {
      if (item.action[peek]?.child) {
        dispatch({type: 'CHECKLIST_CHILD',payload:{peek,itemId:item.id,groupId,childId:item.action[peek].child}})
      }
    }

      function openSheet(remove) {
        if (!(item.action[peek]?.data && item.action[peek].data.length > 0)) return 

        function onChooseRisk({modalData,back,sheetOpen}) {
          if (modalData.length == 0) {
            if (remove) {
              remove()
              if (sheetOpen) sheetRef.current.snapTo(1)
              // dispatch({type: 'CHOOSE_MULT_RISK_ANSWER',payload:back})
              dispatch({type: 'CHOOSE_RISK_ANSWER',payload:back[0]})
              item.action[peek].data.map(i=>{
                if (riskAnswer.risks[i.risk]) {
                  dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},answer:{selected:peek,questionId:item.id,groupId}}})
                } else if (Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).length>0) {
                  const cargoArrayId = []
                  Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).map(key=>{
                    cargoArrayId.push(key.split('--')[1])
                  })
                  dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},cargoArrayId,answer:{selected:peek,questionId:item.id,groupId}}})
                }
              })
              return
            }
            if (sheetOpen) sheetRef.current.snapTo(1)
            dispatch({type: 'CHOOSE_RISK_ANSWER',payload:back[0]})
            dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId,per:questionIndexParent}})//item == {action:{},id:'',parent?,hide?,... }
            dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
            item.action[peek].data.map(i=>{
              if (riskAnswer.risks[i.risk]) {
                dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},answer:{selected:peek,questionId:item.id,groupId}}})
              } else if (Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).length>0) {
                const cargoArrayId = []
                Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).map(key=>{
                  cargoArrayId.push(key.split('--')[1])
                })
                dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},cargoArrayId,answer:{selected:peek,questionId:item.id,groupId}}})
              }
            })
            onChild()
            return
          }
          const MODAL_DATA = [...modalData]
          const Value = MODAL_DATA[0]
          MODAL_DATA.splice(0,1)

          if (Object.keys(riskAnswer.risks).filter(fi=>fi.includes(Value.item.risk)).length>0) {
            const callback = {item:Value.item,cargoArrayId:Object.keys(employeeChosen.chosen).length == 0 ?null:Object.keys(employeeChosen.chosen),data:{},answer:{selected:peek,questionId:item.id,groupId}}
            onChooseRisk({sheetOpen,modalData:MODAL_DATA,back:back?[...back,callback]:[callback]})
            return
          }

          

          setTimeout(() => {
            reactModal.alert({
              confirmButton:'Adicionar',
              optionHide:true,
              // childrenComponent:(onConfirm,onClose)=>Modal({fator:Value.fator,item:Value.item,onClose,answers:{selected:peek,questionId:item.id,groupId},riskPosition,dispatch}),
              // childrenComponent:(onConfirm,onClose)=>Modal({fator:route.params.text,answer:route.params.answer,item:{...route.params.item,...data},onClose,answers,riskPosition,dispatch,cargoArrayId:data?.risk?null:active,onFunction:onFunction}),
              childrenComponent:(onConfirm,onClose)=>Modal({fator:Value.fator,cargoArrayId:Object.keys(employeeChosen.chosen).length == 0 ?null:Object.keys(employeeChosen.chosen),item:Value.item,onClose,answers:{selected:peek,questionId:item.id,groupId},riskPosition:riskAnswer,dispatch,callBack:(callback)=>onChooseRisk({sheetOpen,modalData:MODAL_DATA,back:back?[...back,callback]:[callback]}),notDispatch:true}),
              onConfirm:()=>{},
            })
          }, 400);
        }
        
        const modalData = []
        item.action[peek].data.map(i=>{
          if (i.man) modalData.push({fator:risk[i.risk]?.name??risk[i.risk]?.atividade,item:i})
        })

        function addRisk() {
          if (remove) remove()
          dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId,per:questionIndexParent}})//item == {action:{},id:'',parent?,hide?,... }
          dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
          if (item.action[peek].data.length!=1) {
            sheetRef.current.snapTo(1)
          }
          if (!item.action[peek]?.child && (!isMother || !( item?.mother|| item?.subMother))) setactiveSlide(activeIndex+1)

          item.action[peek].data.map(i=>{
            if (riskAnswer.risks[i.risk]) {
              dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},answer:{selected:peek,questionId:item.id,groupId}}})
            } else if (Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).length>0) {
              const cargoArrayId = []
              Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).map(key=>{
                cargoArrayId.push(key.split('--')[1])
              })
              dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},cargoArrayId,answer:{selected:peek,questionId:item.id,groupId}}})
            }
          })
          onChild()
        }

        // const addToOldRisk = []
        // item.action[peek].data.map(i=>{
        //   if (riskAnswer.risks[i.risk]) {
        //     addToOldRisk.push({item:i,data:{},answer:{selected:peek,questionId:item.id,groupId}})
        //   }
        // })
        // if (riskAnswer.risks) {

        // }


        if (modalData.length > 0) {
          if (checklist?.cargoAdd) {
            const oldAnswer = []
            item.action[peek].data.map(i=>{
              if (Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).length>0) {
                const cargoArrayId = []
                Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).map(key=>{
                  cargoArrayId.push(key.split('--')[1])
                })
                oldAnswer.push(true)
                dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},cargoArrayId,answer:{selected:peek,questionId:item.id,groupId}}})
              }
            })
            if (oldAnswer.length>0) {
              if (!(oldAnswer.length == item.action[peek].data.length)) sheetRef.current.snapTo(1)
              dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId,per:questionIndexParent}})
              dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
              onChild()
            } else navigation.navigate('CardEmployee',{text:modalData[0].fator,item:modalData[0].item,onCallback:()=>addRisk(),answer:{selected:peek,questionId:item.id,groupId}})
          } else onChooseRisk({modalData,sheetOpen:modalData.length != item.action[peek].data.length})
        } else {
          const oldAnswer = []
          item.action[peek].data.map(i=>{
            if (riskAnswer.risks[i.risk]) {
              dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,data:{},answer:{selected:peek,questionId:item.id,groupId}}})
            } else if (Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).length>0) {
              const cargoArrayId = []
              Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).map(key=>{
                cargoArrayId.push(key.split('--')[1])
              })
              oldAnswer.push(true)
              dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},cargoArrayId,answer:{selected:peek,questionId:item.id,groupId}}})
            }
          })
          if (!(oldAnswer.length == item.action[peek].data.length)) sheetRef.current.snapTo(1)
        }
      }

      function removeAnswer(type) {
        function onConfirm() {
          const jumpEx = filterExcludeJump()
          if (type.includes('openSheet') && item.action[peek].data && item.action[peek].data.filter(i=>i.man).length > 0) {
            openSheet(()=>{
              dispatch({type: 'REMOVE_RISK_ANSWER',payload:{questionId:[item.id,...jumpEx[0]]}})
              dispatch({type: 'REMOVE_CHECKLIST_CHILD',payload:{groupId,questionId:[...jumpEx[1]]}})
              dispatch({type: 'ANSWER_REMOVE',payload:[...jumpEx[0]]})
              dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId,per:questionIndexParent}})
              dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
              if (type.includes('onChild')) onChild()
              if (isMother || ( item?.mother|| item?.subMother)) setactiveSlide(0)
            })
            return
          }
          
          if (isMother|| ( item?.mother|| item?.subMother)) setactiveSlide(0)
          dispatch({type: 'REMOVE_RISK_ANSWER',payload:{questionId:[item.id,...jumpEx[0]]}})
          dispatch({type: 'REMOVE_CHECKLIST_CHILD',payload:{groupId,questionId:[...jumpEx[1]]}})
          dispatch({type: 'ANSWER_REMOVE',payload:[...jumpEx[0]]})
          dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId,per:questionIndexParent}})
          dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
          if (type.includes('openSheet')) openSheet()
          if (type.includes('onChild')) onChild()
        }

        reactModal.alert({
          title:'Remover Pergunta',
          text:`Você tem certeza que deseza mudar sua resposta, isso irá causar a perda dos dados adicionados á ela?`,
          confirmButton:'Mudar',
          warn:true,
          option:true,
          onConfirm:onConfirm,
        })
      }

      function removeGoBack() {
        
        function onConfirm() {
          const jumpEx = filterExcludeJump()
          dispatch({type: 'ANSWER_REMOVE',payload:jumpEx[0]})
          dispatch({type: 'REMOVE_CHECKLIST_CHILD',payload:{groupId,questionId:[...jumpEx[1]]}})
          dispatch({type: 'REMOVE_RISK_ANSWER',payload:{questionId:[item.id,...jumpEx[0]],parentId:item.parent}})
          onGoBack()
        }

        reactModal.alert({
          title:'Remover Pergunta',
          text:`Você tem certeza que deseza mudar sua resposta, isso irá causar a perda dos dados adicionados á ela?`,
          confirmButton:'Mudar',
          warn:true,
          option:true,
          onConfirm:onConfirm,
        })
      }

      const answerIndex = answers.findIndex(i=>i.questionId==item.id) 

      if (peek === 'goBack') { 
        if (answerIndex == -1 || (answers[answerIndex] && !answers[answerIndex].selected)) removeGoBack('remove')
        else removeGoBack()

      } else if (answerIndex == -1 || (answers[answerIndex] && !answers[answerIndex].selected)) { // nenhuma respondida
        if (item.action[peek].data && item.action[peek].data.filter(i=>i.man).length > 0) {
          openSheet()
          return
        }
        if (!item.action[peek]?.child && (!isMother || !( item?.mother|| item?.subMother))) setactiveSlide(activeIndex+1)
        dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId,per:questionIndexParent}})
        dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
        onChild()
        openSheet()
        //('primeira vez respondendo')
      } else if ((answers[answerIndex] && answers[answerIndex].selected) && !(answers[answerIndex] && answers[answerIndex].selected == peek)) { // se nao for mesma resposta
        removeAnswer(['onChild','openSheet'])
        //'trocando resposta')
      } else if (answers[answerIndex] && answers[answerIndex].selected == peek) { //se for mesma resposta
        removeAnswer([])
        //consolelog('retirando resposta')
      }
  }

  function onAnswerMult(peek) {

    function setAnswer() {
      var newAnswer = {groupId:groupId,questionId:item.id,selected:[peek]}
      var list = [...answers]
      list = clone(list)

      var indexAnswer = list.findIndex(i=>i.groupId == groupId&&i.questionId == item.id)
      if (indexAnswer != -1) {
        if (list[indexAnswer]?.selected && list[indexAnswer].selected.includes(peek)) { //selecionar reposta ja selecionada
          list[indexAnswer].selected = [...list[indexAnswer].selected.filter(i=>i != peek)]
          if (list[indexAnswer].selected.length == 0) delete list[indexAnswer]['selected']
          } else if (list[indexAnswer]?.selected) { //selecionar outra resposta
              list[indexAnswer].selected = [...list[indexAnswer].selected,peek]
          }
      } else { //nenhum selecionada
          list.push({...newAnswer})
      }
      return [...list];
    }

    function onJumpData() {
      return checklist.data[groupIndex]?.jump ?checklist.data[groupIndex].jump:[]
    }
  
    function filterJump() {
      var newData = [...checklist.data[groupIndex].questions]
      newData = clone(newData)
      var mother = false

      const newAnswers = [...setAnswer()]
      newData.filter(i=>(i?.mother || i?.subMother)).map(i=>{
            if (newAnswers.findIndex(fi=>fi.questionId==i.id) == -1 || (newAnswers.findIndex(fi=>fi.questionId==i.id) != -1 && !newAnswers[newAnswers.findIndex(fi=>fi.questionId==i.id)]?.selected)) mother = true
        })
      if (mother) newData = [...checklist.data[groupIndex].questions.filter(i=>i?.mother || i?.subMother)]
      else {
        onJumpData().map(i=>{
          const ansInd = newAnswers.findIndex(fi=>fi.questionId==i.questionId)
          if (ansInd == -1 || (newAnswers[ansInd] && (newAnswers[ansInd].selected == i.selected || !newAnswers[ansInd].selected || (Array.isArray(newAnswers[ansInd].selected) && newAnswers[ansInd].selected.includes(i.selected))))) {
            if (i?.g && i.g.length > 0) newData = [...newData.filter(fi=>fi.id==i.questionId||!i.g.includes(fi.group))]
            if (i?.q && i.q.length > 0) newData = [...newData.filter(fi=>!i.q.includes(fi.id))]
          }
        })
      }
      return [...newData]
    }
    
    function filterExcludeJump() {
      const array = [];
      const arrayAll = [];
      const arrayParent = [];
      const jump = [];
      filterJump().map((item)=>{
        jump.push(item.id) //notJump
      })
      checklist.data[groupIndex].questions.map(itm=>{
        if (!jump.includes(itm.id)) {
          array.push(itm.id)
          arrayAll.push(itm)
        }
        // if (itm?.parent && !jump.includes(itm?.parent) && !arrayParent.includes(itm?.parent)) {
        if (itm?.parent) {
          if (!arrayParent.includes(itm.parent) &&  !jump.includes(itm.parent)) {
            array.push(itm.id)
            arrayAll.push(itm)
          } else if (itm?.subParent) {
            itm.subParent.map(sub=>{
              if (!arrayParent.includes(sub) &&  !jump.includes(sub)) {
                array.push(itm.id)
                arrayAll.push(itm)
              } 
            })
          }


          if (itm.parent == item.id && item.action[peek]?.child && item.action[peek].child == itm.id) {
            array.push(itm.id)
            arrayAll.push(itm)
          } else if (itm?.subParent) {
            itm.subParent.map(sub=>{
              if (sub == item.id && item.action[peek]?.child && item.action[peek].child == itm.id) {
                array.push(itm.id)
                arrayAll.push(itm)
              } 
            })
          }
        }
      })

      return [array,arrayAll]
    }
    
    function onChild() {
      if (item.action[peek]?.child) {
        dispatch({type: 'CHECKLIST_CHILD_MULT',payload:{peek,itemId:item.id,groupId,childId:item.action[peek].child}})
      }
    }


      function openSheet() {
        if (!(item.action[peek]?.data && item.action[peek].data.length > 0)) return 

        function onChooseRisk({modalData,back,sheetOpen}) {
          if (modalData.length == 0) {
            if (sheetOpen) sheetRef.current.snapTo(1)
            // dispatch({type: 'CHOOSE_MULT_RISK_ANSWER',payload:back})
            dispatch({type: 'CHOOSE_RISK_ANSWER',payload:back[0]})
            dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId,per:questionIndexParent}})//item == {action:{},id:'',parent?,hide?,... }
            dispatch({type: 'ANSWER_MULT',payload:{peek,itemId:item.id,groupId}})
            item.action[peek].data.map(i=>{
              if (riskAnswer.risks[i.risk]) {
                dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},answer:{selected:peek,questionId:item.id,groupId}}})
              } else if (Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).length>0) {
                const cargoArrayId = []
                Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).map(key=>{
                  cargoArrayId.push(key.split('--')[1])
                })
                dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},cargoArrayId,answer:{selected:peek,questionId:item.id,groupId}}})
              }
            })
            onChild()
            return
          }
          const MODAL_DATA = [...modalData]
          const Value = MODAL_DATA[0]
          MODAL_DATA.splice(0,1)

          //if (&& !riskAnswer.risks[MODAL_DATA.item.risk]) 
          if (Object.keys(riskAnswer.risks).filter(fi=>fi.includes(Value.item.risk)).length>0) {
            const callback = {item:Value.item,data:{},answer:{selected:peek,questionId:item.id,groupId}}
            onChooseRisk({sheetOpen,cargoArrayId:Object.keys(employeeChosen.chosen).length == 0 ?null:Object.keys(employeeChosen.chosen),modalData:MODAL_DATA,back:back?[...back,callback]:[callback]})
            return
          }
          
          setTimeout(() => {
            reactModal.alert({
              confirmButton:'Adicionar',
              optionHide:true,
              childrenComponent:(onConfirm,onClose)=>Modal({fator:Value.fator,item:Value.item,cargoArrayId:Object.keys(employeeChosen.chosen).length == 0 ?null:Object.keys(employeeChosen.chosen),onClose,answers:{selected:peek,questionId:item.id,groupId},riskPosition:riskAnswer,dispatch,callback:(callback)=>onChooseRisk({sheetOpen,modalData:MODAL_DATA,back:back?[...back,callback]:[callback]}),notDispatch:true,RiskAnswer:{...item}}),
              onConfirm:()=>{},
            })
          }, 400);
        }
        
        const modalData = []
        item.action[peek].data.map(i=>{
          if (i.man) modalData.push({fator:risk[i.risk]?.name??risk[i.risk]?.atividade,item:i})
        })


        function addRisk() {
          //if (remove) remove()
          dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId,per:questionIndexParent}})//item == {action:{},id:'',parent?,hide?,... }
          dispatch({type: 'ANSWER_MULT',payload:{peek,itemId:item.id,groupId}})
          sheetRef.current.snapTo(1)
          item.action[peek].data.map(i=>{

            // const addToOldRisk = Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).length>0

            if (riskAnswer.risks[i.risk]) {
              dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},answer:{selected:peek,questionId:item.id,groupId}}})
            } else if (Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).length>0) {
              const cargoArrayId = []
              Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).map(key=>{
                cargoArrayId.push(key.split('--')[1])
              })
              dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},cargoArrayId,answer:{selected:peek,questionId:item.id,groupId}}})
            }
          })
          onChild()
        }

        if (modalData.length > 0) {
          if (checklist?.cargoAdd) {
            const oldAnswer = []
            item.action[peek].data.map(i=>{
              if (Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).length>0) {
                const cargoArrayId = []
                Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).map(key=>{
                  cargoArrayId.push(key.split('--')[1])
                })
                oldAnswer.push(true)
                dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},cargoArrayId,answer:{selected:peek,questionId:item.id,groupId}}})
              }
            })
            if (oldAnswer.length>0) {
              if (!(oldAnswer.length == item.action[peek].data.length)) sheetRef.current.snapTo(1)
              dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId,per:questionIndexParent}})
              dispatch({type: 'ANSWER_MULT',payload:{peek,itemId:item.id,groupId}})
              onChild()
            } else navigation.navigate('CardEmployee',{text:modalData[0].fator,item:modalData[0].item,onCallback:()=>addRisk(),answer:{selected:peek,questionId:item.id,groupId}})
          } else onChooseRisk({modalData,sheetOpen:modalData.length != item.action[peek].data.length})
        } else {
          const oldAnswer = []
          item.action[peek].data.map(i=>{
            if (riskAnswer.risks[i.risk]) {
              dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,data:{},answer:{selected:peek,questionId:item.id,groupId}}})
            } else if (Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).length>0) {
              const cargoArrayId = []
              Object.keys(riskAnswer.risks).filter(fi=>fi.includes(i.risk)).map(key=>{
                cargoArrayId.push(key.split('--')[1])
              })
              oldAnswer.push(true)
              dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},cargoArrayId,answer:{selected:peek,questionId:item.id,groupId}}})
            }
          })
          (peek,'peek7')
          onChild()
          if (!(oldAnswer.length == item.action[peek].data.length)) sheetRef.current.snapTo(1)
        }
      }

      function removeAnswer(type) {
        const jumpEx = filterExcludeJump()
        function onConfirm() {
          if (isMother|| ( item?.mother|| item?.subMother)) setactiveSlide(0)
          dispatch({type: 'REMOVE_RISK_ANSWER',payload:{questionId:[...jumpEx[0]]}})
          dispatch({type: 'REMOVE_RISK_ANSWER_MULT',payload:{questionId:item.id,peek}})
          dispatch({type: 'REMOVE_CHECKLIST_CHILD',payload:{groupId,questionId:[...jumpEx[1]]}})
          dispatch({type: 'ANSWER_REMOVE',payload:jumpEx[0]})
          dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId,per:questionIndexParent}})
          dispatch({type: 'ANSWER_MULT',payload:{peek,itemId:item.id,groupId}})
          //if (type.includes('openSheet')) openSheet()
        }

        // if (type.includes('openSheet')) {
        //   onConfirm()
        //   return
        // }

        reactModal.alert({
          title:'Remover Pergunta',
          text:`Você tem certeza que deseza mudar sua resposta, isso irá causar a perda dos dados adicionados á ela?`,
          confirmButton:'Mudar',
          warn:true,
          option:true,
          onConfirm:onConfirm,
        })
      }

      const answerIndex = answers.findIndex(i=>i.questionId==item.id) 

      if (answerIndex == -1 || (answers[answerIndex] && !answers[answerIndex].selected)) { // nenhuma respondida
        if (item.action[peek].data && item.action[peek].data.filter(i=>i.man).length > 0) {
          dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId,per:questionIndexParent}})//item == {action:{},id:'',parent?,hide?,... }
          openSheet()
          return
        }

        dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId,per:questionIndexParent}})
        dispatch({type: 'ANSWER_MULT',payload:{peek,itemId:item.id,groupId}})
        openSheet()
        onChild()
      //consolelog('primeira vez respondendo')
      } else if ((answers[answerIndex] && answers[answerIndex].selected) && !(answers[answerIndex] && answers[answerIndex].selected &&  answers[answerIndex].selected.includes(peek))) { // se nao for mesma resposta
        if (item.action[peek].data && item.action[peek].data.filter(i=>i.man).length > 0) {
          openSheet()
          return
        }
        dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId,per:questionIndexParent}})
        dispatch({type: 'ANSWER_MULT',payload:{peek,itemId:item.id,groupId}})
        onChild()
        openSheet()
      //consolelog(' resposta (escolher outra)')
      } else if (answers[answerIndex] && answers[answerIndex].selected &&  answers[answerIndex].selected.includes(peek)) { //se for mesma resposta
        removeAnswer(['onChild','openSheet'])
        //consolelog('retirando resposta')
      }
    }

  function later() {
    dispatch({type: 'ANSWER_LATER',payload:{itemId:item.id,groupId}})
  }

  const obsIndex = obs.findIndex(i=>i.questionId==item.id && i.type == item.type)
  // const [value, setValue] = React.useState((answers[answersIndex] && answers[answersIndex]?.selected) ? answers[answersIndex].selected:'')
  const [value, setValue] = React.useState((obs[obsIndex] && obs[obsIndex].obs) ? obs[obsIndex].obs:'')
  const [focus, setFocus] = React.useState(false)
  const [inputHeight, setHeight] = React.useState(0)

  function onChangeTextInput(value) {
    // onClearTime()
    // onTimeOut(()=>dispatch({type: 'ANSWER_TEXT',payload:{itemId:item.id,groupId,text:value}}),1000)
    dispatch({type: 'ANSWER_DESC_OBS',payload:{value,itemId:item.id,groupId,type:item.type}})
    setValue(value)
  }

  function onConfirm() {
    dispatch({type: 'ANSWER',payload:{itemId:item.id,groupId,peek:true}})
  }

  React.useEffect(() => {
    if (item.type == 'obs' && !answer?.selected) dispatch({type: 'ANSWER',payload:{itemId:item.id,groupId,peek:true}})
  }, [])

  return (
    <View style={{flex:1}}>
      <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} style={{width:'100%',flex:1}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:15}}>
          <TextGroup ellipsizeMode={'tail'} numberOfLines={1} >{item?.group ?? 'Geral'}</TextGroup>
          {!isMother&&<TextProgress>{`${data.findIndex(i=>i.id == item.id)+1}/${data.length}`}</TextProgress>}
      </View>
      <View style={{flex:1,overflow:'visible',marginBottom:focus?300:0}}>
        <ViewTextContent flexNot={item.type == 'equivalent' || item.type == 'obs'} windowHeight={windowHeight} style={{elevation:5}}>
          <TextQuestion animation="fadeIn" duration={1000} windowHeight={windowHeight} >{item.text.split('(*)')[0]}</TextQuestion>
          {item.text.split('(*)')[1]&&item.text.split('(*)').slice(1,item.text.split('(*)').length).map((itemText,indexText)=>{
            return <TextSubQuestion margin={indexText==item.text.split('(*)').length-2} key={indexText}>*{itemText}</TextSubQuestion>
          })}
        </ViewTextContent>
        <View style={{flex:1,justifyContent:'flex-start',marginHorizontal:20}}>
          {item.type == 'mult' && !item?.perType ? 
            Object.keys(item.action).sort(Ascendent).map((key,indexKey)=>{
              return ( 
                <ContainerGroup key={key} activeOpacity={0.7} onPress={()=>onAnswerMult(key)}>
                  <Circle active={answer?.selected && Array.isArray(answer.selected) && answer.selected.includes(key)}/>
                  <Group >{item.action[key].text}</Group>
                  {model?.selected && Array.isArray(model.selected) && model.selected.includes(key) && <Icons name={'Fingerprint'} size={25} color={themeContext.primary.lighter} />}
                </ContainerGroup>
              )
            })
          // : item.type == 'mult' && item?.perType && item.perType=='ei' ? 
          //   Object.keys(item.action).sort(Ascendent).map((key,indexKey)=>{
          //     return ( 
          //       <ContainerGroup key={key} activeOpacity={0.7} onPress={()=>onAnswerMult(key)}>
          //         <Circle active={answer?.selected && Array.isArray(answer.selected) && answer.selected.includes(key)}/>
          //         <Group >{item.action[key].text}</Group>
          //         {model?.selected && Array.isArray(model.selected) && model.selected.includes(key) && <Icons name={'Fingerprint'} size={25} color={themeContext.primary.lighter} />}
          //       </ContainerGroup>
          //     )
          //   })
          : item.type == 'equivalent' || item.type == 'obs' ? 
            <InputTextDesc
              style={{height:Math.max(35, inputHeight)}}
              value={value}
              windowHeight={windowHeight}
              onChangeText={(value)=>{onChangeTextInput(value)}}
              placeholder={item.type == 'equivalent'?"Descrição da atividade *obrigatório":"Faça uma observação para o documento *opcional"}
              style={{fontSize:15*windowHeight/1000+5}}
              autoCapitalize="none"
              returnKeyType="next"
              textAlign="left"
              onContentSizeChange={(event) => {
                setHeight(event.nativeEvent.contentSize.height)
              }}
              multiline={true}
              maxLength={600}
              textAlignVertical='top'
              onFocus={()=>setFocus(true)}
              onBlur={()=>setFocus(false)}
            />
          :
            Object.keys(item.action).sort(Ascendent).map((key,indexKey)=>{
              return ( 
                <ButtonInitial
                  key={key}
                  secondary={answer?.selected && answer.selected == key}
                  /* informe={modal?.selected && modal.selected == 'yes'} */
                  iconName={model?.selected && model.selected == key ? 'Fingerprint' : false}
                  iconColor={themeContext.primary.main} 
                  iconPosition='right'
                  onPress={()=>onAnswer(key,item?.selected)}
                  scale={0.65*windowHeight/1000+0.23}
                  elevation={true}
                  text={item.action[key].text}
                />
              )
            })
          }

          {item?.parent && checklist.data[groupIndex].questions[checklist.data[groupIndex].questions.findIndex(i=>i.id==item.parent)].type!= 'mult' &&
          <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingTop:10,paddingBottom:10,marginBottom:5}} onPress={()=>onAnswer('goBack')}>
              <Icons name={'ArrowBack'} color={themeContext.text.third} size={18}/>
              <TextProgress>Voltar</TextProgress>
            </TouchableOpacity>
            {item.type == 'equivalent' &&<EquivalentTouch confirmed={answer?.selected?true: false} onPress={()=>onConfirm()}>
              <TextProgress button={answer?.selected?true: false}>Confirmar</TextProgress>
            </EquivalentTouch>}
          </View>
          }
        </View>
      </View>
      </ScrollView>

      <View style={{flexDirection:'row',justifyContent:'flex-start',marginHorizontal:15}}>
        <View style={{flexDirection:'row',flex:1}}>
          <IconButton
            iconName='Camera'
            onPress={()=>onAnimatedFlip(-180)}
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
          <IconButton
            iconName={answer?.later?'QuestionFill':'Question'}
            scale={1.15}
            onPress={later}
            style={{marginRight:5,marginTop:-2,opacity:answer?.later?0.9:1}}
            color={answer?.later?themeContext.primary.lighter:themeContext.text.third}
          />
        </View>
        {item?.subText &&
          <IconButton
            iconName='Info'
            iconProps={{size:1.15*25}}
            onPress={() => reactModal.alert({text:item.subText,title:'Informação Adicional',warn:false})}
            style={{marginRight:-5}}
            color={themeContext.text.third}
          />
        }
      </View>
      </View>

  )
}
