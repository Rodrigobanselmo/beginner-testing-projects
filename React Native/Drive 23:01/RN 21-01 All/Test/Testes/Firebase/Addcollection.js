

 import React, { useEffect, useState, useRef } from 'react';
 import { Dimensions, View, SafeAreaView, Text, StyleSheet, FlatList, TouchableHighlight, TextInput, ActivityIndicator } from 'react-native';
 import firebase from '@react-native-firebase/app';
 import auth from '@react-native-firebase/auth';
 import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
 GoogleSignin.configure({
  webClientId: '421575662522-t3v3orphfq9o4aoo45b4jedits29uvfk.apps.googleusercontent.com',
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
});
import firestore from '@react-native-firebase/firestore';

 

 export default () => {

  function LoginApp() {
  
    //add collection add aleatorio

/*     AddUserIdQulaquer = async (element) => { 
      await firestore().collection('userChat').doc('dsfds').collection('booksList').add({
        password: 'this.password',
        name: 'this.name',
        rollno: 'this.rollno'
      })
    } */


    //add collection com doc id escolhido 

    AddUserIdQulaquer = async (element) => { 
      await firestore()
      .collection('userChat').doc('dsfds').collection('booksListaa').doc('myBookId').set({
        password: 'this.password',
        name: 'this.name',
        rollno: 'this.rollno'
      })
  
    }

    return(
        <View style={styles.View} >
          <TouchableHighlight style={styles.Viewnum} onPress={()=>AddUserIdQulaquer('bom')}>
            <Text> filter </Text>
          </TouchableHighlight>
      </View>
    );
  }



                

     return (

       <LoginApp/>
       
     );
 }; 
 
 
 const styles = StyleSheet.create({
   View: {
     justifyContent: 'center',
     alignItems: 'center',
     flex: 1
   },
   Pastas_FlatList: {
    flex: 1,
    width: '100%',
},
   Viewnum: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: 40,
    margin: 20,
    backgroundColor: '#262'
  },
  textInput: {
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#01402E',
    margin: 50,
    borderWidth: 1,
    width:'90%',
},
 });
 
 
 
