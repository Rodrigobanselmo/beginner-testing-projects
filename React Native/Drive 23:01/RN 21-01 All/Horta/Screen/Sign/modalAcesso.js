import React, {useState} from 'react';
import { 
    View, 
    Text,
    Modal, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Keyboard,
    ImageBackground,
    SafeAreaView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../Style/cor';

export default (props) => { ///como estamos usando isso, noa podemos usar os Hook useRout e Connect pq esta no stacknav algo assim, entao temos que usar o outroo jeito

  const windowWidth = Dimensions.get('window').width;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      justifyContent: 'center',
/*       backgroundColor: '#000', */
    },
    viewgeral: {
/*       backgroundColor: '#000', */
      padding: 20
    },
    insideview: {
      backgroundColor: Colors.footer,
      width:'100%',
      borderRadius: 30,
      padding:20
    },
    text_insideview: {
        color: Colors.user_pass,
        fontSize: 15
    },
    viewinput: {
      flexDirection: 'row',
      marginTop: 8,
      borderBottomWidth: 1,
      borderBottomColor: Colors.underline,
      paddingBottom: 0,
      justifyContent: 'center',
    },
    textInput: {
      flex: 1,
      paddingLeft: 10,
      color: Colors.user_pass,
    },
    icons: {
      justifyContent: 'center',
    },
    buttons: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      marginTop: 20,
      justifyContent: 'center',
  },
  signIn: {
    width: windowWidth*0.4,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  background: {
    flex: 1,
/*     backgroundColor: 'rgba(0, 0, 0, 0.7)' */
  },
      text_header: {
        color: Colors.header,
        fontWeight: 'bold',
        fontSize: 30,
        paddingRight: 12,
        paddingBottom:10
    },
    header: {
      justifyContent: 'center',
      flexDirection: 'row',
    },
  });

  const [data, setData] = useState({
    username: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
});



const textInputChange = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            username: val,
            check_textInputChange: true
        });
    } else {
        setData({
            ...data,
            username: val,
            check_textInputChange: false
        });
    }
}

const handlePasswordChange = (val) => {
    setData({
        ...data,
        password: val
    });
}



    return (
      <Modal transparent={true} visible={props.isVisible} 
      onRequestClose={props.onCancel}
      animationType='none'>
    <Animatable.View animation="zoomIn" style={styles.container} >
      <View style={styles.background}></View>
      <View style={styles.viewgeral} >

        <View style={styles.header} >
            <Text style={styles.text_header} >Requisição</Text>
            <View style={styles.icons}>
              <Feather 
                      name="lock"
                      color={Colors.header}
                      size={30}
                      style={styles.icon}
                                        
                />
            </View>
        </View>


        <View style={styles.insideview} >
        <Text style={styles.text_insideview}>Nome Completo</Text>
          <View style={styles.viewinput}>
            <View style={styles.icons}>
              <FontAwesome 
                  name="user-o"
                  color={Colors.user_pass}
                  size={20}
              />
            </View>
            <TextInput 
                placeholder="Nome completo"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => textInputChange(val)}
            />
            {data.check_textInputChange ? 
            <View style={styles.icons}>
              <Animatable.View
                animation="bounceIn"
              >
                  <Feather 
                      name="check-circle"
                      color="green"
                      size={20}
                  />

              </Animatable.View>
            </View>
            : null}
          </View>
          <Text style={[styles.text_insideview, { marginTop: 35 }]}>E-mail</Text>
          <View style={styles.viewinput}>
            <View style={styles.icons}>
              <Feather 
                      name="mail"
                      color={Colors.user_pass}
                      size={20}
              />
            </View>
            <TextInput 
                placeholder="e-mail"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
            />
            {data.check_textInputChange ? 
            <View style={styles.icons}>
              <Animatable.View
                animation="bounceIn"
              >
                <Feather 
                    name="check-circle"
                    color="green"
                    size={20}
                />
              </Animatable.View>
            </View>
            : null}
          </View>
        </View>

        <View style={styles.buttons}>

        <TouchableOpacity /* onPress={() => setFadeout('fadeOutDownBig')} */ style={[styles.signIn, {borderColor: '#009387', borderWidth: 1, marginRight: 20  }]} onPress={props.onCancel} >
            <Text style={[styles.textSign, { color: Colors.botaoInativo }]}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signIn} onPress={props.onNavigatiom} >
            <LinearGradient   colors={[Colors.botaoL, Colors.botaoD]} style={styles.signIn} >
              <Text style={[styles.textSign, { color:Colors.botaoText }]}>Pedir Acesso</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </View>
      <View style={styles.background}></View>
    </Animatable.View>
    </Modal>
    )
}


