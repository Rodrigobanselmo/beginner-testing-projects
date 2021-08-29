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
    Keyboard,
    ScrollView,
    Dimensions 
} from 'react-native'

import DateTimePicker from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo';
import PrioridadeModal from './PrioridadeModal'
import moment from 'moment'
import 'moment/locale/pt-br'


let today = new Date(); //pega dia/hora tudo sobre a data de hj
today.setHours(23);  // ele zera aqui para poder comparar datas, ja que como a hora/min.. nao foi definida em thisDay e today sim, entao precisar zerar para igualar
today.setMinutes(59);
today.setSeconds(0);
today.setMilliseconds(0);

const initialState = { id: 0, title: '', body: '', date: today, tempoestimado: '12h', para: 'Sem data prevista', progress: 0.6, progressColor:'#2956E0', backgroundColor:'#3587F2'}
const initialDados = { dataEscolhida:'', prior: [1,1,1,1], priorShow: true, texto: false, textoFocus: false, salvar:'#000', subtarefas:false}

export default props => {

    const windowHeight = Dimensions.get('window').height;

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
    const [datePickerModal, setDatePickerModal] = useState(false)
    const [dadosiniciais, setdadosiniciais] = useState({...initialState})
    const [outrosDados, setOutrosDados] = useState({...initialDados})

/*     const [colorsView, setColorsView] = useState(false) */




/*     useEffect(() => {
        if (props.edit.data !== '' && props.edit.key !== '' && props.edit.edit) {
            console.log(props.edit.edit)
            setdadosiniciais({...props.edit.data, edit: props.edit.edit})
            props.setEdit({...props.edit, key:'', data:''})
        }

    }, [props.isVisible]) */

    const _keyboardDidShow = () => {
        setKeyboardview(false);
    };
    
    const _keyboardDidHide = () => {
        setKeyboardview(true);

    };

    const TextInputWithFocus = () => {
        inputFocus.current.focus();
    };

/*     const TextInputWithBlurFocus = () => {
        inputFocus.current.blur();
    }; */


    const onRequestClose = () => {
        setdadosiniciais({ ...initialState })
        setOutrosDados({...initialDados})
        props.onCancel()
    };


    const onDateConfirme = (date) => {
        onDateCancel()
        const formattedDate = moment(date).locale('pt-br').format('DD/MM/YY')
        setOutrosDados({...outrosDados, dataEscolhida:formattedDate})
        setdadosiniciais({ ...dadosiniciais, para:date })
    };

    const onDateCancel = () => {
        setDatePickerModal(false);
        inputFocus.current.focus();
      };
          
        
     const save = () => {
        if(dadosiniciais.title.trim() !='') {
        props.onSave && props.onSave({...dadosiniciais, id: dadosiniciais.id == 0 ? Math.random() : dadosiniciais.id })
        setOutrosDados({...initialDados})
        setdadosiniciais({ ...initialState })
        }
    else {
        alert("Preencha título e corpo");        
        }
    }

    
    useEffect(() => {

            if (!datePickerModal == true) {
                if (keyboardview === true && props.isVisible == true && dadosiniciais.title !== '') {
                    const save = () => {
                        props.onSave && props.onSave({...dadosiniciais, id: dadosiniciais.id == 0 ? Math.random() : dadosiniciais.id})
                        setOutrosDados({...initialDados})
                        setdadosiniciais({ ...initialState })
                    }
                    save()
                } else { if (keyboardview === true && props.isVisible == true && dadosiniciais.title == '') { onRequestClose() }}
            } 
        }, [keyboardview]
    )

    const onPrioridade = (priodridade, index, progresscolor) => {
        setdadosiniciais({ ...dadosiniciais, backgroundColor:priodridade, progressColor:progresscolor })
        let pick = [0,0,0,0]
        pick[index] = 1
        setOutrosDados({...outrosDados, prior:pick})
    };

    const onPrioridadeShow = () => {
        setOutrosDados({...outrosDados, priorShow:!outrosDados.priorShow})
    };

    const onTextoShow = () => {
        if (outrosDados.texto == true) {inputFocus.current.focus();}
        setOutrosDados({...outrosDados, texto:!outrosDados.texto, priorShow:false, subtarefas:false})

    };

    const onTitleEditSalvarColor = (title) => {
        setdadosiniciais({...dadosiniciais, title })
        if (title.length == 1) {setOutrosDados({...outrosDados, salvar:'#3587F2'})}
        if (title.length == 0) {setOutrosDados({...outrosDados, salvar:'#000'})}
    };


    const onSubTarefas = () => {
        if (outrosDados.subtarefas == true) {inputFocus.current.focus();}
        setOutrosDados({...outrosDados, subtarefas:!outrosDados.subtarefas, texto:false, priorShow:false })
    };

    const onSubmitTarefas = () => {
        if (outrosDados.subtarefas) { 

        }
    };


const Subtarefas = ({}) => {

    return (
        <View flexDirection='row' backgroundColor='transparent' style={styles.subtarefaView}>
            <View backgroundColor='transparent' style={styles.subtarefaInput} borderColor='#000'>
                <AntDesign name="check" size={18} color='#000' />
            </View>
            <TextInput style={[styles.inputBody,{backgroundColor: '#FFF', flex: 1}]} 
                autoFocus={true}
                blurOnSubmit={false}
                placeholder="Subtarefa..."
                onChangeText={body => setdadosiniciais({...dadosiniciais, body })}
                value={dadosiniciais.body} 
                onSubmitEditing={onSubmitTarefas}
            />
            <View backgroundColor='transparent' style={styles.subtarefamais}>
                <AntDesign name="plus" size={20} color='#000' />
            </View>
        </View>
    );
};






        return (
            <Modal transparent={true} visible={props.isVisible}
                onRequestClose={onRequestClose}    
                animationType='slide'
                onShow={TextInputWithFocus}>
            <DateTimePicker
                mode='datetime'
                datePickerModeAndroid="calendar"
                titleIOS="DeadLine"
                cancelTextIOS="Cancelar"
                confirmTextIOS="Ok"
                date={dadosiniciais.date}
                isVisible={datePickerModal}
                onConfirm={onDateConfirme}
                onCancel={onDateCancel}
            />

                <TouchableWithoutFeedback
                    onPress={onRequestClose}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>

                <View style={styles.headerView}>
                <View style={styles.headerView1}>
                <Text style={styles.headerText}>{`Nova Tarefa ${ outrosDados.dataEscolhida == '' ? '' : outrosDados.dataEscolhida}`}</Text>
                </View>
                </View>

                    <View style={styles.container}>
                    <TextInput style={styles.input} 
                        ref={inputFocus}
                        blurOnSubmit={false}
                        placeholder="Informe a Descrição..."
                        onChangeText={title => onTitleEditSalvarColor(title)}
                        value={dadosiniciais.title}
                        onSubmitEditing={save}
                    />
                        
                    {outrosDados.texto ? 
                        <TextInput style={styles.inputBody} 
                        autoFocus={true}
                        returnKeyType={'next'}
                        textAlignVertical='top'
                        multiline={true}
                        placeholder="Texto..."
                        onChangeText={body => setdadosiniciais({...dadosiniciais, body })}
                        value={dadosiniciais.body} />
                    : null}









                    {outrosDados.subtarefas ? 
                    <View style={{maxHeight:windowHeight*0.33}}>
                    <ScrollView
                    keyboardShouldPersistTaps='handled'
                    >
                        {[0,0].map((d,k)=>
                            <Subtarefas
                                key={k}
                                day={d}
                            />
                        )}
                    </ScrollView>
                    </View>
                    : null}

                    {outrosDados.priorShow ? 
                        <PrioridadeModal onPress={onPrioridade} pickPrior={outrosDados.prior} />
                    : null}


                    <View flexDirection='row'>
                        <View flexDirection='row' style={{alignItems:'center'}}>
{/*                             <TouchableOpacity style={{marginHorizontal:10}}>
                                <Icon name="calendar-check" size={20} color='#000' />
                            </TouchableOpacity> */}
                            <TouchableOpacity style={{marginHorizontal:10, marginLeft: 20}} onPress={onPrioridadeShow}>
                                <Entypo name={outrosDados.prior[0] == 1 ? "emoji-flirt" : outrosDados.prior[1] == 1 ? "emoji-happy" :outrosDados.prior[2] == 1 ? "emoji-neutral" :outrosDados.prior[3] == 1 ? "emoji-sad" : "emoji-flirt"} size={20} color='#000' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onSubTarefas} style={{marginHorizontal:10}}>
                                <AntDesign name="checksquareo" size={20} color='#000' />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginHorizontal:10}} onPress={onTextoShow}>
                                <MaterialCommunityIcons name="message-outline" size={20} color='#000' />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginHorizontal:10}}>
                                <AntDesign name="calendar" size={22} color='#000' onPress={()=>{setDatePickerModal(true), inputFocus.current.blur()}}/>
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
    inputBody: {
        marginTop:-10,
        marginHorizontal: 15,
        backgroundColor: '#FFF',
        borderWidth: 0,
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
    },
    date: {
        fontSize: 20,
        marginLeft: 15
    },
    subtarefaView: {
        alignItems: 'flex-start',
    },
    subtarefaInput: {
        width: 20,
        height: 20,
        marginLeft:20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    subtarefamais: {
        marginRight: 17
    },
})