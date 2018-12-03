import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import {List, ListItem} from "react-native-elements"

export default class Save extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyData: [],
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

  async componentWillMount() {
    const historyData = await this.retrieveData("save") ||"[]"

    this.setState({
      historyData: JSON.parse(historyData)
    })
  }

  render() {
    const { historyData } = this.state

    console.log(historyData);

    return (
      <ScrollView style={styles.container}>
        <List containerStyle={{marginBottom: 20, marginTop: 0}}>
          {
            historyData.map((l, index) => (
              <ListItem
                roundAvatar
                key={index}
                onPress={() => {
                  this.props.navigation.navigate('HistoryDetail', {
                    item: l
                  });
                }}
                title={l.title}
              />
            ))
          }
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  btnGroup: {
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnStyle: {
    backgroundColor: "#4a98f0",
  },
  textStyle: {
    color: "#fff"
  },
});

