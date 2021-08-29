import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

export default () => { ///como estamos usando isso, noa podemos usar os Hook useRout e Connect pq esta no stacknav algo assim, entao temos que usar o outroo jeito
    
    const navigation = useNavigation();
    const [initializing, setInitializing] = useState(true);
    const [userLogin, setUserLogin] = useState();
    const dispatch = useDispatch();
    

      function onAuthStateChanged(userLogin) {
/*         console.log('pre')
        console.log(userLogin) */
        setUserLogin(userLogin);
        if (initializing) 
        setTimeout(() => {
          setInitializing(false);          
        }, 300);

        dispatch({
          type: 'ADD_USER',
          payload: userLogin
      });   
      }
    
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        
        return subscriber; // unsubscribe on unmount
      }, []);



    useEffect(()=> {

      if (initializing) {null} 
      
      else if ( !userLogin ) {
            // mandar para StarterStack
            navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'SignStack' }
                  ],
                })
              );
        } else {
            // mandar para AppTab
            navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'MyDrawer' }
                  ],
                })
              );
      }
      
    }, [initializing]);



    return (
    <View style={{flex:1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
      <Text>Loading...</Text>
    </View>
    );
}

