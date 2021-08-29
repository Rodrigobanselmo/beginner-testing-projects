import React, { useState, useCallback } from "react";
import { View } from "react-native";
const MyComponent = () => {
  const [measuredWidth, setMeasuredWidth] = useState(null);
  const onLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width }
      }
    }) => {
        setMeasuredWidth(width);
    },
    []
  );
  return (
    <>
      <View onLayout={onLayout} />
      {typeof measuredWidth === "number" && (
        <View style={{width: measuredWidth}}> 
          /*Some content that depends on width*/ 
        </View>
      )}
    </>
  );
};
export default MyComponent;