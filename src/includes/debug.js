/*
 * This debug menu is currently hidden from the rest of the class and is called TimeFinderScreen.
 * You can access it by calling TimeFinder as well as any of the child classes and functions.
 * It has not been removed from the source code so you can use it as well, the recommended method
 * of accessing this screen is to add a button to the UI pointing to the menu (in alarm.js, there
 * is a button that is commented out that you can simply uncomment.). Another way is to call it
 * from the console while Expo is running in development mode.
 */

import React from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class TimeFinderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      appId: "", // Put your HERE API app ID here.
      appCode: "" // Put your HERE API app CODE here.
    };
  }

  componentWillMount() {
    this.setState({
      position: {
        latitude: 32.885483,
        longitude: -117.239150
      },
      isLoading: false
    });
  }

  findRoutes() {
    var today = new Date();
    var timestamp =
      today.getFullYear() + "-"
      + (today.getMonth() < 9 ? "0" : "") + parseInt(today.getMonth()+1) + "-"
      + (today.getDate() < 10 ? "0" : "") + today.getDate() + "T"
      + (today.getHours() < 10 ? "0" : "") + today.getHours() + ":"
      + (today.getMinutes() < 10 ? "0" : "") + today.getMinutes() + ":"
      + (today.getSeconds() < 10 ? "0" : "") + today.getSeconds();
    uri = "https://route.api.here.com/routing/7.2/calculateroute.json"
      + "?app_id=" + this.state.appId
      + "&app_code=" + this.state.appCode
      + "&mode=fastest;car;"
      + "&waypoint0=geo!" + this.state.position.latitude + "," + this.state.position.longitude
      + "&waypoint1=geo!" + this.state.dest_latitude + "," + this.state.dest_longitude
      + "&departure=" + timestamp;
    console.log("Now Requesting: " + uri);

    return fetch(uri)
      .then ((response) => response.json())
      .then ((responseJson) => {
        console.log(responseJson);
        this.setState ({
          timeLeft: responseJson.response.route[0].summary.trafficTime
        }, function() {
        });
      })
      .catch ((error) => {
        console.error(error);
      })
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={styles.center_contained}>
          <ActivityIndicator/>
          <Text>{"\n"}Loading...</Text>
        </View>
      )
    }

    return (
      <View style={styles.center_contained}>
        <Text>Alarm clock with HERE API!</Text>
        <Text>Current Location: {JSON.stringify(this.state.position.latitude)}, {JSON.stringify(this.state.position.longitude)}</Text>
        <Text>Destination Latitude:</Text>
        <TextInput
          style={{width: 180, height: 20, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(dest_latitude) => this.setState({dest_latitude})}
          value={this.state.dest_latitude}
        />
        <Text>Destination Longitude:</Text>
        <TextInput
          style={{width: 180, height: 20, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(dest_longitude) => this.setState({dest_longitude})}
          value={this.state.dest_longitude}
        />
        <Button
          onPress={this.findRoutes.bind(this)}
          title="GO!"
        />
        <Text>{this.state.timeLeft} seconds</Text>
        <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    center_contained: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
});