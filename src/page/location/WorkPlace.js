import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Header } from "react-native-elements"
import Icon from 'react-native-vector-icons/Ionicons'

export default class WorkPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

