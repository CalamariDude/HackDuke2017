import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  watchID: ?number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var lng = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      }

      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
    },
    (error) => alert(JSON.stringify(error)),
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 })

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var lng = parseFloat(position.coords.longitude)

      var lastRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      }

      this.setState({initialPosition: lastRegion})
      this.setState({markerPosition: lastRegion})
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  render() {
    return (
       <View style={styles.container}>

          <MapView
            style={styles.map}
            region={this.state.initialPosition}>

              <MapView.Marker
                coordinate={this.state.markerPosition}
                title={'User Location'}
                description={'User is here'}/>

            </MapView>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
