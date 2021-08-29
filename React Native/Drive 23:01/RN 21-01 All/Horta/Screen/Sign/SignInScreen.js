import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    Platform,
    StyleSheet,
    Image,
    ImageBackground,
} from 'react-native';
import {useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import {BoxShadow} from 'react-native-shadow'
/* import {SignReducer} from '../../actions/Sign' */
 
GoogleSignin.configure({
  webClientId: '421575662522-t3v3orphfq9o4aoo45b4jedits29uvfk.apps.googleusercontent.com',
});


const SignInScreen = ({navigation}) => {


    const dispatch = useDispatch();
    const {width} = Dimensions.get("screen");
    const width_shadow = width * 0.8;

    const shadowOpt = {
        width: width_shadow,
        height:50,
        color:"#565656",
        border:6,
        radius:25,
        opacity:0.2,
        x:1,
        y:1.5,
        style:{marginVertical:20}
    }
    const shadow = {
        width: 30,
        height:30,
        color:"#565656",
        border:3,
        radius:15,
        opacity:0.2,
        x:1.1,
        y:1.1,
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1, 
          backgroundColor: 'grey'
        },
        fundo: {
            flex: 1, 
            backgroundColor: 'rgba(38, 38, 38, .5)'
          },
        header: {
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingBottom: 50
        },
        footer: {
            backgroundColor: '#262626',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 30
        },
        text_header: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 30,
            paddingRight: 12
        },
        icon: {
            alignSelf: 'flex-end'
    
        },
        text_footer: {
            color: '#fff',
            fontSize: 15
        },
        action: {
            flexDirection: 'row',
            marginTop: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            paddingBottom: 0
        },
        textInput: {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            paddingLeft: 10,
            color: '#fff',
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
            fontSize: 17,
            fontWeight: 'bold'
        },
        textPrivate: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 15,
        },
        color_textPrivate: {
            color: 'grey'
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
        containerImage: {
            flex: 1, 
            resizeMode: "cover",
            width: '100%'
        
          },
      });


function SignReducer() {


    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    
    function onAuthStateChanged(userLogin) {
       
        console.log('userlogin')
        console.log(userLogin)

        if (userLogin != null) {
            dispatch({
                type: 'ADD_USER',
                payload: userLogin
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

    }

    return subscriber; 

}


//sign com google 
async function onGoogleButtonPress() {
    try {

        await GoogleSignin.hasPlayServices();
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
    
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        //aqui leva para add no useReducer
        
        SignReducer()

        return auth().signInWithCredential(googleCredential);

    } catch (e) {
        console.log(e);
    }
}


 

    return (
        <ImageBackground style={styles.containerImage} source={require('../../assets/vegetable-P6D8XUD.jpg')} >
        <View style={{justifyContent:'flex-end', alignItems:'center', backgroundColor:'#00000044', flex: 1}}>
                        <Text style={{fontSize:45, fontWeight:'normal', color:'#fff', marginTop: 100}}>Cadastre-se</Text>
            <Text style={{fontSize:15, fontWeight:'normal', color:'#fff', marginTop: 8, marginBottom:250}}>Não possui conta?</Text>
{/*             <Image source={require('../../assets/iconmao.png')} resizeMode='contain' style={{width: 150, height: 50, marginTop:-50, backgroundColor:'transparent', flex:1}}/> */}

            <BoxShadow setting={shadowOpt} >
                <TouchableOpacity onPress={onGoogleButtonPress} style={{height: 47}} >
                    <LinearGradient colors={['#3b5998', '#29487d']} style={{flex:1, justifyContent: 'center', alignItems: 'center', borderRadius: 40, flexDirection: 'row', borderColor:'transparent'}}>

                        <Fontisto name='facebook' size={18} color='#fff'  style={{paddingRight: 18}}/>
                        <Text style={[styles.textSign, {color:'#fff'}]}>Cadastre-se com Facebook</Text>
                        
                    </LinearGradient>
                </TouchableOpacity>
            </BoxShadow>

            <TouchableOpacity onPress={()=>{}} style={{marginTop: 7, height: 43, width: '65%', marginBottom:15}} >
                    <View backgroundColor='#00000044' style={{paddingHorizontal: 9, flex:1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, flexDirection: 'row', borderColor: '#fff', borderWidth: 1}}>
                        <Text style={{fontSize:14, fontWeight:'normal', color:'#fff'}}>Cadastre-se com email</Text>
                    </View>
            </TouchableOpacity>



                    <View style={{flexDirection:'row', width:'45%', justifyContent:'space-between', paddingHorizontal:0, alignItems:'center', marginBottom:30, marginTop:20}}>
                        
                        <BoxShadow setting={shadow} >
                            <TouchableOpacity  style={[{marginTop: 0}]}  >
                                <LinearGradient colors={['#00ACEE', '#00A0aE']}  style={{height:30, width:30, borderRadius:20, justifyContent: 'center', alignItems: 'center'}} >
                                    <Fontisto name='twitter' size={13} color='#fff' />
                                </LinearGradient>
                            </TouchableOpacity>
                        </BoxShadow>

                        <BoxShadow setting={shadow} >
                                <TouchableOpacity style={[{marginTop: 0}]}>
                                <LinearGradient colors={['#fff', '#eee']} style={{height:30, width:30, borderRadius:20, justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={require('../../assets/google-hangouts.png')} resizeMode='contain' style={{width: 16, height: 16}}/>
                                </LinearGradient>
                                </TouchableOpacity>
                        </BoxShadow>

                        <BoxShadow setting={shadow} >
                            <TouchableOpacity style={[{marginTop: 0}]} >
                            <LinearGradient colors={['#90EE90', '#50c878']} style={{height:30, width:30, borderRadius:20, justifyContent: 'center', alignItems: 'center'}} >
                                <Feather name='phone' size={15} color='#fff' />
                            </LinearGradient>
                            </TouchableOpacity>
                        </BoxShadow>

                    </View>

                    <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row', marginBottom:20}} >
                        <Text style={{fontSize:15, fontWeight:'normal', color:'grey'}}>Já tem uma conta? </Text>
                        <TouchableOpacity onPress={()=> {}} style={{}}>
                            <Text style={{fontSize:15, fontWeight:'normal', color:'#317302', textDecorationLine: 'underline',  }}>Login</Text>
                        </TouchableOpacity>
                    </View>

        </View>
        </ImageBackground>
    );
};

export default SignInScreen;



/* botaoD: '#037F8C',
botaoL: '#04D9B2',
botaoInativo: '#009387',
botaoInativotext: '#009387', */
