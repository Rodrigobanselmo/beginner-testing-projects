import React,{memo, useEffect, useState, useRef} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,TextInput,Platform,StyleSheet,ScrollView,Animated,Easing} from 'react-native';

// const [ModalAnimatedComponent, onAnimationModal] = useModalAnimated(70);

const useModalAnimated = (HEIGHT) => {

    const windowWidth = Dimensions.get('window').width; 
    const AnimatedModalError = useRef(new Animated.Value(HEIGHT)).current; 
    const [text, settext] = useState("Um problema foi encontrado, tente novamente mais tarde")

    //animated function
    function onAnimationModal(texto,onWait) {
        setTimeout(() => {
            settext(texto)  
            return Animated.sequence([
                Animated.timing(AnimatedModalError, {
                    delay: 0,
                    toValue:HEIGHT,
                    duration:300,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
                Animated.timing(AnimatedModalError, {
                    delay: 0,
                    toValue:0,
                    duration:300,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
                Animated.timing(AnimatedModalError, {
                    delay: 3000,
                    toValue:HEIGHT,
                    duration:300,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                })
            ]).start();   
        }, onWait?onWait:0);
    }

    function ModalAnimatedComponent({textColor=`#fff`, backColor='#363636'}) {
        return (
            <Animated.View style={{height:HEIGHT,paddingHorizontal:30,zIndex:10,justifyContent:`center`,alignItems:`center`, width:windowWidth,transform:[{translateY:AnimatedModalError}],position:"absolute",bottom:0,backgroundColor:backColor}}>
                <Text style={{color:textColor,fontSize:16}}>{text}</Text>
            </Animated.View>
        );
    }

    return [ModalAnimatedComponent, onAnimationModal];
}
export default useModalAnimated
