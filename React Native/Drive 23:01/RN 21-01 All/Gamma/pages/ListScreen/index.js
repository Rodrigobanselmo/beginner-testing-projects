//Pagina

import React from 'react';
import { useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressCircle } from 'react-native-svg-charts'
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList,Animated,StatusBar } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from './Modal/Modal'

import Ionicons from 'react-native-vector-icons/Ionicons';

import useColor from '../../styles/useColor'
import {BoxShadow} from 'react-native-shadow'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import LinearGradient from 'react-native-linear-gradient';

import NoteItem from '../../components/NoteItem';

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

    const shadowOpt = {
        width:40,
        height:40,
        color:"#000",
        border:10,
        radius:20,
        opacity:0.2,
        x:5,
        y:7,
        style:{marginVertical:5},
    }

    function onSave(dadosiniciais) {

        if(dadosiniciais.title.trim() !='') {
                        dispatch({
                            type: 'ADD_LIST',
                            payload: {...dadosiniciais,key:route.params.key}
                        });
                        setModal(false) 
        } 
        else {
            alert("Preencha título e corpo");        
        }
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

        
          const concluirTarefa = (index) => {
            dispatch({
                type: 'COMCLUIR_LISTA',
                payload: {key:route.params.key, index}
            });
          };
          const naofinalizada = (index) => {
            dispatch({
                type: 'NAOFEITA_LISTA',
                payload: {key:route.params.key, index}
            });
          };
          const pausar = (index,horas) => {
            dispatch({
                type: 'PAUDASA_LISTA',
                payload: {key:route.params.key, index,horas}
            });
          };

/*           function Color({color1, color2}) {
return (

    <View style={[styles.All]}>
          <TouchableOpacity style={{height:100}}>
<LinearGradient colors={[color1,color2]} style={[styles.TouchableHighlight,{flex:1}]} >
      <View style={styles.View_Box}>
          <View style={styles.View_Text}>
              <Text style={styles.header_Text}>Bomdiasenho</Text>
              <Text style={styles.Sub_Text}>Sem data prevista</Text>
          </View>
          <TouchableOpacity style={styles.Graph_View} >
              <View style={styles.loading} >
                  <Ionicons name="play-outline" color={colors.Color_item} size={23} style={{marginLeft:12}} > </Ionicons>
              </View> 

              <ProgressCircle style={{ height: 48, width:48}} belowChart={false} progress={0} strokeWidth={6} />
          </TouchableOpacity>
      </View>
  </LinearGradient>
  </TouchableOpacity>
</View>
    )
          } */



    return (
        <View style={[styles.Container_View,{backgroundColor:colors.background}]}>
            <Modal isVisible={modal} onSave={onSave} onCancel={() => setModal(false)} /* setEdit={setEdit} edit={edit} *//>  
            <StatusBar backgroundColor={colors.backgroundStatus} barStyle={colors.statusBar}/>

{/*                         <LinearGradient colors={['#1A1A1A','#141414','#1A1A1A']} width='90%' height={70} style={{margin:20, borderRadius:10}}></LinearGradient>
                        <LinearGradient colors={['#420d01','#370B01','#420d01']} width='90%' height={70} style={{margin:20, borderRadius:10}}></LinearGradient>
                        <LinearGradient colors={['#640b0b','#420d01']} width='90%' height={70} style={{margin:20, borderRadius:10}}></LinearGradient>
                        <LinearGradient colors={['#936507','#644911']} width='90%' height={70} style={{margin:20, borderRadius:10}}></LinearGradient>
                        <LinearGradient colors={['#2A4612','#112700']} width='90%' height={70} style={{margin:20, borderRadius:10}}></LinearGradient>
                        <LinearGradient colors={['#0C3454','#011E36']} width='90%' height={70} style={{margin:20, borderRadius:10}}></LinearGradient> */}
                                                {/* <View width='90%' height={80} backgroundColor='#181717' style={{margin:20, borderRadius:10}}></View>
                        <View width='90%' height={80} backgroundColor='#620000' style={{margin:20, borderRadius:10}}></View>
                        <View width='90%' height={80} backgroundColor='#396039' style={{margin:20, borderRadius:10}}></View>
                        <View width='90%' height={80} backgroundColor='#B3BB5A' style={{margin:20, borderRadius:10}}></View>
                        <View width='90%' height={80} backgroundColor='#4A6294' style={{margin:20, borderRadius:10}}></View> */}


{/*                         <Color color1={'#EE433D'} color2={'#7C0000'} />
                        <Color color1={'#E6BF49'} color2={'#8C6B06'} />
                        <Color color1={'#5C9557'} color2={'#2A4F27'} />
                        <Color color1={'#2471A3'} color2={'#154360'} /> */}

            {list.length > 0 &&
                <FlatList
                data={list.sort(compare)}
                contentContainerStyle={{paddingBottom:80}}
                style={styles.Pastas_FlatList}
                renderItem={({item, index})=>(
                  <NoteItem 
                      data={item}
                      index={index}
                      colors={colors}
                      naofinalizada={naofinalizada}
                      concluirTarefa={concluirTarefa}
                      pausar={pausar}
                  />
                  
              )}
              keyExtractor={(item, index)=>index.toString()}
                />
            }
            {list.length == 0 &&
                <View style={styles.NoPasta_View} flex={1}>
                <AntDesign name="folderopen" size={50} color={colors.NoPasta_Icon} style={{paddingRight: 0}}/>
                <Text style={[styles.NoPasta_Text,{color: colors.NoPasta_Text}]}>Nenhuma Tarefa</Text>
            </View>
            }
            <View style={[styles.Add_TouchableOpacity]}>
                <BoxShadow setting={shadowOpt} >
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setModal(true)} style={[styles.Add_TouchableOpacityinside,{backgroundColor: colors.Add_buttonBack}]}>
                            <FontAwesome name="plus" size={20} color='#000' />
                    </TouchableOpacity>
                </BoxShadow>
            </View>
        
            
        </View>
    );
}

