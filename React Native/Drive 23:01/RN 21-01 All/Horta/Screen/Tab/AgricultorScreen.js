import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import Stars from '../../components/Barber/Stars';
/* import BarberModal from '../../components/BarberModal'; */

import FavoriteFullIcon from '../../assets/favorite_full.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

import {
    Container,
    Scroller,
    PageBody,
    BackButton,
    LoadingIcon,

    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    FakeSwiper,

    UserInfoArea,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton,

    ServiceArea,
    ServicesTitle,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicePrice,
    ServiceChooseButton,
    ServiceChooseBtnText,

    TestimonialArea,
    TestimonialItem,
    TestimonialInfo,
    TestimonialName,
    TestimonialBody
} from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Note from '../../assets/note.svg' ;
import Entypo from 'react-native-vector-icons/Entypo';

export default ({route}) => {
    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width
    console.log(route)
    const [userInfo, setUserInfo] = useState({
        id: 'route.params.id',
        avatar: route.params.data.avatar,
        name: route.params.data.name,
        stars: route.params.data.stars,
        testimonials: [{name: 'Rodrigo', rate: 5, body: 'Rodrigo amou o seu trbalho, continue assim'},{name: 'Andrew', rate: 5, body: 'Rodrigo amou o seu trbalho, continue assim'},{name: 'Carlos', rate: 5, body: 'Rodrigo amou o seu trbalho, continue assim'}],
        services: [{name:'Batata', price:10.99},{name:'Batata', price:10.99},{name:'Batata', price:10.99},{name:'Batata', price:10.99},{name:'Batata', price:10.99},{name:'Batata', price:10.99},{name:'Batata', price:10.99},{name:'Batata', price:10.99},{name:'Batata', price:10.99},{name:'Batata', price:10.99}],
        /* photos: [{url:'https://www.comprerural.com/wp-content/uploads/2019/09/propriedade-rural-640x355.jpg'},{url:'https://www.comprerural.com/wp-content/uploads/2019/09/propriedade-rural-640x355.jpg'},{url:'https://www.comprerural.com/wp-content/uploads/2019/09/propriedade-rural-640x355.jpg'}] */
    });
    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        const getBarberInfo = async () => {
            setLoading(true);
/* 
            let json = await Api.getBarber(userInfo.id);
            if(json.error == '') {
                setUserInfo(json.data);
                setFavorited(json.data.favorited);
            } else {
                alert("Erro: "+json.error);
            } */

            setTimeout(() => {
                setLoading(false);
            }, 1000); 
        }
        getBarberInfo();
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
    }

    const handleFavClick = () => {
        setFavorited( !favorited );
    }

    const handleServiceChoose = (key) => {
        setSelectedService(key);
        setShowModal(true);
    }

    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
                    <Swiper
                        style={{height: 240}}
                        dot={<SwipeDot />}
                        activeDot={<SwipeDotActive />}
                        paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                        autoplay={true}
                        autoplayTimeout={5}
                    >
                        {userInfo.photos.map((item, key)=>(
                            <SwipeItem key={key}>
                                <SwipeImage source={{uri:item.url}} resizeMode="cover" />
                            </SwipeItem>
                        ))}
                    </Swiper>
                    :
                    <FakeSwiper>

