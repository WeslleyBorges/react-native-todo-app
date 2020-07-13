import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import todayImage from '../../assets/imgs/today.jpg';
import moment from 'moment';
import 'moment/locale/pt-br';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import AddTask from './AddTask';

export default (props) => {
  const [tasks, setTasks] = useState([
    {
      id: Math.floor(Math.random() * 10000).toString(),
      desc: 'Comprar Livro de React Native',
      estimateAt: new Date(),
      doneAt: new Date(),
    },
    {
      id: Math.floor(Math.random() * 10000).toString(),
      desc: 'Terminar curso de React Native',
      estimateAt: new Date(),
      doneAt: null,
    },
  ]);
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [showAddTaskModal, setShowAddTaskModal] = useState(true);

  const toggleTask = (taskId) => {
    const tasksHere = [...tasks];
    tasksHere.forEach((task) => {
      if (task.id === taskId) {
        if (task.doneAt) task.doneAt = null;
        else task.doneAt = new Date();
      }
    });
    setTasks(tasksHere);
  };

  const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

  return (
    <View style={styles.container}>
      <AddTask
        isVisible={showAddTaskModal}
        onCancel={() => setShowAddTaskModal(!showAddTaskModal)}></AddTask>
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={() => setShowDoneTasks(false)}>
            <Icon
              name={showDoneTasks ? 'eye' : 'eye-slash'}
              size={20}
              color={commonStyles.colors.secondary}></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subTitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({item}) => {
            if (item.doneAt && !showDoneTasks) return null;

            return <Task {...item} toggleTask={toggleTask}></Task>;
          }}></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 50,
    color: commonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
});
