import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HortaScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Horta Screen</Text>
      </View>
    );
};

export default HortaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
