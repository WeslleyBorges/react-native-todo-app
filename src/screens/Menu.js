import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {DrawerItems} from 'react-navigation-drawer';
import {Gravatar} from 'react-native-gravatar';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

import commonStyles from '../commonStyles';

export default (props) => {
  const gravatarOptions = {
    email: props.navigation.getParam('email'),
    secure: true,
  };

  const logout = () => {
    delete axios.defaults.headers.common.Authorization;
    AsyncStorage.removeItem('userData');
    props.navigation.navigate('Loading');
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <Gravatar style={styles.avatar} options={gravatarOptions}></Gravatar>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{props.navigation.getParam('name')}</Text>
          <Text style={styles.email}>{props.navigation.getParam('email')}</Text>
        </View>
        <TouchableOpacity onPress={logout}>
          <View style={styles.logoutIcon}>
            <Icon name="sign-out" size={30} color="#800"></Icon>
          </View>
        </TouchableOpacity>
      </View>
      <DrawerItems {...props}></DrawerItems>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  name: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginBottom: 5,
    color: commonStyles.colors.mainText,
  },
  email: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 15,
    marginBottom: 5,
    color: commonStyles.colors.subtext,
  },
  title: {
    color: 'black',
    fontFamily: commonStyles.fontFamily,
    fontSize: 30,
    paddingTop: 30,
    padding: 10,
  },
  logoutIcon: {
    marginLeft: 10,
    marginBottom: 10,
  },
});
