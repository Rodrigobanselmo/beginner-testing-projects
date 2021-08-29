/* eslint-disable no-unused-vars */
import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import useReactModal from '../../components/modalComponents/ReactModal';


export default function App() {
  
  const [MainModal,onModalVisible] = useReactModal();
  
  return (
    <SafeAreaView style={{justifyContent:"center",alignItems:"center",flex:1}}>
      <MainModal/>
      <TouchableOpacity onPress={()=>onModalVisible(true,'loaderText')}>
        <Text>Enviar</Text>
      </TouchableOpacity>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({});
