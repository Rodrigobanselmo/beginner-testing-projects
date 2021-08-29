import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import PastaItem from '../../components/PastaItem';
import {BoxShadow} from 'react-native-shadow'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useColor from '../../styles/useColor';
import LinearGradient from 'react-native-linear-gradient';
const ProfileScreen = () => {
    const [colors] = useColor();

    return (
<>
    <View style={[styles.Container_View, {backgroundColor: colors.background}]}>
        <StatusBar backgroundColor={colors.background || '#000'} barStyle={'light-content'}/>
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

{/*                 <FlatList 
                    data={[
                      {"arquivado": false, "edit": true, "id": 0.07693692276971298, "image": "laptop-code", "imageBack": "#2980b9", "list": [
                          {"backgroundColor": ["#E6BF49", "#8C6B06"], "body": "", "date": '2020-10-30T02:59:00.000Z', "finalizada": true, "id": 0.9099445748857613, "nunSub": 3, "ordem": 50, "para": '2020-10-15T02:59:00.000Z', "pausada": false, "progress": 0, "progressColor": "#DE9903", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "3"}, {"backgroundColor": ["#5C9557", "#2A4F27"], "body": "", "date": '2020-10-30T02:59:00.000Z', "finalizada": true, "id": 0.5207371423789706, "nunSub": 3, "ordem": 75, "para": '2021-01-31T02:59:00.000Z', "pausada": false, "progress": 0, "progressColor": "#118010", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "2"}, {"backgroundColor": ["#2471A3", "#154360"], "body": "", "date": '2020-10-30T02:59:00.000Z', "finalizada": true, "id": 0.9604545095442968, "nunSub": 3, "ordem": 100, "para": "Sem data prevista", "pausada": false, "progress": 0, "progressColor": "#2956E0", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "1"}, {"backgroundColor": ["#EE433D", "#7C0000"], "body": "", "date": '2020-10-30T02:59:00.000Z', "finalizada": true, "id": 0.8001125447883473, "nunSub": 3, "ordem": 25, "para": "Sem data prevista", "pausada": false, "progress": 0, "progressColor": "#D60813", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "4"}
                      ], "ordem": "5", "title": "React Native "},
                      {"arquivado": false, "edit": true, "id": 0.10189409643370906, "image": "graduation-cap", "imageBack": "#f39c12", "list": [], "ordem": "5", "title": "Projeto DA "}, 
                      {"arquivado": false, "id": 0.2951513038556135, "image": "hands-helping", "imageBack": "#16a085", "list": [], "ordem": "5", "title": "Comercial "}, 
                      {"arquivado": false, "id": 0.026160795247935353, "image": "font", "imageBack": "#ff0272", "list": [], "ordem": "5", "title": "Automação"}
                  ]}
                    style={styles.Pastas_FlatList}
                    contentContainerStyle={{paddingBottom:60}}
                    renderItem={({item, index})=>(
                        <PastaItem 
                            data={item}
                            index={index}
                            onPress={() => handleNotePress(index)}
                            colors={colors}
                        />
                    )}
                    keyExtractor={(item, index)=>index.toString()}
                />
 */}


        </View>
        
        </>
    );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  Container_View: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop:10
  },
  Pasta_View: {
      justifyContent: 'center',
      alignItems: 'center',
  },
  NoPasta_Text: {
      fontSize: 20,
  },
  Folder_View: {
      justifyContent:'flex-start',
      width: '100%',
      paddingHorizontal: 15,
      paddingBottom: 10,
      paddingTop: 0,
      flexDirection: 'row',  
  },
  Folder_Text: {
      fontSize: 21,
      fontWeight: 'normal',
  },
  Pastas_FlatList: {
      flex: 1,
      width: '100%',
  },
  Add_TouchableOpacity: {
      position: 'absolute',
      right: 35,
      bottom: 35,
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
  
  },
  Add_TouchableOpacityinside: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
  
  },
});