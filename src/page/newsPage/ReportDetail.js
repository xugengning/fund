import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  WebView,
  AsyncStorage,
} from 'react-native';
import {Text, Icon} from "react-native-elements"

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportData: "",
      iconState: false
    }
  }

  async componentWillMount() {
    const {navigation} = this.props;
    const item = navigation.getParam('item')

    const saveData = await this.retrieveData("save") || "[]"
    const index = JSON.parse(saveData).findIndex((val) => val.title == item.title)

    this.setState({
      reportData: item,
      iconState: index == -1 ? false : true
    })
  }

  removeReport = async () => {
    const reportData = this.state.reportData

    const saveData = await this.retrieveData("save") || "[]"

    const newArr = JSON.parse(saveData)

    const index = newArr.findIndex((item) => item.title == reportData.title)

    newArr.splice(index, 1)

    this.storeData("save", JSON.stringify(newArr))

    this.setState({
      iconState: false
    })
  }

  saveReport = async () => {
    const reportData = this.state.reportData

    const saveData = await this.retrieveData("save") || "[]"

    const newArr = JSON.parse(saveData)

    const index = newArr.findIndex((item) => item.title == reportData.title)

    if (index == -1) {
      newArr.push(reportData)
    }

    this.storeData("save", JSON.stringify(newArr))

    this.setState({
      iconState: true
    })
  }

  storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      console.log(error);
    }
  }

  retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value
    } catch (error) {
      // Error retrieving data
    }
  }

  render() {
    const {reportData, iconState} = this.state
    return (
      <View style={styles.container}>
        <Text h4 style={styles.title}>{reportData.title}</Text>
        <View style={styles.relative}>
          <Text style={styles.title}>{reportData.date}</Text>
          <View style={styles.iconStyle}>
            <Icon
              name='heartbeat'
              type='font-awesome'
              color={iconState ? "#f50" : "#ccc"}
              onPress={() => {
                iconState ? this.removeReport() : this.saveReport()
              }}/>
          </View>
        </View>

        <WebView
          originWhitelist={['*']}
          scalesPageToFit={false}
          source={{html: reportData.report}}
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
  },
  iconStyle: {
    position: "absolute",
    right: 0,
    bottom: 10,
  },
  relative: {
    position: "relative"
  }
});

