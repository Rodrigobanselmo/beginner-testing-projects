import React, { useState } from 'react';
import { Text, Button } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { setWorkoutDays } from '../actions/userActions';
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

const DaysArea = styled.View`
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:space-between;
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
        if(!props.navigation.state.params || !props.navigation.state.params.days.length) {
            alert("Você precisa treinar pelo menos 1 dia");
            return;
        }
        props.navigation.navigate('StarterNivel');
    }

    return (
        <Box underlayColor="#FFF" activeOpacity={.5}  onPress={()=> nextAction()}>
            <HeaderText2>Próximo</HeaderText2>
        </Box>
    );
}

const Page = (props) => {

    const [days, setDays] = useState([]);

    const addDay = (d) => {
        let newDays = [...days];
        if(!newDays.includes(d)) {
            newDays.push(d);
        } else {
            newDays = newDays.filter(i=>i!=d);
        }
        setDays(newDays);

        props.setWorkoutDays(newDays);
        props.navigation.setParams({days:newDays});
    }

    let firstName = props.name.split(' ')[0];

    return (
        <Container>
            <HeaderText>Opa <Text style={{fontWeight:'bold'}}>{firstName}</Text>, tudo bem?</HeaderText>
            <HeaderText>Quais <Text style={{fontWeight:'bold'}}>dias da semana</Text> você pretende treinar?</HeaderText>

            <DaysArea>
                <DefaultButton onPress={()=>addDay(1)} bgcolor={days.includes(1)?'#a5e8bc':false} width={'100px'} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Segunda</Text>
                </DefaultButton>
                <DefaultButton onPress={()=>addDay(2)} bgcolor={days.includes(2)?'#a5e8bc':false} width={'100px'} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Terça</Text>
                </DefaultButton>
                <DefaultButton onPress={()=>addDay(3)} bgcolor={days.includes(3)?'#a5e8bc':false} width={'100px'} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Quarta</Text>
                </DefaultButton>
                <DefaultButton onPress={()=>addDay(4)} bgcolor={days.includes(4)?'#a5e8bc':false} width={'100px'} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Quinta</Text>
                </DefaultButton>
                <DefaultButton onPress={()=>addDay(5)} bgcolor={days.includes(5)?'#a5e8bc':false} width={'100px'} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Sexta</Text>
                </DefaultButton>
                <DefaultButton onPress={()=>addDay(6)} bgcolor={days.includes(6)?'#a5e8bc':false} width={'100px'} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Sábado</Text>
                </DefaultButton>
                <DefaultButton onPress={()=>addDay(0)} bgcolor={days.includes(0)?'#a5e8bc':false} width={'100px'} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Domingo</Text>
                </DefaultButton>
            </DaysArea>

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
      name: state.userReducer.name
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        setWorkoutDays:(workoutDays)=> setWorkoutDays(workoutDays, dispatch)
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Page);