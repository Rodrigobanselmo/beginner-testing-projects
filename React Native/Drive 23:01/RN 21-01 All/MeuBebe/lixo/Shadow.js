import React from 'react';
import { useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressCircle } from 'react-native-svg-charts'
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from '../pages/ListScreen/Modal/Modal'
import useColor from '../styles/useColor'


import NoteItem from '../components/NoteItem';

export default () => {
    const [colors] = useColor();
    const route = useRoute(); 
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const pasta = useSelector(state => state.notes.pasta);
    const list = pasta[route.params.key].list

    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState({data:'', edit:true});

    useLayoutEffect(() => {
        navigation.setOptions({
                title: pasta[route.params.key].title,
        })
    }, [])

        
    function onSave(dadosiniciais) {

        if(dadosiniciais.title.trim() !='') {
/*             if (dadosiniciais.edit === true ) {
            console.log('dadosiniciais on edit')
            console.log(dadosiniciais)
                    dispatch({
                        type: 'EDIT_PASTA',
                        payload: dadosiniciais
                    });
                    setModal(false) 
            }else { */
                console.log('dadosiniciais on save')
                console.log(dadosiniciais)
                        dispatch({
                            type: 'ADD_LIST',
                            payload: {...dadosiniciais,key:route.params.key}
                        });
                        setModal(false) 
       /*      } */
        } 
        else {
            alert("Preencha título e corpo");        
        }
    }

    return (
        <View style={styles.Container_View}>
            <Modal isVisible={modal} onSave={onSave} onCancel={() => setModal(false)} /* setEdit={setEdit} edit={edit} *//>   
            {list.length > 0 &&
                <FlatList 
                    data={list}
                    style={styles.Pastas_FlatList}
                    renderItem={({item, index})=>(
                        <NoteItem 
                            data={item}
                            index={index}
/*                             onPress={handleNotePress} */
                        />
                    )}
                    keyExtractor={(item, index)=>index.toString()}
                />
            }
            {list.length == 0 &&
                <View style={styles.NoPasta_View} flex={1}>
                <AntDesign name="folderopen" size={50} color='#202020' style={{paddingRight: 0}}/>
                <Text style={styles.NoPasta_Text}>Nenhuma Tarefa</Text>
            </View>
            }
                <TouchableOpacity activeOpacity={0.7} onPress={() => setModal(true)} style={[styles.Add_TouchableOpacity,{backgroundColor: colors.Add_buttonBack, shadowColor: colors.Add_buttonShadow}]}>
                        <FontAwesome name="plus" size={20} color='#000' />
                </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    Container_View: {
        flex: 1,
        backgroundColor: 'rgba(245, 245, 247, 1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Pastas_FlatList: {
        flex: 1,
        width: '100%',
    },
    Pasta_View: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    NoPasta_Image: {
        width: 50,
        height: 50,
    },
    NoPasta_Text: {
        fontSize: 20,
        color: '#04dcbc',
    },
    Add_TouchableOpacity: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.82,
        shadowRadius: 14.22,
        elevation: 5,
    },
    NoPasta_View: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    NoPasta_Text: {
        fontSize: 20,
        color: '#363636',
    },
});