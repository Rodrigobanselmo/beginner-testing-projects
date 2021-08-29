import React , { useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView,TextInput, Image,ImageBackground } from 'react-native';
import BarberItem from '../../components/Barber/BarberItem'
import { useSelector, useDispatch } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Note from '../../assets/note.svg' ;
import LinearGradient from 'react-native-linear-gradient';

const DetailsScreen = ({navigation}) => {


  const [search, setsearch] = useState('')

/*   useLayoutEffect(()=>{
    navigation.setOptions({
      title: 'Editar Anotação',
      options: {tabBarVisible: false}
    });
}, []); */

  const user = useSelector(state => state.user.user);
  const dadosUsers = useSelector(state => state.notes.user);

    return (
<>
        <View style={{height:95, width:'100%', backgroundColor:'#055902', elevation:10}}>

          <View  style={{marginTop:8,marginLeft:0, marginBottom:10, marginRight:0, flexDirection: 'row', alignItems:'center', justifyContent:'flex-start' }} >
              <Icon.Button name="ios-menu" size={25} backgroundColor="#055902" color='#fff' onPress={() => navigation.openDrawer()}/> 
              <Text style={{fontWeight:'600', fontSize:20, color:'#fff'}}>Shop</Text>


            <View style={{flexDirection:'row', alignItems:'center', width:'100%', flex:1, justifyContent:'flex-end'}}>
                <View style={{backgroundColor:'#cc0000', borderRadius:15, height:18, width:18, alignItems:'center', justifyContent:'center', marginRight:-32, marginBottom:18, zIndex:1}}>
                    <Text style={{color:'#fff', fontSize:12}}>1</Text>
                </View>
              <Note fill={'#fff'} width="27" height="27" style={{marginRight:35}} />
                <View style={{backgroundColor:'#cc0000', borderRadius:15, height:18, width:18, alignItems:'center', justifyContent:'center', marginRight:-40, marginBottom:18, zIndex:1}}>
                    <Text style={{color:'#fff', fontSize:12}}>1</Text>
                </View>
              <MaterialCommunityIcons.Button name="shopping-outline" size={25} backgroundColor="#055902" color='#fff' onPress={() => navigation.openDrawer()}/> 
          </View>
              
          </View>
              <View  style={{marginTop:-6,marginLeft:10, marginBottom:15, marginRight:0, flexDirection: 'row', alignItems:'center', justifyContent:'flex-start', width:'90%' }} >
                  <Entypo style={{marginTop:0,marginLeft:0, marginBottom:0, marginRight:0}} name="location-pin" color={'#ccc'} size={20}/>
                  <View style={{height:5, width:5, borderRadius:5, backgroundColor:'#ccc', marginRight:5, marginLeft: 2}} />
                  <Text style={{fontSize:17, color:'#eeee'}} >Adicione seu endereço </Text>
                  <AntDesign  name="down" color={'#ccc'} size={13} style={{marginBottom:-5}}/>
              </View>
          </View>
          <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{flex:1}}
      >
        <View style={styles.container}>



        <View style={{alignItems: 'center', justifyContent: 'center', width:'90%', flexDirection:'row',borderWidth: 1,borderColor: '#ccc', borderRadius:30,marginTop:20, backgroundColor: '#fff', marginBottom:15}} >
                <EvilIcons 
                    name="search"
                    color='#005500'
                    size={30}
                    style={{marginLeft:10}}
                />
                <TextInput 
                    placeholder="O que está procurando?"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => setsearch(val)}
                    value={search}

                />
        </View>

