import React from 'react';
import TABLE from './tableVirtualized';
import {useLoaderDashboard} from '../context/LoadDashContext'
import CheckList from './CheckList';
import { keepOnlyNumbers } from '../helpers/StringHandle'

const App = () => {

  const { loaderDash,setLoaderDash } = useLoaderDashboard();
  React.useEffect(() => {
    setLoaderDash(false)
  }, [])

  const info = {
    q2:[
      {c1:'Até 4.500 kg',c2:'45 metros'},
      {c1:'Mais de 4.500 kg até 45.000 kg',c2:'90 metros'},
      {c1:'Mais de 45.000 kg até 90.000 kg',c2:'110 metros'},
      {c1:'Mais de 90.000 kg até 225.000 kg',c2:'180 metros'},
    ],
    q3:[
      {c1:'Até 20 kg',c2:'75 metros'},
      {c1:'Mais de 20 kg até 200 kg',c2:'220 metros'},
      {c1:'Mais de 200 kg até 900 kg',c2:'300 metros'},
      {c1:'Mais de 900 kg até 2.200 kg',c2:'370 metros'},
      {c1:'Mais de 2.200 kg até 4.500 kg',c2:'460 metros'},
      {c1:'Mais de 4.500 kg até 6.800 kg',c2:'500 metros'},
      {c1:'Mais de 6.800 kg até 9.000 kg',c2:'530 metros'},
    ],
    q4:[
      {c1:'Até 23 kg',c2:'45 metros'},
      {c1:'Mais de 23 kg até 45 kg',c2:'75 metros'},
      {c1:'Mais de 45 kg até 90 kg',c2:'110 metros'},
      {c1:'Mais de 90 kg até 135 kg',c2:'160 metros'},
      {c1:'Mais de 135 kg até 180 kg',c2:'200 metros'},
      {c1:'Mais de 180 kg até 225 kg',c2:'220 metros'},
      {c1:'Mais de 225 kg até 270 kg',c2:'250 metros'},
      {c1:'Mais de 270 kg até 300 kg',c2:'265 metros'},
      {c1:'Mais de 300 kg até 360 kg',c2:'280 metros'},
      {c1:'Mais de 360 kg até 400 kg',c2:'300 metros'},
      {c1:'Mais de 400 kg até 450 kg',c2:'310 metros'},
      {c1:'Mais de 450 kg até 680 kg',c2:'345 metros'},
      {c1:'Mais de 680 kg até 900 kg',c2:'365 metros'},
      {c1:'Mais de 900 kg até 1.300 kg',c2:'405 metros'},
      {c1:'Mais de 1.300 kg até 1.800 kg',c2:'435 metros'},
      {c1:'Mais de 1.800 kg até 2.200 kg',c2:'460 metros'},
      {c1:'Mais de 2.200 kg até 2.700 kg',c2:'480 metros'},
      {c1:'Mais de 2.700 kg até 3.100 kg',c2:'490 metros'},
      {c1:'Mais de 3.100 kg até 3.600 kg',c2:'510 metros'},
      {c1:'Mais de 3.600 kg até 4.000 kg',c2:'520 metros'},
      {c1:'Mais de 4.000 kg até 4.500 kg',c2:'530 metros'},
      {c1:'Mais de 4.500 kg até 6.800 kg',c2:'570 metros'},
      {c1:'Mais de 6.800 kg até 9.000 kg',c2:'620 metros'},
      {c1:'Mais de 9.000 kg até 11.300 kg',c2:'660 metros'},
      {c1:'Mais de 11.300 kg até 13.600 kg',c2:'700 metros'},
      {c1:'Mais de 13.600 kg até 18.100 kg',c2:'780 metros'},
      {c1:'Mais de 18.100 kg até 22.600 kg',c2:'860 metros'},
      {c1:'Mais de 22.600 kg até 34.000 kg',c2:'1.000 metros'},
      {c1:'Mais de 34.000 kg até 45.300 kg',c2:'1.100 metros'},
      {c1:'Mais de 45.300 kg até 68.000 kg',c2:'1.150 metros'},
      {c1:'Mais de 68.000 kg até 90.700 kg',c2:'1.250 metros'},
      {c1:'Mais de 90.700 kg até 113.300 kg',c2:'1.350 metros'},
    ],
  }

  const TIPOS_DE_EXPLOSIVOS = ['a-exp-a//fogos','a-exp-a//iniciadores','a-exp-a//ruptura']
  const TIPOS_DE_EXPLOSIVOS_NAME = ['Pólvoras químicas, artifícios pirotécnicos e produtos químicos','Explosivos iniciadores','Explosivos de ruptura e pólvoras mecânicos']
  const TIPOS_DE_EXPLOSIVOS_SIGLA = ['fo','ei','rup']

  const BASE_TIPOS_DE_EXPLOSIVOS = {
    // id: TIPOS_DE_EXPLOSIVOS[0],
    photo: false,
    parent: "a-exp-a//locals",
    subText: "Se existir mais de um local de armazenamento selecione mais de uma opção",
    text: `Selecione a QUANTIDADE ARMAZENADA EM QUILOS (*)${TIPOS_DE_EXPLOSIVOS_NAME[0]}`,
    type: "mult",
    // action: BASE_ACTIONS_TIPOS_DE_EXPLOSIVOS,
    hide: true,
    group: "a) no armazenamento de explosivos"
  }

  const BASE_DELIMITACAO_FISICA = {
    // id: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[0]}-${keepOnlyNumbers(info.q2[0].c2)}`,
    photo: false,
    subParent: [
      "a-exp-a//locals"
    ],
    // parent: TIPOS_DE_EXPLOSIVOS[0],
    text: "Existe delimitação física da área de risco (45 metros), ou seja qualquer obstáculo que impeça o ingresso de pessoas não autorizadas? (*)Explosivos iniciadores (*)Até 4.500 kg (*)45 metros",
    type: "pers",
    hide: true,
    group: "a) no armazenamento de explosivos",
    action: {
      q_1: {
          id: "q_1",
          text: "SIM",
          data: [],
          // child: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[0]}-${keepOnlyNumbers(info.q2[0].c2)}//barrier`
      },
      q_2: {
          text: "NÃO",
          data: [],
          id: "q_2",
          // child: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[0]}-${keepOnlyNumbers(info.q2[0].c2)}//noBarrier`
      }
    },
  }

  const BASE_CONTINUE = {
    type: "pers",
    action: {
      q_1: {
          id: "q_1",
          text: "Continuar",
          data: [],
          // child: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[0]}-${keepOnlyNumbers(info.q2[0].c2)}//noBarrierConfirme`
      }
    },
    photo: false,
    text: "A não existencia de uma delimitação física da área de risco implica que todas os empregados que estejam presentes no estabelecimneto, mesmo que fora da área de risco, devam receber o adicional de periculosidade, ao estar ciente disso, deseja continuar?",
    //id: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[0]}-${keepOnlyNumbers(info.q2[0].c2)}//noBarrier`,
    hide: true,
    //parent: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[0]}-${keepOnlyNumbers(info.q2[0].c2)}`,
    subParent: [
        "a-exp-a//iniciadores",
        "a-exp-a//locals"
    ],
    group: "a) no armazenamento de explosivos"
  }

  const BASE_CONTINUE_OBS = {
    type: "obs",
    action: "a-exp-a",
    photo: false,
    text: "Quer fazer uma observação para a área de risco dos explosivos armazenados? (*)Explosivos iniciadores (*)Até 4.500 kg (*)45 metros (*)Sem obstaculos físicos (*)estará presente no documento gerado " ,
    //id: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[0]}-${keepOnlyNumbers(info.q2[0].c2)}//noBarrierConfirme`,
    hide: true,
    //parent: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[0]}-${keepOnlyNumbers(info.q2[0].c2)//noBarrier}`,
    subParent: [
      "a-exp-a-ei-45",
      "a-exp-a//iniciadores",
      "a-exp-a//locals"
    ],
    group: "a) no armazenamento de explosivos"
  }

  const DATA_QUESTIONS = [];

  TIPOS_DE_EXPLOSIVOS.map((item,index)=>{
    var DATA_ACTIONS = {};

    if (item != 'a-exp-a//ruptura') {

      info[`q${index+2}`].map((itemINFO,indexINFO)=>{
        DATA_ACTIONS[`q_${indexINFO+1}`] = {
          child: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}`,
          text: itemINFO.c1,
          id: `q_${indexINFO+1}`
        }
      })

      DATA_QUESTIONS.push({
        ...BASE_TIPOS_DE_EXPLOSIVOS,
        id:item,
        text: `Selecione a QUANTIDADE ARMAZENADA EM QUILOS (*)${TIPOS_DE_EXPLOSIVOS_NAME[index]}`,
        action: {...DATA_ACTIONS},
      })

      info[`q${index+2}`].map((itemINFO,indexINFO)=>{
        DATA_QUESTIONS.push({
          ...BASE_DELIMITACAO_FISICA,
          id: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}`,
          text: `Existe delimitação física da área de risco (${itemINFO.c2}), ou seja qualquer obstáculo que impeça o ingresso de pessoas não autorizadas? (*)${TIPOS_DE_EXPLOSIVOS_NAME[index]} (*)${itemINFO.c1} (*)${itemINFO.c2}`,
          parent: TIPOS_DE_EXPLOSIVOS[index],
          action: {
            q_1: {
                id: "q_1",
                text: "SIM",
                data: [{risk:`a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}`,man : true}],
                child: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}//barrier`
            },
            q_2: {
                text: "NÃO",
                data: [],
                id: "q_2",
                child: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}//noBarrier`
            }
          },
        })

        DATA_QUESTIONS.push({
          ...BASE_CONTINUE,
          id: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}//noBarrier`,
          parent: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}`,
          action: {
            q_1: {
                id: "q_1",
                text: "Continuar",
                data: [{risk:`a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}`,man : true}],
                child: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}//noBarrierConfirme`
            }
          },
        })

        DATA_QUESTIONS.push({
          ...BASE_CONTINUE_OBS,
          id: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}//noBarrierConfirme`,
          parent: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}//noBarrier`,
          text: `Quer fazer uma observação para a área de risco dos explosivos armazenados? (*)${TIPOS_DE_EXPLOSIVOS_NAME[index]} (*)${itemINFO.c1} (*)${itemINFO.c2} (*)Sem obstaculos físicos (*)estará presente no documento gerado` ,
        })

        DATA_QUESTIONS.push({
          ...BASE_CONTINUE_OBS,
          id: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}//barrier`,
          parent: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}`,
          text: `Quer fazer uma observação para a área de risco dos explosivos armazenados? (*)${TIPOS_DE_EXPLOSIVOS_NAME[index]} (*)${itemINFO.c1} (*)${itemINFO.c2} (*)Estará presente no documento gerado` ,
          subParent: [
            "a-exp-a//iniciadores",
            "a-exp-a//locals"
          ],
        })

      })

    } else {

      DATA_QUESTIONS.push({
        ...BASE_TIPOS_DE_EXPLOSIVOS,
        id:item,
        text: `Selecione a QUANTIDADE ARMAZENADA EM QUILOS (*)${TIPOS_DE_EXPLOSIVOS_NAME[index]}`,
        action: {...DATA_ACTIONS},
      })

      info[`q${index+2}`].map((itemINFO,indexINFO)=>{
        DATA_ACTIONS[`q_${indexINFO+1}`] = {
          child: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}`,
          text: itemINFO.c1,
          id: `q_${indexINFO+1}`
        }
      })

      DATA_QUESTIONS.push({
        ...BASE_TIPOS_DE_EXPLOSIVOS,
        id:item,
        text: `Selecione a QUANTIDADE ARMAZENADA EM QUILOS (*)${TIPOS_DE_EXPLOSIVOS_NAME[index]}`,
        action: {...DATA_ACTIONS},
      })

      info[`q${index+2}`].map((itemINFO,indexINFO)=>{
        DATA_QUESTIONS.push({
          ...BASE_DELIMITACAO_FISICA,
          id: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}`,
          text: `Existe delimitação física da área de risco (${itemINFO.c2}), ou seja qualquer obstáculo que impeça o ingresso de pessoas não autorizadas? (*)${TIPOS_DE_EXPLOSIVOS_NAME[index]} (*)${itemINFO.c1} (*)${itemINFO.c2}`,
          parent: TIPOS_DE_EXPLOSIVOS[index],
          action: {
            q_1: {
                id: "q_1",
                text: "SIM",
                data: [{risk:`a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}`,man : true}],
                child: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}//barrier`
            },
            q_2: {
                text: "NÃO",
                data: [],
                id: "q_2",
                child: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}//noBarrier`
            }
          },
        })

        DATA_QUESTIONS.push({
          ...BASE_CONTINUE,
          id: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}//noBarrier`,
          parent: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}`,
          action: {
            q_1: {
                id: "q_1",
                text: "Continuar",
                data: [{risk:`a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}`,man : true}],
                child: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}//noBarrierConfirme`
            }
          },
        })

        DATA_QUESTIONS.push({
          ...BASE_CONTINUE_OBS,
          id: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}//noBarrierConfirme`,
          parent: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}//noBarrier`,
          text: `Quer fazer uma observação para a área de risco dos explosivos armazenados? (*)${TIPOS_DE_EXPLOSIVOS_NAME[index]} (*)${itemINFO.c1} (*)${itemINFO.c2} (*)Sem obstaculos físicos (*)estará presente no documento gerado` ,
        })

        DATA_QUESTIONS.push({
          ...BASE_CONTINUE_OBS,
          id: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}//barrier`,
          parent: `a-exp-a-${TIPOS_DE_EXPLOSIVOS_SIGLA[index]}-${keepOnlyNumbers(itemINFO.c2)}`,
          text: `Quer fazer uma observação para a área de risco dos explosivos armazenados? (*)${TIPOS_DE_EXPLOSIVOS_NAME[index]} (*)${itemINFO.c1} (*)${itemINFO.c2} (*)Estará presente no documento gerado` ,
          subParent: [
            "a-exp-a//iniciadores",
            "a-exp-a//locals"
          ],
        })

      })
    }

  })

  console.log('DATA_QUESTIONS',DATA_QUESTIONS)

  return (
    <div style={{}}>
    </div>
  );
};

export default App;
