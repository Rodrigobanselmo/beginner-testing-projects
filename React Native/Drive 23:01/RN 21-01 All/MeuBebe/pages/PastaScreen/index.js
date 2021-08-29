import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from './Modal/Modal'
import useColor from '../../styles/useColor'
import PastaItem from '../../components/PastaItem';

export default () => {
    
    const [colors] = useColor();

    
const styles = StyleSheet.create({
    Container_View: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.background,
        alignItems: 'center',
        paddingTop:10
    },

    Header_View: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: colors.background,
        alignItems: 'center',
        height: 50,
    },
    Drawer: {
        position: 'absolute',
        left: 11,
        bottom: 10,
        backgroundColor: colors.background,
    },
    Pastas_FlatList: {
        flex: 1,
        width: '100%',
    },
    Pasta_View: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    NoPasta_Text: {
        fontSize: 20,
        color: colors.NoPasta_Text,
    },
    Folder_View: {
        justifyContent:'flex-start',
        width: '100%',
        paddingHorizontal: 15,
        paddingBottom: 10,
        paddingTop: 0,
        flexDirection: 'row',

        
    },
    Folder_Text: {
        fontSize: 21,
        color: colors.Folder_Text,
        fontWeight: 'normal',
    },
    Add_TouchableOpacity: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.Add_buttonBack,
        justifyContent: 'center',
        alignItems: 'center',
                shadowColor: colors.Add_buttonShadow,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.82,
        shadowRadius: 14.22,
        elevation: 5,
    },
        Desfazer_View: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.Desfazer_ViewBack,
        justifyContent: 'center',
        alignItems: 'center',
                shadowColor: colors.Desfazer_ViewShadow,
                shadowOffset: {
                    width: 0,
                    height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.00,
                
                elevation: 24,
    },
});

    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState({key:'', data:'', edit:true});
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const pasta = useSelector(state => state.notes.pasta);
    

    function onSave(dadosiniciais) {

        if(dadosiniciais.title.trim() !='') {
            if (dadosiniciais.edit === true ) {
            console.log('dadosiniciais on edit')
            console.log(dadosiniciais)
                    dispatch({
                        type: 'EDIT_PASTA',
                        payload: dadosiniciais
                    });
                    setModal(false) 
            }else {
                console.log('dadosiniciais on save')
                console.log(dadosiniciais)
                        dispatch({
                            type: 'ADD_PASTA',
                            payload: dadosiniciais
                        });
                        setModal(false) 
            }
        } 
        else {
            alert("Preencha título e corpo");        
        }
    }


    function onDelete(key) {
                    dispatch({
                        type: 'DELETE_PASTA',
                        payload: key
                    });
    }

    function onDelete2(key) {
        dispatch({
            type: 'DELETE_PASTA2',
            payload: key
        });
    }

    function onArquivar(key) {
        dispatch({
            type: 'ARQUIVAR_PASTA',
            payload: key
        });
    }

    function onEdit(key,data) {
        setEdit({...edit, key,data})
        setModal(true)
    }

    function compare(a, b) {
    // Use toUpperCase() to ignore character casing
        const bandA = a.ordem;
        const bandB = b.ordem;
    
        let comparison = 0;
        if (bandA > bandB) {
        comparison = 1;
        } else if (bandA < bandB) {
        comparison = -1;
        }
        return comparison;
    }

        
    const handleNotePress = (index) => {
        navigation.navigate('Lista', { key: index}); }
        

    return (
    
        <>
    <View style={styles.Container_View}>
        <StatusBar backgroundColor={colors.background || '#000'} barStyle={colors.statusBar}/>
{/*             <StatusBar backgroundColor='#ffff' barStyle={colors.statusBar}/> */}




{/* aqui estao a coisa de folder  
        <View style={[styles.Folder_View, {marginBottom: 5}]}>
            <Text style={styles.Folder_Text}>Folders</Text>
            <View style={{flex: 1, justifyContent:'flex-end', alignItems: 'center', flexDirection: 'row',}} >
                    <MaterialCommunityIcons name="format-list-bulleted" size={23} color={colors.IconActivi} style={{paddingRight: 10}}/>
                <Fontisto name="nav-icon-grid-a" size={17} color={colors.Iconinactivi} />
            </View>
        </View> */}
        <Modal colors={colors} isVisible={modal} onSave={onSave} onCancel={() => setModal(false)} setEdit={setEdit} edit={edit}/>   
            {pasta.length > 0 &&
            
                <FlatList 
                    data={pasta.sort(compare)}
                    style={styles.Pastas_FlatList}
                    contentContainerStyle={{paddingBottom:60}}
                    renderItem={({item, index})=>(
                        <PastaItem 
                            data={item}
                            index={index}
                            onPress={() => handleNotePress(index)}
                            onDelete={onDelete}
                            onDelete2={onDelete2}
                            onArquivar={onArquivar}
                            onEdit={onEdit}
                            colors={colors}
                        />
                    )}
                    keyExtractor={(item, index)=>index.toString()}
                />
            }
            {pasta.length == 0 &&

                <View style={styles.Pasta_View} flex={1}>
                    <AntDesign name="folderopen" size={50} color={colors.Folder_Icon} style={{paddingRight: 0}}/>
                    <Text style={styles.NoPasta_Text}>Nenhuma anotação</Text>
                </View>
            }

            <TouchableOpacity style={styles.Add_TouchableOpacity} activeOpacity={0.7} onPress={() => setModal(true)}>
                            <Icon name="plus" size={20} color={colors.Add_buttonPlus} />
            </TouchableOpacity>




        </View>
        
        </>
        
    );
}



{/* <View style={styles.Header_View}>
<Ionicons name="ios-menu" style={styles.Drawer}  size={24} color={colors.headerText} />
<Text style={{fontSize: 22, color: colors.headerText}}>Tarefas</Text>
</View> */}