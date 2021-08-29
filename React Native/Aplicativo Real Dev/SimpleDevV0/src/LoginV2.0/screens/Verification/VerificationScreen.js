import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image ,StatusBar,StyleSheet, SafeAreaView} from 'react-native';
import { useSelector } from 'react-redux';
import {SendEmailVerfication, getCurrentUserReload,updateUserEmail,infoNet} from '../../services/FirebaseAuth';
import ReactInputModal from '../../components/modalComponents/ReactInputModal';
import useReactModal from '../../components/modalComponents/ReactModal';
import useDispatchActions from'../../hooks/useDispatchActions'; 
import {ButtonOpacity,Header} from '../../components/basicComponents/BasicComponents';

export default ({navigation}) => {
    
    const [callBack, setCallBack] = useState(0);
    const [MainModal,onModalVisible] = React.useCallback(useReactModal(setCallBack),[callBack]);
    const [modalVisible, setModalVisible] = useState(false);
    const [_,__,___,dispatchUserDataChange,navigationActions] = useDispatchActions(onModalVisible)
    const user = useSelector(state => state.user);
    const [askPass, setaskPass] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
      onModalVisible(true,'info','Por favor, verifique seu endereço de email antes de continuar. Caso não o encontre verifique sua cauxa de SPAM.','Verificação de Email',2000)
    }, [])

    useEffect(() => {
      const interval = setInterval(() => {
        getCurrentUserReload({emailVerified:true},'navigate',dispatchUserDataChange,false,user.emailVerified);
        if (user.emailVerified ===true) {
          onModalVisible(true,'loaderScreen',()=>navigationActions('DrawerStack','TabStack'),true,0,'sucess')
        }
      }, 4000);
      return () => clearInterval(interval);
    }, [user]);

    function sendVerification() {
      infoNet(
        ()=>SendEmailVerfication(onModalVisible),
        ()=>onModalVisible(true,'info','Você não está conectado à internet. Por favor, tente novamente mais tarde.','Erro no Envio',0)
      )
    }

    const onSetModalVisible = React.useCallback((activation) => {
      if (activation === false && !askPass) {
        setModalVisible(false)
        setEmail('')
      } else if (activation === false && askPass) {
        setModalVisible(false)
        setaskPass(false)
      } else if (activation) {
        setTimeout(() => {
          setModalVisible(true)
        }, 1500);
      } else{
        setModalVisible(!modalVisible)
      }
    },[modalVisible,askPass])

    const UpdateUserEmail = useCallback((onAnimationModal,t1,t2,t3,valid,onClose) => {
      if (!askPass) {
        updateUserEmail(t1,null,askPass,setEmail,onAnimationModal,onSetModalVisible,onModalVisible,setaskPass,onClose,dispatchUserDataChange,user.providerId)
      } else {
        updateUserEmail(email,t1,askPass,setEmail,onAnimationModal,onSetModalVisible,onModalVisible,setaskPass,onClose,dispatchUserDataChange,user.providerId)
      }
    },[email,askPass,modalVisible])

    function onButtonNormal() {
        infoNet(
          ()=>getCurrentUserReload({emailVerified:true},'navigate',dispatchUserDataChange,onModalVisible,false,user.emailVerified),
          ()=>onModalVisible(true,'info','Você não está conectado à internet. Por favor, tente novamente mais tarde.','Erro ao Verificar',0)
        )
    }


    return (
      <SafeAreaView style={{flex:1, backgroundColor: '#ffff'}}>
      <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
        <Header text='Verifique seu email' navigation={navigation}/>
      <View style={{flex:1, justifyContent:'space-between',alignItems:`center`,paddingHorizontal:50,paddingTop:0,paddingBottom:50}}>
        <View style={{justifyContent:"center",alignItems:"center"}}> 
          <Text style={styles.textSub}>Por favor, verifique sua caixa de entrada e caixa de "SPAM" para obter instruções de validação de seu email:{"\n"}{"\n"}
            <Text style={{textDecorationLine:`underline`}}>{`${user?.email}`}</Text>
          </Text>
        </View>
        <Image style={{height:200,width:200,alignSelf:`center`}} source={require('../../../assets/8-Email-Personalization-Techniques-That-Work-Better-Than-The-Name-Game.png')}/>
        <View style={{alignItems:`center`,width:`100%`}}>
          <Text style={styles.textSubButton} onPress={sendVerification}>Reenviar Link</Text>
          <ButtonOpacity
            secundario={true}
            onFunction={onButtonNormal}
            scale={0.8}
            height={60}
            text='CONTINUAR'/>
          <Text style={{...styles.textSubButton,textDecorationLine:`underline`}} onPress={()=>infoNet(()=>setModalVisible(true),()=>onModalVisible(true,'info','Você não está conectado à internet. Por favor, tente novamente mais tarde.','Erro no Login',0))}>Trocar Email</Text>
        </View>
    <MainModal/>
    <ReactInputModal
            title={!askPass ? `Alterar e-mail`:'Confirmar senha'}
            subTitle={!askPass ? "Favor inserir novo endereço de e-mail":'Insira sua senha atual para prosseguir'}
            buttonSentTitle={!askPass ? 'Enviar':'Confirmar'}
            onPress={UpdateUserEmail}
            setModalVisible={onSetModalVisible}
            modalVisible={modalVisible}
            typeInput={!askPass ?['email']:['pass']} //email,pass,num,normal
            placeholder={!askPass?['e-mail']:['senha']}
            preLoaded={!askPass?[email]:null}
            />
    </View>
    </SafeAreaView>
    );
}


const styles = StyleSheet.create({
  textSub: {
    fontSize:14,
    color:'#555555',
    textAlign:`center`
  },
  textSubButton: {
    fontSize:15,
    color:'#000',
  },
  });

//<Image source={require('../../assets/gamma.png')} resizeMode='contain' style={{width: 250, height: 250}}/>
//<Text>Gamma jr. App</Text>