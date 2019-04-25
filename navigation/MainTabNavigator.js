import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import HeatMapScreen from '../screens/HeatMapScreen';
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

const HeatMapStack = createStackNavigator({
  HeatMaps: HeatMapScreen,
});

HeatMapStack.navigationOptions = {
  tabBarLabel: 'HeatMap',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-flame' : 'md-flame'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  ApplicantsStack,
  MapStack,
  ProfileStack,
  HeatMapStack,
});
