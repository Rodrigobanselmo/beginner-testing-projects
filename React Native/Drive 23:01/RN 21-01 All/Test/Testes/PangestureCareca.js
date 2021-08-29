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

export default () => {



    const styles = StyleSheet.create({
        All: {
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
            margin: 10,
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
    });

 
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
                <PanGestureHandler {...gestureHandler}>
                    <Animated.View style={{ transform: [{translateX}]}}>
                      <View flex={1} style={styles.All}><Text>bom dia</Text></View>
                    </Animated.View>
                </PanGestureHandler>
        </Animated.View>
    );
}

