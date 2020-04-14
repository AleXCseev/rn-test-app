import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = props => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    const d = new Date(currentDate);
    const curr_date = d.getDate();
    const curr_month = d.getMonth() + 1;
    const curr_year = d.getFullYear();
    const dateUpd = `${curr_date}.${curr_month}.${curr_year}`;
    props.getDate(dateUpd);
  };

  return (
    <View style={styles.container}>
      {props.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    width: '80%',
  },
});

export default DatePicker;
