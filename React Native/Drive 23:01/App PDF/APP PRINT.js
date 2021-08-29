// Print HTML as a Document from React Native App for Android and iOS
// https://aboutreact.com/react-native-print-html/

// Import React
import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

// Import HTML to PDF
import RNHTMLtoPDF from 'react-native-html-to-pdf';
// Import RNPrint
import RNPrint from 'react-native-print';

const App = () => {



  const printHTML = async () => {
    await RNPrint.print({
      html:
        '<h1>Here will be Heading 1</h1><h2>Here will be Heading 2</h2><h3>Here will be Heading 3</h3>',
    });
  };

  const printPDF = async () => {
    const results = await RNHTMLtoPDF.convert({
      html: '<h1>Demo Text to converted to PDDF</h1>',
      fileName: 'test30',
    });
    await RNPrint.print({filePath: results.filePath});
    console.log(results.filePath)
  };

  const printRemotePDF = async () => {
    await RNPrint.print({
      filePath: 'http://www.africau.edu/images/default/sample.pdf',
    });
  };


  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Print HTML as a Document from React Native App
      </Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={printHTML}>
          <Text>Click to Print HTML</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={printPDF}>
          <Text>Click to Print PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={printRemotePDF}>
          <Text>Click to Print Remote PDF</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginVertical: 10,
  },
});