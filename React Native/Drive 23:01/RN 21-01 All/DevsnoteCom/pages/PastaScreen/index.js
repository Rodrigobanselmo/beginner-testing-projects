/* import React from 'react';
import PastaItem from '../../components/NoteItem';
import { useNavigation } from '@react-navigation/native';
import {Lista} from '../../reducers/PastasReducer';

import {
    NoNotesText,
    Box
} from './styles';


export default () => {
    const navigation = useNavigation();

    const handleNotePress = () => {
        navigation.navigate('Lista');
    }
    return (
        <Box onPress={handleNotePress}>
        <NoNotesText>BOMDIA</NoNotesText>
    </Box>
    );
} */

import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import {
    Container,
    AddButton,
    AddButtonImage,
    NotesList,
    NoNotes,
    NoNotesImage,
    NoNotesText,
    AddButtons,
    TitleInput,
    DeleteButton,
    DeleteButtonText

} from './styles';

import NoteItem from '../../components/NoteItem';

export default () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const pasta = useSelector(state => state.notes.pasta);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Suas pastas',
            headerRight: () => (
                <AddButton underlayColor="transparent" onPress={()=>navigation.navigate('Lista')}>
                    <AddButtonImage source={require('../../assets/more.png')} />
                </AddButton>
            ),
        })
    }, [])
    
    const handleNotePress = (index) => {
        navigation.navigate('Lista', {
            key: index
        });
    }

    const nova = () => {
        if(title !='') {
                dispatch({
                    type: 'ADD_PASTA',
                    payload: {title}
                });
        } else {
            alert("Preencha título e corpo");
        }
    }

    return (
    
        <>
        <Container>
            {pasta.length > 0 &&
                <NotesList 
                    data={pasta}
                    renderItem={({item, index})=>(
                        <NoteItem 
                            data={item}
                            index={index}
                            onPress={handleNotePress}
                        />
                    )}
                    keyExtractor={(item, index)=>index.toString()}
                />
            }
            {pasta.length == 0 &&
                <NoNotes>
                    <NoNotesImage source = {require('../../assets/note.png')} />
                    <NoNotesText>Nenhuma anotação</NoNotesText>
                </NoNotes>
            }
            
            <NoNotes>
            <NoNotesText>Nenhuma anotação</NoNotesText>
            <TitleInput 
                value={title}
                onChangeText={t=>setTitle(t)}
                placeholder="Digite o título da pasta"
                placeholderTextColor="#CCC"
        
            />
            </NoNotes>
            <DeleteButton underlayColor="#FF0000" onPress={nova} >
                        <DeleteButtonText>Excluir Anotação</DeleteButtonText>
            </DeleteButton>
        
        </Container>
        
        </>
        
    );
}