import AsyncStorage from '@react-native-community/async-storage';

import {REACT_APP_STORAGE_KEY} from '../env';

const isAuthenticated = async () =>
  (await AsyncStorage.getItem(REACT_APP_STORAGE_KEY)) !== null;
const storeToken = async (token) => {
  const stringfiedToken = JSON.stringify(token);
  await AsyncStorage.setItem(REACT_APP_STORAGE_KEY, stringfiedToken);
};
const getToken = async () => {
  const token = await AsyncStorage.getItem(REACT_APP_STORAGE_KEY);
  return JSON.parse(token);
};
const removeToken = async () =>
  await AsyncStorage.removeItem(REACT_APP_STORAGE_KEY);

export {storeToken, getToken, isAuthenticated, removeToken};
