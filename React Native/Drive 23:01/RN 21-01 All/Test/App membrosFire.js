

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
    const [flatlistView, setflatlistView] = useState([]); // Initial empty array of users
    const [pendingMessages, setpendingMessages] = useState([]); // Initial empty array of users
    const [dateFromCache, setdateFromCache] = useState(true);
    const [datePending, setdatePending] = useState(true);
    const [membrosAdd, setmembrosAdd] = useState([]); // Initial empty array of users

    const chat = useSelector(state => state.messages[state.messages.findIndex(i=>i.groupID=='123')]);
    const dispatch = useDispatch();

/*     dispatch({
      type: 'DELETE_ALL',
  });  */

    var userReaload = [...chat.messages];
    var MembrosReaload = [];
    var lastUpdate = chat.lastUpdate


    function onMessegeEdit(seguir,source,pending) {
       
      let DATA_ATUAL = new Date()-0;

      if (seguir[0].length > 0) {
        if (!source && pending){
          setpendingMessages([...pendingMessages, ...seguir[0]])
        }
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
        if (!source && !pending ) { //se esta vindo do server e nada pendente

          pendingMessages.forEach((item)=>{
            if (item.date < DATA_ATUAL-999) {} else {

            }
          })

          if (userReaload.sort(compare)[0]?.date) {
            lastUpdate = userReaload.sort(compare)[0].date //pega maior data e atualiza lastUpdateView 
          }
          console.log('userReload add server')
          dispatch({
            type: 'ADD_MESSEGE',
            payload: {userReaload,lastUpdate}
          });    

        } else if (source || pending) {
          console.log('userReload add cash')
          dispatch({
            type: 'ADD_MESSEGE',
            payload: {userReaload,lastUpdate}
          });   
        }

      } else if(!source && !pending && userReaload[0] != undefined) {
          lastUpdate = DATA_ATUAL
        dispatch({
          type: 'ADD_MESSEGE',
          payload: {userReaload,lastUpdate}
        });   
      }
    }

    
    function onAddMembers(membros) {

      if (membros[0].length > 0) {
        MembrosReaload.push(...membros[0]);
      }
  
      if (membros[1].length > 0) {
        var index = 0
        membros[1].forEach((item)=>{
          index = MembrosReaload.findIndex(i=>i.key==item.key)
          if(index > -1) {
            MembrosReaload[index] = item
          }
        });
      }
      
      if (membros[2].length > 0) {
        membros[2].forEach((item)=>{
          MembrosReaload = MembrosReaload.filter(i=>i.key!=item.key);
        })
      }

  
      if (!(membros[0].length == 0 && membros[1].length ==0 && membros[2].length==0)) { //se pelo menos alguma coisa foi feita modify/add/remove segue
/*           dispatch({
            type: 'ADD_MEMBER',
            payload: MembrosReaload
          });     */
          setmembrosAdd(MembrosReaload)
      }
    }
    
    function onsetUsersAdd(user) {
      /*       console.log(moment().format('YYYY.MM.DD-HH:mm:ss'))
            console.log(new Date())
            console.log(new Date()-1000*60*60*24)
      
            console.log(new Date(new Date()-1000*60*60*24)) */

    }

    function upload() {
      dispatch({
        type: 'DELETE_ALL',
    }); 

    }

    function upload2() {
console.log(membrosAdd)
console.log(chat)
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
        .collection('chats').doc('chatTest').collection('menssagens').doc(UUID).set({
          name: 'Rodrigo',
          item: `${TIMES}`,
          date: DATE,   
          dateSent: DATE,
          time:`${TIME}`,
          enviado: !datePending && !dateFromCache ? true : false
        }).then(console.log('doc UUID'))
          .catch(err=>console.log(err))
/*       } */
        AddLastView()

    }


    AddLastView = async () => { 

      const DATE = new Date() - 0;

        await firestore()
        .collection('chats').doc('chatTest').collection('membros').doc('Rodrigo').update({
          lastView: DATE
        }).then(console.log('doc lastView'))
          .catch(err=>console.log(err))
    }



    useEffect(() => {

      const subscriber = firestore()
        .collection('chats').doc('chatTest').collection('menssagens').where('date', '>=', chat.lastUpdate <= new Date()-1000*60*60*24 ? chat.lastUpdate : new Date()-1000*60*60*24).orderBy('date', 'asc')
        .onSnapshot({ includeMetadataChanges: true },querySnapshot => {
          const user = [[],[],[]];
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

          console.log('user Snapshot: ',user )
/*           if (!(user[0].length == 0 && user[1].length ==0 && user[2].length==0)) { */  //se pelo menos uma ação de add/modify/remove for feita roda em baixo 
     
  /*           } */
          onMessegeEdit(user,source,pending);
          setdateFromCache(source)
          setdatePending(pending)
          setLoading(false);
        });

        const subscriberMembros = firestore()
        .collection('chats').doc('chatTest').collection('membros')
        .onSnapshot({ includeMetadataChanges: true },querySnapshot => {
          const membros = [[],[],[]];
          querySnapshot.docChanges().forEach(documentSnapshot => {
            if (documentSnapshot.type === 'added') {
              membros[0].push({
                  ...documentSnapshot.doc.data(),
                  key: documentSnapshot._nativeData.doc.path,
                });
            }
            if (documentSnapshot.type === "modified") {
              membros[1].push({
                ...documentSnapshot.doc.data(),
                key: documentSnapshot._nativeData.doc.path,
              });
            }
            if (documentSnapshot.type === `removed`) {
/*               console.log(documentSnapshot.doc.data()) */
              membros[2].push({
                ...documentSnapshot.doc.data(),
                key: documentSnapshot._nativeData.doc.path,
              });
            } 
          });
          onAddMembers(membros);
        });
  
      // Unsubscribe from events when no longer in use
      return () => {
        subscriber()
        subscriberMembros()}
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


    const filteredEmails = chat.messages.filter(createFilter(search, KEYS_TO_FILTERS))

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
                <Text>User item: {item.name}</Text>
                <Text>User date: {item.date}</Text>
                <Text>User time: {item.time}</Text>
                <Text>{ membrosAdd[membrosAdd.findIndex(i=>i.key == `chats/${'chatTest'}/membros/${'Rodrigo'}`)]?.lastView ? item.date < membrosAdd[membrosAdd.findIndex(i=>i.key == `chats/${'chatTest'}/membros/${'Rodrigo'}`)].lastView ? 'true': 'false' : '' }</Text>
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
 
 
 