const styles = StyleSheet.create({
    Container_View: {
        flex: 1,
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
    Add_TouchableOpacity: {
        position: 'absolute',
        right: 35,
        bottom: 35,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    Add_TouchableOpacityinside: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    NoPasta_View: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    NoPasta_Text: {
        fontSize: 20,
    },
    rowBack: {
        padding: 10,
        marginHorizontal:15,
        marginVertical: 10,
        alignItems: 'center',
        backgroundColor: '#1f65ff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: '#00000000',
        borderWidth: 1,
      },
      backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
      },
      backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        right: 75,
      },
      backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      },
      trash: {
        height: 25,
        width: 25,
        marginRight: 4,
      },
/*       right: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 20
    }, */
    left: {
        flex: 1,
        paddingVertical: 10,
        paddingRight:'0%'
    },
    leftInside: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },







    All: {
        marginHorizontal:10.9,
        borderRadius: 25,
        borderStyle: 'solid',
        borderColor: '#00000000',
        borderWidth: 1,
        flex:1,
        width:'100%'
    },  
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
      loadingText: {
        fontSize: 13,
        color: '#fff',
      },
    TouchableHighlight: {
        padding: 10,
        marginVertical:10,
        borderStyle: 'solid',
        borderWidth: 0,
        borderRadius: 10,
    },
    header_Text: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 5,
    },
    Sub_Text: {
        fontSize: 14,
        color: '#fff',
        flex: 1,
        
    },
    View_Box: {
        flex: 1,
        flexDirection: 'row',
    },
    View_Text: {
        flex: 1,
    },
    Graph_View: {
/*         backgroundColor: '#000', */
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,

    },
    left: {
        flex: 1,
        paddingVertical: 11,
        paddingRight:'0%'
    },
    leftInside: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 20
    },
      actionText: {
        color: '#000',
        fontSize: 14,
        backgroundColor: 'transparent',

      },
      rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      },
});


/* <FlatList 
data={list.sort(compare)}
style={styles.Pastas_FlatList}
renderItem={({item, index})=>(
    <NoteItem 
        data={item}
        index={index} */
/*                             onPress={handleNotePress} */
/*     />
)}
keyExtractor={(item, index)=>index.toString()}
/> */