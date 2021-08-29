import * as React from 'react';
import {
  Easing,
  TextInput,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Svg, { G, Circle, Rect } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function Donut({
  percentage = 75,
  radius = 90,
  strokeWidth = 5.5,
  duration = 500,
  color = "tomato",
  delay = 0,
  textColor,
  max = 100,
  scrollView = 1
}) {
  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue) => {
    return Animated.timing(animated, {
      delay: 300,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  
  React.useEffect(() => {
    animation(percentage);
    animated.addListener((v) => {
      const maxPerc = 100 * v.value / max;
      const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)/1000}`,
        });
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    }, [max, percentage]);

    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    <View style={{ width: radius * 2, height: radius * 2,transform: [{ scale: scrollView }] }}>
      <View style={{ opacity:1 }}>
        <Svg
          height={radius * 2}
          width={radius * 2}
          viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
          <G
            rotation="-90"
            origin={`${halfCircle}, ${halfCircle}`}>
            <Circle
              ref={circleRef}
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDashoffset={radius > 70 ? 70 : circumference}
              strokeDasharray={circumference}
              />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              strokeOpacity=".1"
              />
          </G>
        </Svg>
        <AnimatedTextInput
          ref={inputRef}
          underlineColorAndroid="transparent"
          editable={false}
          defaultValue="0"
          style={[
            StyleSheet.absoluteFillObject,
            { fontSize: radius / 3.3, color: textColor ?? color, paddingBottom:radius*0.25, paddingLeft:radius*0.03, opacity:1-(scrollView*scrollView*scrollView*scrollView*scrollView-1*scrollView) },
            styles.text,
          ]}
          />

                    <Text           style={[
            StyleSheet.absoluteFillObject,
            { fontSize: radius / 1.7, color: textColor ?? color, paddingTop:radius*0.6, paddingLeft:radius*0.03, opacity:(scrollView*scrollView*scrollView*scrollView*scrollView-1*scrollView) },
            styles.text,
          ]}>77%</Text>
                    
                    
                    <Text style={[ StyleSheet.absoluteFillObject, { fontSize: radius / 6, color: textColor ?? color, paddingTop:radius*0.88, paddingRight:radius*1.26,opacity:1-(scrollView*scrollView*scrollView*scrollView*scrollView-1*scrollView) },styles.text,]}>R$</Text>
                    <Text style={[ StyleSheet.absoluteFillObject, { fontSize: radius / 6, color: textColor ?? color, paddingTop:radius*0.88, paddingLeft:radius*1.26,opacity:1-(scrollView*scrollView*scrollView*scrollView*scrollView-1*scrollView) },styles.text,]}>,00</Text>
              <Text style={[ StyleSheet.absoluteFillObject, { fontSize: radius / 7, color: '#ccc' ?? '#ccc', paddingTop:radius*1.20 },{ fontWeight: 'normal', textAlign: 'center',opacity:1-(scrollView*scrollView*scrollView*scrollView*scrollView-1*scrollView) }]}>META: R$21.000,00</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontWeight: '200', textAlign: 'center' },
});
