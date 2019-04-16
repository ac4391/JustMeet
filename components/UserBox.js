import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Icon } from 'expo';

export default class UserBox extends React.Component {
  render() {
    var image = this.props.user.img
    ? <Image source={this.props.user.img} style={styles.userImg}/>
    : <Icon.Ionicons name="ios-contact" size={40} style={styles.userIcon}/>;
    return (
      <TouchableHighlight onPress={() => /*this.props.navigation.navigate('Profile')*/ null}>
        <View style={styles.user}>
          {image}
          <Text style={styles.userName}>{this.props.user.firstname} {this.props.user.lastname}</Text>
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
    borderRadius: 100
  },
  distance: {
    marginLeft: 'auto',
    fontSize: 18,
  }
});
