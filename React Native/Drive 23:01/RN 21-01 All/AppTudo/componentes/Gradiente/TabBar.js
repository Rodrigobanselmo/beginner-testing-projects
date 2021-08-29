import React, {useState} from 'react';
import { SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';

const TabBarArea = styled.SafeAreaView`
    flex-direction:row;
    background-color:#000;
    justify-content:center;
    align-items:center;
    
`;
const TabBarItem = styled.View`
    flex:1;
    height:65px;
    align-items:center;
    justify-content:center;
`;
const TabImage = styled.Image`
    width:25px;
    height:25px;
    margin-top:10px;
    margin-bottom:5px;
`;
const TabRegular = styled.TouchableHighlight`
    align-items:center;

`;

const Texto = styled.Text`
    color:#FFF;

`;

const CustomTabBar = props => {

        const [focus, setfocus] = useState(1)

    const go = (route) => {
        props.navigation.navigate(route);
        setfocus(1)
    }
    const go1 = (route) => {
        props.navigation.navigate(route);
        setfocus(2)
    }
    const go2 = (route) => {
        props.navigation.navigate(route);
        setfocus(3)
    }

    let tabs = props.items.map(item=>{
        return (
            <TabBarItem key={item.route}>
                {item.route == 'GradienteStack' &&
                    <TabRegular underlayColor="transparent" onPress={()=>go(item.route) }>
                        <>
                        {(focus == 1) && 
                            <TabImage source={item.icon} />
                        }
                            <Texto>{item.text}</Texto> 
                        </>
                    </TabRegular>
                }
                                {item.route == 'GradienteStack2' &&
                    <TabRegular underlayColor="transparent" onPress={()=>go1(item.route)}>
                        <>
                        {(focus == 2) && 
                            <TabImage source={item.icon} />
                        }
                            <Texto>{item.text}</Texto> 
                        </>
                    </TabRegular>
                }
                                {item.route == 'GradienteStack3' &&
                    <TabRegular underlayColor="transparent" onPress={()=>go2(item.route)}>
                        <>
                        {(focus == 3) && 
                            <TabImage source={item.icon} />
                        }
                            <Texto>{item.text}</Texto> 
                        </>
                    </TabRegular>
                }
            </TabBarItem>
        );
    });

    return (
        <TabBarArea>
            {tabs}
        </TabBarArea>
    )
}

export default CustomTabBar;








/* 

import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

function CustomTabBar(props) {

    return (
        <View style={styles.container}>
            {props.items.map((item, index) => {
                const options = item;

                let label = item.name;
                if(options.text != undefined) {
                    label = options.text;
                } else if(options.title != undefined) {
                    label = options.title;
                }

                const isFocused = props.items[index].index == index;

                const go = (route) => {
                    props.navigation.navigate(route);
                    alert(props.items[index].index)
                }

                if(item.route == 'GradienteStack1') {
                    return (
                        <TouchableHighlight key={index} style={styles.middleTab} onPress={()=>go(item.route)}>
                            <Text style={[styles.label, isFocused?styles.labelFocused:null]}>{label}</Text>
                        </TouchableHighlight>
                    );
                } else {
                    return (
                        <TouchableHighlight key={index} underlayColor="transparent" style={styles.tab} onPress={()=>go(item.route)}>
                            <Text style={[styles.label, isFocused?styles.labelFocused:null]}>{label}</Text>
                        </TouchableHighlight>
                    );
                }
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: '#CCC'
    },
    tab:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:50
    },
    middleTab:{
        justifyContent:'center',
        alignItems:'center',
        width: 70,
        height:70,
        backgroundColor:'#00FF00',
        marginTop: -20,
        borderRadius: 35
    },
    label:{
        fontSize:16,
        color:'#FF0000'
    },
    labelFocused:{
        fontSize:16,
        color:'#0000FF'
    }
});

export default CustomTabBar; */