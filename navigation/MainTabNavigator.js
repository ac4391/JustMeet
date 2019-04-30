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
import UpdateProfileScreen from '../screens/UpdateProfileScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  title: 'JustMeet',
  headerStyle: {
      backgroundColor: '#4286f4',
  },
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
  title: 'JustMeet',
  headerStyle: {
      backgroundColor: '#4286f4',
  },
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
  title: 'JustMeet',
  headerStyle: {
      backgroundColor: '#4286f4',
  },
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
  UpdateProfile: UpdateProfileScreen
});

ProfileStack.navigationOptions = {
  title: 'JustMeet',
  headerStyle: {
      backgroundColor: '#4286f4',
  },
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
  title: 'JustMeet',
  headerStyle: {
      backgroundColor: '#4286f4',
  },
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
  title: 'JustMeet',
  headerStyle: {
      backgroundColor: '#4286f4',
  },
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
