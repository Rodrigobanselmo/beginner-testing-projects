import React, {useState} from 'react';
import { View, StyleSheet,Dimensions,ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function DrawerContent(props) {

    const [ dark, setDark ] = useState(false);

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const Logout = () => {
        console.log(user)
        dispatch({
            type: 'LOGOUT_USER',
        });
        
        props.navigation.dispatch(
            CommonActions.reset({
            index: 0,
            routes: [
                { name: 'SignStack' }
            ],
            })
        );

        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
        
        signOut = async () => {
          try {
            await GoogleSignin.revokeAccess();
          } catch (error) {
            console.error(error);
          }
        };
    
        signOut()
        
        

    }

    const toggleTheme = () => {
        setDark(!dark);
    }

    const screenHeight = Dimensions.get('window').height;

    return(
        <View style={{flex:1,backgroundColor:'#121212'}}>
                <View style={{flex:1,overflow:'hidden'}}>
                    
                    <View style={{flexDirection:'row',height:35}}>
                        <Icon.Button style={{marginTop:7}} name="close" color={'#fff'} backgroundColor='transparent' size={screenHeight*0.024} onPress={() => {props.navigation.navigate('Home')}}/> 
                        <View style={{flex:1,alignItems:'center',justifyContent:'center',marginBottom:-17}}>
                            <Text style={{color: '#fff', fontSize:screenHeight*0.018, alignItems:'center',justifyContent:'center'}} >MENU</Text>
                        </View>
                        <Icon.Button style={{marginTop:7}} name="crown-outline" color={'#fff'} backgroundColor='transparent' size={screenHeight*0.024} onPress={() => {props.navigation.navigate('Home')}}/> 
                    </View>
                    
                    <View style={{alignItems:'center',justifyContent:'center',zIndex:2,marginBottom:-40,marginTop:15}}>
                        <View style={{alignItems:'center',justifyContent:'center',borderColor:'#04D9B2',height:100,width:100,borderRadius:50,borderWidth:2.5}}>
                            <Avatar.Image  style={{marginTop:0}} source={{ uri: user.photoURL }} size={90} />
                        </View>
                    </View>
                    
                    <View style={[styles.triangleCorner,{borderTopColor:'#262626',position:'absolute',top:20,right:-15}]}></View>
                    <View style={{backgroundColor:'#262626', minHeight:screenHeight*0.70,flex:1}}>
                        <View style={[styles.triangleCorner,{borderTopColor:'#121212',position:'absolute',top:-9,left:-15, transform: [{rotate: '10deg'}]}]}></View>
                        <View style={{alignItems:'center',justifyContent:'center',marginTop:45}}>
                            <Text style={{color: '#fff', fontSize:screenHeight*0.026, alignItems:'center',justifyContent:'center',fontWeight:'700'}} >Rodrigo B. Anselmo</Text>
                            <Text style={{color: '#ccc', fontSize:screenHeight*0.016, alignItems:'center',justifyContent:'center'}} >rodrigoanselmo@usp.br</Text>
                        </View>
                        <TouchableOpacity style={{height:screenHeight*0.06, flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:screenHeight*0.035}}>
                            <View style={{height:screenHeight*0.045,width:screenHeight*0.045,backgroundColor:'#04D9B2',justifyContent:'center',alignItems:'center',borderRadius:20,marginRight:15,marginLeft:50}}>
                                <Icon style={{marginTop:0}} name="crown-outline" color={'#121212'} backgroundColor='transparent' size={screenHeight*0.035} onPress={() => {props.navigation.navigate('Home')}}/> 
                            </View>
                            <Text style={{color: '#fff', fontSize:screenHeight*0.02, alignItems:'center',justifyContent:'center',fontWeight:'300'}} >Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{height:screenHeight*0.06, flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:screenHeight*0.017}}>
                        <View style={{height:screenHeight*0.045,width:screenHeight*0.045,backgroundColor:'#04D9B2',justifyContent:'center',alignItems:'center',borderRadius:20,marginRight:15,marginLeft:50}}>
                                <Icon style={{marginTop:0}} name="crown-outline" color={'#121212'} backgroundColor='transparent' size={screenHeight*0.035} onPress={() => {props.navigation.navigate('Home')}}/> 
                            </View>
                            <Text style={{color: '#fff', fontSize:screenHeight*0.02, alignItems:'center',justifyContent:'center',fontWeight:'300'}} >Projetos Atuais</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{height:screenHeight*0.06, flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:screenHeight*0.017}}>
                        <View style={{height:screenHeight*0.045,width:screenHeight*0.045,backgroundColor:'#04D9B2',justifyContent:'center',alignItems:'center',borderRadius:20,marginRight:15,marginLeft:50}}>
                                <Icon style={{marginTop:0}} name="crown-outline" color={'#121212'} backgroundColor='transparent' size={screenHeight*0.035} onPress={() => {props.navigation.navigate('Home')}}/> 
                            </View>
                            <Text style={{color: '#fff', fontSize:screenHeight*0.02, alignItems:'center',justifyContent:'center',fontWeight:'300'}} >Pedir Ajuda</Text>
                        </TouchableOpacity>
                        
                        <TouchableRipple style={{height:screenHeight*0.06, flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:screenHeight*0.017}} onPress={() => {toggleTheme()}}>
                            <>
                            <View style={{height:screenHeight*0.045,width:screenHeight*0.045,backgroundColor:'#04D9B2',justifyContent:'center',alignItems:'center',borderRadius:20,marginRight:15,marginLeft:50}}>
                                <Icon style={{marginTop:0}} name="crown-outline" color={'#121212'} backgroundColor='transparent' size={screenHeight*0.035} onPress={() => {props.navigation.navigate('Home')}}/> 
                            </View>
                            <Text style={{color: '#fff', fontSize:screenHeight*0.02, alignItems:'center',justifyContent:'center',fontWeight:'300', marginRight:70}} >Tema Escuro</Text>
                                <View pointerEvents="none">
                                    <Switch value={dark}/>
                                </View>
                            </>
                        </TouchableRipple>
                        
                        <TouchableOpacity style={{height:screenHeight*0.06, flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:screenHeight*0.017}}>
                        <View style={{height:screenHeight*0.045,width:screenHeight*0.045,backgroundColor:'#04D9B2',justifyContent:'center',alignItems:'center',borderRadius:20,marginRight:15,marginLeft:50}}>
                                <Icon style={{marginTop:0}} name="crown-outline" color={'#121212'} backgroundColor='transparent' size={screenHeight*0.035} onPress={() => {props.navigation.navigate('Home')}}/> 
                            </View>
                            <Text style={{color: '#fff', fontSize:screenHeight*0.02, alignItems:'center',justifyContent:'center',fontWeight:'300'}} >Agenda</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{height:screenHeight*0.06, flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:screenHeight*0.017}}>
                        <View style={{height:screenHeight*0.045,width:screenHeight*0.045,backgroundColor:'#04D9B2',justifyContent:'center',alignItems:'center',borderRadius:20,marginRight:15,marginLeft:50}}>
                                <Icon style={{marginTop:0}} name="crown-outline" color={'#121212'} backgroundColor='transparent' size={screenHeight*0.035} onPress={() => {props.navigation.navigate('Home')}}/> 
                            </View>
                            <Text style={{color: '#fff', fontSize:screenHeight*0.02, alignItems:'center',justifyContent:'center',fontWeight:'300'}} >Configurações</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{height:screenHeight*0.06, flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:screenHeight*0.017}} onPress={Logout}  >
                        <View style={{height:screenHeight*0.045,width:screenHeight*0.045,backgroundColor:'#121212',justifyContent:'center',alignItems:'center',borderRadius:20,marginRight:15,marginLeft:50}}>
                                <Icon style={{marginTop:0}} name="exit-to-app" color={'#04D9B2'}  backgroundColor='transparent' size={screenHeight*0.035} onPress={() => {props.navigation.navigate('Home')}}/> 
                            </View>
                            <Text style={{color: '#fff', fontSize:screenHeight*0.02, alignItems:'center',justifyContent:'center',fontWeight:'300'}} >Log Out</Text>
                        </TouchableOpacity>
                        
                    
                    </View>
                    <View style={[styles.triangleCorner,{borderTopColor:'#121212',position:'absolute',bottom:-10,right:-15}]}></View>
                </View>
                <View style={{height:90,width:'100%',backgroundColor:'#121212'}}>
                <View style={[styles.triangleCorner,{zIndex:2, borderTopColor:'#262626',position:'absolute',bottom:7,left:-15, transform: [{rotate: '10deg'}]}]}></View>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      paddingLeft:30,

    },
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 100,
        borderTopWidth: 100,
        borderRightColor: 'transparent',
        transform: [{rotate: '190deg'}]
      
      },
  });
