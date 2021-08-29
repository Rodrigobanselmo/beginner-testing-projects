import React , { useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView,TextInput, Image,ImageBackground } from 'react-native';
import BarberItem from '../../components/Barber/BarberItem'
import { useSelector, useDispatch } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Note from '../../assets/note.svg' ;
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

const Area = styled.TouchableOpacity`
    background-color: #FFFFFF;
    margin-bottom: -20px;
    padding: 15px;
    flex-direction: row;
    width:95%; 
    margin-left: 10px;
`;


const Avatar = styled.Image`
    width: 77px;
    height: 77px;
    border-radius: 20px;
`;

const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: center;
`;

const UserName = styled.Text`
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 2px;
`;

const SeeProfileButton = styled.View`
    width: 105px;
    height: 26px;
    border: 1px solid #84BF04;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: #84BF04;
`;
const BookmarkScreen = ({navigation}) => {

  const [search, setsearch] = React.useState('')

    return (
      <View style={{backgroundColor:'#fff', flex:1}}>

      <View style={{height:60, width:'100%', backgroundColor:'#055902', elevation:10}}>

      <View  style={{marginTop:8,marginLeft:0, marginBottom:10, marginRight:0, flexDirection: 'row', alignItems:'center', justifyContent:'flex-start' }} >
          <AntDesign.Button name="left" size={20} marginLeft={5} backgroundColor="#055902" color='#fff' onPress={() => navigation.goBack()}/> 
          <Text style={{fontWeight:'600', fontSize:20, color:'#fff'}}>Amigos</Text>


        <View style={{flexDirection:'row', alignItems:'center', width:'100%', flex:1, justifyContent:'flex-end'}}>
            <View style={{backgroundColor:'#cc0000', borderRadius:15, height:18, width:18, alignItems:'center', justifyContent:'center', marginRight:-40, marginBottom:18, zIndex:1}}>
              <Text style={{color:'#fff', fontSize:12}}>1</Text>
            </View>
          <Feather.Button name="user" size={25} backgroundColor="#055902" color='#fff' onPress={() => navigation.openDrawer()}/> 
      </View>
      </View>
      </View>
      <ScrollView 
  showsVerticalScrollIndicator={false}
  style={{flex:1}}
  >


        <View style={{alignItems: 'center', justifyContent: 'center', width:'90%', flexDirection:'row', borderRadius:30,marginTop:20, backgroundColor: '#34495e11', marginBottom:15, marginLeft:20}} >
                <EvilIcons 
                    name="search"
                    color='#005500'
                    size={25}
                    style={{marginLeft:10}}
                    />
                <TextInput 
                    placeholder="Pesquisar amigos"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => setsearch(val)}
                    value={search}
                    
                    />
        </View>





<Area style={{backgroundColor:'#fff'}} >
<Avatar source={require('../../assets/amigos/gelo.png')}  resizeMode="contain"/>
    <InfoArea>
        <UserName>Letícia Migliari</UserName>

        <Text style={{color:'#bbb', fontSize:14}}>3 amigos em comum</Text>
    </InfoArea>
    <View  style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', top: 50, right:25 }} >
                        <Entypo 
        name="dots-three-horizontal" 
        color={'#000'}
        size={16}
        />

    </View>
</Area>


<Area style={{backgroundColor:'#fff'}} >
<Avatar source={require('../../assets/amigos/aline.png')}  resizeMode="contain"/>
    <InfoArea>
        <UserName>Alline Lisboa</UserName>

        <Text style={{color:'#bbb', fontSize:14}}>3 amigos em comum</Text>
    </InfoArea>
    <View  style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', top: 50, right:25 }} >
                        <Entypo 
        name="dots-three-horizontal" 
        color={'#000'}
        size={16}
        />

    </View>
</Area>


<Area style={{backgroundColor:'#fff'}} >
<Avatar source={require('../../assets/amigos/giancoli.png')}  resizeMode="contain"/>
    <InfoArea>
        <UserName>Ju Giancoli</UserName>

        <Text style={{color:'#bbb', fontSize:14}}>3 amigos em comum</Text>
    </InfoArea>
    <View  style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', top: 50, right:25 }} >
                        <Entypo 
        name="dots-three-horizontal" 
        color={'#000'}
        size={16}
        />

    </View>
</Area>

<Area style={{backgroundColor:'#fff'}} >
<Avatar source={require('../../assets/amigos/andressa.png')}  resizeMode="contain"/>
    <InfoArea>
        <UserName>Andressa Araújo
</UserName>

        <Text style={{color:'#bbb', fontSize:14}}>3 amigos em comum</Text>
    </InfoArea>
    <View  style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', top: 50, right:25 }} >
                        <Entypo 
        name="dots-three-horizontal" 
        color={'#000'}
        size={16}
        />

    </View>
</Area>




  </ScrollView>
  <View style={{alignItems: 'center', justifyContent: 'center', width:'100%', height:60, flexDirection:'row', borderRadius:30,marginTop:20, marginBottom:15, marginLeft:20, position: 'absolute', bottom: 20, right:0}} >
  <View style={{alignItems: 'center', justifyContent: 'center', width:'60%', height:60, flexDirection:'row', borderRadius:30,marginTop:20, backgroundColor: '#055902'}} >
                <Feather 
                    name="user-plus"
                    color='#fff'
                    size={25}
                    style={{marginLeft:0}}
                    />
                            <Text style={{color:'#fff', fontSize:14, marginLeft:10}}>Convidar amigos</Text>
        </View>
  </View>
  </View>
  
    );
  };

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  textInput: {
    flex: 1,
    fontSize:14,
  },
});
