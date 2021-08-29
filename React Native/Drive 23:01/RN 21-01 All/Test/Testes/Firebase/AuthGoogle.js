

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


 
 
 export default () => {
 

  const [initializing, setInitializing] = useState(true);
  const [users, setUsers] = useState();


  async function onGoogleButtonPress() {


    try {

      await GoogleSignin.hasPlayServices();
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error=='[Error: NETWORK_ERROR]' ) {console.log('nao funciona ainda esse erro')} else{console.log(error)}
    }
    }

  const onSignOut = () => {

    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
    
    signOut = async () => {
      try {
        await GoogleSignin.revokeAccess();
      } catch (error) {
        console.error(error);
      }
    };

    signOut()

}


//pega dados do user
const getCurrentUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser();
  console.log(currentUser.user.id)
/*   console.log(currentUser ); */
};



  function LoginApp() {
    // Set an initializing state whilst Firebase connects
  
    // Handle user state changes
    function onAuthStateChanged(users) {
      setUsers(users);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
/*         console.log(users) */
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  



    if (initializing) return null;

    if (users) {
      return (
        <View style={styles.View} >
         <TouchableHighlight style={styles.Viewnum} onPress={onSignOut}>
         <Text> Logout </Text>
         </TouchableHighlight>
      </View>
      );
    }
  
    return (
      <View style={styles.View} >
          <TouchableHighlight style={[styles.Viewnum,{backgroundColor:'#299'}]} onPress={onGoogleButtonPress}>
          <Text> Logar </Text>
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
 
 
 
