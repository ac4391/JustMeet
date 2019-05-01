import React from 'react';
import { Button, Text } from 'native-base';
import { StyleSheet, View, Linking, TextInput, Alert, KeyboardAvoidingView, Image, ScrollView } from 'react-native';
import { listApplicants } from '../src/graphql/queries';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { Icon } from 'expo';
import { AutoScaling } from 'aws-sdk/clients/all';

export default class ProfileScreen extends React.Component {
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
    super(props)
    this.state = {
      user: {},
      message: ''
    }
  }

  _getProfile = async () => {
    //console.log(this.state.latitude, this.state.longitude);
    //console.log(Auth.user); // Print user email
    console.log('getting applicant from DB');
    try {
      const users = await API.graphql(graphqlOperation(listApplicants));
      //var existingUser = {};
      for (i = 0; i < users.data.listApplicants.items.length; i++) {
        if (users.data.listApplicants.items[i].email == this.props.navigation.state.params.email) { var existingUser = users.data.listApplicants.items[i] };
      }
      this.setState({
        user: existingUser
      })
    } catch (err) {
      console.log('Error getting applicant', err)
    }
  };

  _sendMessage = async () => {
    // Send API request to AWS Lambda function -> SMS message to applicant
    let apiName = 'greetingapi';
    let path = '/greeting';
    let header = 'New JustMeet message from ' + Auth.user.attributes.email + '\n'
    let req = {
      headers: {},
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {  // OPTIONAL
        message: header + this.state.message,
        email: this.state.user.email,
        phone: this.state.user.phone
      }
    }
    await API.get(apiName, path, req).then(response => {
      console.log("response")
    }).catch(error => {
      console.log("error sending api request");
    });
  }

  componentDidMount() {
    this._getProfile()
  }

  componentWillReceiveProps() {
    this._getProfile()
  }

  getParam = (param) => {
    return this.state.user[param] ? this.state.user[param] : param
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.profile}>
          <View style={styles.description}>
            <View style={styles.centered}>
              <Image source={require('../assets/images/male.png')} style={styles.userImg}/>
            </View>
            <Text style={styles.field}>{this.getParam('firstName')} {this.getParam('lastName')}</Text>
            <Text style={styles.field}>{this.getParam('professionalField')}</Text>
            <Text style={styles.field}>{this.getParam('email')}</Text>
            <Text style={styles.field}><Icon.Ionicons onPress={() => Linking.openURL(this.state.user.linkedin)} name={'logo-linkedin'} size={50} color={'#4875B4'} /> </Text>
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

        {/* Only render contact option if applicant has phone number in database */}
        {this.state.user.phone &&
          <View style={styles.contact}>
            <Text>Send a message: </Text>
            <TextInput
              style={{ height: 40 }}
              placeholder={'Type your message here'}
              onChangeText={(text) => this.setState({ message: text })}
            />
            <View  style={styles.centered}>
              <Button onPress={() => {
                this._sendMessage();
                Alert.alert('Message sent!');
              }}>
                <Text>Contact Applicant</Text>
              </Button>
            </View>
          </View>
        }
        <View style={styles.manageButton}>
          <Button onPress={() => this.props.navigation.navigate('UpdateProfile')}>
            <Text>Manage Your Profile</Text>
          </Button>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: 'center'
  },
  userImg: {
    width: 120,
    height: 120,
  },
  profile: {},
  description: {
    width: 300,
    padding: 20,
    marginTop: 10,
    borderRadius: 10
  },
  icon: {
    width: 35,
    height: 35
  },
  field: {
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center'
  },
  skill: {},
  job: {},
  company: {},
  contact: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 30
  },
  centered: {
    flexDirection: "row",
    justifyContent: "center",
    },
    manageButton: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20
    }
});
