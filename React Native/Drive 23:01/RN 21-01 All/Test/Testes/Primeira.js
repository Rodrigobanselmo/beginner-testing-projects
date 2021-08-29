
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Pai  from './src/indireta/Pai';
import Icon from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';

let x = 500


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 220,
    left: -50,
    width: 500,
    height: 480,
    backgroundColor: '#CCC',
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    borderBottomLeftRadius: 95,
    borderBottomRightRadius: 95
  },
  container2: {
    position: 'absolute',
    top: -220+10,
    left: 50,}
});

export default () => {



return (
<>
<SafeAreaView backgroundColor='blue' flex={1}>
  <Pai />

  <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} height={10}>
  <Text>
    Sign in with Facebook
  </Text>
</LinearGradient>
</SafeAreaView>
<View style={styles.container} >
<Text style={styles.container2}>
    Sign in with Facebook
  </Text>
</View>
<Icon name="trash" size={x} color="#900" />
</>
) 
}