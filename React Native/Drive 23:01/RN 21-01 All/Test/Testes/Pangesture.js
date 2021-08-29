import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, PanResponder, Dimensions } from 'react-native';


const App = () => {

  var x = [{a:0, b:true},{a:1,b:true},{a:2,b:true}]
  const [num, setNum] = useState(x)
  
  if (num == '0') {
    setNum('1')
  }

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        if (gestureState.moveX > 50)     {
          console.log(gestureState.moveX)
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    })
  ).current;


  const toggleFilter = index => {
//    const filtrar = num.filter(num => num.a !== index)
console.log(num)
    const changeb = [...num]
    changeb[index].b = false
    console.log(changeb)
    setNum(changeb)
    console.log(num)
    alert('q')
    
  }




  const Botoes = ({value}) => { //quando scrowll vc pega a nova posição e muda o valor do dia
      
    return ( 
      <View style={styles.container}  >
        <TouchableHighlight onPress={() => toggleFilter(value)}>
          <View height={30} backgroundColor='red' {...panResponder.panHandlers}  >
            <Text>{value}</Text>
          </View>
        </TouchableHighlight>
      </View>  
    )
  
  };
  
  return (

    <View flexDirection='row' flexWrap='wrap' >
      {console.log(num)}
      {num.map((item, index)=>
        <Botoes value={item.a} key={index} />
      )}
  </View>
  );
};


export default App


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#166088',
    justifyContent: 'center',
    width: '100%' ,
    height: 100
  },
});