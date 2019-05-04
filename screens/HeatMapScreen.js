import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import {Marker} from 'react-native-maps'
import {Polygon} from 'react-native-maps'
import React from 'react';
import { Text } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createLocation } from '../src/graphql/mutations';
import { listApplicants } from '../src/graphql/queries';
import { listLocations } from '../src/graphql/queries';
import hull from 'hull.js'

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

  _showLocations = async () => {
              console.log('Getting locations from DB');
              try {
                  const graphqldata = await API.graphql(graphqlOperation(listLocations, {limit:25}));
                  this.setState(
                    {
                      locations: graphqldata.data.listLocations.items,
                      // reset the input field to empty after post creation
                    })
                } catch (err) {
                  console.log('error getting locations', err)
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

          this._showLocations()

      };
render() {
  const {navigate} = this.props.navigation;
  let poly;
  if (!!this.state.locations && this.state.locations.length > 0) {

    let pointset = [];
    for (j = 0; j < this.state.locations.length; j++){
      pointset.push([this.state.locations[j].lat,this.state.locations[j].lon])
    };
    console.log(pointset.length)
    let edge = hull(pointset, 10);
    console.log(edge.length)
    poly = <Polygon
  coordinates={edge.map((location, index) =>  (
    {"latitude": location[0], "longitude": location[1]}
))}
  strokeColor="#B24112" // fallback for when `strokeColors` is not supported by the map-provider
  strokeWidth={2}
/>
}else {
    poly = null
  }
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
      >
      {
      this.state.locations.map((location, index) => { if(!!location.lat)
        return (
        <Marker coordinate={{"latitude": location.lat, "longitude": location.lon}} key={index} cluster={true}/>
)})
      }
      {poly}

      </MapView>
    );
  }
}
