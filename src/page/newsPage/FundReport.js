import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import {List, ListItem, ButtonGroup} from "react-native-elements"
import {
  statisticalInfo,
  announcementsData,
  workDynamicData,
  policyRule,
  policyResolve
} from '../../staticData/staticData'

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnGroup: ['统计', '公告', '动态', '法规', '解读'],
      dataGroup: [statisticalInfo, announcementsData, workDynamicData, policyRule, policyResolve],
      selectedIndex: 0
    }
    this.listData = []
  }

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex})
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

  componentWillMount() {

  }

  render() {
    const _this = this
    const {selectedIndex, btnGroup, dataGroup} = this.state

    return (
      <ScrollView style={styles.container}>
        <View style={styles.btnGroup}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={btnGroup}
            selectedButtonStyle={styles.btnStyle}
            selectedTextStyle={styles.textStyle}
            containerStyle={{height: 30}}
          />
        </View>
        <List containerStyle={{marginBottom: 20, marginTop: 0}}>
          {
            dataGroup ? dataGroup[selectedIndex].map((l, index) => (
              <ListItem
                roundAvatar
                key={index}
                onPress={async () => {
                  const historyData = await this.retrieveData("history") || []

                  const newArr = JSON.parse(historyData)

                  const index = newArr.findIndex((item) => item.title == l.title)

                  if (index == -1) {
                    l.timeStamp = new Date().getTime()
                    newArr.push(l)
                  } else {
                    newArr[index].timeStamp = new Date().getTime()
                  }

                  this.storeData("history", JSON.stringify(newArr))
                  this.props.navigation.navigate('ReportDetail', {
                    item: l
                  });
                }}
                title={l.title}
              />
            )) : <View/>
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

