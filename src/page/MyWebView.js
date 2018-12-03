import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class MyWebView extends Component {
  render() {
    const {navigation} = this.props
    const webViewUri = navigation.getParam("uri")

    return (
      <WebView
        source={{uri: webViewUri}}
        style={{marginTop: 0}}
      />
    );
  }
}