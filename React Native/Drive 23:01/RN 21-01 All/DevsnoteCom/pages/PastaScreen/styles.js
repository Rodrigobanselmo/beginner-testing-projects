/* import styled from 'styled-components/native';


export const NoNotesText = styled.Text`
font-size: 20px;
color: #04dcbc;
`;

export const Box = styled.TouchableHighlight`
padding: 15px;
border-style: solid;
border-bottom-color: #222;
border-bottom-width: 1px;
`; */

import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
background-color: #333;
justify-content: center;
align-items: center;
`;

export const AddButton  = styled.TouchableHighlight`
margin-right: 15px;
`;


export const AddButtonImage  = styled.Image`
width: 24px;
height: 24px;
`;

export const NotesList = styled.FlatList`
flex: 1;
width: 100%;
`;

export const NoNotes = styled.View`
justify-content: center;
align-items: center;
`;

export const NoNotes1 = styled.View`
`;

export const NoNotesImage = styled.Image`
width: 50px;
height: 50px;
`;

export const NoNotesText = styled.Text`
font-size: 20px;
color: #04dcbc;
`;

export const TitleInput  = styled.TextInput`
font-size: 20px;
font-weight: bold;
padding: 15px;
color: #FFF;
`;

export const AddButtons  = styled.TouchableHighlight`
margin-right: 15px;
`;

export const DeleteButtonText  = styled.Text`
font-size: 14px;
color: #FFF;
`;

export const DeleteButton  = styled.TouchableHighlight`
height: 40px;
background-color: #FF3333;
justify-content: center;
align-items: center;
`;