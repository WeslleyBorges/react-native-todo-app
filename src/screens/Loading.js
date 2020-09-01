import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

export default (props) => {
  React.useEffect(() => {
    async function loadUserData() {
      const userDataJson = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(userDataJson);
      return userData;
    }

    const userData = loadUserData();

    if (userData && userData.token) {
      Axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
      props.navigation.navigate('Home', userData);
    } else {
      console.log('USER DATA', userData);
      props.navigation.navigate('Auth');
    }
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
