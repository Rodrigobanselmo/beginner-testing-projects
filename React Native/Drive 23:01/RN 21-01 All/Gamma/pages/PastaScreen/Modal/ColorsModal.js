import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';

const colors_All = [,'#16a085','#27ae60','#375644','#005327','#037F8C','#2980b9','#1020ac','#f1c40f','#f39c12','#d35400','#ff0272','#c0392b','#ff0202','#2c3e50','#3b3a3e','#262626','#000',]

const colors_All_Light = [,'#16a085','#27ae60','#375644','#005327','#037F8C','#2980b9','#1020ac','#f1c40f','#f39c12','#d35400','#ff0272','#c0392b','#ff0202','#2c3e50','#3b3a3e','#262626','#000',]

export default (props) => {

    return (
        <View  backgroundColor={props.colors.modalBack}>
            <ScrollView horizontal={true} keyboardShouldPersistTaps='handled'>
                <View style={styles.Container_View}>
                        {colors_All.map((d,k)=>
                            <TouchableOpacity key={k}  onPress={() => props.onPress(d)}>
                                <View style={styles.Colors_View}  backgroundColor={d} ></View>
                            </TouchableOpacity>
                        )}
                </View>
            </ScrollView>
        </View>
        
    );
}


const styles = StyleSheet.create({
    Container_View: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Icons_View: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        backgroundColor: 'transparent'
    },
    Colors_View: {
        width: 30,
        height: 30,
        margin: 15,
        borderRadius: 15,


    },
    });