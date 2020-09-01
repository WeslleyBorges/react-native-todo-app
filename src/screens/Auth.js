import React from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {REACT_APP_BASE_URL} from '../env';
import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';
import AuthInput from '../components/AuthInput';

export default (props) => {
  const [email, setEmail] = React.useState('weslleynfs@gmail.com');
  const [password, setPassword] = React.useState('123456');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [name, setName] = React.useState('');
  const [stageNew, setStageNew] = React.useState(false);

  const clearInputs = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const signup = async () => {
    if (password !== passwordConfirmation) {
      Alert.alert(
        'Deu beyblade',
        'A senha e sua confirmação precisam ser idênticas.',
      );
      return false;
    }

    try {
      await axios.post(`${REACT_APP_BASE_URL}/signup`, {name, email, password});
      clearInputs();
      setStageNew(false);
      Alert.alert('Sucesso!', 'Usuário cadastrado com sucesso!');
    } catch (e) {
      console.log(e);
      Alert.alert('Deu ruim', 'Houve algum erro ao se registrar');
    }
  };

  const signin = async () => {
    try {
      const {data} = await axios.post(`${REACT_APP_BASE_URL}/signin`, {
        email,
        password,
      });
      AsyncStorage.setItem('userData', JSON.stringify(data));
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      props.navigation.navigate('Home', data);
    } catch (e) {
      Alert.alert('Deu ruim', 'Houve algum erro ao realizar o login');
    }
  };

  const validations = [
    email && email.includes('@'),
    password && password.length > 5,
  ];

  if (stageNew) {
    validations.push(name && name.trim().length > 2);
    validations.push(password === passwordConfirmation);
  }

  const formIsValid = validations.reduce((t, a) => t && a);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <Text style={styles.title}>Tasks</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>
          {stageNew ? 'Crie a sua conta' : 'Informe suas credenciais'}
        </Text>

        {stageNew && (
          <AuthInput
            icon="user"
            placeholder="Nome"
            value={name}
            onChangeText={setName}></AuthInput>
        )}
        <AuthInput
          icon="at"
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}></AuthInput>
        <AuthInput
          icon="lock"
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry></AuthInput>
        {stageNew && (
          <AuthInput
            icon="asterisk"
            placeholder="Confirme sua senha"
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            secureTextEntry></AuthInput>
        )}
        <TouchableOpacity
          onPress={stageNew ? signup : signin}
          disabled={!formIsValid}>
          <View
            style={[
              styles.button,
              formIsValid ? {} : {backgroundColor: '#aaa'},
            ]}>
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
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: 'white',
    fontSize: 20,
  },
});
