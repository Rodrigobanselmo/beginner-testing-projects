import React, { useEffect, useState, useRef } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

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
const MonthText = styled.Text``;

let MonthItemSelected = {backgroundColor:'#CCC', width:'100%', height:40}; //antes o view pagava 90%

const screenWidth = Math.round(Dimensions.get('window').width); //Math.round() retorna o valor de um número arredondado para o inteiro mais proximo.
let thirdW = screenWidth / 3;
let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export default (props) => {
    const MonthRef = useRef();
    const [selectedMonth, setSelectedMonth] = useState(props.selectedMonth);


        // o que aconce aqui é que eu uso o ref para poder mudar uma propriedade do sroll de acordo com algum dado ()
    //////
    const scrollToMonth = (m) => {  //faz com que na hora de carregar mande o scrol para a posição certa e nao fique no inicial padrao embora o mes esteja selecionado corretamente
        let posX = m * thirdW;
        MonthRef.current.scrollTo({x:posX, y: 0, animated: true}); //scrollto é uma função do proprio scrowview //animated opcional
    }
    ////////


    const monthScrollEndAction = (e) => {   //quando ele mover faz essa ação
        let posX = e.nativeEvent.contentOffset.x;   //ele pega aposição do scroll em pixel
        let targetMonth = Math.round(posX / thirdW); //pega o mes de 0-11 pois pega valor da posição e divide pelo valor de um balao
        setSelectedMonth(targetMonth);
    }

    useEffect(()=>{
        props.setSelectedMonth(selectedMonth); //muda o mes no HOME
    }, [selectedMonth]);

    useEffect(()=>{             //toda vez que rodar o scroll bar e mudar de mes ele reroda
        setTimeout(()=>{        //por algum motivo nao funciona normal entao se coloca um time
            scrollToMonth(selectedMonth);
        }, 10);
    }, [props.selectedMonth]);
    
// no key={k} acredito que passa para acessar embaixo

    return (
        <MonthScroll
            ref={MonthRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}  //tira barra de scrowl
            decelerationRate="fast" //desaceleraçao da barra
            snapToInterval={thirdW} //define um intervalo que ele da scrow ou seja ele so pode mexer de 1/3 da tela por vez definido pelo thirdw
            snapToAlignment="center"
            contentContainerStyle={{paddingLeft:thirdW, paddingRight:thirdW}} //faz com que dezembro e janeiro fiquem no meio e nao no canto quando selecionados
            onMomentumScrollEnd={monthScrollEndAction}  //quando mover faz ação // aqui exite o begin, onde ele começa // o begin pega a posição de onde vc solta nao necessariamente de onde clica e comeca a rolar
        >
            {months.map((m,k)=>(
                <MonthButton width={thirdW} key={k} onPress={()=>setSelectedMonth(k)} underlayColor="transparent">
                    <MonthItem style={k==(selectedMonth)?MonthItemSelected:{}}>
                        <MonthText>{m}</MonthText>
                    </MonthItem>
                </MonthButton>
            ))}
        </MonthScroll>
    );
};

