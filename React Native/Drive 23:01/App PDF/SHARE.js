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
import Share from 'react-native-share';
const App = () => {

  const url = 'file:///storage/emulated/0/docs/test.pdf';
  const title = 'Awesome Contents';
  const message = 'Please check this out.';
  const options = Platform.select({
    default: {
      title,
      subject: title,
      message: `${message} ${url}`,
      url: 'file:///storage/emulated/0/docs/test.pdf'
    },
  });
  
  Share.open(options);

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