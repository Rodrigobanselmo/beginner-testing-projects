import React, { useState, useEffect } from 'react';
import { View, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';
import useAuth from'../hooks/useAuthChange';

export default () => {

    const [initializing, setInitializing] = useState(true);
    const [userLogin, setUserLogin] = useState(false);
    const [navigationActions] = useAuth(initializing,setInitializing,setUserLogin)
 
    useEffect(()=> {
      
      setUserLogin(false);

      if (initializing) {null} 
      else if ( !userLogin ) {
            // mandar para StarterStack
            navigationActions('SignStack')
      } else {
            navigationActions('DrawerStack','TabStack')
      }
    
    }, [initializing]);

    return (
    <View style={{flex:1, backgroundColor: '#ffff', justifyContent: 'center', alignItems: 'center'}}>
    <StatusBar backgroundColor='#000' barStyle="dark-content"/>
      {initializing ? 
        <LottieView source={require('../../animations/code0101.json')} autoPlay loop />
      :
        null
      }
    </View>
    );
}
//<Image source={require('../../assets/gamma.png')} resizeMode='contain' style={{width: 250, height: 250}}/>
//<Text>Gamma jr. App</Text>