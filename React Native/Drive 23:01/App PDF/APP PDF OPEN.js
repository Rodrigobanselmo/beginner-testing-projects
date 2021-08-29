import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Dimensions
} from 'react-native';
import Pdf from 'react-native-pdf';
// Import HTML to PDF
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const App = () => {
  //const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};/storage/emulated/0/docs/test.pdf
  const source = {uri:'file:///storage/emulated/0/docs/test.pdf'};
  return (
    <View style={styles.container}>
        <Pdf
            source={source}
            onLoadComplete={(numberOfPages,filePath)=>{
                console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page,numberOfPages)=>{
                console.log(`current page: ${page}`);
            }}
            onError={(error)=>{
                console.log(error);
            }}
            onPressLink={(uri)=>{
                console.log(`Link presse: ${uri}`)
            }}
            style={styles.pdf}/>
    </View>

  );
};

export default App;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  }
});