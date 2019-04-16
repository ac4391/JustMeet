import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Linking, ScrollView  } from 'react-native';
import { Icon } from 'expo';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { listApplicants } from '../src/graphql/queries';
import { ListItem } from 'react-native-elements'


export default class ApplicantsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true,
                  applicants: []}
  }

  componentDidMount(){
      this.listApplicants()
      this.state.isLoading = false
  }

  listApplicants = async () => {
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


  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

      return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{flex: 1}}>
          {
            this.state.applicants.map((applicant, index) => (
              <View style={{flexDirection: 'row'}} key={index}>
                <Icon.Ionicons onPress={ ()=> Linking.openURL('https://www.linkedin.com/in/ariel-cohen-codar-301020141/') } name={'logo-linkedin'} size={20}  paddingLeft={10} color={'#4875B4'}/><Text> {applicant.username}</Text>
              </View>
            ))
          }
        </View>
      </ScrollView>
    </View>
  )

  }
}
