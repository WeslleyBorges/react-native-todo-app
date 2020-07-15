import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';

import commonStyles from '../commonStyles';

export default ({onCancel, onSave, isVisible}) => {
  const [desc, setDesc] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [datePickerIsVisible, setDatePickerIsVisible] = React.useState(false);

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={date}
        onChange={(_, selectedDate) => {
          setDate(selectedDate);
          setDatePickerIsVisible(false);
        }}
        mode="date"></DateTimePicker>
    );

    const dateString = moment(date).format('ddd, D [de] MMMM [de] YYYY');

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity onPress={() => setDatePickerIsVisible(true)}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {datePickerIsVisible && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);
  // };

  const save = () => {
    const newTask = {desc, date};

    onSave && onSave(newTask);

    setDesc('');
    setDate(new Date());
    setDatePickerIsVisible(false);
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={onCancel}
      animationType="slide">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.header}>Nova Tarefa</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe a descrição"
          value={desc}
          onChangeText={setDesc}></TextInput>
        {getDatePicker()}
        {/* {datePickerIsVisible && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            onChange={onChange}
          />
        )} */}
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.button}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.button} onPress={save}>
              Salvar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    backgroundColor: 'white',
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 15,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    height: 40,
    margin: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6,
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
  },
  date: {
    fontFamily: commonStyles.fontfamily,
    marginLeft: 15,
    fontSize: 20,
  },
});
