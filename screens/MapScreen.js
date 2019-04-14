import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import React from 'react';
import {View} from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createLocation } from '../src/graphql/mutations';
import { listApplicants } from '../src/graphql/queries';
export default class MapScreen extends React.Component {

  constructor(props) {
          super(props);

          this.state = {
              latitude: 40.8,
              longitude: -75.96,
              error: null,
              candidates: [],
              contents: null
          };
      }
  _addLocation = async () => {
        console.log(this.state.latitude, this.state.longitude);
        console.log(Auth.user); // Print user email
        console.log('Trying to add location to DB');
        try {
            const users = await API.graphql(graphqlOperation(listApplicants));
            var existingUser = {};
            for (i = 0; i < users.data.listApplicants.items.length; i++){
              if (users.data.listApplicants.items[i].email == Auth.user.attributes.email)
                    {existingUser = users.data.listApplicants.items[i].id,
                    console.log(existingUser)};
            }
          } catch (err) {
            console.log('error getting applicant', err)
          }
        const loc = {input:{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    id: existingUser,
                    }
                }
                
        try {
        await API.graphql(graphqlOperation(createLocation, loc))
        } catch (err) {
        console.log('error adding location to DB', err)
        }
        };

     // This component runs once after the component mounts
  componentDidMount() {
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
        //API call to get friends
        this._addLocation();
        this.setState({
            candidates: [
                {
                    latitude: 40.81,
                    longitude: -73.96,
                    key: "candidate 1"
                },
                {
                    latitude: 40.82,
                    longitude: -73.97,
                    key: "candidate 2"
                }
            ],
        }, () => this._renderCandidates());
        }
            _renderCandidates() {
                const markers = this.state.candidates.map((item) => {
                    console.log('getting friend iter')
                    return (
                        <MapView.Marker
                            key={item.key}
                            coordinate={{"latitude": item.latitude, "longitude": item.longitude}}
                            title={item.key}
                            pinColor={'#3498db'}/>
                    );
                });
                this.setState({contents: markers})
            }
render() {
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
      {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                        coordinate={{"latitude": this.state.latitude, "longitude": this.state.longitude}}
                       title={"You're here"} pinColor={'#3498db'}
                     />}

      {this.state.contents}
      </MapView>
    );
  }
}