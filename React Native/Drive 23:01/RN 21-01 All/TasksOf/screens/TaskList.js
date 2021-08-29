import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'

import AsyncStorage from "@react-native-community/async-storage"
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../commonStyles'
import todayImage from '../assets/imgs/today.jpg'
import Task from '../components/Task'
import AddTask from './AddTask'

/* {id: 123, desc: '', estimateAt: new Date(), doneAt: false} */


/* const [dados, setDados] = useState({}) */

/* const initialState = {
    showDoneTasks:showDoneTasks,
    showAddTask:showAddTask,
    visibleTasks:visibleTasks,
    tasks:tasks
} */

export default () => {
/*     state = {
        ...initialState
    } */
const [showDoneTasks, setShowDoneTasks] = useState(true)
const [showAddTask, setShowAddTask] = useState(false)
const [visibleTasks, setVisibleTasks] = useState([])
const [tasks, setTasks] = useState([])


useEffect(() => {

    async function load() {
    const stateString = await AsyncStorage.getItem('tasksDados');
    const tasksloading = JSON.parse(stateString) || tasks;
    setTasks(tasksloading);
    }

    load(); 

}, []);

useEffect(() => {

    const filterTasks = () => {
        let visibleTasks = null
        if(showDoneTasks) {
            visibleTasks = tasks
        } else {
            console.log(JSON.stringify(tasks))
            visibleTasks = tasks.filter(task => task.doneAt === null)
        }  

        setVisibleTasks( visibleTasks )
/*         AsyncStorage.setItem('tasksState', JSON.stringify(dados)) */
    }

    filterTasks()  

}, [showAddTask,tasks,showDoneTasks]);


    const toggleFilter = () => {
        setShowDoneTasks(!showDoneTasks)
    }



    const toggleTask = taskId => {
        const tasksdoneat = [...tasks]
        tasksdoneat.forEach(task => {
            if(task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        setTasks(tasksdoneat) //esse final chama a função toda vez que udar
    }

     const addTask = newTask => {
        if(!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return 
        }

        const tasksadd = [...tasks]
        tasksadd.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })

        setTasks(tasksadd)
        setShowAddTask(false)
    }

    const deleteTask = id => {
        const tasksdelete = tasks.filter(task => task.id !== id)
        setTasks(tasksdelete)
    }

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <AddTask isVisible={showAddTask}
                    onCancel={() => setShowAddTask(false)}
                    onSave={addTask} />
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={toggleFilter}>
                            <Icon name={showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => (
                            <Task 
                                {...item} 
                                onToggleTask={toggleTask} 
                                onDelete={deleteTask} 
                            />
                        )} 
                    />

                </View>
                <TouchableOpacity style={styles.addButton} 
                    activeOpacity={0.7}
                    onPress={() => setShowAddTask(true)}>
                    <Icon name="plus" size={20}
                        color={commonStyles.colors.secondary} />
                </TouchableOpacity>
            </View>
        )
    }


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
});