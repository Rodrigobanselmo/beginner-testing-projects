import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
//import MyStack from './src/Stack/MyStack'
import MyDrawer from './Stack/MyDrawer'
import RootStackScreen from './Stack/Sign/RootStackScreen';
import { AuthContext } from './components/context';


const App = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null); 

const authContext = React.useMemo(() => ({
  signIn: () => {
      setUserToken('fgkj');
      setIsLoading(false);
},
  signOut: () => {
    setUserToken(null);
    setIsLoading(false);
},
  singUp: () => {
    setUserToken('fgkj');
    setIsLoading(false);
},
}));


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  
  if( isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

    return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
        { userToken !== null ? 
          <MyDrawer />
        :
        <RootStackScreen />
      }
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }

export default App;
