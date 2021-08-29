//OBJETIVO FAZER ESSA PAGINA IGUAL LIST


import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { setName, reset } from '../actions/userActions';

const Container = styled.SafeAreaView`
    flex:1;
    align-items:center;
    background-color:#FFF;
    padding:0 30px;
`;

const HeaderText = styled.Text`
    font-size:22px;
    color:#333;
    margin:50px 0;
`;
const NameInput = styled.TextInput`
    border:1px solid #CCC;
    width:100%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
`;

const HeaderText2 = styled.Text`
    font-size:18px;
    color:#007FFF;
`;

const Box = styled.TouchableHighlight`
border-bottom-color: #222;
padding-right:1px;

`;

export const BackButton  = styled.TouchableHighlight`
margin-left: 15px;
`;

export const BackButtonImage  = styled.Image`
width: 20px;
height: 20px;
`;

const NextButton = (props) => {

    const nextAction = () => {
        if(!props.navigation.state.params || !props.navigation.state.params.name) {
            alert("Você precisa de um nome.");
            return;
        }
        props.navigation.navigate('StarterDias');
    }

    return (
        <Box underlayColor="#FFF" activeOpacity={.5}  onPress={()=> nextAction()}>
            <HeaderText2>Próximo</HeaderText2>
        </Box>
    );
}

const Page = (props) => {

    const nextAction = () => {
        if(!props.name) {
            alert("Você precisa de um nome!");
            return;
        }
        props.navigation.navigate('StarterDias');
    }

    const changeTextName = (t) => {
        props.setName(t);
        props.navigation.setParams({name:t});
    }

    useEffect(()=>{
        props.reset();
    }, []);



    return (
        <Container>
            <HeaderText>Qual é o seu nome?</HeaderText>
            <NameInput
                value={props.name}
                onChangeText={changeTextName}
                autoFocus={true}
                autoCapitalize="words"
                onSubmitEditing={nextAction}
            />
        </Container>
    );
};



Page.navigationOptions = ({navigation}) => { //isso aqui nao recebe props de fora, pois faz parte de um sistema do navigator isolado

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
      name: state.userReducer.name
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        setName:(name)=> setName(name, dispatch),
        reset:()=>reset(dispatch)
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Page); 