

 import React, { useEffect, useState, useRef } from 'react';
 import { Dimensions, View, Text, StyleSheet, FlatList, TouchableHighlight, TextInput, ActivityIndicator } from 'react-native';
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
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');
import NetInfo from "@react-native-community/netinfo";


 export default () => {

  function LoginApp() {
  
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users
    const [usersNew, setusersNew] = useState([]); // Initial empty array of users
    const [search, setsearch] = useState(''); // Initial empty array of users
    const [connection, setconnection] = useState(false); // Initial empty array of users
    const scrollEnd = useRef()
    const [naoDuplicar, setnaoDuplicar] = useState(true); // Initial empty array of users
    function searchUpdated(term) {
      setsearch(term);
    }

    function upload() {
console.log(usersNew)
    }

    
    AddUserIdQulaquer = async (connect) => { 

      const DATE = new Date() - 0;
      const TIME = moment().format('hh[:]mm');
      const UUID = `${moment().format()}-${Math.round(Math.random()*100000)}`

        if (connect === false) {
          const userN = [...usersNew];
          userN.push(UUID);
          setusersNew(userN);
        }
/*         const UID = `z${moment().format()}-${Math.round(Math.random()*1000)}`; */
          /*         createdAt: firestore.FieldValue.serverTimestamp(), */
        await firestore()
        .collection('ListaTTT').doc(UUID).set({
          item: 'ItemName',
          date: DATE,
          time:`${TIME}`,
          enviada: connect ? true : false
        }).then(console.log('doc UUID')).catch(err=>console.log(err))
        /*   console.log(new Date(1606412584790)) */
/*         console.log(moment(new Date(1604269011563)).fromNow())
        console.log(UIDdate) */


// Create a reference to the post
/* const userReference = firestore().collection('ListaTTT').doc();
const DATE = new Date() - 0;
const TIME = moment().format('hh[:]mm');
return firestore().runTransaction(async transaction => {
  // Get post data first
  await transaction.set(userReference, {
    item: 'ItemName',
    date: DATE,
    time:`${TIME}`,
    enviada: true
    });
  }).catch(()=>{
    const user = [...users];
    const userN = [...usersNew];
    user.push({
      item: 'ItemName',
      date: DATE,
      time:`${TIME}`,
      key: `${moment().format()}-${Math.round(Math.random()*1000)}`,
      enviada: false
    });
    userN.push({
      item: 'ItemName',
      date: DATE,
      time:`${TIME}`,
      key: `${moment().format()}-${Math.round(Math.random()*1000)}`,
      enviada: false
    });

    setUsers(user);
    setusersNew(userN);
  }); */



    }


    AddMessageNet = async (connect) => { 

      if (naoDuplicar) {
        setnaoDuplicar(false)
        setTimeout(() => {
          setnaoDuplicar(true)
        }, 300);

        if (connect && usersNew.length>0) {

          console.log(1)
          function onPostLike(postId) {
            const userReference = firestore().collection('ListaTTT').doc(postId);
            const DATE = new Date() - 0;
            const TIME = moment().format('hh[:]mm');

            return firestore().runTransaction(async transaction => {

              const postSnapshot = await transaction.get(userReference);

              if (!postSnapshot.exists) {
                throw setTimeout(() => {onFor()}, 2000);
              }

              await transaction.update(userReference, {
                enviada: true,
                });
              })
              
          } 

          const onFor = () => {

            onPostLike(usersNew[0])
            .then(() => {
              console.log('Post likes incremented via a transaction')
              onForAll()
            }
            )
            .catch(error => console.log(error));
          
          } 

          var c = []
          const onForAll = ()=> usersNew.forEach(function(item,index) {
            if (connect) {

              if (index == 0 ) {return null} else {
                
                onPostLike(usersNew[index])
                .then(() => {
                  c.push(index)
                  console.log('Post likes incremented via a transaction', index, c)
                  
                }
                )
                .catch(err => console.log(err));
              }

            }


          } )

          onFor()
        }
      }  
    }

/*     function reff() {
      scrollEnd.current.scrollToEnd([{animated: false}])
    } */

/*     useEffect(() => {
      console.log(users.length)
      setTimeout(() => {
        if (users.length != 0 ) {scrollEnd.current.scrollToEnd({animated: false})}
      }, 1000);

    }, [users]) */


    useEffect(() => {

      const unsubscribe = NetInfo.addEventListener(state => {
        setconnection(state.isConnected);
        AddMessageNet(state.isConnected)
        console.log('net',state.isConnected)
      });

      const subscriber = firestore()
        .collection('ListaTTT').orderBy('item', 'desc')
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
      return () => {
        unsubscribe();
        subscriber()}
    }, []);

    function compare(a, b) {
      var nameA = a.item // ignore upper and lowercase
      var nameB = b.item// ignore upper and lowercase
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
    
      // names must be equal
      return 0;
    }


    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }


    const filteredEmails = users.filter(createFilter(search, KEYS_TO_FILTERS))

   return(
        <View style={styles.View} >
          <FlatList
            data={filteredEmails/* .sort(compare) */}
            ref={scrollEnd}
            inverted={true}
            style={styles.Pastas_FlatList}
            renderItem={({ item }) => (
              <View style={{ height: 100, flex: 1, alignItems: 'center', justifyContent: 'center',width:'100%' }}>
{/*                 <Text>User ID: {item.key}</Text> */}
                <Text>User item: {item.item}</Text>
                <Text>User date: {item.date}</Text>
                <Text>User time: {item.time}</Text>
                <Text>{item.enviada ? 'true': 'false'}</Text>
              </View>
            )}
          />
          
          <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
          
            <TextInput 
                placeholder="Search for..."
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => searchUpdated(val) }
            />

            <TouchableHighlight style={styles.Viewnum} onPress={()=>AddUserIdQulaquer(connection)}>
              <Text> enviar </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.Viewnum} onPress={()=>upload(connection)}>
              <Text> Test </Text>
            </TouchableHighlight>

            </View>

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
    width: 50,
    height: 60,
    backgroundColor: '#262'
  },
  textInput: {
    paddingLeft: 10,
    color: '#01402E',
    borderWidth: 1,
    width:300,
    height:60, 
    marginRight:10,
},

 });
 
 
 
