

 import React, { useEffect, useState, useRef } from 'react';
 import { Dimensions, View, SafeAreaView, Text, StyleSheet, FlatList, TouchableHighlight, TextInput, Image } from 'react-native';
 import firebase from '@react-native-firebase/app';
 import auth from '@react-native-firebase/auth';
 import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
 GoogleSignin.configure({
  webClientId: '421575662522-t3v3orphfq9o4aoo45b4jedits29uvfk.apps.googleusercontent.com',
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
});
import firestore from '@react-native-firebase/firestore';


 
/* const email = 'rodrigoanselmo@usp.br' */
const email = 'rodrigo.barbosa.anselmo@gmail.com'
const senha = 'rodrigo.barbosa.anselmo@gmail.com'

 
 export default () => {
 

  const [initializing, setInitializing] = useState(true);
  const [users, setUsers] = useState();
  const [usersVerification, setusersVerification] = useState(0);

//pega dados do user
const getCurrentUser = async () => {
  let auth = firebase.auth()
  console.log(auth.currentUser)
/*   console.log(currentUser ); */
};

//recarrega os dado do user
const getCurrentUserReload = async () => {

};


const onCriarUser = () => {
  let auth = firebase.auth()
    auth.createUserWithEmailAndPassword(email,senha)
    .then((loggedUser) => {
      console.log(loggedUser);
    })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
/*     console.error(error); */
  });
}

  const onLoginUser = () => {
    let auth = firebase.auth()
    auth.signInWithEmailAndPassword(email,senha)
    .then((loggedUser) =>{console.log(loggedUser);})
    .catch(error=>{console.log(error);})
  }



    

  const onSign = () => {
    onLoginUser()
  }
  const onCriar = () => {
        onCriarUser()
      }
 

  const onSignOut = () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'))
    .catch(error=>{console.log(error);});
  }




  function LoginApp() {
    function onAuthStateChanged(users) {
      setUsers(users);
      if (initializing) setInitializing(false);
    }

    useEffect(() => {

      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; 
    }, []);



    if (initializing) return null;

    if (users) {
      return (
        <View style={styles.View} >
         <TouchableHighlight style={styles.Viewnum} onPress={onSignOut}>
         <Text> Logout </Text>
         </TouchableHighlight>
          <TouchableHighlight style={[styles.Viewnum,{backgroundColor:'#fff'}]} onPress={getCurrentUserReload}>
          <Text> getCurrentUserReload </Text>
          </TouchableHighlight>
      </View>
      );
    }
  
    return (
      <View style={styles.View} >
          <TouchableHighlight style={[styles.Viewnum,{backgroundColor:'#299'}]} onPress={onSign}>
          <Text> Logar </Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.Viewnum,{backgroundColor:'#299'}]} onPress={onCriar}>
          <Text> criar </Text>
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
 
 
 
