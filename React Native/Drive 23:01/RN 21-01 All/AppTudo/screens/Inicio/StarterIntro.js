import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Janela from '../../componentes/inicio/Janela';
import Lista from './Lista'
import { Dimensions, View, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';



const Ovo = styled.View`
    position: absolute;
    top: 170px;
    left: -${props=>props.acrecimo}px;
    width: ${props=>props.width}px;
    height: 680px;
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

    margin-top:10px;
`;

const ViewHead = styled.View`
    padding-top:50px;
    width:100%;
    height:230px; 
    align-items:center;

`;
const Flatlist = styled.FlatList`
`;

const Texto = styled.Text`
`;

const Gammaimage = styled.Image`
    width:347px;
    height:78px;
`;

const Page = (props) => {


/*     const irtela = () => {
        props.navigation.navigate('GradienteTab');
    } */

    const irtela = (nome) => {

        if(nome == 'Gradiente') {
            props.navigation.dispatch(StackActions.reset({
            index: 0,  //reseta o historico de janelas, ou seja, nao pode voltar mais
            actions: [NavigationActions.navigate({ routeName: nome })]
        }))} else{
            props.navigation.navigate(nome);
        };
    }

// INICIO do codigo para poder mudar efeito com rotação da tela

const window = Dimensions.get("window");
    const [dimensions, setDimensions] = useState({ window });

    const onChange = ({ window}) => {
        setDimensions({ window});
      };

      useEffect(() => {
        Dimensions.addEventListener("change", onChange);


        //comando que ao virar a tela aciona (deitada é uma coisa/em pé é outra)
        if(dimensions.window.width<dimensions.window.height){setstate('Vire a tela para renderizar')}else{setstate('Tela renderizada horizontalmente')};
        //fim


        return () => {
          Dimensions.removeEventListener("change", onChange);
        };
      });
// FIM

//teste de funcionamento de um comando que ao virar a tela aciona (deitada é uma coisa/em pé é outra)
    const [state, setstate] = useState('Vire a tela para renderizar')
//FIM

//AQUI É FEITO O CALCULO DA BOLA PRA FICAR NO MEIO E COM UM TAMANHO BOM PRA TODAS AS TELAS (referencio a largura e altura da bola com o tamanho da tela pra sempre ficar igual, mesmo tablet ou smartfone (cerlular em ambas rotações) - no tablet nao testei pra ver se daria certo)
const tamanhotela = dimensions.window.width;
let acrecimo = 100
let tela = tamanhotela + acrecimo*2
//FIM




    return (
        <Paginaview>
            <Texto>{state}</Texto>
            <Ovo width={tela} acrecimo={acrecimo}/> 
            <ViewHead>
                <Gammaimage source={require('../../assets/gammaengenharia.png')} />
            </ViewHead>
            <Viewflat>
                <Flatlist
                    data={Lista}
                    renderItem={({item})=>
                        <Janela 
                        bgcolor={item.cor}
                        data={item.name} 
                        irtela={()=>irtela(item.name)}
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