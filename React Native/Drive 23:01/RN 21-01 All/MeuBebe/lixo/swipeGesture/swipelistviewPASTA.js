import React from 'react';
import { useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressCircle } from 'react-native-svg-charts'
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList,Animated } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from './Modal/Modal'
import useColor from '../../styles/useColor'
import {BoxShadow} from 'react-native-shadow'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { SwipeListView } from 'react-native-swipe-list-view';

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

        
          const concluirTarefa = (id) => {
            dispatch({
                type: 'COMCLUIR_LISTA',
                payload: {key:route.params.key, id}
            });
          };
          const naofinalizada = (id) => {
            dispatch({
                type: 'NAOFEITA_LISTA',
                payload: {key:route.params.key, id}
            });
          };
          const pausar = (id,horas) => {
            dispatch({
                type: 'PAUDASA_LISTA',
                payload: {key:route.params.key, id,horas}
            });
          };

          const deleteRow = (rowMap, index, id) => {
            if (rowMap[index]) {
                rowMap[index].closeRow();
              }
            dispatch({
                type: 'DELETAR_LISTA',
                payload: {key:route.params.key, id}
            });
          };



          const renderItem = (data, rowMap) => {
            const rowHeightAnimatedValue = new Animated.Value(60);
            return (
              <VisibleItem
                data={data.item}
                removeRow={() => deleteRow(rowMap, data.index, data.item.id)}
                index={data.index}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
              />
            );
          };

          const VisibleItem = props => {

            const {
                rowHeightAnimatedValue,
                removeRow,
                leftActionState,
                rightActionState,
              } = props;
          
              if (rightActionState) {
                Animated.timing(rowHeightAnimatedValue, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: false,
                }).start(() => {
                  removeRow();
                });
              }

            return (
                <NoteItem data={props.data} index={props.index} colors={colors} naofinalizada={naofinalizada} concluirTarefa={concluirTarefa} pausar={pausar}/>
            );
          };

          const HiddenItemWithActions = props => {
            const {
                swipeAnimatedValue,
                leftActionActivated,
                rightActionActivated,
                rowActionAnimatedValue,
                rowHeightAnimatedValue,
                onClose,
                onDelete,
            } = props;

            if (rightActionActivated) {
                Animated.timing(rowActionAnimatedValue, {
                  toValue: 500,
                  duration: 500,
                  useNativeDriver: false
                }).start();
              } else {
                Animated.spring(rowActionAnimatedValue, {
                  toValue: 75,
                  useNativeDriver: false
                }).start();
              }

         return (
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        <Text>Left</Text>
        {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onClose}>
            <FontAwesome
              name="plus"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <FontAwesome
                  name="plus"
                  size={25}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
};

          const renderHiddenItem = (data, rowMap) => {
            const rowActionAnimatedValue = new Animated.Value(75);
            const rowHeightAnimatedValue = new Animated.Value(60);
            return (
              <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                rowActionAnimatedValue={rowActionAnimatedValue}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                onClose={() => closeRow(rowMap, data.index)}
                onDelete={() => deleteRow(rowMap, data.index, data.item.id)}
              />
            );
          };

          const onRowDidOpen = rowKey => {
            console.log('This row opened', rowKey);
          };
        
          const onLeftActionStatusChange = rowKey => {
            console.log('onLeftActionStatusChange', rowKey);
          };
        
          const onRightActionStatusChange = rowKey => {
            console.log('onRightActionStatusChange', rowKey);
          };
        
          const onRightAction = rowKey => {
            console.log('onRightAction', rowKey);
          };
        
          const onLeftAction = rowKey => {
            console.log('onLeftAction', rowKey);
          };




    return (
        <View style={[styles.Container_View,{backgroundColor:colors.background}]}>
            <Modal isVisible={modal} onSave={onSave} onCancel={() => setModal(false)} /* setEdit={setEdit} edit={edit} *//>   
            {list.length > 0 &&
                <SwipeListView
                data={list.sort(compare)}
                style={styles.Pastas_FlatList}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                leftActivationValue={100}
                rightActivationValue={-250}
                leftActionValue={0}
                rightActionValue={-500}
                onLeftAction={onLeftAction}
                onRightAction={onRightAction}
                onLeftActionStatusChange={onLeftActionStatusChange}
                onRightActionStatusChange={onRightActionStatusChange}
                keyExtractor={(item)=>item.id.toString()}
                />
            }
            
            {list.length == 0 &&
                <View style={styles.NoPasta_View} flex={1}>
                <AntDesign name="folderopen" size={50} color='#202020' style={{paddingRight: 0}}/>
                <Text style={styles.NoPasta_Text}>Nenhuma Tarefa</Text>
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
    NoPasta_Text: {
        fontSize: 20,
        color: '#04dcbc',
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
        color: '#363636',
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