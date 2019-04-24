import React from 'react';
import { Image, ScrollView, StyleSheet, View, Text, Linking, Button, TextInput} from 'react-native';
import { listApplicants } from '../src/graphql/queries';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { Icon } from 'expo';

export default class ProfileScreen extends React.Component {
  constructor (props) {
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
            for (i = 0; i < users.data.listApplicants.items.length; i++){
              if (users.data.listApplicants.items[i].email == this.props.navigation.state.params.email)
                    {var existingUser = users.data.listApplicants.items[i]};
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

  componentDidMount(){
          this._getProfile()
        }

  componentWillReceiveProps(){
    this._getProfile()
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.profile}>
          <View style={styles.description}>
            <Text style={styles.name}> name: {this.state.user.firstName} {this.state.user.lastName}</Text>
            <Text style={styles.name}> field: {this.state.user.professionalField}</Text>
            <Text style={styles.name}> email: {this.state.user.email}</Text>
            <Text style={styles.name}> <Icon.Ionicons onPress={ ()=> Linking.openURL(this.state.user.linkedin) } name={'logo-linkedin'} size={20} color={'#4875B4'}/> {this.state.user.linkedin}</Text>
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
          <View>
            <Text>Send a message: </Text>
            <TextInput
              style={{height: 40}}
              placeholder={ 'Type your message here' }
              onChangeText={(text) => this.setState({message: text})}
            />
            <Button 
              onPress={this._sendMessage}
              title="Contact Applicant!"
              color="#841584"
            />
          </View>
          }
        
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
