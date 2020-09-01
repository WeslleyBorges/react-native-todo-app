import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import TaskList from './screens/TaskList';
import Auth from './screens/Auth';
import Loading from './screens/Loading';
import Menu from './screens/Menu';
import {isAuthenticated} from './services/auth';
import commonStyles from './commonStyles';

const menuConfig = {
  initialRouteName: 'Today',
  contentComponent: Menu,
  contentOptions: {
    labelStyle: {
      fontFamily: commonStyles.fontFamily,
      fontWeight: 'normal',
      fontSize: 20,
    },
    activeLabelStyle: {
      color: '#080',
      fontWeight: 'bold',
    },
  },
};

const menuRoutes = {
  Today: {
    name: 'Today',
    screen: (props) => (
      <TaskList title="Hoje" daysAhead={0} {...props}></TaskList>
    ),
    navigationOptions: {
      title: 'Hoje',
    },
  },
  Tomorrow: {
    name: 'Tomorrow',
    screen: (props) => (
      <TaskList title="Amanhã" daysAhead={1} {...props}></TaskList>
    ),
    navigationOptions: {
      title: 'Amanhã',
    },
  },
  Week: {
    name: 'Week',
    screen: (props) => (
      <TaskList title="Semana" daysAhead={7} {...props}></TaskList>
    ),
    navigationOptions: {
      title: 'Semana',
    },
  },
  Month: {
    name: 'Month',
    screen: (props) => (
      <TaskList title="Mês" daysAhead={30} {...props}></TaskList>
    ),
    navigationOptions: {
      title: 'Mês',
    },
  },
};

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig);

const mainRoutes = {
  Loading: {
    name: 'Loading',
    screen: Loading,
  },
  Auth: {
    name: 'Auth',
    screen: Auth,
  },
  Home: {
    name: 'Home',
    screen: menuNavigator,
  },
};

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'Loading',
  // initialRouteName: isAuthenticated() ? 'Home' : 'Auth',
});

export default createAppContainer(mainNavigator);
