import React from 'react';
import { Button, Text } from 'native-base';
import { StyleSheet, View, TextInput, Picker, ScrollView } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listApplicants } from '../src/graphql/queries';
import { updateApplicant } from '../src/graphql/mutations';

export default class UpdateProfile extends React.Component {
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
      user: {},
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      linkedin: null,
      professionalField: null,
    };
  }

  componentWillMount () {
    this._getUserInfo()
  }

  _getUserInfo = async () => {
        console.log('Getting User Info');
        try {
            const users = await API.graphql(graphqlOperation(listApplicants));
            //var existingUser = {};
            for (i = 0; i < users.data.listApplicants.items.length; i++){
              if (users.data.listApplicants.items[i].email == Auth.user.attributes.email)
                    {var existingUser = users.data.listApplicants.items[i]};
            }
            this.setState({
                user: await existingUser,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                phone: existingUser.phone,
                linkedin: existingUser.linkedin,
                professionalField: existingUser.professionalField
            }, callback= () => console.log(this.state))
          } catch (err) {
            console.log('Error getting corresponding applicant for current location', err)
          }
        };

  _updateApplicant = async () => {
    var updatedApplicant = {
      id: this.state.user.id,
      email: this.state.user.email,
      username: this.state.user.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      linkedin: this.state.linkedin,
      professionalField: this.state.professionalField,
    }
    try {
          await API.graphql(graphqlOperation(updateApplicant, {input: updatedApplicant}))
          console.log('applicant updated')
        } catch (err) {
          console.log('error updating applicant', err)
        }
    this.props.navigation.navigate('Profile', {email: this.state.user.email})
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.inputs}>
        <Text>First Name: </Text>
        <TextInput
          style={{height: 40}}
          placeholder={ this.state.user.firstName ? this.state.user.firstName : 'First Name'}
          onChangeText={(text) => this.setState({firstName: text})}
        />

        <Text>Last Name: </Text>
        <TextInput
          style={{height: 40}}
          placeholder={ this.state.user.lastName ? this.state.user.lastName : 'Last Name'}
          onChangeText={(text) => this.setState({lastName: text})}
        />

        <Text>Phone Number: </Text>
        <TextInput
          style={{height: 40}}
          placeholder={ this.state.user.phone ? this.state.user.phone : 'no spaces or special characters' }
          onChangeText={(text) => this.setState({phone: '1'+text})}
        />

        <Text>linkedin </Text>
        <TextInput
          style={{height: 40}}
          placeholder={ this.state.user.linkedin ? this.state.user.linkedin : 'LinkedIn'}
          onChangeText={(text) => this.setState({linkedin: 'https://www.linkedin.com/in/'+text})}
        />

        <Text>Professional Field (eg. Software Development): </Text>
        <Picker
        style={{paddingTop: 0 }}
        selectedValue={this.state.professionalField ? this.state.professionalField: 1}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({professionalField: itemValue})
        }>
        <Picker.Item label="Software Developer" value="Software Developer" />
        <Picker.Item label="Hardware" value="Hardware" />
        <Picker.Item label="Professor" value="Professor" />
        <Picker.Item label="Business" value="Business" />
        </Picker>
        </View>
        <View style={styles.centered}>
          <Button onPress={this._updateApplicant}>
            <Text>Update Profile</Text>
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
    backgroundColor: '#fff',
  },
  inputs: {
    marginTop: 50,
    width: '70%',
    marginLeft: '15%'
  },
  centered: {
    flexDirection: "row", 
    justifyContent: "center",
    }
});
