import React, {useRef, useState} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,KeyboardAvoidingView,Platform,StyleSheet,ScrollView,StatusBar,Animated,Easing,Keyboard, Modal} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {EmailInput, SenhaInput, PrivacyPolicy, ButtonLogin, HeaderLogin,ButtonLoginEmail} from '../../components/signInComponents/SignInput';
import useModalAnimated from '../../components/modalComponents/AnimatedModal'
import ReactInputModal from '../../components/modalComponents/ReactInputModal';
import useReactModal from '../../components/modalComponents/ReactModal';
import {infoNet,GoogleSign,CreateEmail} from '../../services/FirebaseAuth';
import useDispatchActions from'../../hooks/useDispatchActions'; 
const SignInScreen = ({navigation}) => {

    const refFocus = useRef(false)
    const confirmerefFocus = useRef(false)

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
        focus:'none'
    });
    const [ModalAnimatedComponent, onAnimationModal] = useModalAnimated(70);
    const [callBack, setCallBack] = useState(0);
    const [MainModal,onModalVisible] = React.useCallback(useReactModal(setCallBack),[callBack]);
    const [dispatchUserGoogle,dispatchUserCreate,_] = useDispatchActions(onModalVisible)
    
    
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

    const confirmeHandlePasswordChange = (val) => {
        if( data.password == val && data.isValidPassword ) {
            setData({
                ...data,
                confirmPassword: val.trim(),
                isIqualPassword: true
            });
        } else {
            setData({
                ...data,
                confirmPassword: val.trim(),
                isIqualPassword: false
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

    const updateConfirmSecureTextEntry = () => {
      setData({
          ...data,
          confirmSecureTextEntry: !data.confirmSecureTextEntry
      });
  }

    ///////// Localizar FOCO INPUT
    const onFocus = (local) => {
        setData({
            ...data,
            focus: local
        });
    }

    ///////Funcao FIREBASE
    //Fazer LOGIN e se der erro informar por MODAL
    const onLogin = () => {
        infoNet(
            ()=>CreateEmail(data.username,data.password,data.confirmPassword,onModalVisible,onAnimationModal,dispatchUserCreate),
            ()=>onModalVisible(true,'info','Você não está conectado à internet. Por favor, tente novamente mais tarde.','Erro no Login',0)
        )
    }

    const onGoogle = () => {
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
                        text={'Cadastrar'} />
                    <EmailInput
                        OnSubmitKeyboardPress={()=>refFocus.current.focus()}
                        onFocusInput={()=>onFocus('username')}
                        onBlur={()=>onFocus('none')}
                        onTextChange={textInputChange}
                        onEndText={handleValidUser}
                        data={data}/>
                    <SenhaInput
                        beforeConfirme={true}
                        OnSubmitKeyboardPress={()=>confirmerefFocus.current.focus()}
                        onFocusInput={()=>onFocus('password')}
                        onBlur={()=>onFocus('none')}
                        refFocus={refFocus}
                        onTextChange={handlePasswordChange}
                        onSecurityChange={updateSecureTextEntry}
                        data={data}/>
                    <SenhaInput
                        confirme={true}
                        onFocusInput={()=>onFocus('confirmePassword')}
                        onBlur={()=>onFocus('none')}
                        onLogin={onLogin}
                        refFocus={confirmerefFocus}
                        onTextChange={confirmeHandlePasswordChange}
                        onSecurityChange={updateConfirmSecureTextEntry}
                        data={data}/>
                    <ButtonLoginEmail
                        onLogin={onLogin}
                        text={'CADASTRAR'}
                        Style={{backgroundColor:data.isValidPassword && data.isIqualPassword ? data.check_textInputChange ? `#339999`: '#fff': '#fff',marginTop:25,marginBottom:25}}/>
                    <ButtonLogin
                        onPress={onGoogle}
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