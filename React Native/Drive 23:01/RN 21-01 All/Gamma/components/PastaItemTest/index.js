import React, {useState} from 'react';
import { View_Ciculos, Text_Title, TouchableHighlight_Box, View_Components,Text_SubTitle } from './styles';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

export default ({ data, index, onPress,setIcon,colors }) => {

    return (
        
        <View flex={1} style={[styles.square]} marginHorizontal={15}>
            <LinearGradient style={[styles.square,styles.TouchableHighlight]}  colors={[colors.Box1 || '#333',colors.Box2 || '#333']} >
            <TouchableHighlight_Box underlayColor={colors.UnderBox} onPress={onPress ? ()=>onPress(index) : null}>
                <>
                
                <View_Components flexDirection='row' justifyContent={'space-around'}>

                <TouchableOpacity onPress={setIcon} >
                    <View style={styles.Icons_View}  backgroundColor={colors.CaixaIconSelecionado|| '#fff'} >
                            {data.image !=='font'?
                            <FontAwesome5 name={data.image} size={data.image == 'university' ? 48 : 42} color={data.imageBack} />
                            :
                            <Text style={{color: data.imageBack, fontSize: 49 }}>{data.title == '' ? '' : data.title.substring(1,-2).toUpperCase()}</Text>
                            }
                    </View>
                </TouchableOpacity>
                    <View_Components flex={1} alingItens='center' justifyContent='center' >
                        <View_Components flex={1} alingItens='center' justifyContent='center' >     
                            <Text_Title style={{color: colors.Pasta_Text}}>{data.title}</Text_Title>
                            <Text_SubTitle style={{color: colors.Pasta_subText}}>{`Você tem ${data.list ? data.list.length : 0} tarefas pendentes:`}</Text_SubTitle>
                        </View_Components>
                    </View_Components>
                    <Entypo style={{marginRight:-20}} name="dots-three-vertical" color='#fff' size={25} backgroundColor="transparent" > </Entypo>
                </View_Components>
                        </>
            </TouchableHighlight_Box>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    square: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.62,
        shadowRadius: 8.22,
        elevation: 6,
    },
    square1: {
        paddingVertical: 100,
    },
    Icons_View: {
        justifyContent: 'center',
        alignItems: 'center',
        width:65,
        height: 65,
        borderRadius: 5
    },
    TouchableHighlight: {
        margin: 10,
        borderRadius: 10,
    },
    right: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 20
    },
    left: {
        flex: 1,
        paddingVertical: 10,
        paddingRight:'20%'
    },
    leftInside: {
        flex: 1,
        backgroundColor: '#005327',
        flexDirection: 'row',
        alignItems: 'center',
    },
    excludeIcon: {
        marginLeft: 30
    },
    excludeText: {
        color: '#FFF',
        fontSize: 20,
        margin: 10
    }
  });
  