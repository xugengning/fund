/**
 * @author lovebing
 */

import React, {
  Component,
  PropTypes
} from 'react';

import {
  MapView,
  MapTypes,
  Geolocation
} from 'react-native-baidu-map';

import {
  Button,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import Dimensions from 'Dimensions';

export default class Location extends Component {

  constructor() {
    super();

    this.state = {
      mayType: MapTypes.NORMAL,
      zoom: 15,
      center: {
        longitude: 113.981718,
        latitude: 22.542449
      },
      trafficEnabled: false,
      baiduHeatMapEnabled: false,
      markers: []
    };
  }

  componentWillMount() {
    const {navigation} = this.props;
    const name = navigation.getParam('name')
    const address = navigation.getParam('address')
    console.log(name, address);
    Geolocation.geocode('深圳市', address)
      .then((res) => {
        console.log(res);
        this.setState({
          markers: [{
            latitude: Number(res.latitude),
            longitude: Number(res.longitude),
            title: `办事地点:${address}`
          }],
          center: {
            longitude: Number(res.longitude),
            latitude: Number(res.latitude)
          },
        });
      })
  }

  getLocation = () => {
    Geolocation.getCurrentPosition()
      .then(data => {
        console.log(data);
        this.setState({
          zoom: 15,
          marker: {
            latitude: data.latitude,
            longitude: data.longitude,
            title: '当前位置'
          },
          center: {
            latitude: data.latitude,
            longitude: data.longitude,
            rand: Math.random()
          }
        });
      })
      .catch(e => {
        console.log(e);
        console.warn(e, 'error');
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          trafficEnabled={this.state.trafficEnabled}
          baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
          zoom={this.state.zoom}
          mapType={this.state.mapType}
          center={this.state.center}
          marker={this.state.marker}
          markers={this.state.markers}
          style={styles.map}
          onMarkerClick={(e) => {
            console.warn(JSON.stringify(e));
          }}
          onMapClick={(e) => {
          }}
        >
        </MapView>
        <View style={styles.screen}>
          <Icon name="ios-laptop" size={32} style={{color: "#f46820"}} onPress={() => {
            this.setState({
              mapType: MapTypes.NORMAL
            });
          }}/>

          <Icon name="ios-tv" size={32} style={{color: "#699846"}} onPress={() => {
            this.setState({
              mapType: MapTypes.SATELLITE
            });
          }}/>

          <Icon name="ios-subway" size={32} style={{color: "#f5bf2d"}} onPress={() => {
            this.setState({
              trafficEnabled: !this.state.trafficEnabled
            });
          }}/>
        </View>

        <View style={styles.zoom}>
          <Button title="+" onPress={() => {
            this.setState({
              zoom: this.state.zoom + 1
            });
          }}/>
          <Button title="-" onPress={() => {
            if (this.state.zoom > 0) {
              this.setState({
                zoom: this.state.zoom - 1
              });
            }

          }}/>
        </View>

        <View style={styles.row}>
          <Button title="Traffic" onPress={() => {
            this.setState({
              trafficEnabled: !this.state.trafficEnabled
            });
          }}/>

          <Button title="Baidu HeatMap" onPress={() => {
            this.setState({
              baiduHeatMapEnabled: !this.state.baiduHeatMapEnabled
            });
          }}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 40
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginBottom: 16,
    position: "relative"
  },
  screen: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    right: 10,
    top: 20,
  },
  zoom: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    right: 10,
    bottom: 200,
  }
});