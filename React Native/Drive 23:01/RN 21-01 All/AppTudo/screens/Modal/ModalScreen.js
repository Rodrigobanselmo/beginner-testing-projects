
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
/* import Icon from 'react-native-vector-icons/EvilIcons'; */
import LinearGradient from 'react-native-linear-gradient';

export default () => {



return (
<>
<SafeAreaView backgroundColor='#262626' flex={1}>

  <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}>
  <Text>
    Sign in with Facebook
  </Text>
</LinearGradient>
</SafeAreaView>
{/* <Icon name="trash" size={100} color="#900" /> */}
</>
)
}