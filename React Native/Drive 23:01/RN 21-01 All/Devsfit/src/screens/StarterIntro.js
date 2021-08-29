import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
    background-color:#fff;
    padding:0 30px;
`;

const WelcomeText = styled.Text`
    font-size:22px;
    color:#333;
    margin-top:50px;
`;
const WelcomeText2 = styled.Text`
    font-size:14.5px;
    color:#333;
    margin-top:5px;
    text-align:justify;
`;
const WelcomeImage = styled.View`
    flex:1;
    justify-content:center;
`;
const WelcomeLogo = styled.Image`
    width:400px;
    height:300px;
`;

const BeginConfigArea = styled.View`
    width:100%;
    margin-bottom:50px;
`;
const ButtonText = styled.Text`
    color:#FFF;
`;

const Page = (props) => {

    const start = () => {
        props.navigation.navigate('StarterName');
    };

    return (
        <Container>
            <WelcomeText>Bem vindo(a) ao Atletismo</WelcomeText>
            <WelcomeText2>Click em baixo para dar seu 1º pulo a uma nova vida</WelcomeText2>
            <WelcomeImage>
                <WelcomeLogo source={require('../assets/bolt.png')} />
            </WelcomeImage>
            <BeginConfigArea>
                <DefaultButton width="100%" bgcolor="#0072c0" underlayColor="#0b7ac6" onPress={start}>
                    <ButtonText>Iniciar Configuração</ButtonText>
                </DefaultButton>
            </BeginConfigArea>
        </Container>
    );
};

Page.navigationOptions = {
    headerShown:false
};

export default Page;