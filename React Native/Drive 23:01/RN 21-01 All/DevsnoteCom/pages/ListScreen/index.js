import React from 'react';
import { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import {
    Container,
    AddButton,
    AddButtonImage,
    NotesList,
    NoNotes,
    NoNotesImage,
    NoNotesText
} from './styles';

import NoteItem from '../../components/NoteItem';

export default () => {
    const route = useRoute(); 
    const navigation = useNavigation();
    const lists = useSelector(state => state.notes.pasta);
    const list = lists[route.params.key].list

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Suas notas',
            headerRight: () => (
                <AddButton underlayColor="transparent" onPress={()=>navigation.navigate('EditNote', {sava: true, pastakey: route.params.key})}>
                    <AddButtonImage source={require('../../assets/more.png')} />
                </AddButton>
            ),
        })
    }, [])
    
    const handleNotePress = (index) => {
        navigation.navigate('EditNote', {
            key: index, sava: false, pastakey: route.params.key
        });
    }

    return (
        <Container>
            {list.length > 0 &&
                <NotesList 
                    data={list}
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
            {list.length == 0 &&
                <NoNotes>
                    <NoNotesImage source = {require('../../assets/note.png')} />
                    <NoNotesText>Nenhuma anotação</NoNotesText>
                </NoNotes>
            }
        </Container>
    );
}