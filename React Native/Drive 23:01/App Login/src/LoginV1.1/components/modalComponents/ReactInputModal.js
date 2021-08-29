import React, {useState} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,TextInput,Platform,StyleSheet,ScrollView,Animated,Easing, Keyboard,Modal,KeyboardAvoidingView,TouchableWithoutFeedback} from 'react-native';
import useModalAnimated from './AnimatedModal'
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {isEqual} from 'lodash';

const windowWidth = Dimensions.get('window').width; 
const windowHeight = Dimensions.get('window').height; 

const ininialStateData = {
  isValidInput: [],
  text0: '',
  text1: '',
  text2: '',
}

  
  function ReactInputModal({title,subTitle, modalVisible, setModalVisible,
  onPress,returnKeyType=['done'],buttonSentTitle='Confirmar',buttonCancelTitle='Cancelar',animationType='fade',
  placeholder=[],typeInput=['normal'],preLoaded=null}) {

    const ref1 = React.useRef(false)
    const ref2 = React.useRef(false)

    const [ModalAnimatedComponent, onAnimationModal] = useModalAnimated(70);
    const [invalidEmail, setinvalidInput] = useState(false)
    const [secureTextEntry, setSecureTextEntry] = useState([true,true,true])
    const [focus, setFocus] = useState(0);
    const [data, setData] = useState({...ininialStateData});

    React.useEffect(() => {
      if (preLoaded) {
        let array = ['','','']
        preLoaded.forEach((e,i) => {
          array[i] = e
        });

        setData({...data,text0:array[0],text1:array[1],text2:array[2]})
      }
    }, [preLoaded])

    const onClose = () => {
      setModalVisible(false)
      setData({...ininialStateData,isValidInput:[]})
      setinvalidInput(false)
    }

    const onChangeText = (val,index,item) => {

      let regex = /^[0-9.,]+$/;
      var TEXT_INPUT = {...data}
      if (item == 'name') {
        TEXT_INPUT['text'+index.toString()] = val
      } else {
        TEXT_INPUT['text'+index.toString()] = val.trim()
      }
      
      if(item == 'pass') {
          if (typeInput.length > index+1 ? typeInput[index+1] == 'confirmePass' : false) {
            TEXT_INPUT.isValidInput[index+1] = (TEXT_INPUT['text'+(parseInt(index+1)).toString()] == val && TEXT_INPUT.isValidInput[parseInt(index)])
          }
          TEXT_INPUT.isValidInput[index] = val.trim().length >= 6
      } else if(item == 'email') {
          let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          TEXT_INPUT.isValidInput[index] = re.test(val.trim())
      } else if(item == 'confirmePass') {
          TEXT_INPUT.isValidInput[index] = (TEXT_INPUT['text'+(parseInt(index)-1).toString()] == val && TEXT_INPUT.isValidInput[parseInt(index)-1])
      } else if(item == 'num') {
            TEXT_INPUT.isValidInput[index] = val.trim().length >= 6 
      } else if(item == 'name') {
            TEXT_INPUT.isValidInput[index] = val.trim().length >= 1
      } else if(item == 'normal') {
            TEXT_INPUT.isValidInput[index] = val.trim().length >= 1
      } else {
            TEXT_INPUT.isValidInput[index] = false
      }
      
      if (!invalidEmail) {
        setinvalidInput(true)
      }
      if (item == 'num' && !regex.test(val.trim())) {null} 
      else {
          setData({...TEXT_INPUT})
      }
    }

    function onEnviar() {
        onPress(onAnimationModal,data.text0,data.text1,data.text2,data.isValidInput,onClose)
        setinvalidInput(false)
    }

    function onSubmit(index) {
      if (index == typeInput.length-1) {
        onEnviar()
      } else if (index == 0) {
        ref1.current.focus()
      } else if (index == 1) {
        ref2.current.focus()
      } else {
      }
    }

    function onSecureTextEntry(index) {
      var  secure = [...secureTextEntry]
      secure[index] = !secure[index]
      setSecureTextEntry([...secure])
    }
    
    return (
      <Modal animationType={animationType}  visible={modalVisible} transparent={true} onRequestClose={onClose}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""} style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.7)'}} >
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={{flex:1}}></View>
        </TouchableWithoutFeedback>
          <View style={styles.container}>
            <Text style={styles.header}>{title}</Text>
            <Text style={styles.subHeader}>{subTitle}</Text>

            {typeInput.map((item,index)=>{

                    var TYPE = {};
                    if (item=='pass') {
                      TYPE = {
                        autoCompleteType:'password',
                        textContentType:'none',
                        keyboardType:'default'
                      }
                    } else if (item=='email') {
                      TYPE = {
                        autoCompleteType:'email',
                        textContentType:'emailAddress',
                        keyboardType:'email-address'
                      }
                    } else if (item=='num') {
                      TYPE = {
                        autoCompleteType:'off',
                        textContentType:'none',
                        keyboardType:'numeric'
                      }
                    } else {
                      TYPE = {
                        autoCompleteType:'off',
                        textContentType:'none',
                        keyboardType:'default'
                      }
                    }

                    return(
                    <View key={index} style={[styles.textInputView,{borderBottomColor: focus == index+1 && typeInput.length > 1 ?"#000":"#e2e2e2"}]}>
                      <TextInput style={styles.textInput}
                        ref={index == 1 ? ref1 : index == 2 ? ref2 : null} 
                        onChangeText={(val) => onChangeText(val,index,item)}
                        placeholder={placeholder[index]}
                        autoCapitalize={item != 'name'?'none':'words'}
                        clearButtonMode='always'
                        autoFocus={index == 0 ? true : false }
                        returnKeyType={returnKeyType[index]}
                        blurOnSubmit={false}
                        value={data['text'+index.toString()]}
                        secureTextEntry={item != 'pass' && item !='confirmePass' ? false:secureTextEntry[index]}
                        keyboardType={TYPE.keyboardType}
                        textContentType={TYPE.textContentType}
                        autoCompleteType={TYPE.autoCompleteType}
                        onFocus={()=>setFocus(index+1)}
                        onBlur={()=>setFocus(0)}
                        blurOnSubmit={false}
                        onSubmitEditing={()=>onSubmit(index)}
                      />
                      
                      {item == 'pass' || item =='confirmePass' ? 
                        <TouchableOpacity style={{padding:10}} onPress={()=>onSecureTextEntry(index)} >
                        {(secureTextEntry[index]) ? 
                            <Ionicons name="ios-eye-off-outline"color="grey" size={20}/>
                        :
                            <Ionicons name="ios-eye-outline"color="grey" size={20}/>
                        }
                        </TouchableOpacity> 
                      : null}
                      {data.isValidInput[index] && invalidEmail && item != 'name' && item!='normal' ? 
                        <Animatable.View animation="bounceIn" >
                            <Ionicons name='ios-checkmark-circle-outline' color="green" size={23} />
                        </Animatable.View>
                      : null}
                    </View>
                    )
            })}

            <View style={styles.buttons}>
                <TouchableOpacity onPress={onClose}>
                    <Text style={{padding:10,marginRight:10,...styles.button}}>{buttonCancelTitle}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onEnviar} >
                    <Text style={{padding:10,...styles.button,color: (data.isValidInput.findIndex(i=>i===false)== -1 && data.isValidInput.length == typeInput.length ) ? "green" : "#000"}}>{buttonSentTitle}</Text>
                </TouchableOpacity>
            </View>
          </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={{flex:1,alignItems:'center'}}>
            <ModalAnimatedComponent/>
          </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    );
  }


export default React.memo(ReactInputModal,isEqual)

  const styles = StyleSheet.create({
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
    fontSize: 15
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
      paddingVertical:15,
      width: windowWidth*(1-2*0.025),
      maxWidth:500,
      alignSelf:`center`
   },
  });
