import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

import moment from 'moment';
import 'moment/locale/pt-br';

import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import AddTask from './AddTask';

export default () => {
  const [tasks, setTasks] = useState([]);
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      await AsyncStorage.getItem('tasks', (_, tasksFromStorage) =>
        setTasks(JSON.parse(tasksFromStorage)),
      );
    };
    loadTasks();
  }, []);

  useEffect(() => {
    console.log('TASKS - USE EFFECT TASKS CHANGED', tasks.length);
    const saveTasks = async () => {
      const stringfiedData = JSON.stringify(tasks);
      await AsyncStorage.setItem('tasks', stringfiedData);
    };

    saveTasks();
  }, [tasks.length]);

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

  const addTask = (newTask) => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição não informada');
      return;
    }

    const tasksLocal = tasks;

    tasksLocal.push({
      id: Math.floor(Math.random() * 10000).toString(),
      desc: newTask.desc,
      estimateAt: newTask.date,
      doneAt: null,
    });
    console.log(tasksLocal);
    setTasks(tasksLocal);
    setShowAddTaskModal(false);
    console.log(tasks);
  };

  const deleteTask = (id) => {
    const tasksLocal = tasks.filter((task) => task.id !== id);
    setTasks(tasksLocal);
  };

  return (
    <View style={styles.container}>
      <AddTask
        isVisible={showAddTaskModal}
        onCancel={() => setShowAddTaskModal(false)}
        onSave={addTask}></AddTask>
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={() => setShowDoneTasks(false)}>
            <Icon
              name={showDoneTasks ? 'eye' : 'eye-slash'}
              size={20}
              color={commonStyles.colors.secondary}
              onPress={() => setShowDoneTasks(!showDoneTasks)}></Icon>
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

            return (
              <Task
                {...item}
                onDelete={deleteTask}
                toggleTask={toggleTask}></Task>
            );
          }}></FlatList>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddTaskModal(true)}
        activeOpacity={0.7}>
        <Icon
          name="plus"
          side={20}
          color={commonStyles.colors.secondary}></Icon>
      </TouchableOpacity>
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
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
