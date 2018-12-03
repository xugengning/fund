import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  WebView,
} from 'react-native';
import { Text } from "react-native-elements"

export default class HistoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportData: ""
    }
  }

  componentWillMount() {
    const {navigation} = this.props;
    const item = navigation.getParam('item') || 440300

    this.setState({
      reportData: item
    })
  }

  render() {
    const { reportData } = this.state
    return (
      <View style={styles.container}>
        <Text h4 style={styles.title}>{reportData.title}</Text>
        <Text style={styles.title}>{reportData.date}</Text>
        <WebView
          originWhitelist={['*']}
          scalesPageToFit={false}
          source={{ html: reportData.report }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
  }
});

