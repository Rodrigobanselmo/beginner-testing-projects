import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Janela2 from '../../componentes/inicio/Janela2';
import Lista from './Lista'
import { Dimensions, View, Text } from 'react-native';

//Esse aqui ainda precisar ageitar as coisas pra padronizar com tela de diversos tamanhos

const Ovo = styled.View`
    position: absolute;
    top: 40px;
    left: -${props=>props.acrecimo}px;
    width: ${props=>props.width}px;
    height: 580px;
    backgroundColor: #04D9B2;
    borderTopLeftRadius: 300px;
    borderTopRightRadius: 300px;
    borderBottomLeftRadius: 300px;
    borderBottomRightRadius: 300px;
`;

const Paginaview = styled.SafeAreaView`
    flex:1;
    background-color:#262626;
    padding:0 30px;
`;


const Viewflat = styled.View`
flex:1;

    width:100%;
    margin-bottom:100px;
    margin-top:60px;
`;

const ViewHead = styled.View`
    width:100%;
    height:90px;

`;

const Flatlist = styled.FlatList`
`;




const Page = () => {


// INICIO do codigo para poder mudar efeito com rotação da tela

const window = Dimensions.get("window");
    const [dimensions, setDimensions] = useState({ window });

    const onChange = ({ window}) => {
        setDimensions({ window});
      };

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        if(dimensions.window.width<dimensions.window.height){null}else{null};
      });

// FIM


//AQUI É FEITO O CALCULO DA BOLA PRA FICAR NO MEIO E UM TAMANHO COM PRA TODAS AS TELAS
const tamanhotela = dimensions.window.width;
let acrecimo = 100
let tela = tamanhotela + acrecimo*2
//FIM


    return (
        <Paginaview>
            <Ovo width={tela} acrecimo={acrecimo}/> 
            <ViewHead>
           </ViewHead>
            <Viewflat>
                <Flatlist
                    data={Lista}
                    horizontal={true}
                    renderItem={({item})=>
                        <Janela2 
                        bgcolor={item.cor}
                        data={item.name} 
                        width={dimensions.window.width}
                        />
                    }
                    keyExtractor={(item)=>item.name}
                />
            </Viewflat>
        </Paginaview>
    );
};

Page.navigationOptions = {
    headerShown:false
};

export default Page;