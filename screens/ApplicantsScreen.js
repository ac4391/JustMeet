import React from 'react';
import { ActivityIndicator, Text, View, ScrollView, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { listApplicants } from '../../JustMeet/src/graphql/queries';
import UserBox from '../../JustMeet/components/UserBox';

import images from '../../JustMeet/assets/images/index'

export default class ApplicantsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      applicants: [],
    }
  }

  componentDidMount() {
    this.listApplicants()
    this.state.isLoading = false
  }

  listApplicants = async () => {
    try {
      // custom users
      var users = [
        {
          firstname: "Guido",
          lastname: "van Rossum",
          img: images.users.guido,
          email: "guido@gmail.com",
          job: "searching",
          skills: ["pyhton", "django", "flask"],
          distance: "4km"
        }, {
          firstname: "Evan",
          lastname: "You",
          img: images.users.evan,
          email: "evan@vuejs.com",
          job: "VueJs CEO",
          skills: ["fullstack", "vuejs"],
          distance: "13km"
        }, {
          firstname: "Jeff",
          lastname: "Besoz",
          img: images.users.jeff,
          email: "jeff@aws.com",
          job: "Amazon CEO",
          skills: ["team management", "business"],
          distance: "108km"
        }, {
          firstname: "Vitalik",
          lastname: "Buterin",
          email: "vit@ethereum.com",
          job: "ETH CEO",
          skills: ["cryptocurrency", "programming"],
          distance: "412km"
        }
      ]
      this.setState({ applicants: users })

      /*
      const graphqldata = await API.graphql(graphqlOperation(listApplicants))
      this.setState({ applicants: graphqldata.data.listApplicants.items }) // reset the input field to empty after post creation
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
            <Text style={styles.title}>Closest Applicants</Text>
            {this.state.applicants.map((applicant, index) => (
              <View style={{ flexDirection: 'row' }} key={index}>
                <UserBox user={applicant} />
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
