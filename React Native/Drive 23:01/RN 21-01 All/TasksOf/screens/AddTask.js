import React,  { useState, useEffect }from 'react'
import {
    Platform,
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

import commonStyles from '../commonStyles'

const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default props => {

    const [dadosiniciais, setdadosiniciais] = useState({...initialState})

    const save = () => {
        const newTask = {
            desc: dadosiniciais.desc,
            date: dadosiniciais.date
        }

        props.onSave && props.onSave(newTask)
        setdadosiniciais({ ...initialState })
    }

    const getDatePicker = () => {
        let datePicker = <DateTimePicker value={dadosiniciais.date}
            onChange={(_, date) => setdadosiniciais({...dadosiniciais, date, showDatePicker: false })}
            mode='date' />
        
        const dateString = moment(dadosiniciais.date).format('ddd, D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => setdadosiniciais({...dadosiniciais, showDatePicker: true })}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {dadosiniciais.showDatePicker && datePicker}
                </View>
            )
        }
        
        return datePicker
    }

        return (
            <Modal transparent={true} visible={props.isVisible}
                onRequestClose={props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input} 
                        placeholder="Informe a Descrição..."
                        onChangeText={desc => setdadosiniciais({...dadosiniciais, desc })}
                        value={dadosiniciais.desc} />
                    {getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
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
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
})