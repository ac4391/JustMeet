import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MapScreen from '../screens/MapScreen';
import ApplicantsScreen from '../screens/ApplicantsScreen';
import EmployersScreen from '../screens/EmployersScreen';
import ProfileScreen from '../screens/ProfileScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

const ApplicantsStack = createStackNavigator({
  Applicants: ApplicantsScreen,
  
});

ApplicantsStack.navigationOptions = {
  tabBarLabel: 'Applicants',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-person`
          : 'md-information-circle'
      }
    />
  ),
};

const EmployersStack = createStackNavigator({
  Employers: EmployersScreen,
});

EmployersStack.navigationOptions = {
  tabBarLabel: 'Employers',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
        ? `ios-briefcase`
        : 'md-briefcase'
      }
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
        ? `ios-briefcase`
        : 'md-briefcase'
      }
    />
  ),
};


const MapStack = createStackNavigator({
  Maps: MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-globe' : 'md-globe'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  ApplicantsStack,
  EmployersStack,
  MapStack,
  ProfileStack,
});
