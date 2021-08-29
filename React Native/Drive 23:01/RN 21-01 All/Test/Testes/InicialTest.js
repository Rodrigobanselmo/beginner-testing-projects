

 import React, { useEffect, useState, useRef } from 'react';
 import { Dimensions, View, SafeAreaView, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
 ////
 
 
 
 
 export default () => {
 


     return (

       <View style={styles.View} >
          <TouchableHighlight onPress={()=>alert(1)}>
          <Text> Clicar </Text>
          </TouchableHighlight>
       </View>
     );
 }; 
 
 
 const styles = StyleSheet.create({
   View: {
     justifyContent: 'center',
     alignItems: 'center',
     flex: 1
   },
 });
 
 
 