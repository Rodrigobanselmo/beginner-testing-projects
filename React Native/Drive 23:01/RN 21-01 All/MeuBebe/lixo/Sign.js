import auth from '@react-native-firebase/auth';
import {useDispatch } from 'react-redux';

const SignReducer = () => {
  
const dispatch = useDispatch();

const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
function onAuthStateChanged(userLogin) {
    
  console.log('userlogin')
  console.log(userLogin)

  if (userLogin != null) {
      dispatch({
          type: 'ADD_USER',
          payload: userLogin
      });          
      navigation.dispatch(
          CommonActions.reset({
          index: 0,
          routes: [
              { name: 'MyDrawer' }
          ],
          })
      );
  }
  return subscriber

}

  return [onAuthStateChanged];
}



export default SignReducer;


export const subscriber = () => {
  const realm = await getRealm();
  let data = {};

  try {
    realm.write(() => {
      data = {
        id: value.id || entry.id || getUUID(),
        amount: value.amount || entry.amount,
        entryAt: value.entryAt || entry.entryAt,
        description: value.category.name,
        isInit: false,
        category: value.category || entry.category,
      };

      realm.create('Entry', data, true);
    });

    console.log('saveEntry :: data: ', JSON.stringify(data));
  } catch (error) {
    console.error('saveEntry :: error on save object: ', JSON.stringify(data));
    Alert.alert('Erro ao salvar os dados de lançamento.');
  }

  return data;
};