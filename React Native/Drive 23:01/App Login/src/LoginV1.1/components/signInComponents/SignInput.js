/* eslint-disable no-unused-vars */
import React, {memo} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,TextInput,Platform,StyleSheet,ScrollView,StatusBar,Keyboard} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Esta sendo usado na tela SignIn_Conect_1

export function HeaderLogin({text, iconName='login', IconFamily = AntDesign}) {
    return (
        <View style={styles.header}  >
            <View flexDirection='row' style={{alignItems:"center"}} >
                <Text style={styles.text_header} >{text}</Text>
                <IconFamily  name={iconName} color="#000" size={30} style={{}}  />
            </View>
        </View>
    );
  }

export function EmailInput({onTextChange,onEndText,data,onFocusInput,onBlur,OnSubmitKeyboardPress}) {
    
    return (
        <>
        <Text style={styles.text_footer}>Username</Text>
        <View style={[styles.action,{borderBottomColor: data.focus == `username`?"#000":"#f2f2f2"}]}>
            <FontAwesome name="user-o" color="#000" size={20} />
            <TextInput 
                placeholder="Your Username"
                style={styles.textInput}
                autoCapitalize="none"
                clearButtonMode='while-editing'
                onChangeText={(val) => onTextChange(val)}
                onEndEditing={(e)=>onEndText(e.nativeEvent.text)}
                keyboardType='email-address'
                onFocus={onFocusInput}
                onBlur={onBlur}
                textContentType="emailAddress"
                returnKeyType="next"
                autoCompleteType='email'
                blurOnSubmit={false}
                onSubmitEditing={OnSubmitKeyboardPress}
                value={data.username}
                />
            {data.check_textInputChange ? 
            <Animatable.View style={{marginLeft:10}} animation="bounceIn" >
                <Ionicons name="ios-checkmark-circle-outline" color="green" size={20} />
            </Animatable.View>
            : null}
        </View>

        { data.isValidUser ? <Text style={{color:'transparent'}}>T</Text> : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color: '#bb0000'}}>Email inserido invalido.</Text>
            </Animatable.View>
        }
      </>
    );
  }
  
  export function SenhaInput({onTextChange,onSecurityChange,data,refFocus,onLogin,onFocusInput,onBlur,confirme=false,beforeConfirme=false,OnSubmitKeyboardPress}) {

    return (
      <>
          <Text style={[styles.text_footer, {marginTop: 35 }]}>{confirme?`Confirme password`:`Password`}</Text>
          <View style={[styles.action,{borderBottomColor: confirme ? (data.focus == `confirmePassword`?"#000":"#f2f2f2") : (data.focus == `password`?"#000":"#f2f2f2")}]}>
              <Ionicons name="lock-closed-outline" color="#000" size={22}/>
              <TextInput 
                  ref={refFocus}
                  placeholder={confirme?`Confirme sua senha`:`Sua senha`}
                  secureTextEntry={confirme?data.confirmSecureTextEntry ? true : false:data.secureTextEntry ? true : false}
                  value={confirme?data.confirmPassword:data.password}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onFocus={onFocusInput}
                  onBlur={onBlur}
                  onChangeText={(val) => onTextChange(val)}
                  textContentType={confirme || beforeConfirme ? 'none':'password'}
                  returnKeyType={confirme || beforeConfirme ? 'done':'next'}
                  autoCompleteType={confirme || beforeConfirme ? 'off':'password'}
                  blurOnSubmit={false}
                  onSubmitEditing={confirme || !beforeConfirme ? onLogin:OnSubmitKeyboardPress}
                  multiline={false}
              />         
                    <TouchableOpacity style={{padding:10}} onPress={onSecurityChange} >
                        {(confirme?data.confirmSecureTextEntry :data.secureTextEntry) ? 
                            <Ionicons name="ios-eye-off-outline"color="grey" size={20}/>
                        :
                            <Ionicons name="ios-eye-outline"color="grey" size={20}/>
                        }
                    </TouchableOpacity>
                    {(confirme? data.isIqualPassword : data.isValidPassword)  ? 
                    <Animatable.View animation="bounceIn" >
                        <Ionicons name="ios-checkmark-circle-outline" color="green" size={20} />
                    </Animatable.View>
                :     
                null
                } 
          </View>
          { (confirme? data.isIqualPassword || data.confirmPassword.trim().length == 0: data.isValidPassword || data.password.trim().length == 0) ? <Text style={{...styles.errorMsg,color:'transparent'}}>T</Text> : 
              <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>{confirme? `As senhas devem ser iguais` : `Password must be 8 characters long.`}</Text>
              </Animatable.View>
          }
      </>
    );
  }

  export function PrivacyPolicy({onPress, onPressPolicy}) {
    const B = (props) => <Text onPress={props.onPress} style={{fontWeight: 'bold'}}>{props.children}</Text>
    return (
            <Text style={styles.color_textPrivate} >By signing up you agree to our <B onPress={onPress} >Terms of service</B> and <B onPress={onPressPolicy}>Privacy policy</B></Text>
    );
  }

export function ButtonLoginEmail({iconName = false, iconColor, text, onLogin, imageSource = false, IconFamily, Style = false}) {
    return (
        <TouchableOpacity onPress={onLogin} style={Style ? {...styles.button2,...Style} : styles.button2}>
            {iconName || imageSource  ?
                iconName ?
                    <IconFamily name={iconName} size={40} color={iconColor}  style={{position:`absolute`,top:15,left:15}}/>
                    :
                    <Image source={imageSource} style={{height:30,width:30,resizeMode:`contain`,marginLeft:3,position:`absolute`,top:20,left:18}}/>                  
                :
                null
            }
            <Text style={{fontSize:20}} >{text}</Text>
        </TouchableOpacity>
    );
}

 export const ButtonLogin = memo(
    function func({iconName = false, iconColor, text, onPress, imageSource = false, IconFamily=MaterialIcons, Style = false, data}) {
        return (
            <TouchableOpacity onPress={onPress} style={Style ? Style : [styles.button2]}>
                {iconName || imageSource  ?
                    iconName ?
                        <IconFamily name={iconName} size={40} color={iconColor}  style={{position:`absolute`,top:15,left:15}}/>
                        :
                        <Image source={imageSource} style={{height:30,width:30,resizeMode:`contain`,marginLeft:3,position:`absolute`,top:20,left:18}}/>                  
                    :
                    null
                }
                <Text style={{fontSize:20}} >{text}</Text>
            </TouchableOpacity>
        );
})


  const styles = StyleSheet.create({
    header: {
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
        paddingBottom: 50,
        paddingTop:70,
    },
    text_header: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30,
        paddingRight: 12
    },
      button2: {
        width:`100%`,
        flexDirection:`row`,
        marginBottom:15,
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
