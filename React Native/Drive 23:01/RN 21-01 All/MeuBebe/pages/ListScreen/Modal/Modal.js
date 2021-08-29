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
    ScrollView,
    Dimensions ,
    FlatList
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



export default props => {
    
    const initialState = { id: 0, title: '', body: '', date: today, tempoestimado: '12h', para: 'Sem data prevista', progress: 0.0, progressColor:'#2956E0', backgroundColor:'#3587F2', ordem:100, subtarefas:[], nunSub:3, subCheck:0, finalizada:true, pausada: false}
    const initialDados = { dataEscolhida:'', prior: [1,1,1,1], priorShow: true, texto: false, textoFocus: false, salvar:'#000',inputCima:false, subtarefas:false, subEdit:{index:0, edit:false}, subAntes:[], subDepois:[] }
    const windowHeight = Dimensions.get('window').height;
    
    const inputFocus = useRef(null);
    const [datePickerModal, setDatePickerModal] = useState(false)
    const [dadosiniciais, setdadosiniciais] = useState({...initialState})
    const [outrosDados, setOutrosDados] = useState({...initialDados})



    const TextInputWithFocus = () => {
        inputFocus.current.focus();
    };


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
        setTimeout(() => {
           onSubTarefas()
        }, 500);


      };
          

      const saveOrcancel = () => {
        if(dadosiniciais.title.trim() !='') {
            save()
        }
        else {
            onRequestClose()      
        }
    }
        
     const save = () => {

        if(dadosiniciais.title.trim() !='') {

            var itemCheck = 0
        
            function Check(element) {
                
                if (element.check) {
                    itemCheck = itemCheck+1
                }
            }
    
            var Juntar = [...outrosDados.subAntes,...outrosDados.subDepois]
            Juntar.forEach(Check)
            
            var progress = Math.round(itemCheck/Juntar.length*100)/100
    
            if (progress > 0) {
            } else {
                progress=0
            }

            props.onSave && props.onSave({...dadosiniciais, id: dadosiniciais.id == 0 ? Math.random() : dadosiniciais.id,subtarefas:Juntar, progress, nunSub: Juntar.length > 0 ? Juntar.length : 3, subCheck:itemCheck, isStart: itemCheck > 0 ? true : false})
            setOutrosDados({...initialDados})
            setdadosiniciais({ ...initialState })
        }
    else {
        alert("Preencha título e corpo");        
        }
    }

    const onPrioridade = (priodridade, index, progresscolor) => {
        let ordem = 100
        if (index == 0) {} else if (index == 1) {ordem=75} else if (index == 2) {ordem=50} else {ordem=25}
        setdadosiniciais({ ...dadosiniciais, backgroundColor:priodridade, progressColor:progresscolor, ordem })
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


    const nextOnsubmit = () => {
        if(dadosiniciais.title.trim() !='') {
            setDatePickerModal(true)
            inputFocus.current.blur()
        }
        else {
            alert("Preencha título e corpo");        
        }
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

        let subAntes = outrosDados.subAntes;

        if (!outrosDados.subEdit.edit) {
            console.log('not editing')
            let tarefas = outrosDados.subAntes
            tarefas.push({title:outrosDados.subChange,tipo:true,show:true, check:false})
            setOutrosDados({...outrosDados, subAntes:tarefas, subChange:'' })
        } else {
            console.log('editing')
            subAntes[outrosDados.subEdit.index].show = true  
            
            let tarefas = outrosDados.subAntes
            tarefas.push({title:'',tipo:true,show:false, check:false})

            setOutrosDados({...outrosDados, subEdit:{index:tarefas.length-1, edit:true}, subAntes:tarefas, subChange:'' })
        }
    };

    const onChangeSubtarefas = (sub) => {

        let subAntes = outrosDados.subAntes;
        let subDepois = outrosDados.subDepois;

        if (outrosDados.subEdit.edit) {
                subAntes[outrosDados.subEdit.index].title = sub 
        }

        setOutrosDados({...outrosDados, subChange:sub, subAntes ,subDepois })
    };




    const mudarSub = (index,item) => {
    
        //pergar os arrays antes e depois do meu TextInput
        let subAntes = outrosDados.subAntes;
        let subDepois = outrosDados.subDepois;

        //desoculta o antigo editado
        subAntes[outrosDados.subEdit.index].show = true  

        /////////////////se o item que cliquei está em cima do TextInput
        if (item.tipo) {
            subAntes[index].show = false  //ocultar o item atual que estou editando
            let Antes = subAntes.slice(0,index+1)
            let Depois = subAntes.slice(index+1,subAntes.length)
            
            function trueTofalse(element, index) {
                let itemPush = element
                itemPush.tipo = false
                Depois[index]=itemPush
            }
            Depois.forEach(trueTofalse);

            function Add(element) {
                Depois.push(element)
            }
            subDepois.forEach(Add);
            
            

            setOutrosDados({...outrosDados, subAntes:Antes ,subDepois:Depois, subChange:item.title,inputCima:true, subEdit:{index:Antes.length-1, edit:true} })

        ////////////////se o item que cliquei está em abaixo do TextInput
        } else {
            subDepois[index].show = false
            let Antes = subDepois.slice(0,index+1)
            let Depois = subDepois.slice(index+1,subDepois.length)

            function Add(element) {
                let itemPush = element
                itemPush.tipo = true
                subAntes.push(itemPush)
            }
            Antes.forEach(Add);

            setOutrosDados({...outrosDados, subAntes:subAntes ,subDepois:Depois, subChange:item.title,inputCima:true, subEdit:{index:subAntes.length-1, edit:true} })

        }
    };



    const deletar = (indexx,subAntess) => {

        if (subAntess) {
            let subAntes = outrosDados.subAntes;
            let subEdit = outrosDados.subEdit;
            if (subEdit.index != 0) {
                subEdit.index =  subEdit.index - 1
            }
            subAntes  = subAntes.filter((item,index)=> index != indexx);
            setOutrosDados({...outrosDados, subAntes, subEdit })
        } else {
            let subDepois = outrosDados.subDepois;
            subDepois  = subDepois.filter((item,index)=> index != indexx);
            setOutrosDados({...outrosDados ,subDepois })
        }
    };

    const checkbox = (indexx,subAntess) => {

        if (subAntess) {
            let subAntes = outrosDados.subAntes;
            subAntes[indexx].check = !(subAntes[indexx].check)
            setOutrosDados({...outrosDados, subAntes })
        } else {
            let subDepois = outrosDados.subDepois;
            subDepois[indexx].check  = !(subDepois[indexx].check)
            setOutrosDados({...outrosDados ,subDepois })
        }
    };


    const inputembaixo = () => {

        //pergar os arrays antes e depois do meu TextInput
        let subAntes = outrosDados.subAntes;
        let subDepois = outrosDados.subDepois;
        let subEdit = outrosDados.subEdit;
        subEdit.edit = false
        subAntes[outrosDados.subEdit.index].show = true  

        function Add(element) {

            let itemPush = element
            itemPush.tipo = true
            subAntes.push(itemPush)
        }

        subDepois.forEach(Add);
        
            setOutrosDados({...outrosDados , inputCima:false, subDepois:[], subAntes, subChange:'', subEdit })
    };

    const apagarnoinput = () => {

        let subAntes = outrosDados.subAntes;
        let subDepois = outrosDados.subDepois;
        let subEdit = outrosDados.subEdit;
        subEdit.edit = false
        subAntes  = subAntes.filter((item,index)=> index != subEdit.index);
        subEdit.index = 0
        function Add(element) {

            let itemPush = element
            itemPush.tipo = true
            subAntes.push(itemPush)
        }

        subDepois.forEach(Add);
        
            setOutrosDados({...outrosDados , inputCima:false, subDepois:[], subAntes, subChange:'', subEdit })
            
    };

    

const Subtarefas = ({index, item, subAntes}) => {


    return (
        item.show ? 
        <View flexDirection='row' backgroundColor='transparent' style={styles.subtarefaView}>
            <TouchableOpacity onPress={()=>checkbox(index,subAntes)} style={{backgroundColor: 'transparent', height:30, justifyContent:'center'}}>
            <View backgroundColor='transparent' style={[styles.subtarefaInput]} borderColor='#000'>
            {item.check ? 
                <AntDesign name="check" size={18} color='#000' />
            : null }
            </View>
            </TouchableOpacity>

                        <TouchableOpacity onPress={()=>mudarSub(index,item)} style={{backgroundColor: '#fff', flex: 1, paddingVertical:7}}>
                            <Text style={[styles.inputBody,{backgroundColor: '#fff', flex: 1, marginTop:0, fontSize:14, marginLeft:15, paddingVertical:0}]}>{item.title}</Text>
                        </TouchableOpacity>

            <TouchableOpacity onPress={()=>deletar(index,subAntes)} style={[styles.subtarefamais,{backgroundColor:'transparent', height:30,width:30, justifyContent:'center', alignItems:'center'}]}>
                <AntDesign name="close" size={20} color='#000' />
            </TouchableOpacity>
        </View>
        : null
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
                    onPress={saveOrcancel}>
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
                        returnKeyType='next'
                        onSubmitEditing={nextOnsubmit}
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
                        {outrosDados.subAntes.map((d,k)=>
                            <Subtarefas
                                key={k}
                                item={d}
                                index={k}
                                subAntes={true}
                            />
                        )}



                        <View flexDirection='row' backgroundColor='transparent' style={[styles.subtarefaView, {zIndex:1, marginTop:-2}]}>
                            <View backgroundColor='transparent' style={styles.subtarefaInput} borderColor='#fff'>
                                <AntDesign name="edit" size={18} color='#000' />
                            </View>
                            <TextInput style={[styles.inputBody,{backgroundColor: '#fff', flex: 1,color:'#000',textDecorationLine: 'none'}]} 
                                underlineColorAndroid='rgba(0,0,0,1)'
                                autoFocus={true}
                                marginLeft={10}
                                textAlignVertical='bottom'
                                blurOnSubmit={false}
                                placeholder="Subtarefa..."
                                onChangeText={sub => onChangeSubtarefas(sub)}
                                value={outrosDados.subChange} 
                                onSubmitEditing={onSubmitTarefas}

                            />
                    {outrosDados.inputCima ?
                            <TouchableOpacity onPress={()=>apagarnoinput()} style={[styles.subtarefamais,{backgroundColor:'transparent', height:30,width:30, justifyContent:'center', alignItems:'center'}]}>
                                <AntDesign name="close" size={20} color='#000' />
                            </TouchableOpacity>
                            :null}
                        </View>




                        {outrosDados.subDepois.map((d,k)=>
                            <Subtarefas
                                key={k}
                                item={d}
                                index={k}
                                subAntes={false}
                            />
                        )}

                        </ScrollView>
                    </View>
                    : null}


                    {outrosDados.inputCima ? 
                    <TouchableOpacity  onPress={()=>inputembaixo()} >
                        <View flexDirection='row' backgroundColor='transparent' style={[styles.subtarefaView,{marginVertical:4}]}>
                            <View backgroundColor='transparent' style={styles.subtarefaInput} borderColor='#fff'>
                                <AntDesign name="down" size={18} color='#000' />
                            </View>

                                        <View  style={{backgroundColor: '#fff', flex: 1, paddingVertical:2}}>
                                            <Text style={[styles.inputBody,{backgroundColor: '#fff', flex: 1, marginTop:0, fontSize:14, marginLeft:15, paddingVertical:0, color: '#aaa'}]}>Adicionar nova subtarefa...</Text>
                                        </View>

                            <View style={[styles.subtarefamais,{backgroundColor:'transparent', height:30,width:30, justifyContent:'center', alignItems:'center'}]}>
                            </View>
                        </View>
                    </TouchableOpacity>
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
        alignItems: 'center',
        zIndex:2,
/*         marginVertical:6 */
/*         backgroundColor: 'blue' */
    },
    subtarefaInput: {
        width: 20,
        height: 20,
        marginLeft:20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
/*         backgroundColor: 'red' */
    },
    subtarefamais: {
        marginRight: 17
    },
})