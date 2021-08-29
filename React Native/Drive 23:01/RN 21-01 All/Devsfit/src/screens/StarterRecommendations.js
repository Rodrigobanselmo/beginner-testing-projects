import React, { useEffect } from 'react';
import { Text, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { addWorkout, delWorkout, resetW } from '../actions/userActions';
import Workout from '../components/Workout';
import workoutJson from '../presetWorkouts.json';

const Container = styled.View`
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

const WorkoutList = styled.FlatList`
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
    let btnTitle = 'Ignorar';
    if(props.navigation.state.params && props.navigation.state.params.hasWorkout) {
        btnTitle = 'Concluir';
    }

    const nextAction = () => {
        props.navigation.dispatch(StackActions.reset({
            index: 0,  //reseta o historico de janelas, ou seja, nao pode voltar mais
            actions: [NavigationActions.navigate({ routeName: 'AppTab' })]
        }));
    }

    return (
    
    <Box  underlayColor="#FFF" activeOpacity={.5}  onPress={()=> nextAction()}>
        <HeaderText2>{btnTitle}</HeaderText2>
    </Box>

    );
}

//o addWorkout aquifoi criado la em baixo por isso props

const Page = (props) => {
    const addWorkout = (item) => {
        if(props.myWorkouts.findIndex(i=>i.id==item.id) < 0) {
            props.addWorkout(item);
        } else {
            props.delWorkout(item);
        }
    }

    useEffect(()=>{
        props.resetW();
    }, []);

    
    useEffect(()=>{
        if(props.myWorkouts.length > 0) {
            props.navigation.setParams({hasWorkout:true});
        } else {
            props.navigation.setParams({hasWorkout:false});
        }
    }, [props.myWorkouts]);

    return (
        <Container>
            <HeaderText>Opções de treino pré-criados com base no seu nível.</HeaderText>
            <HeaderText>Você selecionou {props.myWorkouts.length} treinos</HeaderText>
            <WorkoutList
                data={workoutJson}
                renderItem={({item})=><Workout
                    data={item}
                    addAction={()=>addWorkout(item)}   //manda item para o componente workout e la ele manda executar a function addaction (addaction executa addworkout aqui dentro)
                />}
                keyExtractor={item=>item.id}
            />
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
        level: state.userReducer.level,
        myWorkouts: state.userReducer.myWorkouts
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        addWorkout:(workout)=>addWorkout(workout, dispatch),   //aqui eu recebo o la de cima o item que substitui o (workaout) e mando no addworcout das Actions
        delWorkout:(workout)=>delWorkout(workout, dispatch),
        resetW: ()=> resetW(dispatch)
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Page);