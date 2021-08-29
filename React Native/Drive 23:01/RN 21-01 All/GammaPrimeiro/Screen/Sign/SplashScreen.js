import React, {useState, useRef, useEffect} from 'react';
import { 
    View, 
    Text, 
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    StatusBar,
    Image,
    Dimensions,
    Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Style/cor'
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const primeiraTela = () => {

  const altura = Dimensions.get('window').height;
  const comprimento = Dimensions.get('window').width;

  const navigation = useNavigation();


  const fadeAnim = new Animated.Value(100);
  const fadeAnimFooter = new Animated.Value(400);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false
    }).start();
  };

  const fadeInFooter = () => {
    Animated.timing(fadeAnimFooter, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false
    }).start();
  };

  setTimeout(() => {
    fadeIn()
  }, 2000);


 useEffect(() => {
 
  fadeInFooter()

 }, [])




    return (
        <ImageBackground style={styles.containerImage} source={require('../../assets/4.jpg')}>
        <StatusBar backgroundColor='#000' bartyle="dark-content"/>
          <SafeAreaView style={[styles.fundo, {backgroundColor: Colors.backgroundTransparente} ]}>

            <View style={styles.header}>
              <Image source={require('../../assets/gamma.png')} style={{width:comprimento*0.45, height:altura*0.22}} resizeMode='contain'   />
            </View>

            <Animated.View style={[styles.footer, {backgroundColor:Colors.footer,transform: [{translateY: fadeAnimFooter }]} ]}>
              
              <Text style={[styles.title, {color: Colors.botaoD}]}>Seja a diferença que o mundo precisa!</Text>
              <Text style={[styles.text,{color: Colors.carbon}]}>Registre-se para começar</Text>
             
              <Animated.View  style={[styles.button, {transform: [{translateY: fadeAnim }] }]}>
              
                  <TouchableOpacity onPress={()=>console.log(fadeAnim)} style={{marginRight:7, elevation: 6, backgroundColor:'#fff', borderRadius:10 }}>
                    <View style={[styles.signIn, { borderWidth: 1, borderColor:'#037F8C', width: comprimento*0.45}]}>
                      <Text style={{color: '#037F8C', fontWeight:'bold', fontSize:15}}>CLIENTES</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')} style={{elevation: 6, backgroundColor:'#fff', borderRadius:10}}>
                      <LinearGradient style={[styles.signIn, { width: comprimento*0.45}]} colors={[Colors.botaoL, Colors.botaoD]} >
                        <Text style={{color: Colors.white, fontWeight:'bold', fontSize:15}}>MEMBROS</Text>
                        <MaterialIcons name='navigate-next' color={Colors.white} size={20}/>
                      </LinearGradient>
                  </TouchableOpacity>
             
              </Animated.View>
            
            </Animated.View>

          </SafeAreaView>
        </ImageBackground>

    );
};

export default primeiraTela;

const styles = StyleSheet.create({
  containerImage: {
    flex: 1, 
    resizeMode: "cover",

  },
  fundo: {
    flex: 1,
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 50,
      paddingBottom: 30,
      paddingHorizontal: 30
      
  },
/*   logo: {
      height: height_logo
  }, */
  title: {
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      marginTop:5
  },
  button: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      flexDirection: 'row',
  },
  signIn: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      flexDirection: 'row',
  },
});