import React from 'react';
import styled from 'styled-components/native';
import { StackActions, NavigationActions } from 'react-navigation';
import Container from '../../componentes/Gradiente/Container';



const Bloco = styled.View`
    flex:1;
    align-items:center;
    justify-content:center;
`;

const Texto = styled.Text`
    font-size:30px;
    color:#000;
`;

const Gamma = styled.Image`

`;


//TUDO ISSO AQUI TEM NADA VER COM GRADIENTE (HEADER)

                                                                                const BotaoHeader = styled.TouchableHighlight`
                                                                                    width:30px;
                                                                                    height:30px;
                                                                                    justify-content:center;
                                                                                    align-items:center;
                                                                                `;
                                                                                const ImagemVoltar = styled.Image`
                                                                                    width:25px;
                                                                                    height:25px;
                                                                                `;

                                                                                const Botao = (props) => {
                                                                                    const voltar = () => {
                                                                                        props.navigation.dispatch(StackActions.reset({
                                                                                            index: 0,  //reseta o historico de janelas, ou seja, nao pode voltar mais
                                                                                            actions: [NavigationActions.navigate({ routeName: 'StarterStack' })]
                                                                                        }));
                                                                                    }

                                                                                    return (
                                                                                        <BotaoHeader onPress={voltar} underlayColor="transparent">
                                                                                            <ImagemVoltar source={require('../../assets/leftarrow.png')} />
                                                                                        </BotaoHeader>
                                                                                    );
                                                                                }

//FIM TUDO ISSO AQUI TEM NADA VER COM GRADIENTE

const Page = () => {
    
    return(
    <Container color={['#04D9B2', '#038C8C', '#04D9B2']}>
        <Bloco>
            <Texto >GAMMA JR</Texto>
            <Gamma source={require('../../assets/gamma.png')} />
        </Bloco>
    </Container>
    )
}


//TUDO ISSO AQUI TEM NADA VER COM GRADIENTE (HEADER)
                                                                                                    Page.navigationOptions = ({navigation}) => {
                                                                                                        return {
                                                                                                            title:'Gradiente',
                                                                                                            headerTransparent: true,
                                                                                                            headerTitleAlign: 'center',
                                                                                                            headerLeft: () => <Botao navigation={navigation} />,
                                                                                                            headerLeftContainerBWStyle:{
                                                                                                                marginLeft:10
                                                                                                            }
                                                                                                            }
                                                                                                        };
//FIM TUDO ISSO AQUI TEM NADA VER COM GRADIENTE

export default Page;