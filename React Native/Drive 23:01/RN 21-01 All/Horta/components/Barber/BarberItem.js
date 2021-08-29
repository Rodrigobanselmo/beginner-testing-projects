import React from 'react';
import styled from 'styled-components/native';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    Platform,
    StyleSheet,
    Image,
    ImageBackground,
} from 'react-native';
import Stars from './Stars';
import Entypo from 'react-native-vector-icons/Entypo';

const Area = styled.TouchableOpacity`
    background-color: #FFFFFF;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
    width:95%; 
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
    width: 85px;
    height: 26px;
    border: 1px solid #4EADBE;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: #268596;
`;


export default ({data, navigation}) => {
    return (
        <Area style={{borderWidth:0.5,borderColor:'#ccc', elevation:6}} onPress={()=>navigation.navigate('AgricultorScreen', {data:data})} >
            <Avatar source={{uri: data.avatar}} />
            <InfoArea>
                <UserName>{data.name} </UserName>

                <Stars stars={data.stars} showNumber={true} />

                <SeeProfileButton>
                    <SeeProfileButtonText>Ver Perfil</SeeProfileButtonText>
                </SeeProfileButton>
            </InfoArea>
            {data.vendas == 1 ? 
            <View style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', bottom: 18, right:25 }} >
            <Image source={require('../../assets/vegetable.png')} resizeMode='contain' style={{width: 16, height: 16, marginHorizontal:3}}/>
        </View>
            : 
            data.vendas == 2 ? 
            <View style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', bottom: 18, right:25 }} >
                <Image source={require('../../assets/vegetable.png')} resizeMode='contain' style={{width: 16, height: 16, marginHorizontal:3}}/>
                <Image source={require('../../assets/fruits.png')} resizeMode='contain' style={{width: 16, height: 16, marginHorizontal:3}}/>
            </View>
            : 
            data.vendas == 3 ? 
            <View style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', bottom: 18, right:25 }} >
                <Image source={require('../../assets/vegetable.png')} resizeMode='contain' style={{width: 16, height: 16, marginHorizontal:3}}/>
                <Image source={require('../../assets/fruits.png')} resizeMode='contain' style={{width: 16, height: 16, marginHorizontal:3}}/>
                <Image source={require('../../assets/hen.png')} resizeMode='contain' style={{width: 16, height: 16, marginHorizontal:3}}/>
            </View>
            : 
            <View style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', bottom: 18, right:25 }} >
            <Image source={require('../../assets/vegetable.png')} resizeMode='contain' style={{width: 16, height: 16, marginHorizontal:3}}/>
            <Image source={require('../../assets/fruits.png')} resizeMode='contain' style={{width: 16, height: 16, marginHorizontal:3}}/>
            <Image source={require('../../assets/hen.png')} resizeMode='contain' style={{width: 16, height: 16, marginHorizontal:3}}/>
            <Image source={require('../../assets/pepper.png')} resizeMode='contain' style={{width: 16, height: 16, marginHorizontal:3}}/>
        </View>
            }
            <View  style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', top: 18, right:25 }} >
                <Entypo 
                name="location-pin" 
                color={'#000'}
                size={16}
                />
                <Text style={{fontSize:12}} >{`${data.location} km`}</Text>
            </View>
        </Area>
    );
}