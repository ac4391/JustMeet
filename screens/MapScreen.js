import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import React from 'react';
import {View} from 'react-native';
export default class MapScreen extends React.Component {

  constructor(props) {
          super(props);

          this.state = {
              latitude: 40.8,
              longitude: -73.96,
              error: null,
              candidates: [],
              contents: null
          };
      }
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