import React, { useState } from 'react';
import styled from 'styled-components/native';
import useMuscleImage from './useMuscleImage';
import { useSelector } from 'react-redux';
import persistCombineReducers from 'redux-persist/es/persistCombineReducers';
import workoutJson from '../presetWorkouts.json';

const Workout = styled.View`
    background-color:#f1f1f1;
    flex-direction:row;
    border-radius:10px;
    margin-bottom:20px;
    border:2px solid #DDD;
`;
const WorkoutInfo = styled.View`
    flex:1;
`;
const WorkoutTitle = styled.Text`
    font-size:17px;
    margin:10px;
`;
const MuscleScroll = styled.ScrollView`
    margin:10px;
`;
const MuscleGroup = styled.View`
    width:61px;
    height:55px;
    background-color:${props=>props.color || 'auto'};
    border-radius:5px;
    margin-right:5px;
    justify-content:center;
    align-items:center;
`;
const MuscleImage = styled.Image`
    width:45px;
    height:45px;
`;
const WorkoutActions = styled.View`
    justify-content:center;
`;
const WorkoutButton = styled.TouchableHighlight`
flex:1;
    width:25px;
    height:25px;
    margin:20px;
    justify-content:center;
    align-items:center;
`;
const WorkoutButtonImage = styled.Image`
    width:25px;
    height:25px;
`;

export default (props) => {



    const level = useSelector(state => state.userReducer.level);
    const [included, setIncluded] = useState(false);
    
    const muscleGroups = [];
    for(let i in props.data.exercises) {
        if(!muscleGroups.includes(props.data.exercises[i].muscle)) { //se inclui o musculo ele nao pega denovo
            muscleGroups.push(props.data.exercises[i].muscle);
        }
    }

    const addWorkout = () => {  //ele é executado ao clicar no icone de X do componente para trocar para CHECK
        props.addAction();
        setIncluded(!included);
    }

    const editWorkout = () => {
        props.editAction();
    }

    const delWorkout = () => {
        props.delAction();
    }

    const goWorkout = () => {
        props.goAction();
    }
    
    

    //aparentemente persistentScrollbar so funciona no android
    //m quer dizer que paga cada item do array e chama de m

    const cores = () => {  //Eu que criei ára mudar de cores com nivel
        if(level == 'beginner') {return ('#aad9a0')}
        else if (level == 'intermediate') {return ('#F1DF73')}
        else {return ('#5882FA')}
    }

    return (
        <Workout>
            <WorkoutInfo>
                <WorkoutTitle>{props.data.name}</WorkoutTitle>
                <MuscleScroll horizontal={true} persistentScrollbar = {true} > 
                    {muscleGroups.map((m,k)=>(
                        <MuscleGroup key={k} color = {cores}>
                            <MuscleImage source={useMuscleImage(m)} />
                        </MuscleGroup>
                    ))}
                </MuscleScroll>
            </WorkoutInfo>
            <WorkoutActions>
                {(props.addAction) && // se mandou o addAction como prop é verdade e executa
                    <WorkoutButton onPress={()=>addWorkout()} underlayColor="transparent">
                        <WorkoutButtonImage source={included?require('../assets/check-black.png'):require('../assets/add.png')} />
                    </WorkoutButton>
                }
                {(props.editAction) &&
                    <WorkoutButton onPress={()=>editWorkout()} underlayColor="transparent">
                        <WorkoutButtonImage source={require('../assets/edit-black.png')} />
                    </WorkoutButton>
                }
                {(props.delAction) &&
                    <WorkoutButton onPress={()=>delWorkout()} underlayColor="transparent">
                        <WorkoutButtonImage source={require('../assets/trash-black.png')} />
                    </WorkoutButton>
                }
                {(props.goAction) &&
                    <WorkoutButton onPress={()=>goWorkout()} underlayColor="transparent">
                        <WorkoutButtonImage source={require('../assets/play-black.png')} />
                    </WorkoutButton>
                }
            </WorkoutActions>
        </Workout>
    );
}