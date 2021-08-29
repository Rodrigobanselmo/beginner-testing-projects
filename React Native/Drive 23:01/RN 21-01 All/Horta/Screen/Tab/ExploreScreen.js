import React from 'react';
import { View, Text, Button, StyleSheet,Image,TextInput } from 'react-native';
import Hortavertical from '../../assets/horta1.svg' ;      
import Swiper from 'react-native-swiper';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';
import { ScrollView } from 'react-native-gesture-handler';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

const Area = styled.TouchableOpacity`
    background-color: #FFFFFF;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
    width:95%; 
    margin-left: 10px;
`;


const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
`;

const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;

const UserName = styled.Text`
    font-size: 17px;
    font-weight: bold;
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
const ExploreScreen = () => {
    return (
      
      <View style={styles.container}>
        <ScrollView >
        


        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View style={{justifyContent:'center', alignItems:'center', marginTop:20}}>
            <View style={{backgroundColor:'#72A603', paddingVertical:5, paddingHorizontal:40, borderRadius:20, marginLeft:20}}>
                  <Text style={{fontSize:20, color:'#fff'}} >TODOS</Text>
            </View>
          </View>
          <View style={{justifyContent:'center', alignItems:'center', marginTop:20}}>
            <View style={{backgroundColor:'#eee', paddingVertical:5, paddingHorizontal:40, borderRadius:20, marginLeft:20}}>
                  <Text style={{fontSize:20, color:'#aaa'}} >FRUTAS</Text>
            </View>
          </View>
          <View style={{ justifyContent:'center', alignItems:'center', marginTop:20}}>
            <View style={{backgroundColor:'#eee', paddingVertical:5, paddingHorizontal:40, borderRadius:20, marginLeft:20}}>
                  <Text style={{fontSize:20, color:'#aaa'}} >VEGETAIS</Text>
            </View>
          </View>
          <View style={{ justifyContent:'center', alignItems:'center', marginTop:20}}>
            <View style={{backgroundColor:'#eee', paddingVertical:5, paddingHorizontal:40, borderRadius:20, marginLeft:20}}>
                  <Text style={{fontSize:20, color:'#aaa'}} >LEGUMES</Text>
            </View>
          </View>
        </ScrollView>


        <Swiper
        style={{backgroundColor:'transparent',height: 460, paddingTop:0}}
        showsPagination={false}
        showsButtons={true}
        prevButton={<NavPrevIcon width="35" height="35" fill="#000000" />}
        nextButton={<NavNextIcon width="35" height="35" fill="#000000" />}
        > 

{/* {[0,0].map((item, key)=>(
        <View key={key} style={{transform: [{ scale: 0.88 }], justifyContent:'center',alignItems:'center'}}>
          <Image source={require('../../assets/plantas/apple.png')} style={{height:80, width:80, position:'absolute', top:15, left:72, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/avocado.png')} style={{height:80, width:80, position:'absolute', top:15, left:166, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/bananas.png')} style={{height:80, width:80, position:'absolute', top:15, left:258, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/berry.png')} style={{height:80, width:80, position:'absolute', top:175, left:72, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/bell-pepper.png')} style={{height:80, width:80, position:'absolute', top:175, left:166, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/broccoli.png')} style={{height:80, width:80, position:'absolute', top:175, left:258, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/eggplant.png')} style={{height:80, width:80, position:'absolute', top:334, left:72, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/lettuce.png')} style={{height:80, width:80, position:'absolute', top:334, left:166, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/carrot.png')} style={{height:80, width:80, position:'absolute', top:334, left:258, zIndex:2}}   resizeMode="contain"/>
          <Hortavertical width="510" height="510" style={{marginRight:3, backgroundColor: '#fff'}} />
        </View>
      ))} */}

        <View style={{transform: [{ scale: 0.88 }], justifyContent:'center',alignItems:'center'}}>
          <Image source={require('../../assets/plantas/apple.png')} style={{height:80, width:80, position:'absolute', top:15, left:72, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/avocado.png')} style={{height:80, width:80, position:'absolute', top:15, left:166, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/bananas.png')} style={{height:80, width:80, position:'absolute', top:15, left:258, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/berry.png')} style={{height:80, width:80, position:'absolute', top:175, left:72, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/bell-pepper.png')} style={{height:80, width:80, position:'absolute', top:175, left:166, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/broccoli.png')} style={{height:80, width:80, position:'absolute', top:175, left:258, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/eggplant.png')} style={{height:80, width:80, position:'absolute', top:334, left:72, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/lettuce.png')} style={{height:80, width:80, position:'absolute', top:334, left:166, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/carrot.png')} style={{height:80, width:80, position:'absolute', top:334, left:258, zIndex:2}}   resizeMode="contain"/>
          <Hortavertical width="510" height="510" style={{marginRight:3, backgroundColor: '#fff'}} />
        </View>

        <View style={{transform: [{ scale: 0.88 }], justifyContent:'center',alignItems:'center'}}>
{/*           <Image source={require('../../assets/plantas/apple.png')} style={{height:80, width:80, position:'absolute', top:15, left:72, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/avocado.png')} style={{height:80, width:80, position:'absolute', top:15, left:166, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/bananas.png')} style={{height:80, width:80, position:'absolute', top:15, left:258, zIndex:2}}   resizeMode="contain"/> */}
          <Image source={require('../../assets/plantas/cucumber.png')} style={{height:80, width:80, position:'absolute', top:175, left:72, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/potato.png')} style={{height:80, width:80, position:'absolute', top:175, left:166, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/arugula.png')} style={{height:80, width:80, position:'absolute', top:175, left:258, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/cabbage.png')} style={{height:80, width:80, position:'absolute', top:334, left:72, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/bell-pepper.png')} style={{height:80, width:80, position:'absolute', top:334, left:166, zIndex:2}}   resizeMode="contain"/>
          <Image source={require('../../assets/plantas/potato.png')} style={{height:80, width:80, position:'absolute', top:334, left:258, zIndex:2}}   resizeMode="contain"/>
          <Hortavertical width="510" height="510" style={{marginRight:3, backgroundColor: '#fff'}} />
        </View>

  </Swiper>
  <View style={{alignItems: 'center', justifyContent: 'center', flex:1, flexDirection:'row',borderWidth: 0,borderColor: '#fff', borderRadius:30,marginTop:20, backgroundColor: '#fff', marginBottom:15, marginHorizontal:50, backgroundColor:'#538C51', paddingVertical:5}} >
                <EvilIcons 
                    name="plus"
                    color='#fff'
                    size={30}
                    style={{marginLeft:10}}
                />
                                  <Text style={{fontSize:20, color:'#fff'}} >Adicionar Plantio</Text>
        </View>

        
        
    
        
        <Text style={{fontSize:22, color:'#033301', marginBottom:20, marginTop:26, fontWeight:'bold', alignSelf:'center', marginLeft:0}} >Alimentos Proximos da colheita</Text>



                <Area style={{borderWidth:0.5,borderColor:'#ccc', elevation:6}} >
                <Image source={require('../../assets/plantas/apple.png')} style={{height:80, width:80}}   resizeMode="contain"/>
                    <InfoArea>
                        <UserName>Maçã Gala</UserName>
                        <Text style={{fontSize:12, marginTop:-7}} >6 dias</Text>

                        <SeeProfileButton>
                            <SeeProfileButtonText>SAIBA MAIS</SeeProfileButtonText>
                        </SeeProfileButton>
                    </InfoArea>
                    <View  style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', top: 18, right:25 }} >
                        <Text style={{fontSize:12}} >AGENDAR</Text>
                                        <EvilIcons 
                        name="calendar" 
                        color={'#000'}
                        size={22}
                        />

                    </View>
                </Area>





                <Area style={{borderWidth:0.5,borderColor:'#ccc', elevation:6}} >
                <Image source={require('../../assets/plantas/avocado.png')} style={{height:80, width:80}}   resizeMode="contain"/>
                    <InfoArea>
                        <UserName>Abacate</UserName>
                        <Text style={{fontSize:12, marginTop:-7}} >1 semana</Text>

                        <SeeProfileButton>
                            <SeeProfileButtonText>SAIBA MAIS</SeeProfileButtonText>
                        </SeeProfileButton>
                    </InfoArea>
                    <View  style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', top: 18, right:25 }} >
                        <Text style={{fontSize:12}} >AGENDAR</Text>
                                        <EvilIcons 
                        name="calendar" 
                        color={'#000'}
                        size={22}
                        />

                    </View>
                </Area>





                <Area style={{borderWidth:0.5,borderColor:'#ccc', elevation:6}} >
                <Image source={require('../../assets/plantas/bananas.png')} style={{height:80, width:80}}   resizeMode="contain"/>
                    <InfoArea>
                        <UserName>Banana Nanica</UserName>
                        <Text style={{fontSize:12, marginTop:-7}} >2 semanas</Text>

                        <SeeProfileButton>
                            <SeeProfileButtonText>SAIBA MAIS</SeeProfileButtonText>
                        </SeeProfileButton>
                    </InfoArea>
                    <View  style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', top: 18, right:25 }} >
                        <Text style={{fontSize:12}} >AGENDAR</Text>
                                        <EvilIcons 
                        name="calendar" 
                        color={'#000'}
                        size={22}
                        />

                    </View>
                </Area>









                <Text style={{fontSize:22, color:'#033301', marginBottom:20, marginTop:26, fontWeight:'bold', alignSelf:'center', marginLeft:0}} >Recomendados para Estação</Text>



<Area style={{borderWidth:0.5,borderColor:'#ccc', elevation:6, backgroundColor:'#fff'}} >
<Image source={require('../../assets/plantas/lettuce.png')} style={{height:60, width:60}}   resizeMode="contain"/>
    <InfoArea>
        <UserName>Alface</UserName>

        <SeeProfileButton>
            <SeeProfileButtonText>SAIBA MAIS</SeeProfileButtonText>
        </SeeProfileButton>
    </InfoArea>
    <View  style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', top: 18, right:25 }} >
        <Text style={{fontSize:12, marginRight:5}} >VERÃO</Text>
                        <Feather 
        name="sun" 
        color={'#000'}
        size={16}
        />

    </View>
</Area>

<Area style={{borderWidth:0.5,borderColor:'#ccc', elevation:6, backgroundColor:'#fff'}} >
<Image source={require('../../assets/plantas/carrot.png')} style={{height:60, width:60}}   resizeMode="contain"/>
    <InfoArea>
        <UserName>Cenoura</UserName>

        <SeeProfileButton>
            <SeeProfileButtonText>SAIBA MAIS</SeeProfileButtonText>
        </SeeProfileButton>
    </InfoArea>
    <View  style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', top: 18, right:25 }} >
        <Text style={{fontSize:12, marginRight:5}} >VERÃO</Text>
                        <Feather 
        name="sun" 
        color={'#000'}
        size={16}
        />

    </View>
</Area>
<Area style={{borderWidth:0.5,borderColor:'#ccc', elevation:6, backgroundColor:'#fff'}} >
<Image source={require('../../assets/plantas/eggplant.png')} style={{height:60, width:60}}   resizeMode="contain"/>
    <InfoArea>
        <UserName>Beringela</UserName>

        <SeeProfileButton>
            <SeeProfileButtonText>SAIBA MAIS</SeeProfileButtonText>
        </SeeProfileButton>
    </InfoArea>
    <View  style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', top: 18, right:25 }} >
        <Text style={{fontSize:12, marginRight:5}} >VERÃO</Text>
                        <Feather 
        name="sun" 
        color={'#000'}
        size={16}
        />

    </View>
</Area>




                

      </ScrollView>
  
      </View>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
    , backgroundColor: '#fff',
  },
});
