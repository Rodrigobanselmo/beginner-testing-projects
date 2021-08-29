import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigation, useRoute } from '@react-navigation/native';

import {
    Container,
    TitleInput,
    BodyInput,
    SaveButton,
    SaveButtonImage,
    CloseButton,
    CloseButtonImage,
    DeleteButton,
    DeleteButtonText,
/*     Teclado */
} from './styles';



export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const lists = useSelector(state => state.notes.pasta);
    const list = lists[route.params.pastakey].list
    
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('new');


    useEffect(()=> {
        if(route.params?.key != undefined && list[route.params.key]) {
            setStatus('edit');
            setTitle(list[route.params.key].title );
            setBody(list[route.params.key].body );
        }
    }, []);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: status == 'new' ? 'Nova Anotação' : 'Editar Anotação' ,
            headerLeft: () => (
                <CloseButton underlayColor="transparent" onPress={handleCloseButton}>
                    <CloseButtonImage source={require('../../assets/close.png')} />
                </CloseButton>
            ),
            headerRight: () => (
                <SaveButton underlayColor="transparent" onPress={handleSaveButton}>
                    <SaveButtonImage source={require('../../assets/save.png')} />
                </SaveButton>
            )
        });
    }, [status, title, body]);
    

const handleSaveButton = () => {
    if(title !='') {
        if(status =='edit') {
            dispatch({
                type: 'EDIT_NOTE',
                payload: {key: route.params.key, title, body, pastakey: route.params.pastakey}
            });
        } else {
            dispatch({
                type: 'ADD_NOTE',
                payload: {title,body, pastakey: route.params.pastakey}
            });
        }

        navigation.goBack();
    } else {
        alert("Preencha título e corpo");
    }
}
const handleCloseButton = () => {
    navigation.goBack();
}

const handleDeleteNoteButton = () => {
    dispatch({
        type: 'DEL_NOTE',
        payload:{
            key: route.params.key,
            pastakey: route.params.pastakey
        }
    });

    navigation.goBack();
}




/*  const Ha = () => { if(status =='edit') {return (JSON.parse(stringValue));} else if(status == 'new') {return (JSON.parse(stringValue1);} }
 */


 
    return (
        <Container>
{/*         <Teclado enabled = {true}> */}
            <TitleInput 
                value={title}
                onChangeText={t=>setTitle(t)}
                placeholder="Digite o título da anotações"
                placeholderTextColor="#CCC"
                autoFocus= {route.params.sava}
        
            />


            <BodyInput 
                value={body}
                onChangeText={t=>setBody(t)}
                placeholder="Digite o corpo da anotação"
                placeholderTextColor="#CCC"
                multiline={true}
                textAlignVertical="top"
            />
            {status =='edit' &&
                    <DeleteButton underlayColor="#FF0000" onPress={handleDeleteNoteButton} >
                        <DeleteButtonText>Excluir Anotação</DeleteButtonText>
                    </DeleteButton>
            }
{/*             </Teclado> */}
        </Container>
    )
}
