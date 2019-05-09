import React from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createLocation } from '../src/graphql/mutations';
import { listApplicants } from '../src/graphql/queries';

export default class LocationOps extends React.Component {

    constructor(props) {
          super(props);

          this.state = {
              user: {},
              latitude: 40.806457,
              longitude: -73.963203,
              error: null,
              candidates: [],
              contents: null
          };
      }

    getLocation = async () => {
        //console.log(this.state.latitude, this.state.longitude);
        //console.log(Auth.user); // Print user email
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

    addLocation = async () => {
            const loc = {input:{
                    email: this.state.user.email,
                    lat: this.state.latitude,
                    lon: this.state.longitude,
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
        // Get user location, then post location to DB
        //(async () => {
        //  await this._getLocation()
        //  this._addLocation()
        //})()

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
    return (null);
  }
}