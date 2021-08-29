

 import React, { useEffect, useState, useRef } from 'react';
 import { Dimensions, View, SafeAreaView, Text, StyleSheet, FlatList, TouchableHighlight, TextInput, Image } from 'react-native';
 import firebase from '@react-native-firebase/app';
 import auth from '@react-native-firebase/auth';
 import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
 import {Avatar} from 'react-native-paper';
 GoogleSignin.configure({
  webClientId: '421575662522-t3v3orphfq9o4aoo45b4jedits29uvfk.apps.googleusercontent.com',
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
});
 
 ////
 
 initialstate={teste: 1, teste2: 2}
 
 
 export default () => {
 

  const [state, setstate] = useState(0)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [dados, setDados] = useState('')
  const [initializing, setInitializing] = useState(true);
  const [users, setUsers] = useState();


  async function onGoogleButtonPress() {

    await GoogleSignin.hasPlayServices();
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
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

const getCurrentUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser();
  console.log(currentUser );
};
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
  
    if (users) {
      return (
        <View style={styles.View} >
          <Image
            source={{ uri: users.photoURL }}
            style={{ width: 40, height: 40 }}
          />
         <TouchableHighlight style={styles.Viewnum} delayLongPress={500} onLongPress={() => setDados(`Sua chave de dados ${Math.random()}`)} onPress={()=>alert(dados)}>
         <Text> {state} </Text>
         </TouchableHighlight>
         <TouchableHighlight style={styles.Viewnum} onPress={()=>setstate(state+1)}>
         <Text> +1 </Text>
         </TouchableHighlight>
         <TouchableHighlight style={styles.Viewnum} onPress={getCurrentUser}>
         <Text> -1 </Text>
         </TouchableHighlight>
         <TouchableHighlight style={styles.Viewnum} onPress={onSignOut}>
         <Text> Logout </Text>
         </TouchableHighlight>
         <TextInput 
         placeholder="Your Dados"
         style={styles.textInput}
         autoCapitalize="none"
         value={dados}
         onChangeText={(val) => setDados(val)}
         multiline={true}
         numberOfLines={2}
         textAlignVertical='top'
         /> 
      </View>
      );
    }
  
    return (
      <View style={styles.View} >
          <TextInput 
          placeholder="Your Username"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => setEmail(val)}
          />
          <TextInput 
          placeholder="Your Password"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => setSenha(val)}
          /> 
          <TouchableHighlight style={styles.Viewnum} onPress={onGoogleButtonPress}>
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
 
 
 
