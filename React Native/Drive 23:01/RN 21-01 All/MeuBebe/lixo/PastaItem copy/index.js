import React, {useState, useRef} from 'react';
import { View_Ciculos, Text_Title, TouchableHighlight_Box, View_Components,Text_SubTitle } from './styles';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import * as Animatable from 'react-native-animatable';

export default ({ data, index, onPress, onDelete, onArquivar, onDelete2, onEdit, colors }) => {

    const ref = useRef()
    const [closeaction, setcloseaction] = useState(false)
    const [initialize, setinitialize] = useState(true)
    const [deletar, setdeletar] = useState(0)

    React.useEffect(() => {return () => {setcloseaction(false)}}, [])
    React.useEffect(() => {
        setcloseaction(false)
        if (initialize) {
            setTimeout(() => {
                setinitialize(false)
            }, 200);
        }
        {onDelete2 ? onDelete2(index) : null} 
    }, [deletar])



    const getRightContent = () => {
        return (
            <View style={styles.right}>
                <TouchableOpacity style={{paddingRight: 15}}  onPress={deleteTrash} >
                    <Ionicons  name="md-trash-outline" size={22} color={colors.Lixeira} />
                </TouchableOpacity>
                <TouchableOpacity style={{paddingRight: 14}}  onPress={ArquivarLeft} >
                    <AntDesign  name="folderopen" size={20} color={colors.Arquivo} />
                </TouchableOpacity>
                <TouchableOpacity style={{paddingRight: 0}} >
                    <MaterialCommunityIcons  name="anchor" size={20} color={colors.Ancora} />
                </TouchableOpacity>
            </View>
        )
    }
    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <View style={styles.leftInside} backgroundColor={closeaction ? colors.apagar : colors.arquivar}>
                    {closeaction ?
                    <Ionicons  name="md-trash-outline" size={25} color={colors.iconapagararquivar} />
                    :
                    <AntDesign name="folderopen" size={25} color={colors.iconapagararquivar} style={styles.excludeIcon} />
                    }
                </View>
            </View>
        )
    }

    const openRight = () => {
        ref.current.openRight()
    }
    

    const deleteLeft = () => {
        if (closeaction) {
            {onDelete ? onDelete(index) : null} 
            setdeletar(deletar+1)
        }  else {
        {onArquivar ? onArquivar(index) : null} 
        }
    }

    const deleteTrash = () => {
        setcloseaction(true)
    ref.current.openLeft()
    }

    const ArquivarLeft = () => {
        setcloseaction(false)
    ref.current.openLeft()
    }


    if (initialize) return (
        null
    );

    return (
        <Animatable.View
        animation='zoomIn'
        delay={300}
        >
        {data.arquivado === false ?
        <Swipeable 
        ref={ref}
        renderRightActions={getRightContent}
        renderLeftActions={getLeftContent}
        onSwipeableLeftOpen={deleteLeft} > 
        <View flex={1} style={[styles.square]} marginHorizontal={0}>
            <LinearGradient style={[styles.square,styles.TouchableHighlight, {shadowColor:colors.Add_buttonShadow || '#000'}]}  colors={[colors.Box1 || '#000',colors.Box2 || '#000']} >
            <TouchableHighlight_Box onLongPress={openRight} delayLongPress={500} underlayColor={colors.UnderBox} onPress={onPress ? ()=>onPress(index) : null}>
                <>
                
                <View_Components flexDirection='row' justifyContent={'space-around'}>
                    <View style={styles.Icons_View}  backgroundColor={data.imageBack} >
                        <View >
                        {data.image !=='font'?
                            <FontAwesome5 name={data.image} size={data.image == 'university' ? 59 : 50} color={colors.CaixaIconSelecionado|| '#fff'} />
                            :
                            <Text style={{color:colors.CaixaIconSelecionado || '#fff', fontSize: 57 }}>{data.title == '' ? '' : data.title.substring(1,-2).toUpperCase()}</Text>
                            }
                        </View>
                    </View>
                    <View_Components flex={1} alingItens='center' justifyContent='center' >
                        <View_Components flex={1} alingItens='center' justifyContent='center' >     
                            <Text_Title>{data.title}</Text_Title>
                            <Text_SubTitle style={{marginTop:1,marginBottom:3}}>{`Você tem ${data.list ? data.list.length : 0} tarefas pendentes:`}</Text_SubTitle>


                            { data.list &&  data.list.length > 0 ?
                                <View_Components flexDirection='row' flexWrap='wrap'  backgroundColor='transparent' style={{marginTop:4,marginBottom:3, paddingLeft:17}}> 
                                    {data.list.map((d,k)=>
                                        <View_Ciculos backgroundColor={d.backgroundColor} key={k}/>
                                        )}
                                </View_Components>
                                :
                                null
                            }


                        </View_Components>
                    </View_Components>
                        
                    <TouchableOpacity onPress={onEdit ? ()=>onEdit(index, data) : null} style={{ backgroundColor:"transparent",height:50, width:30, marginRight:-10, marginTop:-5}}>
                        <Entypo style={{ color:colors.TresPontos, marginLeft:2, marginTop:5}} name="dots-three-vertical"  size={25} > </Entypo>
                    </TouchableOpacity>
                
                
                </View_Components>
                        </>
            </TouchableHighlight_Box>
            </LinearGradient>
        </View>
        </Swipeable>
        :
        <View></View>
            }
        </Animatable.View>
    
    );
}

const styles = StyleSheet.create({
    square: {
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.62,
        shadowRadius: 8.22,
        elevation: 6,
    },
    square1: {
        paddingVertical: 100,
    },
    Icons_View: {
        justifyContent: 'center',
        alignItems: 'center',
        width:75,
        height: 75,
        borderRadius: 5
    },
    TouchableHighlight: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    right: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 20
    },
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
    excludeIcon: {
        marginLeft: 30
    },
  });
  


