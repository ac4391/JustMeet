import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import React from 'react';
import { Text } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createLocation } from '../src/graphql/mutations';
import { listApplicants } from '../src/graphql/queries';
import { listLocations } from '../src/graphql/queries';

export default class MapScreen extends React.Component {
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

    // Initialize state
    this.state = {
        users: [],
        latitude: 40.806457,
        longitude: -73.963203,
        error: null,
        locations: [],
        realLocations: [],
    };
  }

  //Get a list of all applicants from the database
  _getApplicants = async () => {
    console.log('Getting applicants from DB');
    try {
        const users = await API.graphql(graphqlOperation(listApplicants));
        this.setState({
            users: users.data.listApplicants.items
        })
        return users.data.listApplicants.items
    } catch (err) {
        console.log('Error getting applicants', err)
        return ""
    }
  };

  //Get the most recent location for each applicant
  _showLocations = async () => {
    console.log('Getting locations from DB');
    let users = await this._getApplicants()
    try {
      const graphqldata = await API.graphql(graphqlOperation(listLocations, {limit:100}));
      this.setState(
        {
          locations: graphqldata.data.listLocations.items,
        })
      let realLocations = users
      let allLocations = graphqldata.data.listLocations.items
      for (i = 0; i < users.length; i++){
        found = false
        for (j = 0; j < allLocations.length; j++){
          if (users[i].email == allLocations[j].email) {
            if (!found || realLocations[i].timestamp<allLocations[j].timestamp) {
              realLocations[i] = allLocations[j]
              found = true};
          };
        };

      };
      this.setState(
        {
          realLocations: realLocations,
        })
    } catch (err) {
      console.log('error getting locations', err)
    }
  };

  //Add user's current location to database
  _addLocation = async () => {
    const loc = {input:{
              email: Auth.user.attributes.email,
              lat: this.state.latitude,
              lon: this.state.longitude,
              timestamp: Math.floor(Date.now()/1000),
              }
            }
    try {
      await API.graphql(graphqlOperation(createLocation, loc))
    } catch (err) {
      console.log('Graphql error adding location to DB', err)
    }
  };

  // This component runs once after the component mounts
  componentWillMount() {
    // Get user's current location and store in component state
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
        });
      },
      (error) => this.setState({error: error.message}),
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
    );

    (async () => {
      await this._getApplicants()
      this._addLocation()
      this._showLocations()
    })()
  };

render() {
  const {navigate} = this.props.navigation;
    return (
      <MapView
        provider = {PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
        followUserLocation={true}
      >
      {
        //display user locations
      this.state.realLocations.map((location, index) => { if(!!location.lat){
        return (
        <MapView.Marker key={index}
                          coordinate={{"latitude": location.lat, "longitude": location.lon}}
                         title={location.email}
                         image={require('../src/restiny.png')} >
                       <MapView.Callout onPress={() => navigate('Profile', {email: location.email})}><Text>{location.email}</Text>
                       </MapView.Callout>
                       </MapView.Marker>)
      }})
      }
      </MapView>
    );
  }
}
