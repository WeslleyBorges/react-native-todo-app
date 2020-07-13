import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';
import 'moment/locale/pt-br';

import commonStyles from '../commonStyles';

export default ({id, desc, estimateAt, doneAt, toggleTask}) => {
  const doneOrNotStyle = doneAt
    ? {
        textDecorationLine: 'line-through',
      }
    : {};

  const date = doneAt ? doneAt : estimateAt;

  const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM');

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => toggleTask(id)}>
        <View style={styles.checkContainer}>{getCheckView(doneAt)}</View>
      </TouchableWithoutFeedback>
      <View>
        <Text style={[styles.desc, doneOrNotStyle]}>{desc}</Text>
        <Text style={styles.date}>{formattedDate + ''}</Text>
      </View>
    </View>
  );
};

const getCheckView = (doneAt) =>
  doneAt ? (
    <View style={styles.done}>
      <Icon name="check" size={20} color="white"></Icon>
    </View>
  ) : (
    <View style={styles.pending}></View>
  );

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#aaa',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4d7031',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12,
  },
});
