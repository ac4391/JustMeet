import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MapScreen from '../screens/MapScreen';
import ApplicantsScreen from '../screens/ApplicantsScreen';


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
  ApplicantsStack,
  MapStack,
});
