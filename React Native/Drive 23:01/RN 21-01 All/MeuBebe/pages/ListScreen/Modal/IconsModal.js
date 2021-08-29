import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
/* import todayImage from '../../assets/c3.jpg'; */
import LinearGradient from 'react-native-linear-gradient';

const icons_All = [
    'font',
    'gamepad',
    'glasses',
    'user-alt',
    'truck-moving',
    'toolbox',
    'thumbs-up',
    'anchor',
    'address-book',
    'ambulance',
    'apple-alt',
    'baby-carriage',
    'basketball-ball',
    'balance-scale',
    'beer',
    'battery-full',
    'bicycle',
    'bible',
    'birthday-cake',
    'biohazard',
    'book',
    'book-open',
    'brain',
    'briefcase-medical',
    'building',
    'car',
    'clock',
    'cogs',
    'crown',
    'dog',
    'folder',
    'football-ball',
    'grin',
    'hands-helping',
    'heart',
    'graduation-cap',
    'car-side',
    'laptop-code',
    'medal',
    'tshirt',
    'vial',
    'walking',
    'wrench',
    'atom',
    'syringe',
    'hammer',
    'user-md',
    'volleyball-ball',
    'percentage',
    'thermometer-three-quarters',
    'trophy',
    'university',]

export default (props) => {

    return (
        <View flex={1} backgroundColor='#262626'>

            <ScrollView>
{/*             <ImageBackground source={todayImage} style={{flex:1}}> */}
<LinearGradient style={{flex: 1}}  colors={['#375644','#7AA97F']} >
                <View style={styles.Container_View}>
                        {icons_All.map((d,k)=>
                            <TouchableOpacity key={k} style={styles.Icons_View} onPress={() => props.onPress(d)}>
                                <View >
                                    <Icon name={d} size={30} color='#fff' />
                                </View>
                            </TouchableOpacity>
                        )}
                </View>
{/*                 </ImageBackground> */}
</LinearGradient>
            </ScrollView>

        </View>
        
    );
}


const styles = StyleSheet.create({
    Container_View: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Icons_View: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        margin: 15,
        backgroundColor: 'transparent'
    },
    });