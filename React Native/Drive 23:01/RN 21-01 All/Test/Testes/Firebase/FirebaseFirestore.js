

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


  AddUserIdQulaquer = async () => { 
    await firestore().collection('Lista').add({
        name:'Marcos', idade:90
    })
    .then((doc)=>{console.log("doc:",doc)}).catch(err=>{console.log(err)})
  }

  //pega todos os usuarios em um grande documento
  getUserCollection = async () => { 
    await firestore().collection('users').get()
    .then((snapshot)=>{console.log(snapshot._docs)});
  }

  //pega todos os usuarios em um grande documento e realiza function em cada um 
  getUserCollectionOneatTime = async () => { 
    await firestore().collection('users').get()
    .then((snapshot)=>{snapshot.forEach((doc)=>{console.log(doc.data())})}).catch(err=>{console.log(err)});
  }

  //pega somente um user
  getOneUser = async () => { 
    await firestore().collection('users')
    .doc('bSuqMR0k90zIsrrM9OIG').get()
    .then((snapshot)=>{console.log(snapshot._data)});;
  }


  //aqui pode colocar .where('name','<', 'Rodrigo Barbosa Anselmo').where('name','<', 'Z')
  getUsersComRestrição = async () => { 
    await firestore().collection('users').where('name','>', 'a').get()
    .then((snapshot)=>{snapshot.forEach((doc)=>{console.log(doc.data())})});
  }




//vc insere novo user com nome do arquivo definido se não existir
  setUserWithId = async () => { 
    await firestore().collection('Nome').doc('dsfds').set({
        name:'Marcos', idade:90
    })
    .then((doc)=>{console.log("doc:",doc)}).catch(err=>{console.log(err)})
  }

//cria ou muda valores existentes
/*   setUserWithId = async () => { 
    await firestore().collection('Nome').set({
        name:'Marcccccccccccccccccos', idade:90
    })
    .then((doc)=>{console.log('doc:')}).catch(err=>{console.log(err)})
  } */

  //ubpdate removendo ou amentano arrays e valores, se nao ouver cria () {increment aumenta o valor do campo}
  setdadoemarray = async () => { 
    await firestore().collection('users').doc('123123').update({
      array: firebase.firestore.FieldValue.arrayUnion(908) }).then((doc)=>{console.log('doc:')}).catch(err=>{console.log(err)})
/*       array: firebase.firestore.FieldValue.arrayRemove(3,2) }).then((doc)=>{console.log('doc:')}).catch(err=>{console.log(err)}) */
/*       array: firebase.firestore.FieldValue.increment(1) }).then((doc)=>{console.log('doc:')}).catch(err=>{console.log(err)}) */
  }



         //pegar dados em realtime
/*     firestore()
    .collection('users')
    .doc('bSuqMR0k90zIsrrM9OIG')
    .onSnapshot(documentSnapshot => {
      console.log(documentSnapshot.data().name)
    }); */



    const usersCollectionRef = firestore().collection('Users')

    //adiciona uma coleção se nao tiver e se tiver começa add documentos com id unicos 
/*     const adduser=()=> {
      usersCollectionRef.add({
        name:'happy',
        Position: 'Software Dev.',
      })
    } */

        //adiciona uma coleção se nao tiver e se tiver add documento com id 12345 (substitui todos os dados seja tiver outro doc com mesmo nome) 
/*     const adduser=()=> {
      usersCollectionRef.doc('12345').set({
        name:'happye',
      })
    } */

        //aadd position to doc 12345 ou cria
/*         const adduser=()=> {
          usersCollectionRef.doc('bSuqMR0k90zIsrrM9OIG').update({
            name:'happye',
          })
        } */

//add item im array existente( se tivermos name: [A,B]) fcaria name :[A,B,C] 
/*         const adduser=()=> {
          usersCollectionRef.doc('12345').update({
            name: firebase.firestore.FieldValue.
          })
        } */

        
        //fdelete doc by add sem dar erro se não tiver
/*         const deleteuser=()=> {
          usersCollectionRef.doc('12345').delete().then(()=>{
console.log(1)
          }).catch((err)=>{
            console.log(err)
          })
        } */

        //add geolocation, mas vc tem que pegar os valores e add ali