{/*             <ImageBackground source={require('../../assets/feira.jpeg')} ></ImageBackground> */}
{/*           <View style={{width:'95%'}}>
          <LinearGradient colors={['#74A672', '#033301']} style={{flex:1,elevation:7, padding:10, justifyContent: 'flex-start', borderRadius:10,alignItems: 'center', flexDirection: 'row', marginBottom: 16}}>
            <Image source={require('../../assets/mercearias.png')} resizeMode='contain' style={{width: 90, height: 90, marginRight:5}} ></Image>
            <View>
            <Text style={{fontSize:22, color:'#eeee'}} >Mercado Sou Verde</Text>
            <Text style={{fontSize:14, color:'#eeee'}} >Preze por sua saude</Text>
            </View>
          </LinearGradient>
          </View> */}
          <Text style={{fontSize:22, color:'#000', marginBottom:20, marginTop:16, fontWeight:'bold', alignSelf:'flex-start', marginLeft:12}} >Categorias:</Text>
            <View style={{width:'95%'}}>
              <ImageBackground source={require('../../assets/young-woman-on-the-market-N629XG5.jpg')} imageStyle={{ borderRadius: 10}} style={{flex:1,elevation:7, borderRadius:10, marginBottom: 16}}>
                <View style={{flex:1, paddingHorizontal:10,paddingVertical:18, backgroundColor:'#00000077', borderRadius: 10, justifyContent: 'flex-start', flexDirection: 'row'}}>
                <Image source={require('../../assets/cesta-de-supermercado.png')} resizeMode='contain' style={{width: 80, height: 80, marginRight:15, marginLeft:10}} ></Image>
                  <View style={{flex:1, justifyContent:'center', marginTop:10}}>
                  <Text style={{fontSize:22, color:'#eeee', fontWeight:'bold'}} >Quitanda Sou Verde</Text>
                  <Text style={{fontSize:14, color:'#eeee'}} >Preze por sua saude</Text>
                  </View>
                </View>
              </ImageBackground>
            </View>




          <View style={{width:'95%', flexDirection:'row'}}>
            <ImageBackground source={require('../../assets/various-organic-fruits-5SUBCAL.jpg')} imageStyle={{ borderRadius: 10}} style={{flex:1, elevation:7,marginBottom: 16}}>
              <View style={{flex:1, padding:10, backgroundColor:'#00000099', height:130, borderRadius: 10}}>
              <Text style={{fontSize:22, color:'#eeee'}} >Frutas</Text>
              </View>
            </ImageBackground>
              <View width={15}>
              </View>
              <ImageBackground source={require('../../assets/verduras-de-setembro-folhas.jpg')} imageStyle={{ borderRadius: 10}} style={{flex:1, elevation:7,marginBottom: 16}}>
              <View style={{flex:1, padding:10, backgroundColor:'#00000099', height:130, borderRadius: 10}}>
                <Text style={{fontSize:22, color:'#eeee'}} >Verduras</Text>
              </View>
            </ImageBackground>
          </View>


          <View style={{width:'95%', flexDirection:'row'}}>
          <ImageBackground source={require('../../assets/vegetables-PD2XTQH.jpg')} imageStyle={{ borderRadius: 10}} style={{flex:1, elevation:7,marginBottom: 16}}>
            <View style={{flex:1, padding:10, backgroundColor:'#00000099', height:130, borderRadius: 10}}>
            <Text style={{fontSize:22, color:'#eeee'}} >Legumes</Text>
            </View>
          </ImageBackground>
          <View width={15}>
            </View>
            <ImageBackground source={require('../../assets/images.jpg')} imageStyle={{ borderRadius: 10}} style={{flex:1, elevation:7,marginBottom: 16}}>
            <View style={{flex:1, padding:10, backgroundColor:'#00000099', height:130, borderRadius: 10}}>
            <Text style={{fontSize:22, color:'#eeee'}} >Proteinas</Text>
            </View>
          </ImageBackground>
          
          </View>


          <View style={{width:'95%', flexDirection:'row'}}>
          <ImageBackground source={require('../../assets/26214-cenoura-cebola-e-batata-embora-todos-p-article_block_media-2.jpg')} imageStyle={{ borderRadius: 10}} style={{flex:1, elevation:7,marginBottom: 16}}>
            <View style={{flex:1, padding:10, backgroundColor:'#00000099', height:130, borderRadius: 10}}>
            <Text style={{fontSize:22, color:'#eeee'}} >Raizes</Text>
            </View>
          </ImageBackground>
          <View width={15}>
            </View>
            <ImageBackground source={require('../../assets/download.jpg')} imageStyle={{ borderRadius: 10}} style={{flex:1, elevation:7,marginBottom: 16}}>
            <View style={{flex:1, padding:10, backgroundColor:'#00000099', height:130, borderRadius: 10}}>
            <Text style={{fontSize:22, color:'#eeee'}} >Temperos</Text>
            </View>
          </ImageBackground>
          
          </View>
          <Text style={{fontSize:22, color:'#000', marginBottom:20, marginTop:26, fontWeight:'bold', alignSelf:'flex-start', marginLeft:12}} >Vendedores em sua Região:</Text>


          {dadosUsers.map((d,k)=>
                                        <BarberItem data={ {avatar:d.avatar, name:d.name, stars:d.vendedor.stars, vendas:d.vendedor.vendas, location:d.location} } navigation={navigation} key={k}/>
                                        
                                        
                                        )}
        </View>
        </ScrollView> 
</>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor:'#fff'
  },
  action: {
    width:'90%',
    flexDirection: 'row',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center'
},
textInput: {
  flex: 1,
  fontSize:16
},
});
