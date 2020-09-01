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
import axios from 'axios';

import moment from 'moment';
import 'moment/locale/pt-br';

import todayImage from '../../assets/imgs/today.jpg';
import tomorrowImage from '../../assets/imgs/tomorrow.jpg';
import weekImage from '../../assets/imgs/week.jpg';
import monthImage from '../../assets/imgs/month.jpg';

import commonStyles from '../commonStyles';
import Task from '../components/Task';
import AddTask from './AddTask';
import {REACT_APP_BASE_URL} from '../env';

export default ({title, daysAhead, navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const loadTasks = async () => {
    // COLOCAR A DATA E O QUERY PARAM DATE
    try {
      const maxDate = moment()
        .add({days: daysAhead})
        .format('YYYY-MM-30 HH:mm:ss');
      const {data} = await axios.get(
        `${REACT_APP_BASE_URL}/tasks?date=${maxDate}`,
      );
      setTasks(data);
      setLoadingTasks(true);
    } catch (e) {
      console.log(e);
      Alert.alert('Erro', 'As tasks não puderam ser recuperadas');
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const toggleTask = async (taskId) => {
    try {
      await axios.put(`${REACT_APP_BASE_URL}/tasks/${taskId}/toggle`);
      Alert.alert('Sucesso', 'A task foi togglezada com sucesso!');
      loadTasks();
    } catch (e) {
      console.log(e);
      Alert.alert('Erro', 'Houve um erro no toggle da task');
    }
  };

  const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

  const addTask = async (newTask) => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição não informada');
      return;
    }

    try {
      await axios.post(`${REACT_APP_BASE_URL}/tasks`, {
        desc: newTask.desc,
        estimateAt: newTask.date,
      });
      setShowAddTaskModal(false);
      Alert.alert('Sucesso', 'Task cadastrada com sucesso');
      loadTasks();
    } catch (e) {
      console.log(e);
      Alert.alert('Erro', 'Houve algum erro ao tentar remover a task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${REACT_APP_BASE_URL}/tasks/${id}`);
      Alert.alert('Sucesso', 'Task removida com sucesso!');
      loadTasks();
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Houve algum erro ao tentar remover a task!');
    }
  };

  const renderTasks = () => {
    if (tasks.length > 0 && !loadingTasks)
      return (
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
      );
    else if (loadingTasks)
      return <Text style={styles.noTasksText}>Carregando tasks...</Text>;
    else
      return (
        <Text style={styles.noTasksText}>
          Não há tasks para serem exibidas.
        </Text>
      );
  };

  const getImage = () => {
    switch (daysAhead) {
      case 0:
        return todayImage;
      case 1:
        return tomorrowImage;
      case 7:
        return weekImage;
      default:
        return monthImage;
    }
  };

  const getButtonColor = () => {
    switch (daysAhead) {
      case 0:
        return commonStyles.colors.today;
      case 1:
        return commonStyles.colors.tomorrow;
      case 7:
        return commonStyles.colors.week;
      default:
        return commonStyles.colors.month;
    }
  };

  return (
    <View style={styles.container}>
      <AddTask
        isVisible={showAddTaskModal}
        onCancel={() => setShowAddTaskModal(false)}
        onSave={addTask}></AddTask>
      <ImageBackground source={getImage()} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon
              name="bars"
              size={20}
              color={commonStyles.colors.secondary}></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDoneTasks(!showDoneTasks)}>
            <Icon
              name={showDoneTasks ? 'eye' : 'eye-slash'}
              size={20}
              color={commonStyles.colors.secondary}></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>{renderTasks()}</View>
      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor: getButtonColor(),
          },
        ]}
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
    justifyContent: 'space-between',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTasksText: {
    padding: 10,
    backgroundColor: '#cecece',
    fontFamily: commonStyles.fontFamily,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
