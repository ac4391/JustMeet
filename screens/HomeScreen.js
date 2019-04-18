import React from 'react';
import { Image, Button, Platform, ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listApplicants } from '../src/graphql/queries';
import { updateApplicant } from '../src/graphql/mutations';

export default class HomeScreen extends React.Component {

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
        {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image source={require('../assets/images/icon.png')} style={styles.welcomeImage} />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.titleText}>JustMeet</Text>
            <Text style={styles.descriptionText}>The app that facilitates relations between employers and candidates.</Text>
          </View>
        </ScrollView> */}

        <View style={{padding: 10}}>
        <Text>First Name: </Text>
        <TextInput
          style={{height: 40}}
          placeholder={ 'First Name' }
          onChangeText={(text) => this.setState({firstName: text})}
        />

        <Text>Last Name: </Text>
        <TextInput
          style={{height: 40}}
          placeholder={ 'Last Name' }
          onChangeText={(text) => this.setState({lastName: text})}
        />

        <Text>linkedin </Text>
        <TextInput
          style={{height: 40}}
          placeholder={ 'Linkedin'}
          onChangeText={(text) => this.setState({linkedin: text})}
        />

        <Text>Professional Field (eg. Software Development): </Text>
        <TextInput
          style={{height: 40}}
          placeholder={ 'Professional Field'}
          onChangeText={(text) => this.setState({professionalField: text})}
        />

        <Button 
          onPress={this._updateApplicant}
          title="Update Profile"
          color="#841584"
        />

        <Text style={{padding: 10, fontSize: 42}}>
          {/* {this.state.text.split(' ').map((word) => word && '🍕').join(' ')} */}
        </Text>
        </View>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>Search according to your needs :</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  titleText: {
    fontSize: 22,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});