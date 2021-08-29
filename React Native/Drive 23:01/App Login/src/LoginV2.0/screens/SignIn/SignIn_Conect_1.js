import React, {useCallback, useRef, useState, useEffect} from 'react';
import {View,Text,LayoutAnimation,TextInput, Dimensions,KeyboardAvoidingView,Platform,StyleSheet,ScrollView,StatusBar,Animated,Easing,Keyboard,UIManager} from 'react-native';
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

    if (
        Platform.OS === "android" &&
        UIManager.setLayoutAnimationEnabledExperimental
      ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }

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
        Animated.timing(animatedImage, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }

    function onAnimatedInput(param) {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
                500,
                LayoutAnimation.Types.easeInEaseOut,
                LayoutAnimation.Properties.opacity
              )        
        );
        if(param == 'cadastro' && !expanded) {
            setExpanded(param);
        } else if (param) {
            setExpanded(!expanded);
        } else {
            setExpanded(!expanded);
        }
        setData({
            ...data,
            password: '',
            confirmPassword: '',
            secureTextEntry: true,
            confirmSecureTextEntry: true,
            isValidPassword: false,
            isIqualPassword: false,
        });
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        setTimeout(() => {
            onAnimatedIntial()
        }, 1000);
        // cleanup function
        return () => {
          Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
      }, []);
    
      const _keyboardDidShow = () => {
        onAnimatedImage(0)
        setKeyboard(true)
    };
    
    const _keyboardDidHide = () => {
        onAnimatedImage(1)
        setKeyboard(false)
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
        if (expanded && local == 'username') {
            setTimeout(() => {
                onAnimatedInput(false)
            },200);
            onAnimatedButton(0)
            //refFocus.current.focus()
        }
        setData({
            ...data,
            focus: local
        });
    }
    

    const onSetModalVisible = React.useCallback((activation) => {
        if (!activation) {
            setModalVisible(false)
        } else if (activation) {
            setTimeout(() => {
                setModalVisible(true)
            }, 1500);
        } else{
            setModalVisible(!modalVisible)
        }
    },[modalVisible])

    ///////Funcao FIREBASE
    //Fazer LOGIN e se der erro informar por MODAL
    const onRedefinirSenha = useCallback((onAnimationModal,t1,t2,t3,valid,onClose) => {
        infoNet(
            ()=>RedefinirSenha(t1,onAnimationModal,onSetModalVisible,onModalVisible,onClose),
            ()=>onModalVisible(true,'info','Você não está conectado à internet. Por favor, tente novamente mais tarde.','Erro no Login',0)
        )
    },[])

    
    const onContinuar = () => {
        
        if (!expanded) {
            if (data.username.length > 5) {
/*         if (data.isValidUser) { */
            infoNet(
                    ()=>CheckEmailExists(data.username,onShowInput,onModalVisible,onAnimationModal,keyboard,Keyboard),
                    ()=>onModalVisible(true,'info','Você não está conectado à internet. Por favor, tente novamente mais tarde.','Erro no Login',0)
                )   
            } else {
                onAnimationModal('Email com formatação inválida',0,'UP','warn')
            }
        } else if (expanded != 'cadastro') {
            infoNet(
                ()=>SignInEmail(data.username,data.password,onModalVisible,onAnimationModal,dispatchUserSign),
                ()=>onModalVisible(true,'info','Você não está conectado à internet. Por favor, tente novamente mais tarde.','Erro no Login',0)
            )
        } else if (expanded == 'cadastro') {
            infoNet(
                ()=>CreateEmail(data.username,data.password,data.confirmPassword,onModalVisible,onAnimationModal,dispatchUserCreate),
                ()=>onModalVisible(true,'info','Você não está conectado à internet. Por favor, tente novamente mais tarde.','Erro no Login',0)
            )
        }
    }

    const onGoogleLogin = () => {
        infoNet(
            ()=>GoogleSign(onModalVisible,dispatchUserGoogle),
            ()=>onModalVisible(true,'info','Você não está conectado à internet. Por favor, tente novamente mais tarde.','Erro no Login',0)
        )
    }

    return (
        <View style={{...styles.container,backgroundColor:Colors.background}} >
        <StatusBar backgroundColor={Colors.statusBar} barStyle="light-content"/>
            <Animated.View style={{flex:1,justifyContent:'center',alignItems:"center",opacity:animatedImage,transform:[{translateY:animatedInitialImage}]}} >
                <Animatable.Image animation="bounceIn" duraton="1500" source={require('../../../assets/logo.png')} style={{height:250,width:250,resizeMode:`contain`, marginTop:0}}/>
            </Animated.View>
            <Animated.View style={{...styles.footer,backgroundColor:Colors.footer,transform:[{translateY:animatedInitialFooter}]}}  duraton="1000">
            <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps='handled'>
                <View style={{paddingHorizontal:25,paddingTop:10,paddingBottom:5}}>
                <Text style={{color: 'grey',fontSize: 15,flex:1,textAlign:"center",marginBottom:2,marginTop:5,fontSize:14}}>Faça login ou cadastre-se</Text>  
                    <EmailInput
                        OnSubmitKeyboardPress={onContinuar}
                        onFocusInput={()=>onFocus('username')}
                        refFocus={refFocus}
                        onBlur={()=>onFocus('none')}
                        onTextChange={(val)=>textInputChange(val,data,setData)}
                        /* onEndText={(e)=>handleValidUser(e.nativeEvent.text,data,setData)} */
                        data={data}/>
                    {expanded && (
                    <View style={{backgroundColor:Colors.footer,elevation:0,zIndex:0}}>
                        <SenhaInput
                            beforeConfirme={expanded != 'cadastro' ? false : true}
                            OnSubmitKeyboardPress={()=>confirmerefFocus.current.focus()}
                            onFocusInput={()=>onFocus('password')}
                            onLogin={onContinuar}
                            onBlur={()=>onFocus('none')}
                            onEndText={(e)=>handlePasswordChange(e.nativeEvent.text,data,setData)}
                            onTextChange={(val)=>handlePasswordChange(val,data,setData,onAnimatedButton,expanded)}
                            onSecurityChange={()=>updateSecureTextEntry(data,setData)}
                            data={data}/>
                        {expanded === 'cadastro' && (
                        <SenhaInput
                            confirme={true}
                            onFocusInput={()=>onFocus('confirmePassword')}
                            onBlur={()=>onFocus('none')}
                            onLogin={onContinuar}
                            refFocus={confirmerefFocus}
                            onTextChange={(val)=>confirmeHandlePasswordChange(val,data,setData,onAnimatedButton,expanded)}
                            onSecurityChange={()=>updateConfirmSecureTextEntry(data,setData)}
                            data={data}/>
                        )}
                    </View>
                    )}
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
                        <OuLine
                            backgroundColor={Colors.footer}
                            color='#99999955'
                            />
                        <ButtonOpacity
                            onFunction={onGoogleLogin}
                            onFunction={
                                ()=>dispatch({
                                type: 'CHANGE_THEME',
                              })  }
                            imageSource={require('../../../assets/google-hangouts.png')}
                            imagePosition='center'
                            scale={0.8}
                            height={60}
                            //style={{transform:[{scale:0.7}]}}
                            text='Continue com Google'/>
                        <PrivacyPolicy
                            onPress={()=>{}}
                            onPressPolicy={()=>{}}
                            colorTextDecoration='#a9a9a9'
                            color='#a9a9a9'/>
                    </View>
                </View>
            </ScrollView>
            </Animated.View>
        <ModalAnimatedComponent backColor={'#121212'}/>
        <MainModal/>
        <ReactInputModal
            setModalVisible={onSetModalVisible}
            modalVisible={modalVisible}
            onPress={onRedefinirSenha}
            typeInput={['emailOnly']}
            title={`Redefinir senha`}
            subTitle={"Favor inserir seu e-mail para obter nova senha"}
            placeholder={['e-mail']}
            />
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