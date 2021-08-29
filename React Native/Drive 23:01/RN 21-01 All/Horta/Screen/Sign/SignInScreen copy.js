import React, {useState} from 'react';
import { 
    View, 
    Text, 
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
import ModalAcesso from './modalAcesso';
import { CommonActions} from '@react-navigation/native';
import Colors from '../../Style/cor';


const SignInScreen = ({navigation}) => {


  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

const [keyboardview, setKeyboardview] = useState(true)
const [fadeout, setFadeout] = useState('fadeInUpBig')
const [modal, setModal] = useState(false)

  const _keyboardDidShow = () => {
    setKeyboardview(false);
  };

  const _keyboardDidHide = () => {
    setKeyboardview(true);
  };

    const [data, setData] = useState({
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
/*         login: true */
    });

    const windowHeight = Dimensions.get('window').height;

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


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const onCancel = () => {
        setModal(false)
        setFadeout('fadeInUpBig')
    }

    const onNavigatiom = () => {
        setModal(false)
        navigation.dispatch(
            CommonActions.reset({
            index: 0,
            routes: [
                { name: 'Permission' }
            ],
            })
        );
    }

        const onSignIn = () => {
        navigation.dispatch(
            CommonActions.reset({
            index: 0,
            routes: [
                { name: 'MyDrawer' }
            ],
            })
        );
    }
    return (
      <ImageBackground style={styles.container} source={require('../../assets/4.jpg')} >
          <SafeAreaView style={styles.fundo}>
          <StatusBar backgroundColor='#262626' barStyle="light-content"/>

          <ModalAcesso isVisible={modal} onCancel={() => onCancel()} onNavigatiom={() => onNavigatiom()}/>
        
        <Animatable.View  style={styles.header} minHeight= {keyboardview ? 130 : 0} animation={fadeout}>
            <View flexDirection='row' >
            <Text style={styles.text_header} >Login</Text>
            <Feather 
                    name="log-in"
                    color={Colors.header}
                    size={30}
                    style={styles.icon}
                                      
                />
            </View>
        </Animatable.View >
        <Animatable.View 
            animation={fadeout}
            onAnimationEnd={fadeout == 'fadeInUpBig' ? () => setModal(false) : () => setModal(true)}
            style={styles.footer}
        >
            <ScrollView>

            
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={Colors.user_pass}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={Colors.user_pass}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color={Colors.textocarbon}
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    onPress={() => onSignIn()}
                    style={styles.signIn}
                >
                <LinearGradient
                    colors={[Colors.botaoL, Colors.botaoD]}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:Colors.botaoText
                    }]}>Login</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setFadeout('fadeOutDownBig')}
                    style={[styles.signIn, {
                        borderColor: Colors.botaoInativo,
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: Colors.botaoInativotext
                    }]}>Pedir Acesso</Text>
                </TouchableOpacity>
            </View>

            </ScrollView>
        </Animatable.View>
        </SafeAreaView>
      </ImageBackground>
    );
};

export default SignInScreen;



const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: Colors.backgroundDark
    },
    fundo: {
        flex: 1, 
        backgroundColor: Colors.backgroundTransparente
      },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        backgroundColor: Colors.footer,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: Colors.header,
        fontWeight: 'bold',
        fontSize: 30,
        paddingRight: 12
    },
    icon: {
        alignSelf: 'flex-end'

    },
    text_footer: {
        color: Colors.user_pass,
        fontSize: 15
    },
    action: {
        flexDirection: 'row',
        marginTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.underline,
        paddingBottom: 0
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: Colors.user_pass,
    },
    button: {
        alignItems: 'center',
        marginTop: 30,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15,
    },
    color_textPrivate: {
        color: Colors.textocarbon
    }
  });