/*         const adduser=()=> {
          usersCollectionRef.doc('12345').update({
            name:'happye',
            location: new firestore.GeoPoint(53.483959, -2.244644),
          })
        } */

          //add time
/*         const adduser=()=> {
          usersCollectionRef.doc('12345').update({
            createdAt: firestore.FieldValue.serverTimestamp(),
          })
        } */

        //delete all useres
/*         async function massDeleteUsers() {
          // Get all users
          const usersQuerySnapshot = await firestore()
            .collection('Users')
            .get();
        
          // Create a new batch instance
          const batch = firestore().batch();
        
          usersQuerySnapshot.forEach(documentSnapshot => {
            batch.delete(documentSnapshot.ref);
          });
        
          return batch.commit();
        } */

                  //add time
/*         const adduser=()=> {
          usersCollectionRef.doc('12345').update({
            createdAt: firestore.FieldValue.serverTimestamp(),
          })
        } */

        //pegar todos os users e dizer uantos tem no total sem ser real time          
/* 
        firestore()
  .collection('users')
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  }); */

  //atualiza dados realtaime
/*   useEffect(() => {
        firestore().collection('users').onSnapshot(doc => {
          console.log(doc.size) })
    }, []);
 */



 ///consigo filtrar 
/* getUser = async () => { 
  const userDocument = await firestore().collection('users')
  .where('age', '<=', 30)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      setteste(teste.push(documentSnapshot.data()));
    });
  });
  console.log(teste);
}; */


 ///usar realtime para + de um doc

/*  useEffect(() => {
  firestore().collection('users').onSnapshot(docs => {
    let usuarios = []
    docs.forEach(doc => { usuarios.push(doc.data()) } )
    console.log(usuarios)
  })
}, []); */



 ///FILTRAR
/* getUser = async () => { 
  const userDocument = await firestore().collection('users')
  .where('age', '<=', 30)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      setteste(teste.push(documentSnapshot.data()));
    });
  });
  console.log(teste);
}; */


//transaction 
/* function onPostLike(postId) {
  // Create a reference to the post
  const userReference = firestore().doc(`users/${postId}`);

  return firestore().runTransaction(async transaction => {
    // Get post data first
    const postSnapshot = await transaction.get(userReference);

    if (!postSnapshot.exists) {
      throw 'Post does not exist!';
    }

    await transaction.update(userReference, {
      age: postSnapshot.data().age + 1,
    });
  });
} */

//para chamar use isso 
/* () => onPostLike('bSuqMR0k90zIsrrM9OIG')
  .then(() => console.log('Post likes incremented via a transaction'))
  .catch(error => console.log(error)) */


     //AQUI ESTOU ADD USER E ASSIM QUE ADD EU LEIO (ORDEM IMPORTA PQ SE EU LER ANTES DA RUIM)    ***Cuidado que com await na hora de setar o nome ele trava a função ate a internet voltar ou seja ele não segue para as funções abaixo a menos que vc use then que mesmo sem acabar ele executa aquela funcao 
/*     const adduser = async () => {
      const currentUser = await GoogleSignin.getCurrentUser();
      await firestore().collection('users').doc(currentUser.user.id).set({name:currentUser.user.name, sexo: 'M'}).then( setTimeout(() => {
        firestore().collection('users')
        .doc(currentUser.user.id).get().then(doc => {
          console.log(doc.data());
        })
      }, 1000)
      )
    }; */


  function LoginApp() {
  

    useEffect(() => {

    }, []);



   return(
        <View style={styles.View} >
         <TouchableHighlight style={styles.Viewnum} onPress={getUserCollection}>
         <Text> getUserCollection </Text>
         </TouchableHighlight>
          <TouchableHighlight style={[styles.Viewnum,{backgroundColor:'#fff'}]} onPress={getUserCollectionOneatTime}>
          <Text> getUserCollectionOneatTime </Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.Viewnum,{backgroundColor:'#fff'}]} onPress={setUserWithId}>
          <Text> AddUserIdQulaquer </Text>
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
 
 
 
