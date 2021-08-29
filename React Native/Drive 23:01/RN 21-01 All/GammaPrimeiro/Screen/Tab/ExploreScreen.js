import React , { useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView,TextInput, Image,ImageBackground,StatusBar, Dimensions} from 'react-native';
import BarberItem from '../../components/Barber/BarberItem'
import { useSelector, useDispatch } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Note from '../../assets/note.svg' ;
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({navigation}) => {

      const windowWidth = Dimensions.get('window').width;
  
    return (



      <View style={styles.container}>
           <StatusBar backgroundColor='#262626' barStyle="light-content"/>
      </View>

    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    backgroundColor:'#262626'
    /*     justifyContent: 'center', */
    
  },
});