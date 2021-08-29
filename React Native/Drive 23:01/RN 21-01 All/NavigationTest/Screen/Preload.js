import React from 'react';
import { View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

export default () => { ///como estamos usando isso, noa podemos usar os Hook useRout e Connect pq esta no stacknav algo assim, entao temos que usar o outroo jeito
    
    const navigation = useNavigation();
    
    let x = 0

    React.useEffect(()=> {
        if( x == 0 ) {
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
    }, []);



    return <View></View>;
}

