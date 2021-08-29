/* eslint-disable no-unused-vars */
import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function App({navigation}) {
  return (
    <SafeAreaView style={{flex:1,alignItems:`center`,justifyContent:`flex-start`}} >

      <Image source={require('../../../assets/gamma.png')} style={{height:200,width:200,resizeMode:`contain`, marginTop:0,flex:1}}/>

      <TouchableOpacity onPress={()=>navigation.navigate('SignIn_Register')} style={[styles.button,{marginBottom:20}]}>
        <Text style={{fontSize:20,letterSpacing:2}} >REGISTRAR</Text>
      </TouchableOpacity>

      <Text style={{fontSize:13,marginBottom:5}} >Tem uma conta Gamma?</Text>

      <TouchableOpacity onPress={()=>navigation.navigate('SignIn_Conect')} style={[styles.button,{marginBottom:15}]}>
        <Text style={{fontSize:20,letterSpacing:2}} >CONECTAR</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeContent: {
    flex: 1,
  },
  button: {
    width:`70%`,
    height:70,
    justifyContent:`center`,
    alignItems:`center`,
    backgroundColor:`#fff`,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    
    elevation: 12,
  },
});
