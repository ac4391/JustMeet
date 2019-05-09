import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsmobile from './aws-exports';

import { createApplicant } from './src/graphql/mutations';
import { getApplicant, listApplicants } from './src/graphql/queries';

Amplify.configure(awsmobile);

class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
   });
  }

  render() {

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
        //console.log(Auth.user); // Print user email
        try {
          const users = await API.graphql(graphqlOperation(listApplicants));
          var existingUser = false;
          for (i = 0; i < users.data.listApplicants.items.length; i++){
            if (users.data.listApplicants.items[i].email == Auth.user.attributes.email){existingUser = true}
          }
        } catch (err) {
          console.log('error getting applicant', err)
        }
        if (existingUser) {
          console.log('applicant already exists')
        }
        else{
        console.log('Trying to create applicant');

        const applicant = {input:{
                          email: Auth.user.attributes.email,
                          username: Auth.user.username,
                        }}
        try {
          //console.log(query);
          await API.graphql(graphqlOperation(createApplicant, applicant))
          console.log('applicant created')
        } catch (err) {
          console.log('error creating applicant', err)
        }
        }

    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

export default withAuthenticator(App, {includeGreetings: false});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