<View style={{flexDirection:'row', alignItems:'center', width:'100%', flex:1, justifyContent:'flex-end', marginBottom:85}}>
                <View style={{backgroundColor:'#cc0000', borderRadius:15, height:18, width:18, alignItems:'center', justifyContent:'center', marginRight:-40, marginBottom:18, zIndex:1}}>
                    <Text style={{color:'#fff', fontSize:12}}>1</Text>
                </View>
              <MaterialCommunityIcons.Button name="shopping-outline" size={25} backgroundColor="#055902" color='#fff' onPress={() => navigation.openDrawer()}/> 
                </View>
                    </FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{uri:userInfo.avatar}} />
                        <UserInfo>
                            <UserInfoName>{userInfo.name}</UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true} />
                        </UserInfo>
                        <UserFavButton onPress={handleFavClick}>
                            {favorited ?
                                <FavoriteFullIcon width="24" height="24" fill="#FF0000" />
                                :
                                <FavoriteIcon width="24" height="24" fill="#FF0000" />
                            }
                        </UserFavButton>
                    </UserInfoArea>

                    {loading &&
                        <LoadingIcon size="large" color="#000000" />
                    }

                    {userInfo.services &&
                    <>
                        <ServiceArea>
                            <Text style={{fontSize:25, fontWeight:'bold', color:'#055902', marginLeft:10, marginBottom:10, marginTop:20}}>Frutas</Text>

                        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} marginBottom={30}>
                                <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                    <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                        <Image source={require('../../assets/plantas/apple.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#27ae60', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                        <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Frutas</Text>
                                        <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Maça</Text>
                                        <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                             <Stars stars={4.5} showNumber={false} />
                                        </View>
                                        <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                            <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:14, color:'#fff', fontWeight:'bold' }}>12,90 Kg</Text>
                                            <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                        </View>
                                    </View>
                                </View>

                                <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                    <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                        <Image source={require('../../assets/plantas/avocado.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#27ae60', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                        <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Frutas</Text>
                                        <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Abacate</Text>
                                        <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                             <Stars stars={4.5} showNumber={false} />
                                        </View>
                                        <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                            <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:14, color:'#fff', fontWeight:'bold' }}>19,90 Kg</Text>
                                            <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                        </View>
                                    </View>
                                </View>

                                <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                    <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                        <Image source={require('../../assets/plantas/berry.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#27ae60', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                        <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Frutas</Text>
                                        <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Cereja</Text>
                                        <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                             <Stars stars={4.5} showNumber={false} />
                                        </View>
                                        <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                            <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:14, color:'#fff', fontWeight:'bold' }}>50,00 Kg</Text>
                                            <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                        </View>
                                    </View>
                                </View>

                                <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                    <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                        <Image source={require('../../assets/plantas/bananas.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#27ae60', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                        <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Frutas</Text>
                                        <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Banana</Text>
                                        <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                             <Stars stars={4.5} showNumber={false} />
                                        </View>
                                        <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                            <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:4, color:'#fff', fontWeight:'bold' }}>9,90</Text>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:14, color:'#fff', fontWeight:'bold'}}>Duzia</Text>
                                            <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                        </View>
                                    </View>
                                </View>
    
                        </ScrollView>

                        </ServiceArea>


                        <ServiceArea>
                        <Text style={{fontSize:25, fontWeight:'bold', color:'#055902', marginLeft:10, marginBottom:10, marginTop:20}}>Verduras</Text>

                        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} marginBottom={30}>
                            <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                    <Image source={require('../../assets/plantas/lettuce.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                </View>
                                <View style={{flex:1,backgroundColor:'#538C51', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                    <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Verduras</Text>
                                    <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Alface</Text>
                                    <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                        <Stars stars={4.5} showNumber={false} />
                                    </View>
                                    <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                        <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                        <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:14, color:'#fff', fontWeight:'bold' }}>12,90 Kg</Text>
                                        <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                    </View>
                                </View>
                            </View>

                            <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                    <Image source={require('../../assets/plantas/broccoli.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                </View>
                                <View style={{flex:1,backgroundColor:'#538C51', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                    <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Verduras</Text>
                                    <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Brocolis</Text>
                                    <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                        <Stars stars={4.5} showNumber={false} />
                                    </View>
                                    <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                        <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                        <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:14, color:'#fff', fontWeight:'bold' }}>19,90 Kg</Text>
                                        <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                    </View>
                                </View>
                            </View>

                            <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                    <Image source={require('../../assets/plantas/cabbage.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                </View>
                                <View style={{flex:1,backgroundColor:'#538C51', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                    <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Verduras</Text>
                                    <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Repolho</Text>
                                    <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                        <Stars stars={4.5} showNumber={false} />
                                    </View>
                                    <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                        <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                        <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:14, color:'#fff', fontWeight:'bold' }}>50,00 Kg</Text>
                                        <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                    </View>
                                </View>
                            </View>

                            <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                    <Image source={require('../../assets/plantas/arugula.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                </View>
                                <View style={{flex:1,backgroundColor:'#538C51', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                    <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Verduras</Text>
                                    <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Rúcula</Text>
                                    <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                        <Stars stars={4.5} showNumber={false} />
                                    </View>
                                    <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                        <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                        <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:4, color:'#fff', fontWeight:'bold' }}>9,90</Text>
                                        <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:14, color:'#fff', fontWeight:'bold'}}>Duzia</Text>
                                        <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                    </View>
                                </View>
                            </View>

                        </ScrollView>

                        </ServiceArea>


                        <ServiceArea>
                            <Text style={{fontSize:25, fontWeight:'bold', color:'#055902', marginLeft:10, marginBottom:10, marginTop:20}}>Legumes</Text>

                        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} marginBottom={30}>
                                <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                    <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                        <Image source={require('../../assets/plantas/eggplant.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#4F7302', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                        <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Legumes</Text>
                                        <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Berinjela</Text>
                                        <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                             <Stars stars={4.5} showNumber={false} />
                                        </View>
                                        <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                            <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:14, color:'#fff', fontWeight:'bold' }}>12,90 Kg</Text>
                                            <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                        </View>
                                    </View>
                                </View>

                                <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                    <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                        <Image source={require('../../assets/plantas/bell-pepper.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#4F7302', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                        <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Legumes</Text>
                                        <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Pimentão</Text>
                                        <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                             <Stars stars={4.5} showNumber={false} />
                                        </View>
                                        <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                            <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:14, color:'#fff', fontWeight:'bold' }}>19,90 Kg</Text>
                                            <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                        </View>
                                    </View>
                                </View>

                                <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                    <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                        <Image source={require('../../assets/plantas/cucumber.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#4F7302', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                        <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Legumes</Text>
                                        <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Pepino</Text>
                                        <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                             <Stars stars={4.5} showNumber={false} />
                                        </View>
                                        <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                            <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:14, color:'#fff', fontWeight:'bold' }}>50,00 Kg</Text>
                                            <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                        </View>
                                    </View>
                                </View>

                                <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                    <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                        <Image source={require('../../assets/plantas/bananas.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#4F7302', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                        <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Legumes</Text>
                                        <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Banana</Text>
                                        <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                             <Stars stars={4.5} showNumber={false} />
                                        </View>
                                        <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                            <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:4, color:'#fff', fontWeight:'bold' }}>9,90</Text>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:14, color:'#fff', fontWeight:'bold'}}>Duzia</Text>
                                            <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                        </View>
                                    </View>
                                </View>
    
                        </ScrollView>

                        </ServiceArea>


                        <ServiceArea>
                            <Text style={{fontSize:25, fontWeight:'bold', color:'#055902', marginLeft:10, marginBottom:10, marginTop:20}}>Raizes</Text>

                        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} marginBottom={30}>
                                <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                    <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                        <Image source={require('../../assets/plantas/carrot.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#81A680', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                        <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Raizes</Text>
                                        <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Cenoura</Text>
                                        <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                             <Stars stars={4.5} showNumber={false} />
                                        </View>
                                        <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                            <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:14, color:'#fff', fontWeight:'bold' }}>12,90 Kg</Text>
                                            <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                        </View>
                                    </View>
                                </View>

                                <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                    <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                        <Image source={require('../../assets/plantas/potato.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#81A680', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                        <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Raizes</Text>
                                        <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Batata</Text>
                                        <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                             <Stars stars={4.5} showNumber={false} />
                                        </View>
                                        <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                            <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:14, color:'#fff', fontWeight:'bold' }}>19,90 Kg</Text>
                                            <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                        </View>
                                    </View>
                                </View>

                                <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                    <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                        <Image source={require('../../assets/plantas/berry.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#81A680', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                        <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Raizes</Text>
                                        <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Cereja</Text>
                                        <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                             <Stars stars={4.5} showNumber={false} />
                                        </View>
                                        <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                            <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:14, color:'#fff', fontWeight:'bold' }}>50,00 Kg</Text>
                                            <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                        </View>
                                    </View>
                                </View>

                                <View style={{height:250, width: screenWidth/2.3,backgroundColor:'#fff', justifyContent:'flex-start', alignItems:'center', marginHorizontal:10, paddingTop:40, paddingRight:20, marginRight:-5}}>
                                    <View style={{height:150, width: 150,backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:80, position:'absolute',top:-20,right:0, zIndex:1}}>
                                        <Image source={require('../../assets/plantas/bananas.png')} style={{height:190, width:screenWidth/4, marginBottom:-20, marginLeft:-10}}   resizeMode="contain"/>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#81A680', justifyContent:'flex-end', borderRadius:20, alignItems:'center', width:'100%'}}>
                                        <Text style={{marginLeft:15,fontSize:12, alignSelf:'flex-start', color:'#fff'}}>Raizes</Text>
                                        <Text style={{marginLeft:15,fontSize:20, alignSelf:'flex-start', color:'#fff', fontWeight:'bold'}}>Banana</Text>
                                        <View style={{marginLeft:-70, marginTop:3, transform: [{ scale: 0.65 }]}}>
                                             <Stars stars={4.5} showNumber={false} />
                                        </View>
                                        <View style={{marginLeft:-5,flexDirection:'row', marginBottom:15, justifyContent:'center', marginTop:8}}>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:4, color:'#fff', fontWeight:'bold'}}>R$</Text>
                                            <Text style={{fontSize:16, alignSelf:'flex-start', marginRight:4, color:'#fff', fontWeight:'bold' }}>9,90</Text>
                                            <Text style={{fontSize:11, alignSelf:'flex-start',marginTop:6, marginRight:14, color:'#fff', fontWeight:'bold'}}>Duzia</Text>
                                            <Entypo  name="arrow-long-right" color={'#fff'} size={20} style={{marginTop:4 }}/>
                                        </View>
                                    </View>
                                </View>
    
                        </ScrollView>

                        </ServiceArea>


                        </>

                        
                    }

                    {userInfo.testimonials && userInfo.testimonials.length > 0 &&
                        <View style={{marginBottom:20,marginTop:20}}>
                            <Swiper
                                style={{height: 150, paddingTop:20}}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<NavPrevIcon width="35" height="35" fill="#000000" />}
                                nextButton={<NavNextIcon width="35" height="35" fill="#000000" />}
                            > 
                                {userInfo.testimonials.map((item, key)=>(
                                    <TestimonialItem key={key}>
                                        <TestimonialInfo>
                                            <TestimonialName>{item.name}</TestimonialName>
                                            <Stars stars={item.rate} showNumber={false} />
                                        </TestimonialInfo>
                                        <TestimonialBody>{item.body}</TestimonialBody>
                                    </TestimonialItem>
                                ))}
                            </Swiper>
                        </View>
                    }
                </PageBody>
            </Scroller>
            <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButton>
            
{/*             <BarberModal
                show={showModal}
                setShow={setShowModal}
                user={userInfo}
                service={selectedService}
            /> */}
        </Container>
    );
}