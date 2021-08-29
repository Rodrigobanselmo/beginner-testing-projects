import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground,
    SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Style/cor';

const SplashScreen = ({navigation}) => {

    return (
        <ImageBackground style={styles.containerImage} source={require('../../assets/Hortamao.jpg')} >
                      <StatusBar backgroundColor='#055902' barStyle="light-content"/>
        <SafeAreaView style={styles.fundo}>
      <View style={styles.container}>
        <View style={styles.header}>
        <View style={styles.ovo}></View>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../../assets/iconcion.png')}
            style={styles.logo}
            resizeMode="contain"
            />
        </View>
        <Animatable.View 
            style={[styles.footer]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title]}>Seja a diferença que o mundo precisa!</Text>
            <Text style={styles.text}>Registre-se para começar</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                <LinearGradient
                    colors={[Colors.botaoL, Colors.botaoD]}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Vamos Lá</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color={Colors.botaoText}
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingTop:10}} onPress={()=>navigation.navigate('SignInScreen')}>
            <View
                    style={styles.signIn}
                >
                    <Text style={{color: '#000', fontSize:10, textDecorationLine:  'underline'}} >Casdatrar-se mais tarde</Text>
                </View>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
      </SafeAreaView>
      </ImageBackground>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.22;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  containerImage: {
    flex: 1, 
    resizeMode: "cover",
    height: height*3/5,
    width: '100%'

  },
  fundo: {
    flex: 1, 
    backgroundColor: Colors.backgroundTransparente
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: Colors.footer,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo*0,
      height: height_logo*0
  },
  title: {
      color:'#055902',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: Colors.carbon,
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: Colors.botaoText,
      fontWeight: 'bold'
  },
  ovo: {
/*       backgroundColor: '#262626', */
      fontWeight: 'bold',
      width: 250,
      height: 250,
      borderRadius: 300,
      position: 'absolute',
      top: 80,
      left: 75
  }
});

