import { useDispatch } from 'react-redux';
import { userActionsSign, userActionsGoogle, userActionsCreate, userActionsDataChange } from '../services/UserActions';
import useNav from "./useNavReset";

const useDispatchActions = (onModalVisible) => {

  const dispatch = useDispatch();
  const [navigationActions] = useNav();

  function dispatchUserSign(userLogin) {
    dispatch(userActionsSign(userLogin,navigationActions,onModalVisible));   
  }

  function dispatchUserCreate(userLogin) {
    dispatch(userActionsCreate(userLogin,navigationActions,onModalVisible));   
  }
  
  function dispatchUserGoogle(userLogin) {
    dispatch(userActionsGoogle(userLogin,navigationActions,onModalVisible));   
  }

  function dispatchUserDataChange(data) {
    dispatch(userActionsDataChange(data,navigationActions,onModalVisible));    
  }

  return [dispatchUserGoogle,dispatchUserCreate,dispatchUserSign,dispatchUserDataChange,navigationActions];
}
export default useDispatchActions
