

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
    const [usersNewConnec2, setusersNewConnec2] = useState([]); // Initial empty array of users
    const [usersNewConnec, setusersNewConnec] = useState([]); // Initial empty array of users
    const [search, setsearch] = useState(''); // Initial empty array of users
    const [connection, setconnection] = useState(false); // Initial empty array of users
    const scrollEnd = useRef()
    const [naoDuplicar, setnaoDuplicar] = useState(true); // Initial empty array of users
    const [seguir, setseguir] = useState(0); // Initial empty array of users
    const [timeoutExed, settimeoutExed] = useState(0); // Initial empty array of users
    
    useEffect(() => {

      if (connection && (usersNew.length>0 || usersNewConnec.length>0)) {
          console.log(usersNew)
          console.log(usersNewConnec)

          if (usersNew.length>0 && usersNewConnec.length>0) {
            if (usersNew[0].date <= usersNewConnec[0].date) {
              onPostLike(usersNew[0].id)
              .then(() => { console.log('Post likes incremented via a transaction')
                setusersNew(usersNew.slice(1,usersNew.length))
                setseguir(seguir+1)
                settimeoutExed(0)
              }).catch(error => console.log(error));
            } else if (usersNew[0].date >= usersNewConnec[0].date) {
              onPostLike(usersNewConnec[0].id)
              .then(() => { console.log('Post likes incremented via a transaction2')
                setusersNewConnec(usersNewConnec.slice(1,usersNewConnec.length))
                setseguir(seguir+1)
                settimeoutExed(0)
              }).catch(error => console.log(error));
            }
          } else if (usersNew.length>0 && usersNewConnec.length==0) {
            onPostLike(usersNew[0].id)
            .then(() => { console.log('Post likes incremented via a transaction')
              setusersNew(usersNew.slice(1,usersNew.length))
              setseguir(seguir+1)
              settimeoutExed(0)
            }).catch(error => console.log(error));
          } else if (usersNew.length==0 && usersNewConnec.length>0) {
            onPostLike(usersNewConnec[0].id)
            .then(() => { console.log('Post likes incremented via a transaction2')
              setusersNewConnec(usersNewConnec.slice(1,usersNewConnec.length))
              setseguir(seguir+1)
              settimeoutExed(0)
            }).catch(error => console.log(error));
          }
      }   
      
    }, [seguir])
    
    
    
    function searchUpdated(term) {
      setsearch(term);
    }

    function upload() {
      console.log(usersNew)
      console.log(usersNewConnec)

    }

    function onPostLike(postId) {
      const userReference = firestore().collection('ListaTTT').doc(postId);
      const DATE = new Date() - 0;
      const TIME = moment().format('hh[:]mm');

      return firestore().runTransaction(async transaction => {

        const postSnapshot = await transaction.get(userReference);
        
        if (!postSnapshot.exists) {
          if (timeoutExed < 10) {
            settimeoutExed(timeoutExed+1)
            throw setTimeout(() => {onFor(),console.log('post not Found')}, 2000);
          } else {
            settimeoutExed(0)
            throw 'Tentativas exedidas';          }
        }

        await transaction.update(userReference, {
          enviada: true,
          time:TIME,
          date:DATE
          });
        })
        
    } 

    const onFor = () => {
      if (connection && (usersNew.length>0 || usersNewConnec.length>0)) {
        console.log(usersNew)
        console.log(usersNewConnec)

        if (usersNew.length>0 && usersNewConnec.length>0) {
          if (usersNew[0].date <= usersNewConnec[0].date) {
            onPostLike(usersNew[0].id)
            .then(() => { console.log('Post likes incremented via a transaction')
              setusersNew(usersNew.slice(1,usersNew.length))
              setseguir(seguir+1)
              settimeoutExed(0)
            }).catch(error => console.log(error));
          } else if (usersNew[0].date >= usersNewConnec[0].date) {
            onPostLike(usersNewConnec[0].id)
            .then(() => { console.log('Post likes incremented via a transaction2')
              setusersNewConnec(usersNewConnec.slice(1,usersNewConnec.length))
              setseguir(seguir+1)
              settimeoutExed(0)
            }).catch(error => console.log(error));
          }
        } else if (usersNew.length>0 && usersNewConnec.length==0) {
          onPostLike(usersNew[0].id)
          .then(() => { console.log('Post likes incremented via a transaction')
            setusersNew(usersNew.slice(1,usersNew.length))
            setseguir(seguir+1)
            settimeoutExed(0)
          }).catch(error => console.log(error));
        } else if (usersNew.length==0 && usersNewConnec.length>0) {
          onPostLike(usersNewConnec[0].id)
          .then(() => { console.log('Post likes incremented via a transaction2')
            setusersNewConnec(usersNewConnec.slice(1,usersNewConnec.length))
            setseguir(seguir+1)
            settimeoutExed(0)
          }).catch(error => console.log(error));
        }
      }
    } 


    
    AddUserIdQulaquer = async (connect) => { 

      const DATE = new Date() - 0;
      const TIME = moment().format('hh[:]mm');
      const TIMES = moment().format('hh[:]mm[:]ss');
      const UUID = `${moment().format()}-${Math.round(Math.random()*100000)}`
      const userN = [...usersNew];
      const userNConnec = [...usersNewConnec];

      if (connect === false /* || usersNew.length>0 || usersNewConnec.length>0 */) {

        if (userN.length>0 && userNConnec.length>0) {

          if (userN[0].date <= userNConnec[0].date) {
            userNConnec.push({id: UUID, date:DATE});
            setusersNewConnec(userNConnec);
          } else if (userN[0].date > userNConnec[0].date) {
            userN.push({id: UUID, date:DATE});
            setusersNew(userN);
          }

        } else if (userN.length>0) {
          userN.push({id: UUID, date:DATE});
          setusersNew(userN);
        } else if (usersNewConnec.length>0) {
          userNConnec.push({id: UUID, date:DATE});
          setusersNewConnec(userNConnec);
        } else {
          userN.push({id: UUID, date:DATE});
          setusersNew(userN);
        }

      } else if (connect && (usersNew.length>0 || usersNewConnec.length>0) ) {
        console.log('userNConnec2')
        if (userN.length>0 && userNConnec.length>0) {

          if (userN[0].date <= userNConnec[0].date) {
            userNConnec.push({id: UUID, date:DATE});
            setusersNewConnec(userNConnec);
          } else if (userN[0].date > userNConnec[0].date) {
            userN.push({id: UUID, date:DATE});
            setusersNew(userN);
          }

        } else if (userN.length>0) {
          console.log('userNConnec')
          userNConnec.push({id: UUID, date:DATE});
          setusersNewConnec(userNConnec);
        } else if (usersNewConnec.length>0) {
          userN.push({id: UUID, date:DATE});
          setusersNew(userN);
        } 

      } else if (connect) {
        userN.push({id: UUID, date:DATE});
        setusersNew(userN);
      }
/*       if (connect && usersNew.length==0 && usersNewConnec.length==0) {setseguir(seguir+1)} */
      await firestore()
      .collection('ListaTTT').doc(UUID).set({
        item: `${TIMES}`,
        date: DATE,
        dateSent: DATE,
        time:`${TIME}`,
        enviada: false
      }).then(console.log('doc UUID'), (connect && usersNew.length==0 && usersNewConnec.length==0) ? setseguir(seguir+1):console.log('await for other mens'))
        .catch(err=>console.log(err))

    }


    AddMessageNet = async (connect) => { 

      if (naoDuplicar) {
        setnaoDuplicar(false)
        setTimeout(() => {
          setnaoDuplicar(true)
        }, 300);

        if (connect && (usersNew.length>0 || usersNewConnec.length>0)) {
          onFor()
        }
      }  
    }



    useEffect(() => {

      const unsubscribe = NetInfo.addEventListener(state => {
        setconnection(state.isConnected);
        AddMessageNet(state.isConnected)
        console.log('net',state.isConnected)
      });

      const subscriber = firestore()
        .collection('ListaTTT').orderBy('date', 'desc')
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
      var nameA = a.enviada // ignore upper and lowercase
      var nameB = b.enviada// ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 0;
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
 
 
 
