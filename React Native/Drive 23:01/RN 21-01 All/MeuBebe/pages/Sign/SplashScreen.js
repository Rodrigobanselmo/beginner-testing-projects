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
    SafeAreaView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useColor from '../../styles/useColor';

const SplashScreen = ({navigation}) => {

        const [colors] = useColor();

    const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  containerImage: {
    flex: 1, 
    resizeMode: 'contain',

  },
  fundo: {
    flex: 1, 
    backgroundColor: colors.backgroundTransparente
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: colors.footer,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: colors.segunda,
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: colors.carbon,
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
      color: colors.botaoText,
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



    return (
        <ImageBackground style={styles.containerImage} source={require('../../assets/4.jpg')} >
        <SafeAreaView style={styles.fundo}>
      <View style={styles.container}>
          <StatusBar backgroundColor='#262626' barStyle="light-content"/>
        <View style={styles.header}>
        <View style={styles.ovo}></View>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../../assets/gamma.png')}
            style={styles.logo}
            resizeMode="contain"
            />
        </View>
        <Animatable.View 
            style={[styles.footer]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title]}>Stay connected with everyone!</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                <LinearGradient
                    colors={[colors.botaoL || '#000', colors.botaoD || '#000']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color={colors.botaoText}
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
      </SafeAreaView>
      </ImageBackground>
    );
};

export default SplashScreen;

