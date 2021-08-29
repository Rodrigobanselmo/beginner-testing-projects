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
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Area = styled.TouchableOpacity`
    margin-bottom: 20px;
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
    color: #eee;
`;

const UserName2 = styled.Text`
    font-size: 14px;
    color: #eee;
    marginTop: -9px
`;

const SeeProfileButton = styled.View`
    width: 85px;
    height: 26px;
    border: 1px solid #04D9B2;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: #04D9B2;
`;


export default ({data, navigation}) => {
    return (

        <Area style={{elevation:6}} onPress={()=>navigation.navigate('Agricultor')} >
                    <LinearGradient style={{flexDirection: 'row', width:'100%',padding: 15,borderRadius: 20}} colors={['#363636','#202020']} >
            <Avatar source={{uri: data.avatar}} />
            <InfoArea>
                <UserName>{data.name} </UserName>
                <UserName2>{data.cargo} </UserName2>

                <SeeProfileButton>
                    <SeeProfileButtonText>Ver Perfil</SeeProfileButtonText>
                </SeeProfileButton>
            </InfoArea>
            {data.vendas == 1 ? 
            <View style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', bottom: 18, right:25 }} >
                <Ionicons style={{marginHorizontal:3}} name="logo-javascript" color={'#f0db4f'} size={16}/>
                <Ionicons style={{marginHorizontal:3}} name="logo-react" color={'#61dbfb'} size={16}/>
                <Ionicons style={{marginHorizontal:3}} name="logo-firebase" color={'#ffa611'} size={16}/>
        </View>
            : 
            data.vendas == 2 ? 
            <View style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', bottom: 18, right:25 }} >
                <Ionicons style={{marginHorizontal:3}} name="logo-javascript" color={'#f0db4f'} size={16}/>
                <Ionicons style={{marginHorizontal:3}} name="logo-react" color={'#61dbfb'} size={16}/>
            </View>
            : 
            data.vendas == 3 ? 
            <View style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', bottom: 18, right:25 }} >
                <Ionicons style={{marginHorizontal:3}} name="logo-wordpress" color={'#21759b'} size={16}/>
                <Ionicons style={{marginHorizontal:3}} name="logo-python" color={'#00ff00'} size={16}/>
                <Ionicons style={{marginHorizontal:3}} name="logo-firebase" color={'#ffa611'} size={16}/>
            </View>
            : 
            <View style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', bottom: 18, right:25 }} >
                <Ionicons style={{marginHorizontal:3}} name="logo-wordpress" color={'#21759b'} size={16}/>
                <Ionicons style={{marginHorizontal:3}} name="logo-javascript" color={'#f0db4f'} size={16}/>
                <Ionicons style={{marginHorizontal:3}} name="logo-react" color={'#61dbfb'} size={16}/>
                <Ionicons style={{marginHorizontal:3}} name="logo-firebase" color={'#ffa611'} size={16}/>
        </View>
            }
            {data.stars > 4.7 ?
            <View  style={{marginTop:0,marginLeft:0, flexDirection: 'row', position: 'absolute', top: 18, right:25 }} >
                <Entypo 
                name="star" 
                color={'#04D9B2'}
                size={20}
                />
            </View>
                : null}
            </LinearGradient>
        </Area>
    );
}