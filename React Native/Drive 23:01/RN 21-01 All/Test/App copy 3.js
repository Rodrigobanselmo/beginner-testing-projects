

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
    
    useEffect(() => {

      if (connection && (usersNew.length>0 || usersNewConnec.length>0)) {
          console.log(usersNew)
          console.log(usersNewConnec)
          onPostLike(usersNew.length!=0 ? usersNew[0] :  usersNewConnec[0])
          .then(() => {
            console.log('Post likes incremented via a transaction')
            if (usersNew.length!=0) {
              setusersNew(usersNew.slice(1,usersNew.length))
            } else {
              setusersNewConnec(usersNewConnec.slice(1,usersNewConnec.length))
            }
            setseguir(seguir+1)
          })
          .catch(error => console.log(error));
        
      }   
      
    }, [seguir])
    
    
    
    function searchUpdated(term) {
      setsearch(term);
    }

    function upload() {
console.log(usersNew)
    }

    function onPostLike(postId) {
      const userReference = firestore().collection('ListaTTT').doc(postId);
      const DATE = new Date() - 0;
      const TIME = moment().format('hh[:]mm');

      return firestore().runTransaction(async transaction => {

        const postSnapshot = await transaction.get(userReference);

        if (!postSnapshot.exists) {
          throw setTimeout(() => {onFor(),console.log('post not Found')}, 2000);
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
        onPostLike(usersNew.length!=0 ? usersNew[0] :  usersNewConnec[0])
        .then(() => {
          console.log('Post likes incremented via a transaction')
          if (usersNew.length!=0) {
            setusersNew(usersNew.slice(1,usersNew.length))
          } else {
            setusersNewConnec(usersNewConnec.slice(1,usersNewConnec.length))
          }
          setseguir(seguir+1)
        })
        .catch(error => console.log(error));
        }
    } 


    
    AddUserIdQulaquer = async (connect) => { 

      const DATE = new Date() - 0;
      const TIME = moment().format('hh[:]mm');
      const UUID = `${moment().format()}-${Math.round(Math.random()*100000)}`

        if (connect === false) {
          const userN = [...usersNew];
          userN.push({id: UUID, date:DATE});
          setusersNew(userN);
        }

        if (connect || usersNew.length>0) {
          const userN = [...usersNewConnec];
          userN.push(UUID);
          setusersNewConnec(userN);
        }

        await firestore()
        .collection('ListaTTT').doc(UUID).set({
          item: 'ItemName',
          date: DATE,
          time:`${TIME}`,
          enviada: connect && usersNew.length==0 && usersNewConnec.length==0? true : false
        }).then(console.log('doc UUID')).catch(err=>console.log(err))

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
import { useSelector, useDispatch } from 'react-redux';

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
    const [seguir, setseguir] = useState([[],[],[]]); // Initial empty array of users
    const [lastDateUpdade, setlastDateUpdade] = useState(0); // Initial empty array of users
    const [dateFromCache, setdateFromCache] = useState(true);
    const [datePending, setdatePending] = useState(true);
    
    const messagesAll = useSelector(state => state.messages[0].messages);
    const dispatch = useDispatch();

/*     var indexGruop = messagesAll.findIndex(i=>i.groupID=='123');
    const messagesIndex =  messagesAll[indexGruop].messages */


    var userReaload = [...messagesAll];
    
    function onMessegeEdit(seguir) {
       
  
      if (seguir[0].length > 0) {
        userReaload.push(...seguir[0]);
      }
  
      if (seguir[1].length > 0) {
        var index = 0
        seguir[1].forEach((item)=>{
          index = userReaload.findIndex(i=>i.key==item.key)
          if(index > -1) {
            userReaload[index] = item
          }
        });
      }
      
      if (seguir[2].length > 0) {
        seguir[2].forEach((item)=>{
          userReaload = userReaload.filter(i=>i.key!=item.key);
        })
      }
  
      if (!(seguir[0].length == 0 && seguir[1].length ==0 && seguir[2].length==0)) {
        setseguir([[],[],[]]);
        dispatch({
          type: 'ADD_MESSEGE',
          payload: userReaload
        });    
      }
    }

      

 

    
    function onMessegeFirebase(source,pending,date) {
      if (!source && !pending){
        setlastDateUpdade(date)
      }
    }


    
    
    function onsetUsersAdd(user) {

    }

    /*       console.log(moment().format('YYYY.MM.DD-HH:mm:ss'))
          console.log(new Date())
          console.log(new Date()-1000*60*60*24)
    
          console.log(new Date(new Date()-1000*60*60*24)) */


    function upload() {
      dispatch({
        type: 'DELETE_ALL',
    }); 

    }


    AddUserIdQulaquer = async (connect) => { 

      const DATE = new Date() - 0;
      const TIME = moment().format('h[:]mm');
      const TIMES = moment().format('h[:]mm[:]ss');
      const UUID = `${moment().format('YYYY.MM.DD-HH:mm:ss')}-${Math.round(Math.random()*1000000)}`
      const userN = [...usersNew];
      const userNConnec = [...usersNewConnec];


/*       if (!dateFromCache) { */
        await firestore()
        .collection('ListaTTT').doc(UUID).set({
          item: `${TIMES}`,
          date: DATE,
          dateSent: DATE,
          time:`${TIME}`,
        }).then(console.log('doc UUID'))
          .catch(err=>console.log(err))
/*       } */

    }




    useEffect(() => {

      const subscriber = firestore()
        .collection('ListaTTT').where('date', '>=', lastDateUpdade <= new Date()-1000*60*60*24 ? lastDateUpdade : new Date()-1000*60*60*24).orderBy('date', 'asc')
        .onSnapshot({ includeMetadataChanges: true },querySnapshot => {
          const user = [[],[],[]];
          querySnapshot.docChanges().forEach(documentSnapshot => {
            if (documentSnapshot.type === 'added') {
              if(documentSnapshot.doc.data().date > lastDateUpdade) {                
                user[0].push({
                  ...documentSnapshot.doc.data(),
                  key: documentSnapshot._nativeData.doc.path,
                });
              }
            }
            if (documentSnapshot.type === "modified") {
              user[1].push({
                ...documentSnapshot.doc.data(),
                key: documentSnapshot._nativeData.doc.path,
              });
            }
            if (documentSnapshot.type === `removed`) {
/*               console.log(documentSnapshot.doc.data()) */
              user[2].push({
                ...documentSnapshot.doc.data(),
                key: documentSnapshot._nativeData.doc.path,
              });
            }
          });
          
          var source = querySnapshot.metadata.fromCache ? true : false;
          console.log("Date from cache: " + source);

          var pending = querySnapshot.metadata.hasPendingWrites ? true : false;
          console.log("Data is pending: " + pending);


          if (!(user[0].length == 0 && user[1].length ==0 && user[2].length==0)) {
            onMessegeEdit(user);
            if (!(user[0].length == 0)) {
              onMessegeFirebase(source,pending,user[0][user[0].length-1].date)
            }
          }

          
          setdateFromCache(source)
          setdatePending(pending)
          setLoading(false);
        });
  
      // Unsubscribe from events when no longer in use
      return () => {
        subscriber()}
    }, []);

    function compare(a, b) {
      var nameA = a.date // ignore upper and lowercase
      var nameB = b.date// ignore upper and lowercase
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


    const filteredEmails = messagesAll.filter(createFilter(search, KEYS_TO_FILTERS))

   return(
        <View style={styles.View} >
          <FlatList
            data={filteredEmails.sort(compare)}
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
import { useSelector, useDispatch } from 'react-redux';

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
    const [seguir, setseguir] = useState([[],[],[],[]]); // Initial empty array of users
    const [flatlistView, setflatlistView] = useState([]); // Initial empty array of users
    const [dateFromCache, setdateFromCache] = useState(true);
    const [datePending, setdatePending] = useState(true);
    
    const chat = useSelector(state => state.messages[state.messages.findIndex(i=>i.groupID=='123')]);
    const dispatch = useDispatch();

/*     console.log(messagesAll) */
/*     var indexGruop = messagesAll.findIndex(i=>i.groupID=='123');
    const messagesIndex =  messagesAll[indexGruop].messages */
/*     dispatch({
      type: 'DELETE_ALL',
  });  */

    useEffect(() => {
      setflatlistView(chat.messages)
    }, [chat.messages])

    useEffect(() => {  

      var userReaload = [...chat.messages];
      var lastUpdate = chat.lastUpdate

      if (seguir[0].length > 0) {
        console.log(seguir)
        userReaload.push(...seguir[0]);
      }
  
      if (seguir[1].length > 0) {
        var index = 0
        seguir[1].forEach((item)=>{
          index = userReaload.findIndex(i=>i.key==item.key)
          if(index > -1) {
            userReaload[index] = item
          }
        });
      }
      
      if (seguir[2].length > 0) {
        seguir[2].forEach((item)=>{
          userReaload = userReaload.filter(i=>i.key!=item.key);
        })
      }

  
      if (!(seguir[0].length == 0 && seguir[1].length ==0 && seguir[2].length==0)) { //se pelo menos alguma coisa foi feita modify/add/remove segue
        if (!seguir[3][0] && !seguir[3][1] ) { //se esta vindo do server e nada pendente
          if (userReaload.sort(compare)[0]?.date) {
            lastUpdate = userReaload.sort(compare)[0].date //pega maior data e atualiza lastUpdateView 
          }
          console.log('userReload add server')
          dispatch({
            type: 'ADD_MESSEGE',
            payload: {userReaload,lastUpdate}
          });    

        } else if (seguir[3][0] || seguir[3][1]) {
          console.log('userReload add cash')
          dispatch({
            type: 'ADD_MESSEGE',
            payload: {userReaload,lastUpdate}
          });   
        }

      } else if(!seguir[3][0] && !seguir[3][1] && userReaload[0] != undefined) { //se nada foi feito e esta vindo do server e nada pendente
        if (userReaload.sort(compare)[0]?.date) {
          lastUpdate = userReaload.sort(compare)[0].date
        }
        dispatch({
          type: 'ADD_MESSEGE',
          payload: {userReaload,lastUpdate}
        });   
      }
    }, [seguir]);

    




/*     useEffect(() => {
console.log(1)
    }, [chat]) */


    
    
    function onsetUsersAdd(user) {

    }

    /*       console.log(moment().format('YYYY.MM.DD-HH:mm:ss'))
          console.log(new Date())
          console.log(new Date()-1000*60*60*24)
    
          console.log(new Date(new Date()-1000*60*60*24)) */


    function upload() {
      dispatch({
        type: 'DELETE_ALL',
    }); 

    }


    function upload2() {
var x = [{date:1},{date:2},{date:0},{date:10},{date:60},{date:4}]
var xx = x.sort(compare)[0] 
/* console.log(flatlistView) */
console.log(chat)
    }


    AddUserIdQulaquer = async (connect) => { 

      const DATE = new Date() - 0;
      const TIME = moment().format('h[:]mm');
      const TIMES = moment().format('h[:]mm[:]ss');
      const UUID = `${moment().format('YYYY.MM.DD-HH:mm:ss')}-${Math.round(Math.random()*1000000)}`
      const userN = [...usersNew];
      const userNConnec = [...usersNewConnec];


      if (!dateFromCache && !datePending) {
        await firestore()
        .collection('ListaTTT').doc(UUID).set({
          item: `${TIMES}`,
          date: datePending || dateFromCache ? chat.lastUpdate : DATE,   //aqui ta errado pq quando faz isso muda ordem, a ideia agora [e nao colocar aqui e mudar pra outro usestate]
          dateSent: DATE,
          time:`${TIME}`,
        }).then(console.log('doc UUID'))
          .catch(err=>console.log(err))
      } else {

      }

    }




    useEffect(() => {

      const subscriber = firestore()
        .collection('ListaTTT').where('date', '>=', chat.lastUpdate <= new Date()-1000*60*60*24 ? chat.lastUpdate : new Date()-1000*60*60*24).orderBy('date', 'asc')
        .onSnapshot({ includeMetadataChanges: true },querySnapshot => {
          const user = [[],[],[],[]];
          querySnapshot.docChanges().forEach(documentSnapshot => {
            if (documentSnapshot.type === 'added') {
              if(documentSnapshot.doc.data().date > chat.lastUpdate) {        //para datas mais recentes que a ultima chat.lastupdate ele segue 
      
                user[0].push({
                  ...documentSnapshot.doc.data(),
                  key: documentSnapshot._nativeData.doc.path,
                });
              }
            }
            if (documentSnapshot.type === "modified") {
              user[1].push({
                ...documentSnapshot.doc.data(),
                key: documentSnapshot._nativeData.doc.path,
              });
            }
            if (documentSnapshot.type === `removed`) {
/*               console.log(documentSnapshot.doc.data()) */
              user[2].push({
                ...documentSnapshot.doc.data(),
                key: documentSnapshot._nativeData.doc.path,
              });
            }
          });
          
          var source = querySnapshot.metadata.fromCache ? true : false;
/*           console.log("Date from cache: " + source); */

          var pending = querySnapshot.metadata.hasPendingWrites ? true : false;
/*           console.log("Data is pending: " + pending); */

          user[3].push(source,pending);

/*           if (!(user[0].length == 0 && user[1].length ==0 && user[2].length==0)) { */  //se pelo menos uma ação de add/modify/remove for feita roda em baixo 
/*             onMessegeEdit(user,source,pending); */
/*           } */
          console.log('user Snapshot: ',user )
          setseguir(user)
          setdateFromCache(source)
          setdatePending(pending)
          setLoading(false);
        });
  
      // Unsubscribe from events when no longer in use
      return () => {
        subscriber()}
    }, []);

    function compare(a, b) {
      var nameA = a.date // ignore upper and lowercase
      var nameB = b.date// ignore upper and lowercase
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


    const filteredEmails = flatlistView.filter(createFilter(search, KEYS_TO_FILTERS))
   /*  const filteredEmails = chat.messages.filter(createFilter(search, KEYS_TO_FILTERS))
 */
   return(
        <View style={styles.View} >
          <FlatList
            data={filteredEmails.sort(compare)}
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
          <TouchableHighlight style={styles.Viewnum} onPress={()=>upload2(connection)}>
              <Text> reset </Text>
            </TouchableHighlight>
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
    width:200,
    height:60, 
    marginRight:10,
},

 });
 
 
 



























































