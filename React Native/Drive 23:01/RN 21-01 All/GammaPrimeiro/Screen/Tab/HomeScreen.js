import React , { useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView,TextInput, Image,ImageBackground,StatusBar, Dimensions} from 'react-native';
import BarberItem from '../../components/Barber/BarberItem'
import { useSelector, useDispatch } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Note from '../../assets/note.svg' ;
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({navigation}) => {

      const windowWidth = Dimensions.get('window').width;
  
    return (



      <View style={styles.container}>
           <StatusBar backgroundColor={'#121212'} barStyle={'light-content'}/>
        <View style={{height:69,width:'100%',backgroundColor:'#121212',transform: [{ translateY: 0 }], position:'absolute',top:0,left:0,zIndex:2}}>
              <View style={{flex:1, flexDirection:'row'}}>
                  <Image 
                    source={require('../../assets/gammaengenharia.png')}
                    style={{height:180,width:180,position:'absolute', top:-55, left:30, opacity:1,transform: [{ rotateZ: '0deg' }]}}
                    resizeMode="contain"
                    />
                  <Ionicons.Button style={{marginLeft:10,marginTop:9}} underlayColor='#121212' name="ios-menu" size={25} backgroundColor="#121212" onPress={() => navigation.openDrawer()}> </Ionicons.Button>
                  <Ionicons style={{marginLeft:300,marginTop:18}} underlayColor='#121212' name="paper-plane-outline" size={22} backgroundColor="#121212" color='#eee' onPress={() => navigation.openDrawer()}> </Ionicons>
              </View>
                <LinearGradient style={{height:4,width:'100%',opacity:0.29, zIndex:2}}  colors={['#000','#121212']} />
        </View>
      </View>

    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    backgroundColor:'#121212'
    /*     justifyContent: 'center', */
    
  },
});
