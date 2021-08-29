import React , { useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView,TextInput, Image,ImageBackground,StatusBar } from 'react-native';
import BarberItem from '../../components/Barber/BarberItem'
import { useSelector, useDispatch } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
        <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:20}} >
            <View  style={{flexDirection: 'row', alignItems:'center', justifyContent:'center', width:'90%' }} >
              <Ionicons style={{marginTop:0,marginLeft:0, marginBottom:0, marginRight:0}} name="people" color={'#fff'} size={20}/>
              <Text style={{fontSize:20, color:'#eee', marginBottom:20, marginTop:15,marginRight:10, fontWeight:'bold', alignSelf:'center', marginLeft:12}} >Todos os Membros</Text>
              <AntDesign  name="down" color={'#fff'} size={13} style={{marginBottom:0}}/>
            </View>


            <BarberItem data={ {avatar:'https://scontent.fsjk2-1.fna.fbcdn.net/v/t1.0-9/74304872_2323204027805619_683863491940974592_n.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=8e0Ase7xzIQAX-w7Ufx&_nc_ht=scontent.fsjk2-1.fna&oh=9f70283eeca92ec5ade02fa06215ec99&oe=5FC71525', name:'Ygor Gonçalves', stars:3.7, vendas:4, location:1.1, cargo:'Presidente'} } navigation={navigation} />
            <BarberItem data={ {avatar:'https://scontent.fsjk2-1.fna.fbcdn.net/v/t1.0-9/122676687_4249157391782525_8293873892068376972_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_ohc=5FxvVTlbk34AX_EjJ5L&_nc_ht=scontent.fsjk2-1.fna&oh=5f8039bb815322233213d8f3bb9ea1d7&oe=5FC5A703', name:'Mari Miyashiro', stars:5, vendas:2, location:4.5, cargo:'Diretora RH'} } navigation={navigation} />
            <BarberItem data={ {avatar:'https://scontent.fsjk2-1.fna.fbcdn.net/v/t1.0-9/101494590_3009029872517904_3003279315069566976_o.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_ohc=42Cs-E7gCaQAX8YtllN&_nc_ht=scontent.fsjk2-1.fna&oh=da591674c7277b3ab31fe539a17d0749&oe=5FC7CC6B', name:'kauã Lucas Nunes', stars:5, vendas:4, location:12.5, cargo:'Diretor Marketing'} } navigation={navigation} />
            <BarberItem data={ {avatar:user.photoURL, name:'Rodrigo Barbosa', stars:4.7, vendas:1, location:1.5, cargo:'Accessor Realizações'} } navigation={navigation}/>
            <BarberItem data={ {avatar:'https://scontent.fsjk2-1.fna.fbcdn.net/v/t1.0-9/42307408_1308534702614940_609958069828321280_o.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=mSzrwg5SKLQAX80SAet&_nc_ht=scontent.fsjk2-1.fna&oh=40bc0e379b2877049079f50b22bf4079&oe=5FC77377', name:'Valentino Henrique', stars:0, vendas:3, location:3.2, cargo:'Accessor Realizações'} } navigation={navigation}/>
        </ScrollView> 
      </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:'#121212'
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
