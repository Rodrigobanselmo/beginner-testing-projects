import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';

const TabBarArea = styled.SafeAreaView`
    flex-direction:row;
    background-color:#CCC;
`;
const TabBarItem = styled.View`
    flex:1;
    height:65px;
    align-items:center;
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
const TabBall = styled.TouchableHighlight`
    width:100px;
    height:100px;
    background-color:#08088A;
    border-radius:50px;
    margin-top:-50px;
    justify-content:center;
    align-items:center;
    border:5px solid #FFF;
`;
const TabBallImage = styled.Image`
    width:40px;
    height:40px;
`;

const CustomTabBar = props => {

    const go = (route) => {
        props.navigation.navigate(route);
    }

    let tabs = props.items.map(item=>{
        return (
            <TabBarItem key={item.route}>
                {item.type == 'regular' &&
                    <TabRegular underlayColor="transparent" onPress={()=>go(item.route)}>
                        <>
                            <TabImage source={item.icon} />
                            <Text>{item.text}</Text>
                        </>
                    </TabRegular>
                }
                {item.type == 'big' &&
                    <TabBall underlayColor="#4000FF" onPress={()=>go(item.route)}>
                        <TabBallImage source={item.icon} />
                    </TabBall>                    
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