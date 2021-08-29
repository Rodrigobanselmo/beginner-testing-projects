import React, {useCallback, useRef, useState} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,KeyboardAvoidingView,Platform,StyleSheet,ScrollView,StatusBar,Animated,Easing,Keyboard, Modal} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {EmailInput, SenhaInput, PrivacyPolicy, ButtonLogin, HeaderLogin,ButtonLoginEmail} from '../../components/signInComponents/SignInput';
import useModalAnimated from '../../components/modalComponents/AnimatedModal'
import ReactInputModal from '../../components/modalComponents/ReactInputModal';
import useReactModal from '../../components/modalComponents/ReactModal';
import NetInfo from "@react-native-community/netinfo";
import {infoNet,GoogleSign,SignInEmail,LogOut,RedefinirSenha} from '../../services/FirebaseAuth';
import useDispatchActions from'../../hooks/useDispatchActions';
const SignInScreen = ({navigation}) => {

    const refFocus = useRef(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: false,
        focus:'none'
    });
    const [ModalAnimatedComponent, onAnimationModal] = useModalAnimated(70);
    const [callBack, setCallBack] = useState(0);
    const [MainModal,onModalVisible] = React.useCallback(useReactModal(setCallBack),[callBack]);
    const [dispatchUserGoogle,_,dispatchUserSign] = useDispatchActions(onModalVisible)
/*     const [LoaderModal,onLoaderModalVisible] = useLoaderModal(); */
    
    
    //////////referente ao INPUT de EMAIL    
    //Aqui verifica se email é valido, se for poe o ICON CHECK TRUE e se não for, coloca ICON CHECK FALSE -- aqui nao faz nada se vc sair do input (OUTRO FUNÇÃO)
    const textInputChange = (val) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( re.test(val.trim()) ) { //   if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val.trim(),
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val.trim(),
                check_textInputChange: false,
                /*                 isValidUser: false */
            });
        }
    }
    
    // Aqui ao sair do input ele verifica se ta certo e avisa se estiver errado
    const handleValidUser = (val) => {
    
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if ( re.test(val.trim()) ) { //if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        }
        else if (val.trim().length != 0) {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    //////////referente ao INPUT de SENHA 
    //Aqui verifica se password é valido, se for poe o 'Valid Password' TRUE e se não for, coloca 'Valid Password' FALSE
    const handlePasswordChange = (val) => {
        if( val.trim().length >= 6 ) {
            setData({
                ...data,
                password: val.trim(),
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val.trim(),
                isValidPassword: false
            });
        }
    }

    //ao clicar no olho de segurança revela ou retira a senha segura
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    ///////// Localizar FOCO INPUT
    const onFocus = (local) => {
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
    
    const onLogin = () => {
        infoNet(
            ()=>SignInEmail(data.username,data.password,onModalVisible,onAnimationModal,dispatchUserSign),
            ()=>onModalVisible(true,'info','Você não está conectado à internet. Por favor, tente novamente mais tarde.','Erro no Login',0)
        )
    }
    
    const onGoogleLogin = () => {
        infoNet(
            ()=>GoogleSign(onModalVisible,dispatchUserGoogle),
            ()=>onModalVisible(true,'info','Você não está conectado à internet. Por favor, tente novamente mais tarde.','Erro no Login',0)
        )
    }
   
    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""} style={styles.container} >
        <View style={styles.container}>
        <StatusBar backgroundColor='#262626' barStyle="light-content"/>   
            <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps='handled'>
                <View style={{paddingHorizontal:25}}>
                    <HeaderLogin 
                        text={'Login'} />
                    <EmailInput
                        OnSubmitKeyboardPress={()=>refFocus.current.focus()}
                        onFocusInput={()=>onFocus('username')}
                        onBlur={()=>onFocus('none')}
                        onTextChange={textInputChange}
                        onEndText={handleValidUser}
                        data={data}/>
                    <SenhaInput
                        onFocusInput={()=>onFocus('password')}
                        onBlur={()=>onFocus('none')}
                        onLogin={onLogin}
                        refFocus={refFocus}
                        onTextChange={handlePasswordChange}
                        onSecurityChange={updateSecureTextEntry}
                        data={data}/>
                    <ButtonLoginEmail
                        onLogin={onLogin}
                        text={'LOGIN'}
                        Style={{backgroundColor:data.isValidPassword ? data.check_textInputChange ? `#339999`: '#fff': '#fff',marginTop:25,marginBottom:5}}/>
                    <Text onPress={()=>setModalVisible(true)} style={{fontSize:14,width:`100%`,textAlign:"right",marginBottom:20}} >Esqueceu sua senha?</Text>
                    <ButtonLogin
                        onPress={onGoogleLogin}
                        imageSource={require('../../../assets/google-hangouts.png')}
                        text={'Continue com Google'}/>
{/*                     <ButtonLogin
                        onPress={React.useCallback(() => onAnimationModal('Favor inserin formações validas em todos os campos'), [])}
                        iconName={`facebook`}
                        iconColor={'#3b5998'}
                        text={'Continue com Facebook'}/> */}
{/*                     <ButtonLogin
                        onPress={()=>{}}
                        iconName={`phonelink-lock`}
                        iconColor={'#000'}
                        text={'Continue com Celular'}/> */}
                    <PrivacyPolicy
                        onPress={()=>{}}
                        onPressPolicy={()=>{}}/>
                </View>
            </ScrollView>
        <ModalAnimatedComponent/>
        <MainModal/>
        <ReactInputModal
            setModalVisible={onSetModalVisible}
            modalVisible={modalVisible}
            onPress={onRedefinirSenha}
            typeInput={['email']}
            title={`Redefinir senha`}
            subTitle={"Favor inserir seu e-mail para obter nova senha"}
            placeholder={['e-mail']}
            />
        </View>
        </KeyboardAvoidingView>
    );
};

export default SignInScreen;



const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff',
    },
  });