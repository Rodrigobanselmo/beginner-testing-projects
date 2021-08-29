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

      <ScrollView>

      <View style={styles.container}>
           <StatusBar backgroundColor='#055902' barStyle="light-content"/>
        <View style={{width:'95%', flexDirection:'row',height:140, marginTop:20}}>

        <View>          
          <LinearGradient colors={['#fff', '#fff']} style={{flex:1,width:windowWidth*0.95/66*20, elevation:7, padding:10, justifyContent: 'center', borderRadius:10,alignItems: 'center', flexDirection: 'row', marginBottom: 5}}>
             <Image source={require('../../assets/dinheiro.png')} resizeMode='contain' style={{width: 60, height: 60, marginRight:5}} ></Image>
          </LinearGradient>
          <Text style={{fontSize:15, color:'grey', marginBottom:0, marginTop:-2, fontWeight:'bold',  marginLeft:0, alignSelf:'center'}} >Venda de</Text>
          <Text style={{fontSize:15, color:'grey', marginBottom:0, marginTop:-5, fontWeight:'bold',  marginLeft:0, alignSelf:'center'}} >Produtos</Text>
        </View>
          

          <View width={windowWidth*0.95/60*3} ></View>
          
          <View>          
          <LinearGradient colors={['#fff', '#fff']} style={{flex:1,width:windowWidth*0.95/66*20, elevation:7, padding:10, justifyContent: 'center', borderRadius:10,alignItems: 'center', flexDirection: 'row', marginBottom: 5}}>
            <Image source={require('../../assets/troca.png')} resizeMode='contain' style={{width: 60, height: 60, marginRight:5}} ></Image>
          </LinearGradient>
          <Text style={{fontSize:15, color:'grey', marginBottom:0, marginTop:-2, fontWeight:'bold',  marginLeft:0, alignSelf:'center'}} >Troca de</Text>
          <Text style={{fontSize:15, color:'grey', marginBottom:0, marginTop:-5, fontWeight:'bold', marginLeft:0, alignSelf:'center'}} >Alimentos</Text>
        </View>

          <View width={windowWidth*0.95/60*3}></View>
          
          <View>          
          <LinearGradient colors={['#fff', '#fff']} style={{flex:1,width:windowWidth*0.95/66*20, elevation:7, padding:10, justifyContent: 'center', borderRadius:10,alignItems: 'center', flexDirection: 'row', marginBottom: 5}}>
            <Image source={require('../../assets/cocoraao.png')} resizeMode='contain' style={{width: 60, height: 60, marginRight:5}} ></Image>
          </LinearGradient>
          <Text style={{fontSize:15, color:'grey', marginBottom:0, marginTop:-2, fontWeight:'bold',  marginLeft:0, alignSelf:'center'}} >Doação de</Text>
          <Text style={{fontSize:15, color:'grey', marginBottom:0, marginTop:-5, fontWeight:'bold',  marginLeft:0, alignSelf:'center'}} >alimentos</Text>
        </View>
        
          </View>



          <View style={{width:'95%', flexDirection:'row',height:140, marginTop:20}}>

        <View>          
        <LinearGradient colors={['#fff', '#fff']} style={{flex:1,width:windowWidth*0.95/66*20, elevation:7, padding:10, justifyContent: 'center', borderRadius:10,alignItems: 'center', flexDirection: 'row', marginBottom: 5}}>
            <Image source={require('../../assets/alimentacao-saudavel.png')} resizeMode='contain' style={{width: 60, height: 60, marginRight:5}} ></Image>
          </LinearGradient>
          <Text style={{fontSize:15, color:'grey', marginBottom:0, marginTop:-2, fontWeight:'bold',  marginLeft:0, alignSelf:'center'}} >Seja mais</Text>
          <Text style={{fontSize:15, color:'grey', marginBottom:0, marginTop:-5, fontWeight:'bold',  marginLeft:0, alignSelf:'center'}} >saudavel</Text>
        </View>
          

          <View width={windowWidth*0.95/60*3}></View>
          
          <View>          
          <LinearGradient colors={['#fff', '#fff']} style={{flex:1,width:windowWidth*0.95/66*20, elevation:7, padding:10, justifyContent: 'center', borderRadius:10,alignItems: 'center', flexDirection: 'row', marginBottom: 5}}>
            <Image source={require('../../assets/legumes.png')} resizeMode='contain' style={{width: 60, height: 60, marginRight:5}} ></Image>
          </LinearGradient>

          <Text style={{fontSize:15, color:'grey', marginBottom:0, marginTop:-2, fontWeight:'bold', marginLeft:0, alignSelf:'center'}} >Fazendo sua</Text>
          <Text style={{fontSize:15, color:'grey', marginBottom:0, marginTop:-5, fontWeight:'bold', marginLeft:0, alignSelf:'center'}} >propria horta</Text>
        </View>
        
          <View width={15}></View>
          
          <View>          
          <LinearGradient colors={['#fff', '#fff']} style={{flex:1,width:windowWidth*0.95/66*20, elevation:7, padding:10, justifyContent: 'center', borderRadius:10,alignItems: 'center', flexDirection: 'row', marginBottom: 5}}>
            <Image source={require('../../assets/falar.png')} resizeMode='contain' style={{width: 60, height: 60, marginRight:5}} ></Image>
          </LinearGradient>
          <Text style={{fontSize:15, color:'grey', marginBottom:0, marginTop:-2, fontWeight:'bold', marginLeft:0, alignSelf:'center'}} >Indique para</Text>
          <Text style={{fontSize:15, color:'grey', marginBottom:0, marginTop:-5, fontWeight:'bold', marginLeft:0, alignSelf:'center'}} >seus amigos</Text>
        </View>
        
          </View>
      

          <Text style={{fontSize:22, color:'#033301', marginBottom:20, marginTop:26, fontWeight:'bold', alignSelf:'flex-start', marginLeft:12}} >Quitanda Sou Verde</Text>

          <View style={{width:'95%', height:200}}>
            <ImageBackground source={require('../../assets/woman-selling-organic-vegetables-to-man-244X2Z3.jpg')} imageStyle={{ borderRadius: 10}} style={{flex:1,elevation:7, borderRadius:10, marginBottom: 16}}>
            
              <View style={{flex:1, paddingHorizontal:10,paddingVertical:18, backgroundColor:'#00000077', borderRadius: 10, justifyContent: 'flex-start', flexDirection: 'row'}}>
                <View style={{flex:1, justifyContent:'center', marginTop:10, alignItems:'center'}}>
                <Text style={{fontSize:22, color:'#fff', fontWeight:'bold'}} >Venda de Alimentos</Text>
                <Text style={{fontSize:15, color:'#fff'}} >Compre produtos frescos da sua região,</Text>
                <Text style={{fontSize:15, color:'#fff'}} >enquanto incentiva o pequeno produtor</Text>
                </View>
              </View>

            </ImageBackground>
          </View>

          <Text style={{fontSize:22, color:'#033301', marginBottom:20, marginTop:26, fontWeight:'bold', alignSelf:'flex-start', marginLeft:12}} >Primeiro Passos</Text>

            <ScrollView horizontal={true}>

            <View style={{width: windowWidth*.90, height:200, marginLeft:15}}>
              <ImageBackground source={require('../../assets/Horta-pratica.jpg')} imageStyle={{ borderRadius: 10}} style={{flex:1,elevation:7, borderRadius:10, marginBottom: 16}}>
               
                <View style={{flex:1, paddingHorizontal:10,paddingVertical:18, backgroundColor:'#00000077', borderRadius: 10, justifyContent: 'flex-start', flexDirection: 'row'}}>
                  <View style={{flex:1, justifyContent:'center', marginTop:10, alignItems:'center'}}>
                  <Text style={{fontSize:22, color:'#eeee', fontWeight:'bold'}} >Minha Primeira Horta</Text>
                  <Text style={{fontSize:14, color:'#eeee'}} >Saiba por onde começar</Text>
                  </View>
                </View>

              </ImageBackground>
            </View>

            <View style={{width: windowWidth*.90, height:200, marginLeft:15}}>
              <ImageBackground source={require('../../assets/composto-810x405.jpg')} imageStyle={{ borderRadius: 10}} style={{flex:1,elevation:7, borderRadius:10, marginBottom: 16}}>
               
                <View style={{flex:1, paddingHorizontal:10,paddingVertical:18, backgroundColor:'#00000077', borderRadius: 10, justifyContent: 'flex-start', flexDirection: 'row'}}>
                  <View style={{flex:1, justifyContent:'center', marginTop:10, alignItems:'center'}}>
                  <Text style={{fontSize:22, color:'#eeee', fontWeight:'bold'}} >Compostagem</Text>
                  <Text style={{fontSize:14, color:'#eeee'}} >Reciclagem de produtos orgânicos</Text>
                  </View>
                </View>

              </ImageBackground>
            </View>

            <View style={{width: windowWidth*.90, height:200, marginLeft:15, marginRight:15}}>
              <ImageBackground source={require('../../assets/thinkstockphotos-603906484.jpg')} imageStyle={{ borderRadius: 10}} style={{flex:1,elevation:7, borderRadius:10, marginBottom: 16}}>
               
                <View style={{flex:1, paddingHorizontal:10,paddingVertical:18, backgroundColor:'#00000077', borderRadius: 10, justifyContent: 'flex-start', flexDirection: 'row'}}>
                  <View style={{flex:1, justifyContent:'center', marginTop:10, alignItems:'center'}}>
                  <Text style={{fontSize:22, color:'#eeee', fontWeight:'bold'}} >Vida Saudavel</Text>
                  <Text style={{fontSize:14, color:'#eeee'}} >nutrição, alimentação saudável</Text>
                  <Text style={{fontSize:14, color:'#eeee'}} >e segurança alimentar</Text>
                  </View>
                </View>

              </ImageBackground>
            </View>

            </ScrollView>

      </View>
    </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    backgroundColor:'#fff' 
    /*     justifyContent: 'center', */
    
  },
});
