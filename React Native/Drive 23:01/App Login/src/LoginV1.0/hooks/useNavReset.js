import { CommonActions, useNavigation } from '@react-navigation/native';

const useNav = () => {

  const navigation = useNavigation();

  function navigationActions(screen,screenName) {
    let subScreen = screenName ? screenName : 'TabStack'
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: screen, params: {screen:subScreen} }
        ],
      })
    );
  }

  return [navigationActions];
}
export default useNav
