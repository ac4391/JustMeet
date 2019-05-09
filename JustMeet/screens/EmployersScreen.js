import React from 'react';
import { ActivityIndicator, View, ScrollView, StyleSheet, Text } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { listEmployers } from '../src/graphql/queries';
import EmployerBox from '../components/EmployerBox';

import images from '../assets/images/index'

export default class EmployerScreen extends React.Component {
  static navigationOptions = {
    title: 'JustMeet',
    headerStyle: {
      backgroundColor: '#006eb6',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      employers: []
    }
  }

  componentDidMount() {
    this.listEmployers()
    this.state.isLoading = false
  }

  listEmployers = async () => {
    try {
      // custom employers
      var employers = [
        {
          company: "Google",
          img: images.companies.google,
          email: "contact@google.com",
          jobs: ["Developer Advocate", "CTO"],
          distance: "4km"
        },
        {
          company: "Facebook",
          img: images.companies.facebook,
          email: "contact@facebook.com",
          jobs: ["Developer Advocate", "CTO"],
          distance: "16km"
        },
        {
          company: "AirBnB",
          img: images.companies.airbnb,
          email: "contact@airbnb.com",
          jobs: ["Developer Advocate", "CTO"],
          distance: "28km"
        },
      ]
      this.setState({ employers: employers })

      /*
      const graphqldata = await API.graphql(graphqlOperation(listEmployers))
      this.setState({ employers: graphqldata.data.listEmployers.items }) // reset the input field to empty after post creation
      */
    }
    catch (err) {
      console.log('error: ', err)
    }
  }


  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Closest Employers</Text>
            {this.state.employers.map((employer, i) => (
              <View style={{ flexDirection: 'row' }} key={i}>
                <EmployerBox employer={employer} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 15,
    margin: 20,
    borderBottomColor: '#eee',
    borderBottomWidth: 2,

  }
});