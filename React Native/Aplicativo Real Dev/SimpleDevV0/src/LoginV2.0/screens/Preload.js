import React, { useState, useEffect } from 'react';
import { View, StatusBar,Image} from 'react-native';
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
      } else if (userLogin.emailVerified) {
            // mandar para AppDrawer
            console.log(userLogin.emailVerified)
            navigationActions('DrawerStack','TabStack')
      } else {
          // mandar para AppDrawer
          navigationActions('DrawerStack','VerificationStack')
      }
    
    }, [initializing]);

    return (
    <View style={{flex:1, backgroundColor: '#ffff', justifyContent: 'center', alignItems: 'center'}}>
    <StatusBar backgroundColor='#F27329' barStyle="dark-content"/>
      {initializing ? 
        <View style={{flex:1,justifyContent:'center',alignItems:"center"}} >
        <Image animation="bounceIn" duraton="1500" source={require('../../assets/logo.png')} style={{height:250,width:250,resizeMode:`contain`, marginTop:0}}/>
        </View>
      :
        null
      }
    </View>
    );
}
//<Image source={require('../../assets/gamma.png')} resizeMode='contain' style={{width: 250, height: 250}}/>
//<Text>Gamma jr. App</Text>