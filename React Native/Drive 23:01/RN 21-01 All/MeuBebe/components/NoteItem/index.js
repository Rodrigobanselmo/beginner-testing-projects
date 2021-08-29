////NOTEITEM COMPONETE


import React from 'react';
/* import { styles } from './styles'; */
import { View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProgressCircle } from 'react-native-svg-charts'
import moment from 'moment'
import 'moment/locale/pt-br'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import * as Animatable from 'react-native-animatable';

export default ({ data, index, naofinalizada,pausar,concluirTarefa, colors }) => {

        const ref = React.useRef()
        const [open, setopen] = React.useState(false)
        const [isOpen, setisOpen] = React.useState(false)
        const [information, setinformation] = React.useState(1)

        const dataAtual = new Date();
        const dataPrevista = new Date(data.para); 
        const diferença = dataPrevista - dataAtual;
        
        const diferençaBrutaDias = ((diferença*diferença)**(0.5))/1000/60/60/24;
        const diasDL = Math.floor(diferençaBrutaDias)
        
        const diferençaBrutaHoras = diferençaBrutaDias%1*24;
        const horasDL = Math.floor(diferençaBrutaHoras)

        const arrumarfinalizada = moment(data.para == 'Sem data prevista' ? null : data.para).locale('pt-br').format('YYYYMMDDhhmmss')
        const Finalizada = moment(arrumarfinalizada, "YYYYMMDDhhmmss").locale('pt-br').fromNow()
        
        const formattedDate = moment(data.para == 'Sem data prevista' ? null :data.para).locale('pt-br').format('DD/MM/YY')
        
        const horas = diasDL*24+horasDL

        //////////////Double click
        const [double1, setdouble1] = React.useState(0)
        const [double2, setdouble2] = React.useState(0)
        const [double3, setdouble3] = React.useState(0)
        async function onDoublePress() {
            if (double1 == 0) {  
                setdouble1(1)
                console.log('Ativador')
                console.log(data.subCheck)
                
                setTimeout(() => {
                    setdouble2(1)
                }, 200);
            } 
            else {
                setdouble3(1)
                console.log('Two click function')
            }
        }

        React.useEffect(() => {
            if (double1 == 1 & double2 == 1 & double3 == 0)  {
                console.log('One click function')
            }

            return () => {
                    setdouble1(0)
                    setdouble2(0)
                    setdouble3(0)
            }
        }, [double2])

        ////////////////fim

        const openRight = () => {
            setinformation(1)
            ref.current.openLeft()
        }

        const openRightnotdone = () => {
            setinformation(3)
            ref.current.openLeft()
        }

        const openRightpause = () => {
            setinformation(2)
            ref.current.openLeft()
        }
    

        const getRightContent = () => {
            return (
                <View style={styles.right}>
                    {data.para < new Date() ?
                    <TouchableOpacity style={{paddingRight: 26}}  onPress={openRight} >
                        <Ionicons  name="ios-calendar-sharp" size={22} color={colors.carbon} />
                    </TouchableOpacity>
                        :
                    <TouchableOpacity style={{paddingRight: 28}}  onPress={openRightpause} >
                        <Ionicons  name="play" size={22} color={colors.carbon} />
                    </TouchableOpacity>
                    }
                    <TouchableOpacity style={{paddingRight: 26/* , backgroundColor: 'red' */}}  onPress={openRightnotdone} >
                    <Ionicons  name="ios-close-sharp" size={22} color={colors.Lixeira} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingRight: 0}} onPress={openRight}>
                    <Ionicons  name="ios-checkmark-sharp" size={22} color={colors.green} />
                    </TouchableOpacity>
                </View>
            )
        }
        const getLeftContent = (progress,dragX) => {
            const trans = dragX.interpolate({
                inputRange: [0, 200],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              });

              const rowHeightAnimatedValue = new Animated.Value(0);

             /*  if (isOpen && !(data.para < new Date())) {

                if (information == 2) {

                    Animated.timing(rowHeightAnimatedValue, {
                        toValue: 50,
                        duration: 400,
                        useNativeDriver: false,
                      }).start(() => {
                        pausar(data.id,horas)
                      });


                } else if (information ==3 ) {

                    Animated.timing(rowHeightAnimatedValue, {
                        toValue: 50,
                        duration: 400,
                        useNativeDriver: false,
                      }).start(() => {
                        naofinalizada(data.id)
                      });

                } else {

                    Animated.timing(rowHeightAnimatedValue, {
                        toValue: 50,
                        duration: 400,
                        useNativeDriver: false,
                      }).start(() => {
                        concluirTarefa(data.id)
                      });
                }

              } */

            return (
                <>
                {data.para < new Date() ?
                    <View style={styles.right}>
                    <TouchableOpacity style={{paddingLeft: 16}} onPress={openRight}>
                        <Ionicons  name="ios-checkmark-sharp" size={22} color={colors.green} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingLeft: 16}}  onPress={openRight} >
                        <Ionicons  name="ios-close-sharp" size={22} color={colors.Lixeira} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingLeft: 16}} onPress={openRight}>
                        <Ionicons  name="ios-calendar-sharp" size={22} color={colors.carbon}  />
                    </TouchableOpacity>
                    </View>
                :        
                    information == 2 ?              
                        <Animated.View style={[styles.left, {marginVertical: rowHeightAnimatedValue, paddingLeft:10}]} >
                            <Animated.View style={[styles.leftInside,{marginRight:open ? 0 : 30, borderTopLeftRadius:12, borderBottomLeftRadius:12}]} backgroundColor={colors.carbonLight}>
                            <Animated.View style={[{paddingHorizontal:25},{transform: [{ scale: trans}]}]} >
                            
                            <Ionicons  name="play" size={32} color={isOpen ? 'transparent' :colors.carbon} />
                                
                            </Animated.View>
                            </Animated.View>
                        </Animated.View>
                    :
                        information == 1 ? 
                            <Animated.View style={[styles.left, {marginVertical: rowHeightAnimatedValue, paddingLeft:10}]} >
                                <Animated.View style={[styles.leftInside,{marginRight:open ? 0 : 30, borderTopLeftRadius:12, borderBottomLeftRadius:12}]} backgroundColor={colors.greenLight}>
                                <Animated.View style={[{paddingHorizontal:25},{transform: [{ scale: trans}]}]} >
                                
                                <Ionicons  name="ios-checkmark-sharp" size={32} color={isOpen ? 'transparent' :colors.green} />
                                    
                                </Animated.View>
                                </Animated.View>
                            </Animated.View>
                        :
                            <Animated.View style={[styles.left, {marginVertical: rowHeightAnimatedValue, paddingLeft:10}]} >
                                <Animated.View style={[styles.leftInside,{marginRight:open ? 0 : 30, borderTopLeftRadius:12, borderBottomLeftRadius:12}]} backgroundColor={colors.notLight}>
                                <Animated.View style={[{paddingHorizontal:25},{transform: [{ scale: trans}]}]} >
                                
                                <Ionicons  name="ios-close-sharp" size={32} color={isOpen ? 'transparent' :colors.not} />
                                    
                                </Animated.View>
                                </Animated.View>
                            </Animated.View>
                }
            </>
            )   
        }

    
    const onSwipeableWillClose = () => {
        setopen(false)
    }

    const onSwipeableWillOpen = () => {
        setopen(true)
    }

    const onSwipeableClose = () => {
        setisOpen(false)
    }

    const onSwipeableLeftOpen = () => {
/*         setisOpen(true) */
        if (!(data.para < new Date())) {

            if (information == 2) {

                    pausar(index,horas)


            } else if (information ==3 ) {

                    naofinalizada(index)

            } else {
                
                    concluirTarefa(index)
                    
            }

          }
    }


    return (
        <View>
        {data.progress != 1 && data.finalizada !== false && data.pausada !== true ?
        <Swipeable 
        ref={ref}
        overshootRight={false}
        renderRightActions={getRightContent }
        renderLeftActions={getLeftContent}
        onSwipeableClose={onSwipeableClose}
        onSwipeableLeftOpen={onSwipeableLeftOpen}
        onSwipeableWillClose={onSwipeableWillClose}
        onSwipeableWillOpen={onSwipeableWillOpen} > 
        <View style={styles.All}>
            <TouchableOpacity style={[styles.TouchableHighlight,{  borderColor: data.backgroundColor,backgroundColor: data.backgroundColor, }]} activeOpacity={0.7} onPress={()=>onDoublePress()} /* onPress={()=>onPress(index)} */>
                <View style={styles.View_Box}>
                    <View style={styles.View_Text}>
                        <Text style={styles.header_Text}>{data.title}</Text>
                        <Text style={styles.Sub_Text}>{data.para == 'Sem data prevista' ? data.para : diferença > 0 ? `${diasDL== 1 ? 'Falta ' + diasDL + ' dia ' : 'Faltam ' + diasDL + ' dias'  } e ${horasDL== 1 ? horasDL + ' hora' : horasDL + ' horas  ' + formattedDate}` : `Atrasada ${Finalizada}`}</Text>
                    </View>
                    <TouchableOpacity style={styles.Graph_View} >
                        {data.subCheck == 0 && data.progress == 0 
                        ?
                        <View style={styles.loading} >
                            <Ionicons name="play-outline" color='#fff' size={23} style={{marginLeft:12}} > </Ionicons>
                        </View> 
                        :    
                        <View style={styles.loading}><Text style={styles.loadingText}>{`${data.progress*100}%`}</Text></View>                      
                        }
                        <ProgressCircle style={{ height: 48, width:48}} belowChart={false} progress={data.progress} strokeWidth={6} progressColor={data.progressColor} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
        </Swipeable>
        :
        null
            }
        </View>

    );
}

const styles = StyleSheet.create({
    All: {
        backgroundColor: '#ffffff',
        marginHorizontal:10.9,
        borderRadius: 25,
        borderStyle: 'solid',
        borderColor: '#00000000',
        borderWidth: 1,
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
        borderWidth: 1,
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
        paddingVertical: 10,
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