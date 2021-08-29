import React, { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Text,StyleSheet,View,TouchableOpacity } from 'react-native';


export default ({ state, navigation }) => {

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
      <View style={styles.TabArea}>  
        <TouchableOpacity onPress={()=>goTo('Tab_1')} style={styles.TabItem} >
            <Ionicons name="ios-home" color={'#FFFFFF'} size={24} style={{opacity: state.index===0? 1 : 0.5}} />
            {state.index===0? 
              <Text style={[styles.TextTab,{marginTop:-3}]}> Home</Text>
            : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>goTo('Tab_2')} style={styles.TabItem} >
          <Entypo name="shop" color={'#FFFFFF'} size={25} style={{opacity: state.index===1? 1 : 0.5}} />
          {state.index===1? 
            <Text style={[styles.TextTab,{marginTop:-3}]}>shop</Text>
          : null}
        </TouchableOpacity>
        <View style={{backgroundColor:`#000`, marginTop: -23,borderRadius:40}}>
          <TouchableOpacity onPress={()=>goTo('Tab_3')} style={styles.TabItemCenter} >
            <Ionicons name="add" color={'#000'} size={45} style={{opacity: state.index===2? 1 : 0.5}} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>goTo('Tab_4')} style={styles.TabItem} >
          <Ionicons name="ios-person" color={'#FFFFFF'} size={25} style={{opacity: state.index===3? 1 : 0.5}} />
          {state.index===3? 
            <Text style={[styles.TextTab,{marginTop:-1}]}>Aprenda</Text>
          : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>goTo('Tab_5')} style={styles.TabItem} >
            <Ionicons name='airplane' color={'#FFFFFF'} size={25} style={{opacity: state.index===4? 1 : 0.5}} />
            {state.index===4? 
              <Text style={{fontSize:12, color: '#fff', marginTop:-1}}>Profile</Text>
            : null}
        </TouchableOpacity>
      </View>
    );
}
const styles = StyleSheet.create({
  TabArea: {
    height: 60,
    backgroundColor: '#000',
    flexDirection: 'row',
  },
  TabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  TabItemCenter: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 35,
    borderColor: '#000',
    borderWidth: 3,
    borderStyle: 'solid',	
  },
  TextTab: {
    fontSize:12,
    color: '#fff',
  },
  AvatarIcon: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
});
