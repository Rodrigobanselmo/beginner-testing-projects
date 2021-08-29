import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import useNav from "./useNavReset";

const useAuth = (initializing,setInitializing,setUser) => {
  
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [navigationActions] = useNav();


  function AuthStateChanged(userLogin) {

    console.log('userLogin',userLogin)
    console.log('user',user)
    //if (user?.email && userLogin?.email && user.email != userLogin.email) {}
    if (setUser && user?.email) setUser(user)
    if(!userLogin) dispatch({
      type: 'LOGOUT_USER',
    });  
    if (initializing) setTimeout(() => {setInitializing(false)}, 1000);
 
  }

  useEffect(() => {

    const subscriber = auth().onAuthStateChanged(AuthStateChanged);
    
    return subscriber; // unsubscribe on unmount
  }, []);

  return [navigationActions];
}
export default useAuth
