import React, { useEffect, useState, useRef } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

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
const DayText = styled.Text``;

const screenWidth = Math.round(Dimensions.get('window').width);
let dayW = Math.round(screenWidth / 9); //dividido em 9 dias para aparecer na tela
let offsetW = Math.round((screenWidth - dayW) / 2); //mais matematica aqui, pra poder dar aquele espaco entre os lados e poder pegar o item no meio tanto no inicio qunto final

const Day = ({day, month, dailyProgress, workoutDays, onPress, dayatual}) => {
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

/*     if(workoutDays.includes(thisDate.getDay())) { //o getday me da o dia da semna ou seja domingo=0 seg=1 sabado =7  */
        if(thisDate.getTime() < today.getTime()) { //verifica se a data selecionada thidate é menor que a data do dia de hoje today
            let thisYear = thisDate.getFullYear(); //pega dia mes ano do dia selecionado
            let thisMonth = thisDate.getMonth() + 1; //mes soma um pq ta de 0 ate 11 e deve ser de 1 a 12
            let thisDay = thisDate.getDate();
            thisMonth = (thisMonth < 10)?'0'+thisMonth:thisMonth; //como a data de dia menor que 10 é 9 e queremos 09
            thisDay = (thisDay < 10)?'0'+thisDay:thisDay;
            let thisFormated = `${thisYear}-${thisMonth}-${thisDay}`; //ta pegando numero e transf. em strang
            
            if(dailyProgress.includes(thisFormated)) {   //aqui ele vai programar para quando a data em string no daylypro.. for igual a essa marcar como feito
                bgColor = '#B5FFB8';
            } else {if(workoutDays.includes(thisDate.getDay())) {
                bgColor = '#FFB5B5';}
            }
/*         } */
    } else {if(workoutDays.includes(thisDate.getDay())) {} else{
        opacity = 0.2;}
        
        
    }
    
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

export default (props) => {
    const DayRef = useRef();

    const [selectedDay, setSelectedDay] = useState(props.selectedDay); //dia atual como inicial e depois quando mudar dia scroll muda aqui

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
    let daysInMonth = new Date(new Date().getFullYear(), (props.selectedMonth+1), 0).getDate(); //dias começão em 1 //dentro de date ele pegou ano, mes posterior ao atual e dia 0 que representa um dia anterior (ultimo dia do mes anterior)
    for(let i=1;i<=daysInMonth;i++) { //pega os dias e cria um array com todos os dias de cada mes assim de acordo com o mes atual
        days.push(i);
    }

    useEffect(()=>{
        props.setSelectedDay(selectedDay);
    }, [selectedDay]);

    useEffect(()=>{
        setTimeout(()=>{
            if(props.selectedMonth == new Date().getMonth()) {
                scrollToDay(new Date().getDate());
            } else {
                scrollToDay(1);
            }
        }, 10);
    }, [props.selectedMonth]);

    return (
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
                    month={props.selectedMonth}
                    dailyProgress={props.dailyProgress}
                    workoutDays={props.workoutDays}
                    onPress={()=>scrollToDay(d)}
                    dayatual={props.selectedDay}
                />
            )}
        </DaysScroll>
    );
};