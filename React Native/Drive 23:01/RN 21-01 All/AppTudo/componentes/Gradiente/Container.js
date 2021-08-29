import React, { Children } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    gradiente: {
        flex:1,
    },
    container: {
        flex:1,
    },
})


export default (props) => {
    
    
    return(
        <LinearGradient colors={props.color} style={styles.gradiente}>
            <SafeAreaView style={styles.container}>
                {props.children}
            </SafeAreaView>
        </LinearGradient>

    )    


}