import React, { useState } from 'react';
import { Text, Button } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { setLevel } from '../actions/userActions';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex:1;
    align-items:center;
    background-color:#FFF;
    padding:50px 30px 0px 30px;
`;

const HeaderText = styled.Text`
    font-size:15px;
    color:#333;
    text-align:center;
    padding-bottom:30px;
`;

const LevelArea = styled.View`
    width:100%;
`;


const HeaderText2 = styled.Text`
    font-size:18px;
    color:#007FFF;
`;

const BackButton  = styled.TouchableHighlight`
margin-left: 15px;
`;

const BackButtonImage  = styled.Image`
width: 20px;
height: 20px;
`;

const Box = styled.TouchableHighlight`
border-bottom-color: #222;
padding-right:1px;

`;

const NextButton = (props) => {

    const nextAction = () => {
        if(!props.navigation.state.params || !props.navigation.state.params.level) {
            alert("Você precisa dizer seu nível");
            return;
        }
        props.navigation.navigate('StarterRecommendations');
    }


    return (
        <Box underlayColor="#FFF" activeOpacity={.5}  onPress={()=> nextAction()}>
            <HeaderText2>Próximo</HeaderText2>
        </Box>
    );
}

const Page = (props) => {
    let funnyPhrase = '';
    switch(props.workoutDays.length) {
        case 1:
            funnyPhrase = "1 dia por semana pra não ficar parado";
            break;
        case 2:
            funnyPhrase = "Legal, 2 dias é otimo pra começar";
            break;
        case 3:
            funnyPhrase = "Legal, 3 dias na semana é ideal para começar";
            break;
        case 4:
            funnyPhrase = "Legal, 4 dias já é quase um atleta!";
            break;
        case 5:
            funnyPhrase = "É isso aí, 5 dias, lets GO!";
            break;
        case 6:
            funnyPhrase = "É, 6 dias não é pra todo mundo...";
            break;
        case 7:
            funnyPhrase = "WoooW! Todo dia?! Gostei de ver!";
            break;
    }

    const setMyLevel = (l) => {
        props.setLevel(l);
        props.navigation.setParams({level:l});
    }

    return (
        <Container>
            <HeaderText style={{fontWeight:'bold'}}>{funnyPhrase}</HeaderText>
            <HeaderText>Qual seu nível hoje?</HeaderText>

            <LevelArea>
                <DefaultButton onPress={()=>setMyLevel('beginner')} bgcolor={props.level=='beginner'?'#a5e8bc':false} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Iniciante</Text>
                </DefaultButton>
                <DefaultButton onPress={()=>setMyLevel('intermediate')} bgcolor={props.level=='intermediate'?'#a5e8bc':false} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Intermediário</Text>
                </DefaultButton>
                <DefaultButton onPress={()=>setMyLevel('advanced')} bgcolor={props.level=='advanced'?'#a5e8bc':false} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Avançado</Text>
                </DefaultButton>
            </LevelArea>

            <HeaderText>Você pode alterar isso a qualquer momento.</HeaderText>
        </Container>
    );
};

Page.navigationOptions = ({navigation}) => {
    const handleCloseButton = () => {
        navigation.goBack();
    }

    return {
        title:'',
        headerRight:() => <NextButton navigation={navigation} />,
        headerLeft: () => (
            <BackButton underlayColor="transparent" onPress={handleCloseButton}>
                <BackButtonImage source={require('../assets/leftarrow.png')} />
            </BackButton>
        ),
        headerRightContainerStyle:{
            marginRight:10
        }
    };
}



const mapStateToProps = (state) => {
    return {
        workoutDays: state.userReducer.workoutDays,
        level: state.userReducer.level
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        setLevel:(level)=> setLevel(level, dispatch)
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Page);