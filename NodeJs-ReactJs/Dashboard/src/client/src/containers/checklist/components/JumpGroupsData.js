import React, {useState} from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
  ButtonContainer
} from '../styles';
import NewTabs, {TabPanel} from '../../../components/Main/MuiHelpers/NewTabs'
import {FilterComponent,LoadingContent,AddUserButton} from '../../../components/Main/Table/comp'
import {COMPANY} from '../../../routes/routesNames.ts'
import {onGetAllCompanies} from '../func'
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import styled, {css,ThemeContext} from "styled-components";
import {Card} from './Card';
import {NoCard,InputTitle,AddCircle,ErrorMessage,EmptyField,IconsBack,AddedRiskContainer} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken,fade } from "@material-ui/core/styles";
import {BootstrapTooltip} from '../../../components/Main/MuiHelpers/Tooltip'
import { Paper } from '@material-ui/core';
import {InputCard} from './InputCard';
import {Menu} from '../../../components/Main/MuiHelpers/Selected'
import {ContinueButton} from '../../../components/Main/MuiHelpers/Button'
import InputSearch from '../../../components/Dashboard/Components/Standard/Search';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux'
import {CardDrop} from './CardDrop';
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';
import useTimeOut from '../../../hooks/useTimeOut';
import { Ascendent,AscendentText } from '../../../helpers/Sort';
import {Label} from './label';

export function JumpGroupsData({
  position,
  data,
  index,
  onJumpGroupsHandle,
  dataAll,
  setDataAll,
  dataChecklist,
  setPosition
}) {

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [onTimeOut,onClearTime] = useTimeOut()

  const dataLast = dataAll[parseInt(index)-1]
  const categoryIndex = dataChecklist.data.findIndex(i=>i.id==position[1].id)
  const category = dataChecklist.data[categoryIndex]
  const questionIndex = category.questions.findIndex(i=>i.id==dataLast.questionId)
  const _data = category.questions[questionIndex].action[dataLast.action]

  React.useEffect(() => {
    return onClearTime()
  }, [])

  React.useEffect(() => {
    if (position[index+1] && position[index+1]?.id && filterGroup().findIndex(i=>i==position[index+1].id) == -1) {
      setDataAll([...dataAll.slice(0,index+1)])
      setPosition([...position.slice(0,index+1)])
    }
  }, [dataChecklist])

  function onInputSearch(e) {
    setLoading(true)
    setSearch(e.target.value)
    onClearTime()
    onTimeOut(()=>{
      setLoading(false)
    },600)
  }

  function onQuestions(positionId) {
    onJumpGroupsHandle(index,positionId,{...data})
  }

  const groups = dataChecklist.data[categoryIndex].groups
  const questionGroup = category.questions[questionIndex].group
  const groupIndexQuestion = groups.findIndex(i=>i == questionGroup)

  function filter() {
    let normalized = search.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "")
    let filtered = [];

    if (search.length > 0) {
      filtered = [...category.questions].filter((i,idx)=> idx >= questionIndex && !i.mother && !i.subMother && !i.hide && i.id !== data.questionId && i.text.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "").includes(normalized)).slice(0,20)
      if (_data?.jump && _data.jump?.q) filtered = filtered.filter(i=>!_data.jump.q.includes(i.id))
      //if (_data?.jump && _data.jump?.g) filtered = filtered.filter(!_data.jump.g.includes(i.id))
    }
    return filtered.sort(AscendentText)
  }


  function filterGroup() {
    let filtered = [...category.groups]
    if (_data?.jump && _data.jump?.g) filtered = filtered.filter((i)=>!_data.jump.g.includes(i))
    return filtered.filter((i,idx)=>idx >= groupIndexQuestion)
    // return filtered.sort(Ascendent)
  }

  return (
    <>
      <Label style={{marginBottom:10}} text={'Grupos'} infoText={'Arraste o card do grupo que deseja pular ou selecione ele para ver suas perguntas.'}/>
      <InputSearch style={{margin:'0 10px 15px 10px'}} icons={Icons} onInputSearch={onInputSearch} search={search} onCleanSearch={(e)=>setSearch('')}/>
      <Droppable droppableId={`jumpGroups`} isDropDisabled={data.disabled}>
      {(provided,snapshot) => (
        <AddedRiskContainer
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{overflowY:'auto',height:'85%'}}
          isDraggingOver={snapshot.isDraggingOver}
          draggingOverWith={snapshot.draggingOverWith && ['jumpGroup','jumpQuestion'].includes(snapshot.draggingOverWith.split('/')[0]) ? 'delete':'not'}
          >
          <div style={{paddingLeft:10}}>
            {search.length == 0 ?
              filterGroup().map((item,indexItem)=>{
                return (
                <BootstrapTooltip enterNextDelay={1600} placement="right" enterDelay={1600} TransitionProps={{ timeout: {enter:500, exit: 50} }} title={item} styletooltip={{transform: 'translateY(-0px)'}}>
                  <div>
                  <CardDrop
                    title={item}
                    key={item ?? indexItem}
                    item={item}
                    fixedHeight
                    index={indexItem}
                    draggableId={`jumpGroup/${item}/${index}`}
                    onClick={()=>onQuestions(item)}
                    position={position && position[index+1] && position[index+1]?.id && position[index+1].id == item}
                    //open={openModalEdit}
                    //setOpen={setOpenModalEdit}
                    //onClick={()=>onChecklistHandle(item?.id,item?.title)}
                  />
                  </div>
                </BootstrapTooltip>
                )
              })
              :
                loading ?
                  <LinearProgress style={{marginRight:20}}/>
                :
                filter().length > 0 ?
                  filter().map((item,indexItem)=>{
                    return (
                      <BootstrapTooltip enterNextDelay={1600} title={item.text} placement="right" enterDelay={1600} TransitionProps={{ timeout: {enter:500, exit: 50} }} styletooltip={{transform: 'translateY(-0px)'}}>
                        <div>
                          <CardDrop
                            title={item.text}
                            key={item?.id ?? indexItem}
                            item={item}
                            index={indexItem}
                            draggableId={`jumpQuestion/${item.id}/${index}`}
                            onClick={()=>{}}
                            //position={position && position[0] && position[0].id == item.id}
                            //open={openModalEdit}
                            //setOpen={setOpenModalEdit}
                            //onClick={()=>onChecklistHandle(item?.id,item?.title)}
                          />
                        </div>
                      </BootstrapTooltip>
                    )
                  })
                :
                search.length > 0 ?
                  <EmptyField hover='none' style={{marginLeft:0,marginTop:0,padding:'20px 20px',height:80}} onClick={()=>{}}>
                    <p style={{textAlign:'center'}}>Nenhum dado encontrado</p>
                  </EmptyField>
                :
                null
            }
          </div>
          {provided.placeholder}
        </AddedRiskContainer>
      )}
      </Droppable>
    </>
  );
}
//{id:v4(),name:`Risk ${Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1)}` ,type:types[Math.floor(Math.random())]},

