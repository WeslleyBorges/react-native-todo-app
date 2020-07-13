import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import commonStyles from '../commonStyles';

export default ({onCancel, isVisible}) => {
  const [desc, setDesc] = React.useState('');

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
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.button}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.button}>Salvar</Text>
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
    flex: 1,
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
});
