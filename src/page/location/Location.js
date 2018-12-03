import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { MapView } from 'react-native-baidu-map'

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView></MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

