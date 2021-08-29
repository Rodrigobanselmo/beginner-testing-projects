import React from 'react'
import { View, Text,SafeAreaView, ScrollView,TouchableWithoutFeedback } from 'react-native'
import styled from "styled-components";
import Toast from 'react-native-toast-message';

const SafeContainer = styled.SafeAreaView`
  display: flex;
  flex: 1;
  padding-top: ${({theme})=>theme.statusHeight}px;
`;

export default function Splash() {
  
  // React.useEffect(() => {
  //   Toast.show({
  //     text1: 'Hellow',
  //     text2: 'This is some something 👋'
  //   });
  // }, []);
  
  return (
    <SafeContainer >
      <View  style={{display:'flex',flex:1}}>
        <Text >
          Oi
        </Text>
        <Text >
          Oi
        </Text>
        <Text >
          Oi
        </Text>
        <Text onPress={()=>Toast.show({text1: 'Hellow',text2: 'This is some something 👋',topOffset: 45,})}>
          Oi2222
        </Text>
        <ScrollView>
          <View style={{height:1000,width:300}}></View>
        </ScrollView>
      </View>
    </SafeContainer>
  )
}
