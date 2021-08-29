

 import React, { useEffect, useState, useRef } from 'react';
 import { Dimensions, View, SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';
 import styled from 'styled-components/native';
 
 
 const Safearea = styled.SafeAreaView`
 justify-content:center;
 align-items:center;
 `;
 
 const MonthScroll = styled.ScrollView`
     width:100%;
     height:60px;
 `;
 const MonthButton = styled.TouchableHighlight`
     width:${props=>props.width}px;
     justify-content:center;
     align-items:center;
 `;
 const MonthItem = styled.View`
     width:90%;
     height:30px;
     background-color:#EEE;
     justify-content:center;
     align-items:center;
     border-radius:15px;
 `;
 
 const Boxview = styled.View`
     width:100%;
     justify-content:center;
     align-items:center;
     border-radius:15px;
 `;
 
 const MonthText = styled.Text``;
 
 
 
 
 ////
 
 
 const DaysScroll = styled.ScrollView`
     width:100%;
     height:50px;
 `;
 const DayButton = styled.TouchableHighlight`
     width:${props=>props.width}px;
     justify-content:center;
     align-items:center;
 `;
 const DayItem = styled.View`
     width:${props=>props.width};
     height:${props=>props.height};
     border-radius:${props=>props.borderRadius};
     background-color:#EEE;
     justify-content:center;
     align-items:center;
 `;
 
 const TodayData = styled.View`
     background-color:#009;
     justify-content:center;
     align-items:center;
 `;
 const DayText = styled.Text``;
 
 
 
 ////
 
 
 
 
 export default () => {
 
   let today = new Date();
 let currentMonth = today.getMonth(); //today é um let definido em cima ai ele pega o mes de date() em 0-11
 let currentDay = today.getDate();
 const [selectedMonth, setSelectedMonth] = useState(currentMonth);
 const [selectedDay, setSelectedDay] = useState(currentDay);
 
   let MonthItemSelected = {backgroundColor:'#CCC', width:'90%', height:40}; //antes o view pagava 90%
 
                             const screenWidth = Math.round(Dimensions.get('window').width); //Math.round() retorna o valor de um número arredondado para o inteiro mais proximo.
   let thirdW = screenWidth / 1;
   let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
   
                                                     const screenWidths = Dimensions.get('window').width; //Math.round() retorna o valor de um número arredondado para o inteiro mais proximo.
                                                     let daysx = (screenWidths) / 7;  
 
 ///////
 
                                                     let dayW = Math.round(screenWidth / 9); //dividido em 9 dias para aparecer na tela
                                                     let offsetW = Math.round((screenWidth - dayW) / 2); //mais matematica aqui, pra poder dar aquele espaco entre os lados e poder pegar o item no meio tanto no inicio qunto final
                                                     
 /////// 
 
 
 
                                                               const Day = ({day, month, onPress, dayatual}) => {
                                                                 let today = new Date(); //pega dia/hora tudo sobre a data de hj
                                                                 today.setHours(0);  // ele zera aqui para poder comparar datas, ja que como a hora/min.. nao foi definida em thisDay e today sim, entao precisar zerar para igualar
                                                                 today.setMinutes(0);
                                                                 today.setSeconds(0);
                                                                 today.setMilliseconds(0);
 
                                                                 let thisDate = new Date(today.getFullYear(), month, day); //aqui o mounth e day é referente ao dia e mes selecionado no scroll view, ele veio la da home onde ao selecionar o dia ele muda
 
                                                                 let bgColor = '#F4F4F4';
                                                                 let opacity = 1;
                                                                 let width1 = '30px';
                                                                 let height1 = '30px';
                                                                 let borderRadius1 = '15px';
 
                                                                 
                                                                 if(dayatual == day) {
                                                                     width1 = '40px';
                                                                     height1 = '40px';
                                                                     borderRadius1 = '25px';
                                                                 }
 
 
                                                                 if(thisDate.getTime() == today.getTime()) {  //getTime pega tudo (ano,mes,dia,semana,hora,min,s,mils)
                                                                     bgColor = '#B5EEFF';
                                                                     opacity = 1;
                                                                 }
 
                                                                 return (
                                                                     <DayButton onPress={onPress} width={dayW} underlayColor="transparent">
                                                                         <DayItem style={{opacity:opacity, backgroundColor:bgColor}} width={width1} borderRadius={borderRadius1} height={height1}>
                                                                             <DayText>{day}</DayText>
                                                                         </DayItem>
                                                                     </DayButton>
                                                                 );
                                                               };
 
 
                                                                  const DayRef = useRef();
     const MonthRef = useRef();
 
 
                                                                       const scrollToDay = (d) => {  
                                                                         let posX = (d - 1) * dayW; //dia é sero e posi~çao é 1 entao tiramos 1 //dayW é o tamanho de 1/9 da tela
                                                                         DayRef.current.scrollTo({x:posX, y: 0, animated: true});
                                                                         setSelectedDay(d);
                                                                     }
 
                                                                     const daysScrollEndAction = (e) => { //quando scrowll vc pega a nova posição e muda o valor do dia
                                                                         let posX = e.nativeEvent.contentOffset.x; //pega posição em px do lugar da barra
                                                                         let targetDay = Math.round(posX / dayW) + 1;
                                                                         setSelectedDay(targetDay);
                                                                     };
 
                                                                     let days = [];
                                                                     let daysInMonth = new Date(new Date().getFullYear(), (selectedMonth+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
                                                                     for(let i=1;i<=daysInMonth;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
                                                                         days.push(i);
                                                                     }
 
                                                                     useEffect(()=>{
                                                                         setSelectedDay(selectedDay);
                                                                     }, [selectedDay]);
 
   useEffect(()=>{
       setTimeout(()=>{
           if(selectedMonth == new Date().getMonth()) {
               scrollToDay(new Date().getDate());
           } else {
               scrollToDay(1);
           }
       }, 10);
   }, [selectedMonth]);
 
 
 
 
 
       const Dias = ({day, month, onPress, dayatual}) => { //quando scrowll vc pega a nova posição e muda o valor do dia
         let today = new Date(); //pega dia/hora tudo sobre a data de hj
         today.setHours(0);  // ele zera aqui para poder comparar datas, ja que como a hora/min.. nao foi definida em thisDay e today sim, entao precisar zerar para igualar
         today.setMinutes(0);
         today.setSeconds(0);
         today.setMilliseconds(0);
 
         let thisDate = new Date(today.getFullYear(), month, day); //aqui o mounth e day é referente ao dia e mes selecionado no scroll view, ele veio la da home onde ao selecionar o dia ele muda
 
         let bgColor = '#fff';
         let opacity = 1;
         let width1 = '30px';
         let height1 = '30px';
         let borderRadius1 = '15px';
 
         
         if(dayatual == day) {
             width1 = '40px';
             height1 = '40px';
             borderRadius1 = '25px';
         }
 
 
         if(thisDate.getTime() == today.getTime()) {  //getTime pega tudo (ano,mes,dia,semana,hora,min,s,mils)
             bgColor = '#B5EEFF';
             opacity = 1;
         }
         
         return ( 
     
         <View backgroundColor='#fff' width={daysx} style={styles.datacalendar} >
           <View height={30} style={styles.datacalendar}>
             <View flex={1} width={30} borderRadius={15} backgroundColor={bgColor} style={styles.datacalendar}>
               <Text style={styles.container} >{day}</Text>
             </View>
           </View>
         </View>  
         )
       
       };
 
 
 
 
 
 
 
 
 
     const monthScrollEndAction = (e) => {   //quando ele mover faz essa ação
         let posX = e.nativeEvent.contentOffset.x;   //ele pega aposição do scroll em pixel
         let targetMonth = Math.round(posX / thirdW); //pega o mes de 0-11 pois pega valor da posição e divide pelo valor de um balao
         setSelectedMonth(targetMonth);
     }
 
     useEffect(()=>{
         setSelectedMonth(selectedMonth); //muda o mes no HOME
     }, [selectedMonth]);
 
     useEffect(()=>{             //toda vez que rodar o scroll bar e mudar de mes ele reroda
         setTimeout(()=>{        //por algum motivo nao funciona normal entao se coloca um time
 //             scrollToMonth(selectedMonth);
             scrollFlatlistToMonth(selectedMonth);
         }, 10);
     }, [selectedMonth]);
     
 // no key={k} acredito que passa para acessar embaixo
 
 
 
 
 
 
 
 
 
 
 const FlatMounthRef = useRef();
 
 const scrollFlatlistToMonth = (m) => {  //faz com que na hora de carregar mande o scrol para a posição certa e nao fique no inicial padrao embora o mes esteja selecionado corretamente
 
   // const {animated, offset} = params;  
   let posX = m * thirdW;
   FlatMounthRef.current.scrollToOffset({animated: true, offset:posX}); //scrollto é uma função do proprio scrowview //animated opcional
 }
 
 
 
 
 
 
 
 
     return (
       <Safearea >
                                                                                            <Boxview backgroundColor='#CCC' height={300}>
                                                                                               <DaysScroll
                                                                                               ref={DayRef}
                                                                                               horizontal={true}
                                                                                               showsHorizontalScrollIndicator={false} //mostra se a barra horizontal sera visivel
                                                                                               decelerationRate="fast"
                                                                                               snapToInterval={dayW}
                                                                                               snapToAlignment="center"
                                                                                               contentContainerStyle={{paddingLeft:offsetW, paddingRight:offsetW}}
                                                                                               onMomentumScrollEnd={daysScrollEndAction}
                                                                                           >
                                                                                               {days.map((d,k)=>
                                                                                                   <Day
                                                                                                       key={k}
                                                                                                       day={d}
                                                                                                       month={selectedMonth}
                                                                                                       onPress={()=>scrollToDay(d)}
                                                                                                       dayatual={selectedDay}
                                                                                                   />
                                                                                               )}
                                                                                               </DaysScroll>
 
 
                                                                                           </Boxview>
 
                 <FlatList
                     ref={FlatMounthRef}
                     data={months}
                     horizontal={true}
                     snapToInterval={thirdW}
                     snapToAlignment="center"
                     decelerationRate="fast"
                     showsHorizontalScrollIndicator={false}
                     onMomentumScrollEnd={monthScrollEndAction}  //quando mover faz ação // aqui exite o begin, onde ele começa // o begin pega a posição de onde vc solta nao necessariamente de onde clica e comeca a rolar
                     renderItem={({item, index})=>
                                           <MonthButton width={thirdW} key={index} onPress={()=>setSelectedMonth(index)} underlayColor="transparent">
                                           <MonthItem style={index==(selectedMonth)?MonthItemSelected:{}}>
                                               <MonthText>{item}</MonthText>
                                           </MonthItem>
                                       </MonthButton> 
                     }
                     keyExtractor={(item)=>(item+"")}
                 />   
 
 
 
         
                                                                           <View flexDirection='row' flexWrap='wrap' >
                                                                               {days.map((d,k)=>
                                                                                   <Dias 
                                                                                     day={d} 
                                                                                     key={k}
                                                                                     month={selectedMonth}
                                                                                     onPress={()=>scrollToDay(d)}
                                                                                     dayatual={selectedDay}
                                                                                   />
                                                                               )}
                                                                               </View>
 
 
 
 
                                                                         </Safearea>
     );
 }; 
 
 
 const styles = StyleSheet.create({
   container: {
     color:'#000',
   },
   datacalendar: {
     justifyContent: 'center',
     alignItems: 'center'
   },
 });
 
 
 
 //mounthscroll somente com ma em cima fiz com flat
 
 {/*
   
           // o que aconce aqui é que eu uso o ref para poder mudar uma propriedade do sroll de acordo com algum dado ()
     //////
     const scrollToMonth = (m) => {  //faz com que na hora de carregar mande o scrol para a posição certa e nao fique no inicial padrao embora o mes esteja selecionado corretamente
         let posX = m * thirdW;
         MonthRef.current.scrollTo({x:posX, y: 0, animated: true}); //scrollto é uma função do proprio scrowview //animated opcional
     }
     ////////
 
             <MonthScroll
                 ref={MonthRef}
                 horizontal={true}
                 showsHorizontalScrollIndicator={false}  //tira barra de scrowl
                 decelerationRate="fast" //desaceleraçao da barra
                 snapToInterval={thirdW} //define um intervalo que ele da scrow ou seja ele so pode mexer de 1/3 da tela por vez definido pelo thirdw
                 snapToAlignment="center"
                 onMomentumScrollEnd={monthScrollEndAction}  //quando mover faz ação // aqui exite o begin, onde ele começa // o begin pega a posição de onde vc solta nao necessariamente de onde clica e comeca a rolar
             >
                 {months.map((m,k)=>(
                     <MonthButton width={thirdW} key={k} onPress={()=>setSelectedMonth(k)} underlayColor="transparent">
                         <MonthItem style={k==(selectedMonth)?MonthItemSelected:{}}>
                             <MonthText>{m}</MonthText>
                         </MonthItem>
                     </MonthButton>
                 ))}
             </MonthScroll> */}       


             let days1 = [];
let days2 = [];
let days3 = [];
let days4 = [];
let days5 = [];
let days6 = [];
let days7 = [];
let days8 = [];
let days9 = [];
let days10 = [];
let days11 = [];
let days12 = [];
let daysInMonth1 = new Date(new Date().getFullYear(), (1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth2 = new Date(new Date().getFullYear(), (1+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth3 = new Date(new Date().getFullYear(), (2+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth4 = new Date(new Date().getFullYear(), (3+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth5 = new Date(new Date().getFullYear(), (4+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth6 = new Date(new Date().getFullYear(), (5+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth7 = new Date(new Date().getFullYear(), (6+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth8 = new Date(new Date().getFullYear(), (7+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth9 = new Date(new Date().getFullYear(), (8+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth10 = new Date(new Date().getFullYear(), (9+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth11 = new Date(new Date().getFullYear(), (10+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth12 = new Date(new Date().getFullYear(), (11+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)

for(let i=1;i<=daysInMonth1;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
    days1.push(i);
}
for(let i=1;i<=daysInMonth2;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days2.push(i);
}
for(let i=1;i<=daysInMonth3;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days3.push(i);
}
for(let i=1;i<=daysInMonth4;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days4.push(i);
}
for(let i=1;i<=daysInMonth5;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days5.push(i);
}
for(let i=1;i<=daysInMonth6;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days6.push(i);
}
for(let i=1;i<=daysInMonth7;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days7.push(i);
}
for(let i=1;i<=daysInMonth8;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days8.push(i);
}
for(let i=1;i<=daysInMonth9;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days9.push(i);
}
for(let i=1;i<=daysInMonth10;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days10.push(i);
}
for(let i=1;i<=daysInMonth11;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days11.push(i);
}
for(let i=1;i<=daysInMonth12;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days12.push(i);
}





































import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, View, SafeAreaView, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';


const Safearea = styled.SafeAreaView`
justify-content:center;
align-items:center;
`;

const MonthText = styled.Text``;





////




export default () => {

  let today = new Date();
let currentMonth = today.getMonth(); //today é um let definido em cima ai ele pega o mes de date() em 0-11
let currentDay = today.getDate();
const [selectedMonth, setSelectedMonth] = useState(currentMonth);
const [selectedDay, setSelectedDay] = useState(currentDay);


let days1 = [];
let days2 = [];
let days3 = [];
let days4 = [];
let days5 = [];
let days6 = [];
let days7 = [];
let days8 = [];
let days9 = [];
let days10 = [];
let days11 = [];
let days12 = [];
let daysInMonth1 = new Date(new Date().getFullYear(), (1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth2 = new Date(new Date().getFullYear(), (1+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth3 = new Date(new Date().getFullYear(), (2+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth4 = new Date(new Date().getFullYear(), (3+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth5 = new Date(new Date().getFullYear(), (4+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth6 = new Date(new Date().getFullYear(), (5+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth7 = new Date(new Date().getFullYear(), (6+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth8 = new Date(new Date().getFullYear(), (7+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth9 = new Date(new Date().getFullYear(), (8+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth10 = new Date(new Date().getFullYear(), (9+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth11 = new Date(new Date().getFullYear(), (10+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
let daysInMonth12 = new Date(new Date().getFullYear(), (11+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)

for(let i=1;i<=daysInMonth1;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
    days1.push(i);
}
for(let i=1;i<=daysInMonth2;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days2.push(i);
}
for(let i=1;i<=daysInMonth3;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days3.push(i);
}
for(let i=1;i<=daysInMonth4;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days4.push(i);
}
for(let i=1;i<=daysInMonth5;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days5.push(i);
}
for(let i=1;i<=daysInMonth6;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days6.push(i);
}
for(let i=1;i<=daysInMonth7;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days7.push(i);
}
for(let i=1;i<=daysInMonth8;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days8.push(i);
}
for(let i=1;i<=daysInMonth9;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days9.push(i);
}
for(let i=1;i<=daysInMonth10;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days10.push(i);
}
for(let i=1;i<=daysInMonth11;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days11.push(i);
}
for(let i=1;i<=daysInMonth12;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
  days12.push(i);
}


  let MonthItemSelected = {backgroundColor:'#CCC', width:'90%', height:40}; //antes o view pagava 90%

                            const screenWidth = Math.round(Dimensions.get('window').width); //Math.round() retorna o valor de um número arredondado para o inteiro mais proximo.
  let thirdW = screenWidth / 1;
  let months = [{mes:'Janeiro', dia:days1}, {mes:'Fevereiro', dia:days2}, {mes:'Março', dia:days3}, {mes:'Abril', dia:days4}, {mes:'Maio', dia:days5}, {mes:'Junho', dia:days6}, {mes:'Julho', dia:days7}, {mes:'Agosto', dia:days8}, {mes:'Setembro', dia:days9}, {mes:'Outrobro', dia:days10}, {mes:'Novembro', dia:days11}, {mes:'Dezembro', dia:days12}];
  
                                                    const screenWidths = Dimensions.get('window').width; //Math.round() retorna o valor de um número arredondado para o inteiro mais proximo.
                                                    let daysx = (screenWidths) / 7;  

///////

                                                    let dayW = Math.round(screenWidth / 9); //dividido em 9 dias para aparecer na tela
                                                    let offsetW = Math.round((screenWidth - dayW) / 2); //mais matematica aqui, pra poder dar aquele espaco entre os lados e poder pegar o item no meio tanto no inicio qunto final
                                                    
/////// 



                                                                 const DayRef = useRef();
    const MonthRef = useRef();



      const Dias = ({day, month}) => { //quando scrowll vc pega a nova posição e muda o valor do dia
        let today = new Date(); //pega dia/hora tudo sobre a data de hj
        today.setHours(0);  // ele zera aqui para poder comparar datas, ja que como a hora/min.. nao foi definida em thisDay e today sim, entao precisar zerar para igualar
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        let thisDate = new Date(today.getFullYear(), month, day); //aqui o mounth e day é referente ao dia e mes selecionado no scroll view, ele veio la da home onde ao selecionar o dia ele muda

        let bgColor = '#fff';
        let opacity = 1;


        if(thisDate.getTime() == today.getTime()) {  //getTime pega tudo (ano,mes,dia,semana,hora,min,s,mils)
            bgColor = '#B5EEFF';
            opacity = 1;
        }
        
        return ( 
    
        <View backgroundColor='#fff' width={daysx} style={styles.datacalendar} >
          <View height={30} style={styles.datacalendar}>
            <View flex={1} width={30} borderRadius={15} backgroundColor={bgColor} style={styles.datacalendar}>
              <Text style={styles.container} >{day}</Text>
            </View>
          </View>
        </View>  
        )
      
      };




    const monthScrollEndAction = (e) => {   //quando ele mover faz essa ação
        let posX = e.nativeEvent.contentOffset.x;   //ele pega aposição do scroll em pixel
        let targetMonth = Math.round(posX / thirdW); //pega o mes de 0-11 pois pega valor da posição e divide pelo valor de um balao
        setSelectedMonth(targetMonth);
    }

    useEffect(()=>{
        setSelectedMonth(selectedMonth); //muda o mes no HOME
    }, [selectedMonth]);

    useEffect(()=>{             //toda vez que rodar o scroll bar e mudar de mes ele reroda
        setTimeout(()=>{        //por algum motivo nao funciona normal entao se coloca um time
//             scrollToMonth(selectedMonth);
            scrollFlatlistToMonth(selectedMonth);
        }, 10);
    }, [selectedMonth]);
    
// no key={k} acredito que passa para acessar embaixo


const FlatMounthRef = useRef();

const scrollFlatlistToMonth = (m) => {  //faz com que na hora de carregar mande o scrol para a posição certa e nao fique no inicial padrao embora o mes esteja selecionado corretamente

  // const {animated, offset} = params;  
  let posX = m * thirdW;
  FlatMounthRef.current.scrollToOffset({animated: true, offset:posX}); //scrollto é uma função do proprio scrowview //animated opcional




}


const DiasScrollw = () => {
  return(
  <View flexDirection='row' flexWrap='wrap' >
  {days.map((d,k)=>
      <Dias 
        day={d} 
        key={k}
        month={selectedMonth}
        onPress={()=>scrollToDay(d)}
        dayatual={selectedDay}
      />
      
  )}
  </View>
  )
  }



    return (
      
      <Safearea >
        <FlatList
            ref={FlatMounthRef}
            data={months}
            horizontal={true}
            snapToInterval={thirdW}
            snapToAlignment="center"
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={monthScrollEndAction}  //quando mover faz ação // aqui exite o begin, onde ele começa // o begin pega a posição de onde vc solta nao necessariamente de onde clica e comeca a rolar
            renderItem={({item, index})=>
                            <View width={thirdW}>
                                <TouchableHighlight style={styles.mounthbutton}  key={index} onPress={()=>setSelectedMonth(index)} underlayColor="transparent">
                                  <View style={[index==(selectedMonth)?MonthItemSelected:{}, styles.mounthview]}>
                                      <Text>{item.mes}</Text>
                                  </View>
                              </TouchableHighlight> 
                              <View flexDirection='row' flexWrap='wrap' >
                                {item.dia.map((d,k)=>
                                    <Dias 
                                      day={d} 
                                      key={k}
                                      month={selectedMonth}
                                      dayatual={selectedDay}
                                    />
                                    
                                )}
                              </View>
                            </View>
            }
            keyExtractor={(item)=>(item.mes+"")}
        />   








      </Safearea>
    );
}; 


const styles = StyleSheet.create({
  container: {
    color:'#000',
  },
  datacalendar: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mounthbutton: {

    justifyContent: 'center',
    alignItems: 'center'
  },
  mounthview: {
    width:'90%',
    height:30,
    backgroundColor: '#EEE',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
  },
});



//mounthscroll somente com ma em cima fiz com flat

{/*
  
          // o que aconce aqui é que eu uso o ref para poder mudar uma propriedade do sroll de acordo com algum dado ()
    //////
    const scrollToMonth = (m) => {  //faz com que na hora de carregar mande o scrol para a posição certa e nao fique no inicial padrao embora o mes esteja selecionado corretamente
        let posX = m * thirdW;
        MonthRef.current.scrollTo({x:posX, y: 0, animated: true}); //scrollto é uma função do proprio scrowview //animated opcional
    }
    ////////

            <MonthScroll
                ref={MonthRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}  //tira barra de scrowl
                decelerationRate="fast" //desaceleraçao da barra
                snapToInterval={thirdW} //define um intervalo que ele da scrow ou seja ele so pode mexer de 1/3 da tela por vez definido pelo thirdw
                snapToAlignment="center"
                onMomentumScrollEnd={monthScrollEndAction}  //quando mover faz ação // aqui exite o begin, onde ele começa // o begin pega a posição de onde vc solta nao necessariamente de onde clica e comeca a rolar
            >
                {months.map((m,k)=>(
                    <MonthButton width={thirdW} key={k} onPress={()=>setSelectedMonth(k)} underlayColor="transparent">
                        <MonthItem style={k==(selectedMonth)?MonthItemSelected:{}}>
                            <MonthText>{m}</MonthText>
                        </MonthItem>
                    </MonthButton>
                ))}
            </MonthScroll> */}       
