import React from 'react';
import { Image, ScrollView, StyleSheet, View, Text } from 'react-native';

export default class ProfileScreen extends React.Component {
  state = {
    type: 0, // 0 = Employee | 1 = Employer
    name: "name",
    lastName: "lastName",

    // Employee
    skills: ["data science", "test"],

    // Employer
    company: "Amazon",
    jobs: ["Assistant"]
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.profile}>
          {
          <View style={styles.icon}>
            <Image source={require('../assets/images/users/jeff.jpg')} />
          </View>}
          <View style={styles.description}>
            <Text style={styles.name}>{this.state.lastName} {this.state.name}</Text>

            {this.state.type === 0 && this.state.skills.map((s, i) => (
              <View style={styles.skill} key={i}></View>
            ))}

            {this.state.type === 1 && (
              <View>
                <Text style={styles.company}>{this.state.company}</Text>
                {this.state.jobs.map((j, i) => (<View style={styles.jobs} key={i}></View>))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  profile: {},
  description: {},
  icon: {
    width: 35,
    height: 35
  },
  name: {
    fontSize: 25
  },
  skill: {},
  job: {},
  company: {}
});
