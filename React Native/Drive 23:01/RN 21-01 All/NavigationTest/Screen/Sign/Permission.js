import React, {useState} from 'react';
import { 
    View, 
    Text, 
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
    SafeAreaView,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { CommonActions} from '@react-navigation/native';
import Colors from '../../Style/cor';



const SignInScreen = ({navigation}) => {


    const [keyboardview, setKeyboardview] = useState(true)
    const [fadeout, setFadeout] = useState('fadeInUpBig')
    const [login, setLogin] = useState(false)
    const [cadastro, setCadastro] = useState(false)
    const [action, setAction] = useState(false)
    const [aceito, setAceito] = useState(false)

   


  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);


    
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

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const onLogin = () => {

        if (data.username !== '') {
            navigation.dispatch(
                CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'MyDrawer' }
                ],
                })
            );
        }

        if (cadastro) {
            setFadeout('fadeOutDownBig')
            setLogin(!login)
            setCadastro(!cadastro)
        } else {

            if (login) {
                setAction(false)
                setFadeout('fadeOutDownBig')
            } else {
                setLogin(true)
                setAction(true)
            }
         }
        
        
    }

    const onCadastro = () => {
        if (login) {
            setFadeout('fadeOutDownBig')
            setLogin(!login)
            setCadastro(!cadastro)
        } else {

            if (cadastro) {
                setAction(false)
                setFadeout('fadeOutDownBig')
            } else {
                setCadastro(true)
                setAction(true)
            }
         }
        
        
    }

    const onfadeout = () => {
        if (action) {
            setFadeout('fadeInUpBig')
        } else {
            setLogin(false)
            setCadastro(false)
            setFadeout('fadeInUpBig')
        }
    } 


    return (
      <ImageBackground style={styles.container} source={require('../../assets/foto3.jpg')} >
          <SafeAreaView style={styles.fundo}>
          <StatusBar backgroundColor='#262626' barStyle="light-content"/>

        
        <View  style={styles.header} /* minHeight= {keyboardview ? 130 : 0} animation={'fadeInUpBig'} */>
    <Text style={styles.text_header} >{aceito ? 'Aprovado' :'Aguradando aprovação'}</Text>
            <Image
  style={{
    width: 700,
    height: 600,
    resizeMode: 'contain',
    marginBottom: -170
  }}
  source={require('../../assets/6A36DD7A-CD17-4F2C-BDB0-BF328C535969.png')}
/>
        </View >
        {login || cadastro ? 
        <Animatable.View 
            animation={fadeout}
            onAnimationEnd={() => onfadeout()}
            style={styles.footer2}
        >
            <ScrollView>

 
                <Animatable.View 
            animation={fadeout}>
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
                marginTop: 20
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
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

{cadastro && fadeout == 'fadeInUpBig' ?  
<>
            <Text style={[styles.text_footer, {
                marginTop: 20
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#01402E"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
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
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
</>
: null}

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            </Animatable.View>
            </ScrollView>
        </Animatable.View>
        : null}


        <Animatable.View 
            animation={'fadeInUpBig'}
/*             onAnimationEnd={() => setFadeout('fadeInDownBig')} */
            style={styles.footer}
        >
            <ScrollView>

            <View style={styles.button}>



                {!aceito ? 
                <TouchableOpacity
                onPress={() => setAceito(true)}
                style={[styles.signIn, {
                    borderColor: '#009387',
                    borderWidth: 1,
                    marginBottom: 15
                }]}
            >
                 <View flexDirection={'row'}>
                    <Text style={[styles.textSign, { color: '#009387' }]}>Cadastrar</Text>
                    <Feather 
                    name="lock"
                    color="#009387"
                    size={20}
                    style={styles.lock}
                />
                </View>
                </TouchableOpacity>


                : 

                

                cadastro ?  
                    <TouchableOpacity
                    onPress={() => onCadastro()}
                    style={[styles.signIn, {marginBottom: 15}]}
                    >
                    <LinearGradient
                    colors={['#04D9B2', '#037F8C']}
                    style={styles.signIn}
                    >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Cadastrar</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                : 
                <TouchableOpacity
                onPress={() => onCadastro()}
                style={[styles.signIn, {marginBottom: 15}]}
                >
                <LinearGradient
                    colors={['#037F8C', '#262626']}
                style={styles.signIn}
                >
                <Text style={[styles.textSign, {
                    color:'#fff'
                }]}>Cadastrar</Text>
                </LinearGradient>
                </TouchableOpacity>
                }

            {login ?  
                <TouchableOpacity
                    onPress={() => onLogin()}
                    style={styles.signIn}
                >
                <LinearGradient
                    colors={['#04D9B2', '#037F8C']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Login</Text>
                </LinearGradient>
                </TouchableOpacity>
                : 
                <TouchableOpacity
                    onPress={() => onLogin()}
                    style={styles.signIn}
                >
                <LinearGradient
                    colors={['#037F8C', '#262626']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Login</Text>
                </LinearGradient>
                </TouchableOpacity>
            }

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
      backgroundColor: '#262626'
    },
    fundo: {
        flex: 1, 
        backgroundColor: 'rgba(38, 38, 38, .5)'
      },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    footer: {
/*             backgroundColor: '#fff', */
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    footer2: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 200,
        marginBottom: -260
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        paddingRight: 12,
        marginBottom: -120,
        fontFamily: 'tahoma'
    },
    icon: {
        alignSelf: 'flex-end'

    },
    text_footer: {
        color: '#01402E',
        fontSize: 15
    },
    action: {
        flexDirection: 'row',
        marginTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 0
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#01402E',
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
        fontWeight: 'bold',
/*         paddingRight: 10 */
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15,
        paddingBottom: 30
    },
    color_textPrivate: {
        color: 'grey'
    },
    lock: {
        position:'absolute',
        top: -5,
        left: 185
    }
  });


