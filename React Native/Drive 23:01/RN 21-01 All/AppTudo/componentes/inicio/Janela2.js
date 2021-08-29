import styled from 'styled-components/native';
import React from 'react';

const Janela = styled.TouchableHighlight`
width:${props=>props.width || '300'}px;
background-color:${props=>props.bgcolor || 'red'};
margin:20px;
border-radius:100px;
justify-content:center;
align-items:center;
height: 80%;
${props=>props.style || null}
`;

const Texto = styled.Text`
    font-size:30px;
    color:#000;
`;

export default (props) => {
    
    return(
        <Janela bgcolor={props.bgcolor}>
            <>
            <Texto>{props.data}</Texto>
            </>
        </Janela>

    )
    


}