
 
 
 
 import React from 'react';
 import { StyleSheet, Text, View } from 'react-native';
 import { Calendar, CalendarList } from 'react-native-calendars';
 import dateFns from 'date-fns';
 
 
 
 export default () => {
   const baseDate = new Date(2019, 6, 15);
   const APPOINTMENTS = [
     {
       date: '2019-07-13T05:00:00.000Z',
       title: "It's a past thing!",
     },
     {
       date: '2019-07-15T05:00:00.000Z',
       title: "It's a today thing!",
     },
     {
       date: '2019-07-18T05:00:00.000Z',
       title: "It's a future thing!",
     },
   ];
 
   return (
     <View style={styles.container}>
       <Calendar
         onDayPress={(day) => {
           console.log('selected day', day);
         }}
         theme={{
           calendarBackground: '#166088',
 
           selectedDayBackgroundColor: '#C0D6DF',
           selectedDayTextColor: '#166088',
           selectedDotColor: '#166088',
 
           dayTextColor: '#DBE9EE',
           textDisabledColor: '#729DAF',
           dotColor: '#DBE9EE',
 
           monthTextColor: '#DBE9EE',
           textMonthFontWeight: 'bold',
 
           arrowColor: '#DBE9EE',
         }}
       />
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#166088',
     justifyContent: 'center',
   },
 });
 


 





 
import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, View, SafeAreaView, Text } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import styled from 'styled-components/native';


const BoxView = styled.View`
`;

export default () => {

  LocaleConfig.locales['fr'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Maio','Jun.','Jul.','Ago.','Set.','Out.','Nov.','Dec.'],
    dayNames: ['Domingo','Sengunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sab.'],
    today: 'Hoje'
  };
  LocaleConfig.defaultLocale = 'fr';

  return (
    <BoxView flex={1} paddingTop={100}>
<Calendar onDayPress={(day) => {console.log('selected day', day)}} markedDates={{
    '2020-08-16': {selected: true, marked: true, selectedColor: 'lightblue'},
    '2020-08-17': {marked: true},
    '2020-08-18': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2020-08-19': {disabled: true, disableTouchEvent: true}
  }}/>
</BoxView>
  ) 
  }

