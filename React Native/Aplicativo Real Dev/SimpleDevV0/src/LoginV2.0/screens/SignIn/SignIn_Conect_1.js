import React, {useCallback, useRef, useState, useEffect} from 'react';
import {View,Text,LayoutAnimation,TextInput, Dimensions,Platform,StyleSheet,ScrollView,StatusBar,Animated,Easing,Keyboard,UIManager} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {EmailInput, SenhaInput, PrivacyPolicy, OuLine, HeaderLogin,ButtonLoginEmail} from '../../components/signInComponents/SignInput';
import {ButtonOpacity} from '../../components/basicComponents/BasicComponents';
import useModalAnimated from '../../components/modalComponents/AnimatedModal'
import useReactModal from '../../components/modalComponents/ReactModal';
import {infoNet,GoogleSign,SignInEmail,CheckEmailExists,RedefinirSenha,CreateEmail} from '../../services/FirebaseAuth';
import {textInputChange,handleValidUser,handlePasswordChange,confirmeHandlePasswordChange,updateSecureTextEntry,updateConfirmSecureTextEntry} from '../../services/StringHandle';
import useDispatchActions from'../../hooks/useDispatchActions';
import useColors from'../../style/Colors';
import ReactInputModal from '../../components/modalComponents/ReactInputModal';
import { useSelector, useDispatch } from 'react-redux';

const SignInScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [Colors] = useColors()
    const refFocus = useRef(false)
    const confirmerefFocus = useRef(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirmSecureTextEntry: true,
        isValidUser: true,
        isValidPassword: false,
        isIqualPassword: false,
        isWarn: false,
        isConfirmeWarn: false,
        focus:'none'
    });
    const [ModalAnimatedComponent, onAnimationModal] = useModalAnimated(-70);
    const [callBack, setCallBack] = useState(0);
    const [MainModal,onModalVisible] = React.useCallback(useReactModal(setCallBack),[callBack]);
    const [dispatchUserGoogle,dispatchUserCreate,dispatchUserSign,____,_____] = useDispatchActions(onModalVisible)
    const [expanded, setExpanded] = useState(false);
    const [secundario, setsecundario] = useState(false);
    const [keyboard, setKeyboard] = useState(false);


    const animatedInitial = useRef(new Animated.Value(0)).current; 
    const animatedButton = useRef(new Animated.Value(0)).current; 
    const animatedImage = useRef(new Animated.Value(1)).current; 

    const animatedInitialImage = animatedInitial.interpolate({
        inputRange:[0,1],
        outputRange:[175,0]
      })
    const animatedInitialFooter = animatedInitial.interpolate({
    inputRange:[0,1],
    outputRange:[350,0]
    })
    const animatedInitialButton = animatedButton.interpolate({
    inputRange:[0,1],
    outputRange:['#fff',"#F27329"]
    })
    const animatedInitialText = animatedButton.interpolate({
    inputRange:[0,1],
    outputRange:['#505050',"#fff"]
    })

    function onAnimatedIntial() {
        Animated.timing(animatedInitial, {
            toValue:1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }

    function onAnimatedButton(toValue) {
        if(toValue == 1) setsecundario(true)
        if(toValue == 0) setsecundario(false)
        Animated.timing(animatedButton, {
            toValue,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }

    function onAnimatedImage(toValue) {
    }

    function onAnimatedInput(param) {
      
    }

    useEffect(() => {
        setTimeout(() => {
            onAnimatedIntial()
        }, 1000);
        // cleanup function
      }, []);
    
      const _keyboardDidShow = () => {
        onAnimatedImage(0)
    };
    
    const _keyboardDidHide = () => {
        onAnimatedImage(1)
      };

    ///////// Localizar FOCO INPUT
    const onShowInput = (array) => {
        if (array && array.includes("password")) {
            if (!expanded) {
                refFocus.current.blur()
            }
            onAnimatedInput(expanded)
        } else if (array && array.includes("google.com")) {
            onModalVisible(true,'option',
          {
            buttonConfirm:'Google Account',
            buttonDelete:'Cancelar',
            title:'Google Account',
            subTitle:`O endereço de email: \n${data.username} requer \nlogin com Google Account`,
            colorButton:{okButton:'#000',cancelButton:'green'}
          },
          ()=>onGoogleLogin(),0
        )
        } else {
            if (!expanded) {
//                setTimeout(() => {refFocus.current.focus()}, 100)
                refFocus.current.blur()
            }
            onAnimatedInput('cadastro')
        }
    }

    const onFocus = (local) => {

    }
    

    const onSetModalVisible = React.useCallback((activation) => {
    },[modalVisible])

    ///////Funcao FIREBASE
    //Fazer LOGIN e se der erro informar por MODAL
    const onRedefinirSenha = useCallback((onAnimationModal,t1,t2,t3,valid,onClose) => {
    },[])

    
    const onContinuar = () => {
    }

    const onGoogleLogin = () => {
    }

    return (
        <View style={{...styles.container,backgroundColor:Colors.background}} >
        <StatusBar backgroundColor={Colors.statusBar} barStyle="light-content"/>
            <Animated.View style={{flex:1,justifyContent:'center',alignItems:"center",opacity:animatedImage,transform:[{translateY:animatedInitialImage}]}} >
                <Animatable.Image animation="bounceIn" duraton="1500" source={require('../../../assets/logo.png')} style={{height:250,width:250,resizeMode:`contain`, marginTop:0}}/>
            </Animated.View>
            <Animated.View style={{...styles.footer,backgroundColor:Colors.footer,transform:[{translateY:animatedInitialFooter}]}}  duration="1000">
                <View style={{paddingHorizontal:25,paddingTop:10,paddingBottom:5}}>
                    <EmailInput
                        onBlur={()=>onFocus('none')}
                        onTextChange={(val)=>textInputChange(val,data,setData)}
                        /* onEndText={(e)=>handleValidUser(e.nativeEvent.text,data,setData)} */
                        data={data}/>
                   <View style={{backgroundColor:Colors.footer,zIndex:1}}>
                        <ButtonOpacity
                            animated={true}
                            secundario={secundario}
                            textStyle={{color:animatedInitialText}}
                            style={{backgroundColor:animatedInitialButton}}
                            onFunction={()=>onContinuar('pass')}
                            scale={0.8}
                            height={60}
                            text='CONTINUAR'/>
                        {expanded && expanded != 'cadastro' && (
                            <Text onPress={()=>setModalVisible(true)} style={{color:'grey',fontSize:14,width:`100%`,textAlign:"center",marginVertical:10}} >Esqueceu sua senha?</Text>
                        )}
                        <PrivacyPolicy
                            onPress={()=>{}}
                            onPressPolicy={()=>{}}
                            colorTextDecoration='#a9a9a9'
                            color='#a9a9a9'/>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

export default SignInScreen;



const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#eee',
    },
    footer: {
        marginTop:20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
  });