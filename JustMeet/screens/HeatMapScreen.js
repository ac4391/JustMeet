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
          //initialize locations
          this.state = {
              latitude: 40.806457,
              longitude: -73.963203,
              error: null,
              locations: []
          };
      }

  // Pull all locations from the database and store them in 'locations'
  _showLocations = async () => {
    console.log('Getting locations from DB');
    try {
        const graphqldata = await API.graphql(graphqlOperation(listLocations, {limit:25}));
        this.setState(
          {
            locations: graphqldata.data.listLocations.items,
          })
    } catch (err) {
      console.log('error getting locations', err)
    }
  };

  // This component runs once after the component mounts
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // Set viewing location to current position
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });
        },
        (error) => this.setState({error: error.message}),
        {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
    );
    this._showLocations()
  };

render() {
  const {navigate} = this.props.navigation;

  //get polygon points if locations are loaded
  let poly;
  if (!!this.state.locations && this.state.locations.length > 0) {
    let pointset = [];
    for (j = 0; j < this.state.locations.length; j++){
      pointset.push([this.state.locations[j].lat,this.state.locations[j].lon])
    };

    //Get convex hull of location data points
    let edge = hull(pointset, 10);
    //Display the location polygon
    poly = <Polygon
    coordinates={edge.map((location, index) =>  (
          {"latitude": location[0], "longitude": location[1]}
          ))}
    strokeColor="#B24112"
    strokeWidth={2}
    />
  } else {
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
    //Place markers on map for each location
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
