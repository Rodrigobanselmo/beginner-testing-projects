

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
 let currentYear = today.getFullYear();
 let currentMonth = today.getMonth(); //today é um let definido em cima ai ele pega o mes de date() em 0-11
 let currentDay = today.getDate();
 const [selectedYear, setSelectedYear] = useState(currentYear);
 const [selectedMonth, setSelectedMonth] = useState(currentMonth);
 const [selectedDay, setSelectedDay] = useState(currentDay);
 const [cores, setCores] = useState({});
 
 
   let MonthItemSelected = {backgroundColor:'#CCC', width:'90%', height:40}; //antes o view pagava 90%
 
   const screenWidth = Math.round(Dimensions.get('window').width); //Math.round() retorna o valor de um número arredondado para o inteiro mais proximo.
   let thirdW = screenWidth / 1;
   let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
   
   const screenWidths = Dimensions.get('window').width; //Math.round() retorna o valor de um número arredondado para o inteiro mais proximo.
   let daysx = (screenWidths) / 7;  
 
 ///////
                                 
 /////// 
 
 
 
                                                                  const DayRef = useRef();
     const MonthRef = useRef();
 
 
 
 
         let days = [];
         let daysInMonth = new Date(new Date().getFullYear(), (selectedMonth+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
         for(let i=1;i<=daysInMonth;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
             days.push(i);
         }
 
 
 
 
 
 
 
       const Dias = ({day, month, onPress, year}) => { //quando scrowll vc pega a nova posição e muda o valor do dia
         let today = new Date(); //pega dia/hora tudo sobre a data de hj
         today.setHours(0);  // ele zera aqui para poder comparar datas, ja que como a hora/min.. nao foi definida em thisDay e today sim, entao precisar zerar para igualar
         today.setMinutes(0);
         today.setSeconds(0);
         today.setMilliseconds(0);
 
         let thisDate = new Date(year, month, day); //aqui o mounth e day é referente ao dia e mes selecionado no scroll view, ele veio la da home onde ao selecionar o dia ele muda
 
         let bgColor = null
 
 
         if(thisDate.getTime() == today.getTime()) {  //getTime pega tudo (ano,mes,dia,semana,hora,min,s,mils)
             bgColor = true;
             opacity = 1;
         }
         
         const clicar = () => {   //quando ele mover faz essa ação
           let cor = {...cores}
           let data = `${month}${day}`
           if (cor[data]=='#B5EEFF') {delete cor[data]} else {cor[data]='#B5EEFF'}
           onPress(cor);
           console.log(cores)
           console.log(thisDate)
           console.log(today)
       }
 
         return ( 
     
         <View backgroundColor='#fff' width={daysx} style={styles.datacalendar} >
           <TouchableHighlight onPress={()=>clicar()} underlayColor="transparent" >
           <View height={30} style={styles.datacalendar}>
             <View flex={1} width={30} borderRadius={15} backgroundColor={bgColor ? 'green' : (cores[`${month}${day}`]?cores[`${month}${day}`] : '#FFF')} style={styles.datacalendar}>
               <Text style={styles.container} >{day}</Text>
             </View>
           </View>
           </TouchableHighlight>
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
   if (m==12) { return  (
     FlatMounthRef.current.scrollToOffset({animated: true, offset:0}),
     setSelectedYear(selectedYear+1)
     )}
     if (m==-1) { return  (
       FlatMounthRef.current.scrollToOffset({animated: true, offset:11*thirdW}),
       setSelectedYear(selectedYear-1)
       )}
   FlatMounthRef.current.scrollToOffset({animated: true, offset:posX}); //scrollto é uma função do proprio scrowview //animated opcional
   console.log(m)
 
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
                             <View width={thirdW} flexDirection='row'>
                                 <TouchableHighlight onPress={()=>setSelectedMonth(index-1)} underlayColor="transparent" >
                                   <View height={20} width={20} style={styles.passarmeses} backgroundColor='red'>
                                   </View>
                                 </TouchableHighlight>
                                 <TouchableHighlight style={styles.mounthbutton}  key={index} onPress={()=>setSelectedMonth(index)} underlayColor="transparent">
                                   <View style={[index==(selectedMonth)?MonthItemSelected:{}, styles.mounthview]}>
                                       <Text>{`${item} de ${selectedYear}`}</Text>
                                   </View>
                               </TouchableHighlight> 
                               <TouchableHighlight onPress={()=>setSelectedMonth(index+1)} underlayColor="transparent" >
                                       <View height={20} width={20} style={styles.passarmeses} backgroundColor='red'>
                                       </View>
                               </TouchableHighlight>
                               
                             </View>
             }
             keyExtractor={(item)=>(item+"")}
         />   
 
 
 
         <View flexDirection='row' flexWrap='wrap' >
             {days.map((d,k)=>
                 <Dias 
                   day={d} 
                   key={k}
                   year={selectedYear}
                   month={selectedMonth}
                   onPress={setCores}
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
   mounthbutton: {
     flex:1,
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
   passarmeses: {
     margin: 10,
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
 