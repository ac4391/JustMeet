import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Icon } from 'expo';

export default class UserBox extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('Profile', {email:this.props.user.email})}>
        <View style={styles.user}>
          <Image source={require('../assets/images/male.png')} style={styles.userImg}/>
          <Text style={styles.userName}>{this.props.user.username}</Text>
          <Text style={styles.distance}>{this.props.user.distance}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  user: {
    marginLeft: '5%',
    marginBottom: 15,
    width: '90%',
    padding: 10,
    borderRadius: 10,
    color: '#eee',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  userName: {
    paddingLeft: 15,
    fontSize: 16,
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  distance: {
    marginLeft: 'auto',
    fontSize: 18,
  }
});
