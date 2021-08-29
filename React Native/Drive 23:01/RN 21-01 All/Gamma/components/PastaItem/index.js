import React, {useState, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import * as Animatable from 'react-native-animatable';
import { ProgressCircle } from 'react-native-svg-charts'
export default ({ data, index, onPress, onDelete, onArquivar, onDelete2, onEdit, colors, theme, onEditIcon }) => {

    const ref = useRef()
    const [closeaction, setcloseaction] = useState(false)
    const [initialize, setinitialize] = useState(true)
    const [deletar, setdeletar] = useState(0)
    const [open, setopen] = useState(false)
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



/*     function contador() {

        var cont = 0;
        
        function logArrayElements(d, index, array) {
            if (d.progress == 1 || d.finalizada == false || d.pausada == true) {null} else { cont= cont + 1}
            console.log(d)
            console.log(cont)
        }
        
        data.list.forEach(logArrayElements);
        setlist(cont)
        
    } */


    const getRightContent = () => {
        return (
            <View style={styles.right}>
                <TouchableOpacity style={{paddingRight: 11,  height:50, justifyContent:'center', alignItems:'center'}}  onPress={deleteTrash} >
                    <Ionicons  name="md-trash-outline" size={22} color={colors.Lixeira} />
                </TouchableOpacity>
                <TouchableOpacity style={{paddingLeft: 11,paddingRight: 11, height:50, justifyContent:'center', alignItems:'center'}}  onPress={ArquivarLeft} >
                    <AntDesign  name="folderopen" size={20} color={colors.Arquivo} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onEdit ? ()=>onEdit(index, data) : null} style={{paddingLeft: 11, height:50, justifyContent:'center', alignItems:'center'}} >
                    <Entypo  name="edit" size={20} color={colors.editPasta} />
{/*                     <MaterialCommunityIcons  name="anchor" size={20} color={colors.Ancora} /> */}
                </TouchableOpacity>
            </View>
        )
    }
    const getLeftContent = (progress,dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 200],
            outputRange: [0.2, 1],
            extrapolate: 'clamp',
          });
          
        return (
            <View style={styles.left}>
                <View style={[styles.leftInside,{marginRight:open ? 0 : 30}]} backgroundColor={closeaction ? colors.apagar : colors.arquivar}>
                    {closeaction ?
                    <Ionicons  name="md-trash-outline" size={25} color={colors.iconapagararquivar} style={styles.excludeIcon} />
                    :
                    <Animated.View style={[{transform: [{ scale: trans}]}]} >
                    <AntDesign name="folderopen" size={25} color={colors.iconapagararquivar} style={styles.excludeIcon} />
                    </Animated.View>
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

    const onSwipeableWillClose = () => {
        setopen(false)
    }

    const onSwipeableWillOpen = () => {
        setopen(true)
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
        onSwipeableLeftOpen={deleteLeft}
        onSwipeableWillClose={onSwipeableWillClose}
        onSwipeableWillOpen={onSwipeableWillOpen}
        > 
        
        <View flex={1} style={[styles.square]} marginHorizontal={0}>
            <LinearGradient style={[styles.square,styles.TouchableHighlight, {shadowColor:colors.Add_buttonShadow || '#000'}]}  colors={[colors.Box1 || '#000',colors.Box2 || '#000']} >
            <TouchableOpacity onLongPress={openRight} delayLongPress={500} onPress={onPress ? ()=>onPress(index) : null} style={{padding:15,borderRadius:10}}>
                <>
                
                <View flexDirection='row' justifyContent={'space-around'}>
                    <TouchableOpacity onPress={onEditIcon ? ()=>onEditIcon(index, data) : null} style={styles.Icons_View}  backgroundColor={colors.CaixaIconSelecionado|| '#fff'} >
                        <View >
                        {data.image !=='font'?
                            <FontAwesome5 name={data.image} size={data.image == 'university' ? 59 : 50} color={data.imageBack} />
                            :
                            <Text style={{color:data.imageBack || '#fff', fontSize: 57 }}>{data.title == '' ? '' : data.title.substring(1,-2).toUpperCase()}</Text>
                            }
                        </View>
                    </TouchableOpacity>

{/*                     <View style={styles.Icons_View}  backgroundColor={data.imageBack} >       
                        <View >
                        {data.image !=='font'?
                            <FontAwesome5 name={data.image} size={data.image == 'university' ? 59 : 50} color={colors.CaixaIconSelecionado|| '#fff'} />
                            :
                            <Text style={{color:colors.CaixaIconSelecionado || '#fff', fontSize: 57 }}>{data.title == '' ? '' : data.title.substring(1,-2).toUpperCase()}</Text>
                            }
                        </View>
                    </View> */}


                    <View flex={1} alingItens='center' justifyContent='center' >
                        <View flex={1} alingItens='center' justifyContent='center' >     
                            <Text style={{fontSize: 22, color: colors.Pasta_Text, marginBottom: 0,fontWeight: 'bold', paddingLeft:17}} >{data.title}</Text>
                            <Text style={{marginTop:1,marginBottom:3,paddingLeft:17,fontSize: 14,color: colors.Pasta_subText}}>{`membros: ${data.list ? data.list.filter((d)=> d.progress !== 1 && d.finalizada !== false && d.pausada !== true ).length : 0}`}</Text>


                            { data.list &&  data.list.length > 0 ?
                                <View flexDirection='row' flexWrap='wrap'  backgroundColor='transparent' style={{marginTop:4,marginBottom:3, paddingLeft:17}}> 
                                    {data.list.filter((d)=> d.progress !== 1 && d.finalizada !== false && d.pausada !== true ).sort(compare).slice(0,7).map((d,k)=>
                                        <View backgroundColor={d.backgroundColor[0]} key={k} style={{height: 10, width: 10, borderRadius: 5, marginRight: 12}} />
                                        
                                        
                                        )}
                                {data.list.filter((d)=> d.progress !== 1 && d.finalizada !== false && d.pausada !== true ).length >= 8 ? <AntDesign name="plus" size={12} color={colors.Pasta_Text} style={{position:'absolute', top:-1, left: 169}}/> : null}
                                </View>
                                
                                :
                                
                                null
                            }

                            


                        </View>
                    </View>
                        
{/*                     <TouchableOpacity onPress={onEdit ? ()=>onEdit(index, data) : null} style={{ backgroundColor:"transparent",height:50, width:30, marginRight:-10, marginTop:-5}}>
                        <Entypo style={{ color:colors.TresPontos, marginLeft:2, marginTop:5}} name="dots-three-vertical"  size={25} > </Entypo>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.Graph_View} >
{/*                             {data.subCheck == 0 && data.progress == 0 
                            ?
                            <View style={styles.loading} >
                                <Ionicons name="play-outline" color={colors.Color_item} size={23} style={{marginLeft:12}} > </Ionicons>
                            </View> 
                            :     */}
                            <View style={styles.loading}><Text style={styles.loadingText}>{`${Math.round(0*100)}%`}</Text></View>                      
{/*                         } */}
                            <ProgressCircle style={{ height: 62, width:62}} belowChart={false} progress={0} strokeWidth={6.5} progressColor={`#000`} />
                        </TouchableOpacity>
                
                
                </View>
                        </>
            </TouchableOpacity>
            </LinearGradient>
        </View>
        </Swipeable>
        :
        null
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
        paddingRight: 20,
        
    },
    left: {
        flex: 1,
        marginLeft:20,
        paddingVertical: 10,
        paddingRight:'0%',
        borderRadius:20
    },
    leftInside: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius:10,
         borderBottomLeftRadius:10
    },
    excludeIcon: {
        marginLeft: 30
    },
    Graph_View: {
        /*         backgroundColor: '#000', */
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 7,
                paddingBottom:0
        
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
  });
  


