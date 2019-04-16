import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import React from 'react';
import {View} from 'react-native';
import {Image} from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createLocation } from '../src/graphql/mutations';
import { listApplicants } from '../src/graphql/queries';
import { listLocations } from '../src/graphql/queries';
export default class MapScreen extends React.Component {

  constructor(props) {
          super(props);

          this.state = {
              user: {},
              latitude: 40.806457,
              longitude: -73.963203,
              error: null,
              candidates: [],
              locations: [],
              contents: null
          };
      }

  _getLocation = async () => {
        //console.log(this.state.latitude, this.state.longitude);
        //console.log(Auth.user); // Print user email
        console.log('Adding location to DB');
        try {
            const users = await API.graphql(graphqlOperation(listApplicants));
            //var existingUser = {};
            for (i = 0; i < users.data.listApplicants.items.length; i++){
              if (users.data.listApplicants.items[i].email == Auth.user.attributes.email)
                    {var existingUser = users.data.listApplicants.items[i]};
            }
            this.setState({
                user: existingUser
            })
          } catch (err) {
            console.log('Error getting corresponding applicant for current location', err)
          }
        };

  _showLocations = async () => {
              console.log('Getting locations from DB');
              try {
                  const graphqldata = await API.graphql(graphqlOperation(listLocations));
                  this.setState(
                    {
                      locations: graphqldata.data.listLocations.items,
                      // reset the input field to empty after post creation
                    })
                } catch (err) {
                  console.log('error getting locations', err)
                }
              };

  _addLocation = async () => {
            const loc = {input:{
                    email: this.state.user.email,
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

        // Get user location, then post location to DB
        (async () => {
          await this._getLocation()
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
      this.state.locations.map((location, index) => (
        <MapView.Marker key={index}
                          coordinate={{"latitude": location.lat, "longitude": location.lon}}
                         title={location.email}
                         image={require('../src/restiny.png')}
                         onPress={() => navigate('Applicants', {email: location.email})}
                       />

      ))
      }

      {this.state.contents}
      </MapView>
    );
  }
}
