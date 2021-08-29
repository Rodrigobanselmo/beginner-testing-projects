import styled from 'styled-components';
import {StyleSheet} from 'react-native';

export const TouchableHighlight_Box = styled.TouchableHighlight`
padding: 15px;
borderRadius: 10px;
`;

export const Text_Title = styled.Text`
font-size: 22px;
marginBottom: 0px;
fontWeight: bold;
paddingLeft:17px;
`;

export const Text_SubTitle = styled.Text`
font-size: 14px;
color: grey;

paddingLeft:17px;
`;

export const Text_SubSubTitle = styled.Text`
font-size: 14px;
paddingTop: -8px;
paddingLeft:-8px;
`;

export const View_Box = styled.View`
padding: 15px;
margin: 10px;
border-style: solid;
border-color: #222;
border-width: 1px;
borderRadius: 10px;
`;

export const View_Ciculos = styled.View`
height: 10px;
width: 10px;
borderRadius: 5px;
marginRight: 15px;
`;

export const View_Components = styled.View`

`;

export const styles = StyleSheet.create({
    TouchableHighlight: {
        margin: 10,
        borderRadius: 10,
        
        
    },
});

