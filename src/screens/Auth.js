import React from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';

export default () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [name, setName] = React.useState('');
  const [stageNew, setStageNew] = React.useState(false);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <Text style={styles.title}>Tasks</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>
          {stageNew ? 'Crie a sua conta' : 'Informe suas credenciais'}
        </Text>

        {stageNew && (
          <TextInput
            placeholder="Nome"
            value={name}
            style={styles.input}
            onChangeText={setName}></TextInput>
        )}
        <TextInput
          placeholder="E-mail"
          value={email}
          style={styles.input}
          onChangeText={setEmail}></TextInput>
        <TextInput
          placeholder="Senha"
          value={password}
          style={styles.input}
          onChangeText={setPassword}
          secureTextEntry></TextInput>
        {stageNew && (
          <TextInput
            placeholder="Confirme sua senha"
            value={passwordConfirmation}
            style={styles.input}
            onChangeText={setPasswordConfirmation}
            secureTextEntry></TextInput>
        )}
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {stageNew ? 'Registrar' : 'Entrar'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => setStageNew(!stageNew)}>
        <Text style={styles.buttonText}>
          {stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    width: '90%',
  },
  input: {marginTop: 10, backgroundColor: 'white', padding: 10},
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: 'white',
    fontSize: 20,
  },
});
