import styled from 'styled-components/native';
import React from 'react';

const Janela = styled.TouchableHighlight`
width:100%;
background-color:${props=>props.bgcolor || 'red'};
margin-top:15px;
border-radius:100px;
justify-content:center;
align-items:center;
height: 50px;
${props=>props.style || null}
`;

const Texto = styled.Text`
    font-size:17px;
    color:#FFF;
`;

export default (props) => {
    
    
    return(
        <Janela bgcolor={props.bgcolor} onPress={props.irtela}>
            <Texto>{props.data}</Texto>
        </Janela>

    )
    


}