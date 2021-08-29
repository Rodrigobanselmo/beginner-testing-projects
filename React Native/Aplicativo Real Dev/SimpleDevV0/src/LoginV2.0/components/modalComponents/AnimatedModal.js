import React,{memo, useEffect, useState, useRef} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,TextInput,Platform,StyleSheet,ScrollView,Animated,Easing} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// const [ModalAnimatedComponent, onAnimationModal] = useModalAnimated(70);

const useModalAnimated = (HEIGHT) => {

    const windowWidth = Dimensions.get('window').width; 
    const AnimatedModalError = useRef(new Animated.Value(HEIGHT)).current; 
    const [text, settext] = useState("Um problema foi encontrado, tente novamente mais tarde")
    const [type, settype] = useState("NONE")

    //animated function
    function onAnimationModal(texto,onWait,TYPE,message) {
        settext(texto)  
        setTimeout(() => {
            if (TYPE && TYPE =='UP') {
                settype({position:'UP',message})
                return Animated.sequence([
                    Animated.timing(AnimatedModalError, {
                        delay: 0,
                        toValue:-Math.abs(HEIGHT),
                        duration:400,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                    }),
                    Animated.timing(AnimatedModalError, {
                        delay: 0,
                        toValue:20,
                        duration:500,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                    }),
                    Animated.timing(AnimatedModalError, {
                        delay: 4000,
                        toValue:-Math.abs(HEIGHT),
                        duration:400,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                    })
                ]).start();   
            } else {
                settype({position:'DOWN',message})
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
            }
        }, onWait?onWait:0);
    }


    function ModalAnimatedComponent({textColor=`#fff`, backColor='#353535'}) {
        return (
            <>
            {type=="NONE" ? null : 
            <Animated.View style={type && type?.position && type.position == 'UP' ? 
            {height:Math.abs(HEIGHT*0.80),zIndex:11,flexDirection:'row',paddingHorizontal:30,borderRadius:30,zIndex:10,justifyContent:`center`,alignItems:`center`, width:windowWidth*0.90,transform:[{translateY:AnimatedModalError}],position:"absolute",top:0,right:windowWidth*0.10/2,backgroundColor:backColor}
            : 
            {height:Math.abs(HEIGHT),zIndex:11,flexDirection:'row',paddingHorizontal:30,zIndex:10,justifyContent:`center`,alignItems:`center`, width:windowWidth,transform:[{translateY:AnimatedModalError}],position:"absolute",bottom:0,backgroundColor:backColor}}>
                {type && type?.message && type.message == 'ok'? 
                <MaterialCommunityIcons style={{marginHorizontal:15}} name="checkbox-marked-circle-outline" color="#3fc32c" size={20} />
                :
                type.message == 'warn' ? 
                <AntDesign style={{marginHorizontal:15}} name="warning" color="#ffeb40" size={23} />
                :
                type.message == 'erro' ?
                <AntDesign style={{marginHorizontal:15}} name="closecircleo" color="#e91c1c" size={23} />
                :
                null
                }
                <Text style={{color:textColor,fontSize:type && type?.position && type.position == 'UP' ? 14:16}}>{text}</Text>
            </Animated.View>
            }
            </>
        );
    }

    return [ModalAnimatedComponent, onAnimationModal];
}
export default useModalAnimated
