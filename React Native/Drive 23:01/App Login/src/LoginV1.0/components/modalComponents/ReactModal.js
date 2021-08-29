import React, {memo, useState,useEffect} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,TextInput,Platform,StyleSheet,ScrollView,Animated,Easing, Keyboard,Modal,KeyboardAvoidingView,TouchableWithoutFeedback} from 'react-native';
import useModalAnimated from './AnimatedModal'
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';



const windowWidth = Dimensions.get('window').width; 
const windowHeight = Dimensions.get('window').height; 

const useReactModal = (setCallBack) => {
 
  const [modalVisible, setModalVisible] = useState(false);
  const [typeModal, setTypeModal] = useState('loader');
  const [text, setText] = useState(['','']);
  const [date, setDate] = useState(0);
  const [animation, setAnimation] = useState(null);

  const onClose = () => {
    setModalVisible(false)
    setTypeModal('loader')
    setText(`Algo deu errado, caso necessario entre em contato com o nosso suporte`)
    setCallBack(Math.random())
  }

  const onCloseLate = () => {
    if (date+35000<(new Date()-0)) {
      setModalVisible(true)
      setTypeModal('info')
      setText(`Tempo exedido,reinicie o plaicativo e tente novamnete.`)
      setCallBack(Math.random())
    }
  }

  const onModalVisible = (visible,type,text,title,load,animation) => {

      setTimeout(() => {
        setModalVisible(visible)
        Tipo()
        setCallBack(Math.random())
      }, (load===0||load)?load: visible? type=='info'? 1000:0 :1000);

    function Tipo() {
      if (type) {
        setTypeModal(type)
        if (type == 'info') {
          var titulo = 'Erro'
          if (title)  {titulo = title}
          if (text) {
            setText([text,titulo])
          } else {
            setText(['Algo deu errado, caso necessario entre em contato com o nosso suporte',titulo])
          }
        } else if (type ==  'loader' || type=='loaderText') {
          setDate(new Date()-0)
          if (text) {
            setText([text])
          } else {
            setText(['Por favor, aguarde...'])
          }
        } else if (type ==  'loaderScreen') {
          setText({onFunc:text})
          if (animation) {
            if (animation == 'sucess') setAnimation({source:require('../../../animations/success.json'), backgroundColor:'rgba(10, 10, 10, 0.6)'})
            else if (animation == 'loadSucess') setAnimation({source:require('../../../animations/loading-success.json'), backgroundColor:'#fff'})
            else if (animation == 'emailSent')setAnimation({source:require('../../../animations/mail-verification.json'), backgroundColor:'rgba(10, 10, 10, 0.6)'})
            else setAnimation({source:require('../../../animations/success.json'), backgroundColor:'rgba(10, 10, 10, 0.6)'})
          } else setAnimation({source:require('../../../animations/success.json'), backgroundColor:'rgba(10, 10, 10, 0.6)'})

        } else if (type ==  'option') {
          setText({
            buttonConfirm:text.buttonConfirm,
            buttonDelete:text.buttonDelete,
            title:text.title,
            subTitle:text.subTitle,
            onFunc:title
          })
        }
      }
    }
  }

  const LoaderModal = () => {
    return (
            <TouchableWithoutFeedback onPress={onCloseLate}>
              {typeModal == 'loader' ? 
              <View style={{...styles.background,justifyContent:`center`,alignItems:"center"}}>
                <View style={{padding:30,backgroundColor:`#fff`}}>
                  <LottieView style={{height:120,width:120}} source={require('../../../animations/loader.json')} autoPlay loop />
                </View>
              </View>
              :
              typeModal == 'loaderText' ?
              <View style={{...styles.background,justifyContent:`center`,alignItems:"center"}}>
                <View style={{width:windowWidth*0.85,maxWidth:400,paddingHorizontal:15,paddingVertical:5,backgroundColor:`#fff`,flexDirection:'row',justifyContent:`flex-start`,alignItems:"center"}}>
                  <LottieView style={{height:65,width:65,marginRight:5}} source={require('../../../animations/loader.json')} autoPlay loop />
                  <Text style={{textAlign:'justify',fontSize:14,color:`#262622`,paddingVertical:10,width:windowWidth*0.85-110,maxWidth:400-110}}>{text[0]}</Text>
                </View>
              </View>
              :
              null
              }
            </TouchableWithoutFeedback>
    );
  }
  
  const ModalAlertTitle = ({confirmeButton}) => {
    return(
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={{...styles.background,justifyContent:`center`,alignItems:"center"}}>
            <View style={{paddingHorizontal:25,paddingVertical:20,backgroundColor:'#fff',maxWidth:450,minWidth:250,marginHorizontal:25,...styles.shadow}}>
              <Text style={{fontSize:20,textAlign:'justify',marginBottom:10,fontWeight:'700',color:'#303030'}}>{text[1]}</Text>
              <Text style={{fontSize:16,textAlign:'justify',marginBottom:25,color:'#565656'}}>{text[0]}</Text>
              <Text style={{fontSize:13,alignSelf:'flex-end',color:'green'}}>{confirmeButton}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
    )
  }

  const ModalLoadScreen = ({}) => {
    return(
      <View style={{backgroundColor: animation.backgroundColor,justifyContent:`center`,alignItems:"center",flex:1}}>
          <LottieView onAnimationFinish={()=>{text.onFunc()}} style={{height:220,width:220}} source={animation.source} autoPlay loop={false}/>
    </View>
    )
  }

  function OptionModal({animationType}) {
  
  
    return (
        <View style={styles.background} >
          <TouchableWithoutFeedback onPress={onClose}>
              <View style={{flex:1}}></View>
          </TouchableWithoutFeedback>
          <View style={{paddingHorizontal:25,paddingVertical:20,backgroundColor:'#fff',maxWidth:450,minWidth:250,marginHorizontal:25,...styles.shadow}}>
              <Text style={styles.header}>{text.title}</Text>
              <Text style={styles.subHeader}>{text.subTitle}</Text>
              <View style={styles.buttons}>
                  <TouchableOpacity onPress={onClose}>
                      <Text style={{paddingHorizontal:10,marginRight:10,...styles.button,color: text?.colorButton ? text.colorButton.cancelButton : "#000"}}>{text.buttonDelete}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={text.onFunc} >
                      <Text style={{...styles.button,color: text?.colorButton ? text.colorButton.okButton : "green"}}>{text.buttonConfirm}</Text>
                  </TouchableOpacity>
              </View>
          </View>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={{flex:1}}></View>
          </TouchableWithoutFeedback>
        </View>
    );
  }

  const ModalAllTouch = ({confirmeButton}) => {
    return(
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={{...styles.background,justifyContent:`center`,alignItems:"center"}}>
            <View style={{padding:50}}>
              <Text style={{backgroundColor:'#fff', paddingHorizontal:40, paddingVertical:30,fontSize:19,textAlign:'center'}}>{text[0]}</Text>
              <View style={{justifyContent:"center",alignItems:"center",backgroundColor:`#000`}}>
                <Text style={{padding:12,color:'#fff',fontSize:20}}>{confirmeButton}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
    )
  }

  const ModalOutside = (props) => {
    return(
      <Modal animationType={props.animationType}  visible={reactModalVisible} transparent={true} onRequestClose={onClose}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""} style={{flex:1}} >
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.background}></View>
        </TouchableWithoutFeedback>
        <View style={styles.containerOutside}>
          {props.children}
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    )
  }

  const MainModal = memo(({animationType='fade',confirmeButton='OK'}) => {
      return (
        <Modal animationType={animationType}  visible={modalVisible} transparent={true} onRequestClose={typeModal!= 'loader' ? onClose: onCloseLate}>
          { typeModal == 'loader' || typeModal == 'loaderText' ? 
            <LoaderModal/>
          :
            typeModal =='info' ?
              <ModalAlertTitle confirmeButton={confirmeButton}/>
            :
              typeModal == 'option' ?
                <OptionModal/>
              :
                <ModalLoadScreen/>
          }
        </Modal>
      );
  })


  return [MainModal,onModalVisible];
}

export default useReactModal

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: 'rgba(10, 10, 10, 0.6)'
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      
      elevation: 24,
    },
    textInput: {
      flex: 1,
      height:45,
      color: '#000',
      fontSize: 20,
  },
    header: {
      color: `#000`,
      textAlign: 'left',
      fontSize: 20,
      marginBottom:10
  },
  subHeader: {
    color: `#000`,
    textAlign: 'left',
    fontSize: 15,
},

  buttons: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
  },
  button: {
      marginTop: 25,
      color: `#000`
    },
    textInputView: {
      flexDirection: 'row',
      marginTop: 18,
      borderBottomWidth: 1,
      borderBottomColor: '#e2e2e2',
      alignItems:`center`,
   },
    container: {
      backgroundColor: '#FFF',
      paddingHorizontal:15,
      paddingVertical:20
   },
   containerOutside: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: windowWidth*0.025
 },
  });
