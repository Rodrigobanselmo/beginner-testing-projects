

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
import SearchInput, { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['disponivel', 'item'];

 export default () => {

  function LoginApp() {
  
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users
    const [text, settext] = useState(''); // Initial empty array of users
    const [search, setsearch] = useState(''); // Initial empty array of users
    const [filter, setfilter] = useState(0); // Initial empty array of users

    function searchUpdated(term) {
      setsearch(term);
    }


    useEffect(() => {
      const subscriber = firestore()
        .collection('Lista')
        .onSnapshot(querySnapshot => {
          const users = [];
          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
    
          setUsers(users);
          setLoading(false);
        });
  
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []);


    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const filteredEmails = users.filter(createFilter(search, KEYS_TO_FILTERS))

   return(
        <View style={styles.View} >
{/*           <TouchableHighlight style={styles.Viewnum} onPress={() => setfilter(2)}>
            <Text> filter </Text>
          </TouchableHighlight> */}
          <TextInput 
                placeholder="Search for..."
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => searchUpdated(val) }
            />
          <FlatList
            data={filteredEmails}
            style={styles.Pastas_FlatList}
            renderItem={({ item }) => (
              <View style={{ height: 70, flex: 1, alignItems: 'center', justifyContent: 'center',width:'100%' }}>
                <Text>User ID: {item.key}</Text>
                <Text>User Name: {item.item}</Text>
                <Text>User Name: {item.disponivel}</Text>
              </View>
            )}
          />
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
    marginTop: Platform.OS === 'ios' ? 0 : 12,
    paddingLeft: 10,
    color: '#01402E',
    margin: 50,
    borderWidth: 1,
    width:'90%',
},

 });
 
 
 
