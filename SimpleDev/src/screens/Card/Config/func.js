import {SaveChecklist,DeleteChecklist} from '../../../services/firestoreChecklist'
import { CommonActions} from '@react-navigation/native';
import {infoNet} from '../../../helpers/infoNet'

export function onSaveChecklist({checklist,percentage,allData,user,reactModal,navigation,dispatch}) {

    reactModal.loader()

    infoNet(()=>{
        SaveChecklist(percentage,checklist,allData,user.company.id,checkSuccess,checkError)
      },
      reactModal,
      true,
      ()=>{
        SaveChecklist(percentage,checklist,allData,user.company.id,()=>console.log(2),checkError,false)
        setTimeout(() => checkSuccess(), 1000);
      }
    )

    function checkSuccess() {
      dispatch({type: 'CHECKLIST_LOGOUT'})
      dispatch({type: 'LOGOUT_ANSWER'})
      dispatch({type: 'LOGOUT_HEADER'})
      dispatch({type: 'LOGOUT_MODEL'})
      dispatch({type: 'LOGOUT_OBS'})
      dispatch({type: 'LOGOUT_EMPLOYEE'})
      dispatch({type: 'LOGOUT_EMPLOYEE_CHOSEN'})
      dispatch({type: 'LOGOUT_PHOTO'})
      dispatch({type: 'LOGOUT_RISK_ANSWER'})
      dispatch({type: 'LOGOUT_RISK_POSITION'})
      dispatch({type: 'LOGOUT_COMPANY'})
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'TabStack'/* , params: {screen:subScreen} */ }
          ],
        })
      );
      //reactModal.close()
      setTimeout(() => {reactModal.animated({text:'Checklist salvo com sucesso!'})}, 1000);
    }

    function checkError(error) {
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}
  
export function onDeleChecklist({checklist,user,reactModal,dispatch,navigation}) {

    reactModal.loader()
    DeleteChecklist(checklist.id,user.company.id,checkSuccess,checkError)
    
    function checkSuccess() {
        dispatch({type: 'CHECKLIST_LOGOUT'})
        dispatch({type: 'LOGOUT_ANSWER'})
        dispatch({type: 'LOGOUT_HEADER'})
        dispatch({type: 'LOGOUT_MODEL'})
        dispatch({type: 'LOGOUT_OBS'})
        dispatch({type: 'LOGOUT_EMPLOYEE'})
        dispatch({type: 'LOGOUT_EMPLOYEE_CHOSEN'})
        dispatch({type: 'LOGOUT_PHOTO'})
        dispatch({type: 'LOGOUT_RISK_ANSWER'})
        dispatch({type: 'LOGOUT_RISK_POSITION'})
        dispatch({type: 'LOGOUT_COMPANY'})
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'TabStack'/* , params: {screen:subScreen} */ }
            ],
          })
        );
        setTimeout(() => {reactModal.animated({text:'Checklist deletado com sucesso!'})}, 1000);
    }

    function checkError(error) {
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}
  