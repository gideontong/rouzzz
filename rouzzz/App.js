/* 
 * rouzzz
 * ==============================================
 * An alarm clock app that wakes you up only when
 * it is truly necessary. Wakes you up as late
 * as possible such that you can optimize the
 * amount of sleep you get.
 * 
 * Programmed by Gideon Tong, Andrew Chau,
 * James Wang, and Jeff Ding at SDHacks 2018.
 * 
 * No one will notice if someone says Jeff did
 * nothing because he won't even notice this
 * comment.
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
import {
  createStackNavigator,
} from 'react-navigation';
import MapView, { 
  MapViewAnimated
} from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { styles } from './includes/style.js';
import { TimeFinderScreen } from './includes/debug.js';

export class HomeScreen extends React.Component {
  num = 0;
  // currLat = this.state.position.latitude;    // once we integrate, use this.
  // currLng = this.state.position.longitude;
  currLat = 32.7157;  // temp until api integration
  currLng = -117.1611;
  state = {
    readyTime: 0,
    region: { // for mapview
      latitude: this.currLat,
      longitude: this.currLng,
      latitudeDelta: 0.030,
      longitudeDelta: 0.0242,
    },
    MarkerLatLng: { // for map marker
      latitude: this.currLat,
      longitude: this.currLng
    },
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 40}}>Rouzzz</Text>
        <MapView
          ref={map => this.map = map}
          style={styles.map}
          initialRegion={this.state.region}
          onMarkerDragEnd={(e)=>this.map.animateToCoordinate(e.nativeEvent.coordinate)}
        >
          <Marker draggable
            coordinate={this.state.MarkerLatLng}
            onDragEnd={(e) => this.setState({MarkerLatLng: e.nativeEvent.coordinate})}
          />
        </MapView>
        <Text>Latitude: {this.state.MarkerLatLng.latitude}</Text>
        <Text>Longitude: {this.state.MarkerLatLng.longitude}</Text>
        <Button
          title="Go to Countdown"
          onPress={() => this.props.navigation.navigate('Countdown')}
        />
        <Button
          title="Go to Alarm"
          onPress={() => this.props.navigation.navigate('Alarm')}
        />
        <Button
          title="Go to TimeFinder (Debug page)"
          onPress={() => this.props.navigation.navigate('TimeFinder')}
        />
        <Text>
          How much time do you need to get ready?
        </Text>
        <TextInput
          keyboardType='numeric'
          onChangeText={(text) => this.onChanged(text)}
          value={this.num}
          maxLength={3}
        />
      </View>
    );
  }
  onChanged(text) {
    this.num = +text;
  }
}

export class AlarmScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Countdown"
          onPress={() => this.props.navigation.navigate('Countdown')}
        />
        <Button
          title="Go to TimeFinder (Debug page)"
          onPress={() => this.props.navigation.navigate('TimeFinder')}
        />
      </View>
    );
  }
}

export class CountdownScreen extends React.Component {
  render() {
    var date = new Date(Date.now());
    var timeToGetReady = 10;
    var dateString = (date.getHours() + ":" + (date.getMinutes() >= 10 ? date.getMinutes().toString() : ('0' + date.getMinutes()).toString()));
    var arrivalTime = new Date(2314897238947);
    return (
      <View style={styles.container}>
        <Text style={styles.timeHeader}>
          {dateString}
        </Text>
        <Text>{"You will have " + timeToGetReady + "minutes to get ready."}</Text>
        <Text>{"You will arrive by " + (arrivalTime.getHours() + ":" + (arrivalTime.getMinutes() >= 10 ? arrivalTime.getMinutes().toString() : ('0' + arrivalTime.getMinutes()).toString()))}</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Alarm"
          onPress={() => this.props.navigation.navigate('Alarm')}
        />
        <Button
          title="Go to TimeFinder (Debug page)"
          onPress={() => this.props.navigation.navigate('TimeFinder')}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Countdown: CountdownScreen,
    Alarm: AlarmScreen,
    TimeFinder: TimeFinderScreen
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}
