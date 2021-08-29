import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const colors_All = ['#3587F2','#67BF5E','#FEBD03','#ff5049']
const colors_AllProgress = ['#2956E0','#118010','#DE9903','#D60813']

export default (props) => {
    


    return (
        <View  backgroundColor='#fff'>
                <View style={styles.Container_View}>
                            <TouchableOpacity   onPress={() => props.onPress(colors_All[0],0,colors_AllProgress[0])}>
                                <View style={[styles.Colors_View,{marginLeft: 20}]} >
                                     <Icon  style={styles.Icons_Text} name='emoji-flirt' size={30} color={ props.pickPrior[0] == 1 ? colors_All[0] : '#bbb'} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity   onPress={() => props.onPress(colors_All[1],1,colors_AllProgress[1])}>
                                <View style={[styles.Colors_View]} >
                                     <Icon  style={styles.Icons_Text} name='emoji-happy' size={30} color={ props.pickPrior[1] == 1 ? colors_All[1] : '#bbb'} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity   onPress={() => props.onPress(colors_All[2],2,colors_AllProgress[2])}>
                                <View style={[styles.Colors_View]} >
                                     <Icon  style={styles.Icons_Text} name='emoji-neutral' size={30} color={props.pickPrior[2] == 1 ? colors_All[2] : '#bbb'} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity   onPress={() => props.onPress(colors_All[3],3,colors_AllProgress[3])}>
                                <View style={[styles.Colors_View,{marginRight: 20}]} >
                                     <Icon  style={styles.Icons_Text} name='emoji-sad' size={30} color={props.pickPrior[3] == 1 ? colors_All[3] : '#bbb'} />
                                </View>
                            </TouchableOpacity>
                </View>
        </View>
        
    );
}


const styles = StyleSheet.create({
    Container_View: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    Icons_View: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    Icons_Text: {
    },
    Colors_View: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        marginVertical: 13,
        marginHorizontal: 5,
        borderRadius: 15,


    },
    });