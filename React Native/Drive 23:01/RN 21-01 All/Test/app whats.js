

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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';

 export default () => {

  function LoginApp() {
  
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [send, setsend] = useState(''); // Initial empty array of users
    const scrollEnd = useRef()
    const [seguir, setseguir] = useState([[],[],[],[]]); // Initial empty array of users
    const [flatlistView, setflatlistView] = useState([]); // Initial empty array of users
    const [pendingMessagesOnline, setpendingMessagesOnline] = useState([]); // Initial empty array of users
    const [pendingMessages, setpendingMessages] = useState([]); // Initial empty array of users
    const [dateFromCache, setdateFromCache] = useState(true);
    const [datePending, setdatePending] = useState(true);
    
    const chat = useSelector(state => state.messages[state.messages.findIndex(i=>i.groupID=='123')]);
    const dispatch = useDispatch();

    const altura = Dimensions.get('window').height;
    const comprimento = Dimensions.get('window').width;
/*     console.log(messagesAll) */
/*     var indexGruop = messagesAll.findIndex(i=>i.groupID=='123');
    const messagesIndex =  messagesAll[indexGruop].messages */
/*     dispatch({
      type: 'DELETE_ALL',
  });  */

    useEffect(() => { 
      setflatlistView([...chat.messages,...pendingMessages])
    }, [chat.messages,pendingMessages])

    var userReaload = [...chat.messages];
    var lastUpdate = chat.lastUpdate


    useEffect(() => { 
       
      let DATA_ATUAL = new Date()-0;

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

        } else if (!seguir[3][0] && seguir[3][1] ){
          setpendingMessagesOnline([...pendingMessagesOnline, ...seguir[0]])
          console.log('userReload add cash')
          dispatch({
            type: 'ADD_MESSEGE',
            payload: {userReaload,lastUpdate}
          });   
        }

      } else if(!seguir[3][0] && !seguir[3][1] && userReaload[0] != undefined) {
          
          lastUpdate = DATA_ATUAL-0
          var mensOline = [...pendingMessagesOnline]
          var mensOffline = [...pendingMessages]

          pendingMessagesOnline.forEach((item)=>{
            let msg = [...mensOline]
            msg = msg.filter(i=>i.key!=item.key);
            mensOline=[...msg]
            if (item.date > DATA_ATUAL-5000) {} else {
              let string = `${item.key}`
              UpdateMessage(string.substring(string.length-26))
            }
          })

          pendingMessages.forEach((item)=>{
            let msg = [...mensOffline]
            msg = msg.filter(i=>i.key!=item.key);
            mensOffline=[...msg]
            console.log('msg: ',msg)
            AddUserIdQulaquer(pendingMessages.filter(i=>i.key==item.key)[0])
          });
          
          console.log('mensOffline',mensOffline)
          setpendingMessagesOnline([...mensOline])
          setpendingMessages([...mensOffline])
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


    function upload() {
      dispatch({
        type: 'DELETE_ALL',
    }); 

    }


    function upload2() {
      console.log(pendingMessages)
      console.log(chat)
    }


    AddUserIdQulaquer = async (connect) => { 

      const DATE = new Date() - 0;
      const TIME = moment().format('h[:]mm');
      const TIMES = moment().format('h[:]mm[:]ss');
      const UUID = `${moment().format('YYYY.MM.DD-HH:mm:ss')}-${Math.round(Math.random()*1000000)}`

      if (connect) {
        console.log('connect',connect)
        await firestore()
        .collection('chats').doc('chatTest').collection('menssagens').doc(UUID).set(
          {...connect, date: DATE,time:`${TIME}`,}
        ).then(console.log('doc uuidoff'))
          .catch(err=>console.log(err))
      } else if (!dateFromCache && !datePending) {
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
      } else {
        let msg = {
          name: 'Rodrigo',
          item: `${TIMES}`,
          date: DATE,   
          dateSent: DATE,
          time:`${TIME}`,
          key:UUID
        }
        setpendingMessages([...pendingMessages,msg])
      }

    }
    

    UpdateMessage = async (id) => { 
      const DATE = new Date() - 0;

        await firestore()
        .collection('chats').doc('chatTest').collection('menssagens').doc(id).update({
          date: DATE,   
        }).then(console.log('doc update'))
          .catch(err=>console.log(err))
    }



    useEffect(() => {

      const subscriber = firestore()
        .collection('chats').doc('chatTest').collection('menssagens').where('date', '>=', chat.lastUpdate <= new Date()-1000*60*60*24 ? chat.lastUpdate : new Date()-1000*60*60*24).orderBy('date', 'asc')
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
          console.log("Date from cache: " + source);

          var pending = querySnapshot.metadata.hasPendingWrites ? true : false;
          console.log("Data is pending: " + pending);

/*             onMessegeEdit(user,source,pending); */

          user[3].push(source,pending);

/*           console.log('user Snapshot: ',user ) */
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



   return(
        <View style={styles.View} >
          <FlatList
            data={flatlistView.sort(compare)}
            ref={scrollEnd}
            inverted={true}
            style={styles.Pastas_FlatList}
            renderItem={({ item }) => (
              <View style={{ height: 100, flex: 1, alignItems: 'center', justifyContent: 'center',width:'100%' }}>
{/*                 <Text>User ID: {item.key}</Text> */}
                <Text>User item: {item.item}</Text>
                <Text>User date: {item.date}</Text>
                <Text>User time: {item.time}</Text>
                <Text>{item.date < chat.lastUpdate ? 'true': 'false'}</Text>
              </View>
            )}
          />
          
          <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center', marginBottom:8}}>
            <View style={{justifyContent: 'center', alignItems: 'center',borderRadius: 15, backgroundColor: '#fff',  borderWidth: 1,  height:50,   marginLeft:10,   marginRight:5, flexDirection:'row', flexGrow:1}}>
              <TouchableHighlight style={{justifyContent: 'center', alignItems: 'center', width: 40, height:'98%', backgroundColor: 'transparent'}} onPress={()=>upload2()}>
                <Entypo name="emoji-happy"  color='#000'  size={22} style={{}}  />
              </TouchableHighlight>
              <TextInput 
                  placeholder="Digite aqui sua mens..."
                  style={{color: '#01402E',  height:'98%',flexGrow:1}}
                  autoCapitalize="none"
                  onChangeText={(val) => setsend(val) }
                  />
              <TouchableHighlight style={{justifyContent: 'center', alignItems: 'center', width: 40, height:'100%', backgroundColor: 'transparent'}} onPress={()=>upload()}>
                <Entypo name="camera"  color='#000'  size={22} style={{}}  />
              </TouchableHighlight>
              <TouchableHighlight style={{justifyContent: 'center', alignItems: 'center', width: 40, height:'100%', backgroundColor: 'transparent'}} onPress={()=>upload()}>
                <Foundation name="paperclip"  color='#000'  size={22} style={{}}  />
              </TouchableHighlight>
            </View>

            <TouchableHighlight style={{justifyContent: 'center', alignItems: 'center', width: 50, height:50,borderRadius: 15, borderWidth: 1, backgroundColor: 'transparent',marginRight:10}} onPress={()=>AddUserIdQulaquer(false)}>
              <Ionicons name="ios-send"  color='#000'  size={25} style={{}}  />
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
 
 
 
