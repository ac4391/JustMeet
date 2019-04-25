import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Icon } from 'expo';

export default class EmployerBox extends React.Component {
  render() {
    var image = this.props.employer.img
      ? <Image source={this.props.employer.img} style={styles.employerImg} />
      : <Icon.Ionicons name="ios-contact" size={40} style={styles.employerIcon} />;
    return (
      <TouchableHighlight onPress={() => /*this.props.navigation.navigate('Profile')*/ null}>
        <View style={styles.employer}>
          {image}
          <Text style={styles.employerCompany}>{this.props.employer.company}</Text>
          <Text style={styles.distance}>{this.props.employer.distance}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  employer: {
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
  employerCompany: {
    paddingLeft: 15,
    fontSize: 16,
  },
  employerImg: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  distance: {
    marginLeft: 'auto',
    fontSize: 18,
  }
});
