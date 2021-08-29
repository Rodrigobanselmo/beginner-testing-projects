import React, {useState, useRef, useEffect} from 'react';
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
    SafeAreaView,
    Button,
    Image,
    TouchableHighlight
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Zocial from 'react-native-vector-icons/Zocial';
import { CommonActions} from '@react-navigation/native';
import useColor from '../styles/useColor';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import {BoxShadow} from 'react-native-shadow'

GoogleSignin.configure({
  webClientId: '421575662522-t3v3orphfq9o4aoo45b4jedits29uvfk.apps.googleusercontent.com',
});


const SignInScreen = ({navigation}) => {


    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const [colors] = useColor();

    const styles = StyleSheet.create({
        container: {
          flex: 1, 
          backgroundColor: colors.backgroundDark
        },
        fundo: {
            flex: 1, 
            backgroundColor: colors.backgroundTransparente
          },
        header: {
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingBottom: 50
        },
        footer: {
            backgroundColor: colors.footer,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 30
        },
        text_header: {
            color: colors.header,
            fontWeight: 'bold',
            fontSize: 30,
            paddingRight: 12
        },
        icon: {
            alignSelf: 'flex-end'
    
        },
        text_footer: {
            color: colors.user_pass,
            fontSize: 15
        },
        action: {
            flexDirection: 'row',
            marginTop: 8,
            borderBottomWidth: 1,
            borderBottomColor: colors.underline,
            paddingBottom: 0
        },
        textInput: {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            paddingLeft: 10,
            color: colors.user_pass,
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
            color: colors.textocarbon
        },
        cadastro: {
            flexDirection: 'row',
            width:'100%',
            marginTop: 15,
            paddingHorizontal:25,
            justifyContent: 'space-between' ,
            alignItems:'center'
        },
        cadastroText: {
            fontSize: 14,
            fontWeight: 'bold'
        },
      });

      const inputFocus = useRef(null);

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
const [initializing, setInitializing] = useState(true);
const [users, setUsers] = useState();

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
                { name: 'MyDrawer' }
            ],
            })
        );
    }

/*         const onSignIn = () => {

        if( data.username.trim().length >= 4 ) {
                dispatch({
                    type: 'ADD_USER',
                    payload: data.username
                });          
            navigation.dispatch(
                CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'MyDrawer' }
                ],
                })
            );
        }
    } */

    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      }

    function GoogleSignIn() {
        return (
          <Button
            title="Google Sign-In"
            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
          />
        );
      }


    function LoginApp() {
        // Set an initializing state whilst Firebase connects
      
        // Handle user state changes
        function onAuthStateChanged(users) {
          setUsers(users);
          if (initializing) setInitializing(false);
        }
      
        useEffect(() => {
            console.log(users)
          const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
          return subscriber; // unsubscribe on unmount
        }, []);
      
        if (initializing) return null;
      
        if (!users) {
          return (
            <View>
              <Text>Loginfsjidfdijdijdfsijsdoijsdfjoisdfjoisdfijodfsijodfsijosdfjio</Text>
            </View>
          );
        }
      
        return (
          <View>
            <Text>Welcome {users.uid}</Text>
          </View>
        );
      }

      ///isso faz com que vc possa mudar os dados das pessoas

/*       async function photo() {
        const authForDefaultApplanguage = firebase.auth().settings;
        console.log(authForDefaultApplanguage)
        const authForDefaultApp = firebase.auth();
        console.log(authForDefaultApp)
        const update = {
            displayName: 'Aliasss',
            photoURL: 'https://cdn.pixabay.com/photo/2012/11/21/17/02/lion-66898_960_720.jpg',
          };
          
          await firebase.auth().currentUser.updateProfile(update);
      } */

    const onSignIn = () => {

                
            
/*         auth()
        .createUserWithEmailAndPassword('rodrigoanselmo@usp.br', '123456')
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
      
          console.error(error);
        }); */



/*             auth()
            .signInAnonymously()
            .then(() => {
                console.log('User signed in anonymously');
            })
            .catch(error => {
                if (error.code === 'auth/operation-not-allowed') {
                console.log('Enable anonymous in your firebase console.');
                }

                console.error(error);
            }); */
            
            
            dispatch({
                    type: 'ADD_USER',
                    payload: data.username
                });          
            navigation.dispatch(
                CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'MyDrawer' }
                ],
                })
            );


    }

    const shadowOpt = {
        width:370,
        height:140,
        color:"#565656",
        border:20,
        radius:10,
        opacity:0.9,
        x:3,
        y:4,
        style:{marginVertical:20}
    }


    const onSignOut = () => {

                
            
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
            

    }


    return (
        <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#262626', flex: 1}}>
          <BoxShadow setting={shadowOpt} >
                <View style={{
                    position:"relative",
                    width: 370,
                    height: 140,
                    backgroundColor: "#161616",
                    borderRadius:5,
                    // marginVertical:5,
                    overflow:"hidden"}}>
                </View>
            </BoxShadow>
            <BoxShadow setting={shadowOpt} >
                <View style={{
                    position:"relative",
                    width: 370,
                    height: 140,
                    backgroundColor: "#161616",
                    borderRadius:5,
                    // marginVertical:5,
                    overflow:"hidden"}}>
                </View>
            </BoxShadow>
            <BoxShadow setting={shadowOpt} >
                <View style={{
                    position:"relative",
                    width: 370,
                    height: 140,
                    backgroundColor: "#161616",
                    borderRadius:5,
                    // marginVertical:5,
                    overflow:"hidden"}}>
                </View>
            </BoxShadow>
        </View>
    );
};

export default SignInScreen;




