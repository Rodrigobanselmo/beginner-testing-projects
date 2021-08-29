import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../Style/cor';


const Header = () => {

    return (
        <Animatable.View  style={styles.header} minHeight= {keyboardview ? 130 : 0} animation={fadeout}>
            <View flexDirection='row' >
            <Text style={styles.text_header} >Login</Text>
            <Feather 
                    name="log-in"
                    color={Colors.header}
                    size={30}
                    style={styles.icon}
                                      
                />
            </View>
        </Animatable.View >
       
    );
};

export default Header;



const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    text_header: {
        color: Colors.header,
        fontWeight: 'bold',
        fontSize: 30,
        paddingRight: 12
    },
  });
