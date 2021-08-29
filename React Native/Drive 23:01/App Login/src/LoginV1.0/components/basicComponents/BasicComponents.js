/* eslint-disable no-unused-vars */
import React, {memo} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,TextInput,Platform,StyleSheet,ScrollView,StatusBar,Keyboard, TouchableHighlight} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

//Esta sendo usado na tela SignIn_Conect_1

function IconChoose(family) {
    switch (family) {
        case 'AntDesign':
            return AntDesign
        case 'FontAwesome':
            return FontAwesome
        case 'MaterialIcons':
            return MaterialIcons
        case 'Ionicons':
            return Ionicons
        case 'Entypo':
            return Entypo
        case 'MaterialCommunityIcons':
            return MaterialCommunityIcons
        case 'SimpleLineIcons':
            return SimpleLineIcons
        default:
            break;
    }
}

export function Header({text,navigation,style,type='Drawer'}) {
    
    function buttonPress() {
        if (type=='Drawer') {
            navigation.openDrawer()
        } else {
            navigation.goBack()
        }
    }
    function IconType() {
        if (type=='Drawer') {
            return (<Ionicons  name="ios-menu" size={25} color='#000' />)
        } else {
            return (<Ionicons  name="chevron-back" size={28} color='#000' />)
        }
    }

    return (
        <View style={{alignItems:"center",flexDirection:'row',width:'100%',justifyContent:"center",height:60,...style}} >
            <TouchableOpacity style={{position:'absolute',top:17.5,left:17}} onPress={buttonPress} >
                <IconType/>
            </TouchableOpacity>
            {text ? 
            <Text style={styles.text_header}>{text}</Text>
            :null}
        </View>
    );
  }


export function ButtonNormal({secundario=false,iconName = false,iconColor='#000',text='Click Aqui',onFunction=()=>{},imageSource=false,iconFamily=false, style=[]}) {
    const Icon = IconChoose(iconFamily)
    return (
        <TouchableOpacity onPress={onFunction} style={!secundario?{...styles.buttonPrincipal,...style}:{...styles.buttonSecundario,...style}}>
            {iconName || imageSource  ?
                iconName ?
                    <Icon name={iconName} size={40} color={iconColor}  style={{position:`absolute`,top:15,left:15}}/>
                    :
                    <Image source={imageSource} style={{height:30,width:30,resizeMode:`contain`,marginLeft:3,position:`absolute`,top:20,left:18}}/>                  
                :
                null
            }
            <Text style={!secundario?{fontSize:20,color:'#000'}:{fontSize:20,color:'#fff'}}>{text}</Text>
        </TouchableOpacity>
    );
}

export function ButtonHighlight({secundario=false,iconName = false,iconColor='#000',text='Click Aqui',onFunction=()=>{},imageSource=false,iconFamily=false, style=[]}) {

    const [underlay, setUndelay] = React.useState(false);
    const Icon = IconChoose(iconFamily)

    return (
        <TouchableHighlight onShowUnderlay={()=>setUndelay(true)} onHideUnderlay={()=>setUndelay(false)} onPress={onFunction} style={!secundario?{...styles.buttonPrincipal,...style}:{...styles.buttonSecundario,...style}}>
            <>
            {iconName || imageSource  ?
                iconName ?
                    <Icon name={iconName} size={40} color={iconColor}  style={{position:`absolute`,top:15,left:15}}/>
                    :
                    <Image source={imageSource} style={{height:30,width:30,resizeMode:`contain`,marginLeft:3,position:`absolute`,top:20,left:18}}/>                  
                :
                null
            }
            <Text style={!underlay?{fontSize:20,color:'#000'}:{fontSize:20,color:'#fff'}}>{text}</Text>
            </>
        </TouchableHighlight>
    );
}


  const styles = StyleSheet.create({
    header: {
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
        paddingBottom: 50,
        paddingTop:70,
    },
    text_header: {
        fontSize:20,
        color:'#000',
        fontWeight:'bold',
        paddingVertical:15
    },
    buttonPrincipal: {
        width:`100%`,
        flexDirection:`row`,
        marginVertical:20,
        height:70,
        justifyContent:`center`,
        alignItems:`center`,
        backgroundColor:`#fff`,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        
        elevation: 12,
    },
    buttonSecundario: {
        width:`100%`,
        flexDirection:`row`,
        marginVertical:20,
        height:70,
        justifyContent:`center`,
        alignItems:`center`,
        backgroundColor:`#000`,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        
        elevation: 12,
    },
      text_footer: {
          color: '#000',
          fontSize: 15
      },
      action: {
          flexDirection: 'row',
          marginTop: 8,
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          paddingBottom: 0,
          alignItems:`center`
      },
      textInput: {
          flex: 1,
          height:45,
          paddingLeft: 10,
          color: '#000',
      },
      textPrivate: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 15,
          marginBottom:15
      },
      color_textPrivate: {
          color: 'grey',
          textAlign:`justify`,
          marginTop: 15,
          marginBottom:15
      },
    });
