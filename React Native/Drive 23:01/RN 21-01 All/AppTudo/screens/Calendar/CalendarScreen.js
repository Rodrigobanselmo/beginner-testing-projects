
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default () => {



return (
<>
<SafeAreaView backgroundColor='#9822' flex={1}>
<View flex={1} flexDirection={'row'} margin={20}>

<View backgroundColor='#000' flex={1}></View>
<View backgroundColor='#830101' flex={1}></View>
<View backgroundColor='#3f3f3f' flex={1}></View>
<View backgroundColor='#BF7E45' flex={1}></View>
<View backgroundColor='#D9A86C' flex={1}></View>
<View backgroundColor='#fff' flex={1}></View>

</View>

<View flex={1} flexDirection={'row'} margin={20}>

<View backgroundColor='#000' flex={1}></View>
<View backgroundColor='#830101' flex={1}></View>
<View backgroundColor='#3A3A44' flex={1}></View>
<View backgroundColor='#EBCCA0' flex={1}></View>
<View backgroundColor='#F5DEB3' flex={1}></View>
<View backgroundColor='#fff' flex={1}></View>

</View>

<View flex={1} flexDirection={'row'} margin={20}>

<View backgroundColor='#000' flex={1}></View>
<View backgroundColor='#830101' flex={1}></View>
<View backgroundColor='#12354f' flex={1}></View>
<View backgroundColor='#3f3f3f' flex={1}></View>
<View backgroundColor='#F5DEB3' flex={1}></View>
<View backgroundColor='#fff' flex={1}></View>

</View>


</SafeAreaView>
</>
)
}