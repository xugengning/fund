import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView
} from 'react-native';
import {List, ListItem} from "react-native-elements"

export default class MyFund extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const list = [
      {
        name: '收藏',
        subtitle: 'Save'
      },
      {
        name: '历史记录',
        subtitle: 'History'
      },
      {
        name: '隐私协议',
        subtitle: 'Save'
      },
      {
        name: '公司官网',
        subtitle: 'Save'
      },
    ]

    return (
      <View style={styles.container}>
        <View style={styles.photo}>
          <Image
            style={styles.img}
            source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
          />
        </View>
        <List containerStyle={{marginBottom: 0}}>
          {
            list.map((l) => (
              <ListItem
                roundAvatar
                key={l.name}
                title={l.name}
                onPress={() => {this.props.navigation.navigate(l.subtitle)}}
              />
            ))
          }
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  photo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  }
});

