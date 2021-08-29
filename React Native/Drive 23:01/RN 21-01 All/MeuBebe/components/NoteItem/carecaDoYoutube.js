import React from 'react';
/* import { styles } from './styles'; */
import { View, Text, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProgressCircle } from 'react-native-svg-charts'
import moment from 'moment'
import 'moment/locale/pt-br'
import Animated, {
    abs,
    add,
    call,
    clockRunning,
    cond,
    eq,
    min,
    not,
    set,
    useCode,
  } from "react-native-reanimated";
  import {
      gestureHandlerRootHOC,
    PanGestureHandler,
    State,
    TouchableWithoutFeedback,
  } from "react-native-gesture-handler";
  import {
    clamp,
    snapPoint,
    timing,
    useClock,
    usePanGestureHandler,
    useValue,
  } from "react-native-redash/lib/module/v1";

export default ({ data, index, onPress }) => {



    const styles = StyleSheet.create({
        All: {
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
            margin: 10,
            borderStyle: 'solid',
            borderColor: data.backgroundColor,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: data.backgroundColor
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
    });

 
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

        const { width } = Dimensions.get("window");
        const snapPoints = [-width, -100, 0];
        const {gestureHandler, translation, velocity, state,} = usePanGestureHandler();
        const translateX = useValue(0);
        const offsetX = useValue(0);
        const to = snapPoint(translateX,velocity.x,snapPoints)
        useCode(
            () => [
                cond(
                    eq(state,State.ACTIVE),
                    set(translateX,add(offsetX, min(translation.x, 0)))
                ),
                cond(
                    eq(state,State.END), [set(translateX,timing({from: translateX, to})), set(offsetX,translation.x)]
                ),
            ],[]
        );

    return (
        <Animated.View>
            <View style={styles.All}>
                <PanGestureHandler {...gestureHandler}>
                    <Animated.View style={{ transform: [{translateX}]}}>
                        <TouchableOpacity style={styles.TouchableHighlight} activeOpacity={0.7} onPress={()=>onDoublePress()} /* onPress={()=>onPress(index)} */>
                            <View style={styles.View_Box}>
                                <View style={styles.View_Text}>
                                    <Text style={styles.header_Text}>{data.title}</Text>
                                    <Text style={styles.Sub_Text}>{data.para == 'Sem data prevista' ? data.para : diferença > 0 ? `${diasDL== 1 ? 'Falta ' + diasDL + ' dia ' : 'Faltam ' + diasDL + ' dias'  } e ${horasDL== 1 ? horasDL + ' hora' : horasDL + ' horas  ' + formattedDate}` : `finalizada ${Finalizada}`}</Text>
                                </View>
                                <TouchableOpacity style={styles.Graph_View} >
                                    {data.subCheck == 0 
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
                    </Animated.View>
                </PanGestureHandler>
                  
            </View>
        </Animated.View>
    );
}

