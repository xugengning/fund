import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  WebView
} from 'react-native';
import {Header} from "react-native-elements"
import Icon from 'react-native-vector-icons/Ionicons'

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: "http://www.miaosudk.com/private.html"}}
          style={{marginTop: 0}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

