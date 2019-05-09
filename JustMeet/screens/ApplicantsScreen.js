import React from 'react';
import { ActivityIndicator, Text, View, ScrollView, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';

import { listApplicants } from '../../JustMeet/src/graphql/queries';
import UserBox from '../../JustMeet/components/UserBox';
import images from '../../JustMeet/assets/images/index'

export default class ApplicantsScreen extends React.Component {
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
      applicants: [],
    }
  }

  componentDidMount() {
    this._listApplicants()
    this.state.isLoading = false
  }

  _listApplicants = async () => {
    try {
      const graphqldata = await API.graphql(
        graphqlOperation(listApplicants)
      )
      this.setState(
        {
          applicants: graphqldata.data.listApplicants.items,
          // reset the input field to empty after post creation
        }
      )
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
            <Text style={styles.title}>Closest Applicants</Text>
            {this.state.applicants.map((applicant, index) => (
              <View style={{ flexDirection: 'row' }} key={index}>
                <UserBox user={applicant} navigation={this.props.navigation} />
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
