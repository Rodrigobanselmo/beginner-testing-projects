import React,  { useState, useEffect, useRef }from 'react'
import {
    Platform,
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEvil from 'react-native-vector-icons/EvilIcons'
import IconsModal from './IconsModal'
import ColorsModal from './ColorsModal'
import PastaItem from '../../../components/PastaItemTest/index'

const initialState = { id: 0, title: '', /* date: new Date(), showDatePicker: false, */ imageBack: '#000', image: 'font', colors:["#fff", "#fff", "#eee"]}
const initialDados = { salvar:'#000' }
    
export default props => {

    

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    
        // function de limpeza
        return () => {
          Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
      }, []);
    
    const inputFocus = useRef(null);
    const [keyboardview, setKeyboardview] = useState(true)
    const [dadosiniciais, setdadosiniciais] = useState({...initialState})
    const [outrosDados, setOutrosDados] = useState({...initialDados})
    const [icon, setIcon] = useState(false)
    const [colorsView, setColorsView] = useState(false)


    useEffect(() => {
        if (props.edit.data !== '' && props.edit.key !== '' && props.edit.edit) {
            console.log(props.edit.edit)
            setdadosiniciais({...props.edit.data, edit: props.edit.edit})
            props.setEdit({...props.edit, key:'', data:''})
        }

    }, [props.isVisible])

    const _keyboardDidShow = () => {
        setIcon(false)
        setKeyboardview(false);
    };
    
    const _keyboardDidHide = () => {
        setKeyboardview(true);

    };

    const TextInputWithFocus = () => {
        // `current` aponta para o evento de `focus` gerado pelo campo de texto
        inputFocus.current.focus();
        setColorsView(true)
    };

    const TextInputWithBlurIcons = () => {
        if (icon == false) {
            inputFocus.current.blur();
            setIcon(true)
        } else {
            setIcon(false)
            inputFocus.current.focus();
        }
    };

    const TextInputWithBlurIconsOnSubmit = () => {
        if(dadosiniciais.title.trim() !='') {
            if (icon == false) {
                inputFocus.current.blur();
                setIcon(true)
            } else {
                setIcon(false)
                inputFocus.current.focus();
            }
        }
        else {
            alert("Preencha título e corpo");        
        }
    };

    const TextInputWithBlurColors = () => {
        setColorsView(!colorsView)
    };

    const onRequestClose = () => {
        setIcon(false)
        setdadosiniciais({ ...initialState })
        props.onCancel()
    };


    const onColor = (color) => {
        setdadosiniciais({ ...dadosiniciais, imageBack:color, title:dadosiniciais.title, image:dadosiniciais.image, colors:dadosiniciais.colors })
    };

    const onIcon = (icon) => {
        setdadosiniciais({ ...dadosiniciais, image:icon, title:dadosiniciais.title, imageBack:dadosiniciais.imageBack, colors:dadosiniciais.colors })
    };
          
        
    const save = () => {
        if(dadosiniciais.title.trim() !='') {
            console.log(dadosiniciais)
            props.onSave && props.onSave({...dadosiniciais, id: dadosiniciais.id == 0 ? Math.random() : dadosiniciais.id })
            setIcon(false)
            setdadosiniciais({ ...initialState })
        }
        else {
            alert("Preencha título e corpo");        
        }
    }

    const saveOrcancel = () => {
        if(dadosiniciais.title.trim() !='') {
            save()
        }
        else {
            onRequestClose()      
        }
    }


    
    
    //Aqui faz com que o botão de salvar fique azul para salvar
    const onTitleEditSalvarColor = (title) => {
        setdadosiniciais({...dadosiniciais, title })
        if (title.length == 1) {setOutrosDados({...outrosDados, salvar:'#3587F2'})}
        if (title.length == 0) {setOutrosDados({...outrosDados, salvar:'#000'})}
    };
    //FIM

        return (
            <Modal transparent={true} visible={props.isVisible}
                onRequestClose={onRequestClose}    
                animationType='slide'
                onShow={TextInputWithFocus}>
                
                {!icon ? 
                <TouchableWithoutFeedback
                    onPress={saveOrcancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                : null }
                <View style={styles.headerView}>
                <View style={styles.headerView1}>
                <Text style={styles.headerText}>Nova Tarefa</Text>
                </View>
                </View>

                    <View backgroundColor='#fff' height={120}>
                <PastaItem data={dadosiniciais} setIcon={()=>TextInputWithBlurIcons()} colors={props.colors} />
                </View>

                    {icon ?   
                    <IconsModal onPress={onIcon} />
                    : null }

                    <View style={styles.container}>
                    <TextInput style={styles.input} 
                        ref={inputFocus}
                        blurOnSubmit={false}
                        placeholder="Informe a Descrição..."
                        onChangeText={title => onTitleEditSalvarColor(title)}
                        value={dadosiniciais.title}
                        returnKeyType='next'
                        onSubmitEditing={TextInputWithBlurIconsOnSubmit} 
                        />
                        
                    {colorsView ? 
                        <ColorsModal onPress={onColor}/>
                    : null}


                    <View flexDirection='row'>
                        <View flexDirection='row' style={{alignItems:'center'}}>
{/*                             <TouchableOpacity style={{marginHorizontal:10}}>
                                <Icon name="calendar-check" size={20} color='#000' />
                            </TouchableOpacity> */}
                            <TouchableOpacity style={{marginHorizontal:10, marginLeft: 20}}>
                                <Icon name="swap-vertical" size={20} color='#000' />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginHorizontal:10}} onPress={TextInputWithBlurColors}>
                                <Icon name="format-color-fill" size={20} color='#000' />
                            </TouchableOpacity>
{/*                             <TouchableOpacity style={{marginHorizontal:10}}>
                                <Icon name="message-outline" size={20} color='#000' />
                            </TouchableOpacity> */}
                            <TouchableOpacity style={{marginHorizontal:10}} onPress={TextInputWithBlurIcons}>
                                <IconEvil name="image" size={28} color='#000' />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={onRequestClose}>
                                <Text style={styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={save}>
                                <Text style={[styles.button,{color: outrosDados.salvar}]}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }


const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    headerView: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        height: 40
    },
    headerView1: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flex: 1,
        padding: 10,
    },
    headerText: {
        color: '#262626',
        textAlign: 'center',
        fontSize: 15,
    },
    input: {
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: '#262626',
    },
    date: {
        fontSize: 20,
        marginLeft: 15
    }
})