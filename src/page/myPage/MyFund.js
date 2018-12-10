import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  AsyncStorage
} from 'react-native';
import {List, ListItem} from "react-native-elements"

export default class MyFund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fundInfo: ""
    }
  }

  async componentWillMount() {
    const fundInfo = await this.retrieveData("fundInfo")

    console.log(JSON.parse(fundInfo));

    this.setState({
      fundInfo: JSON.parse(fundInfo)
    })
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
    const list = [
      {
        name: '我的公积金',
        subtitle: 'FundInfo',
        params: {
          fundData: this.state.fundInfo
        }
      },
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
        subtitle: 'Private',
      },
      {
        name: '注册协议',
        subtitle: 'Register',
      },
    ]

    return (
      <View style={styles.container}>
        <View style={styles.photo}>
          <Image
            style={styles.img}
            source={require("../../images/秒速金.png")}
          />
        </View>
        <List containerStyle={{marginBottom: 0}}>
          {
            list.map((l, index) => {
              if (index == 0 && !l.params.fundData) {
                return <View key={index}/>
              }

              return <ListItem
                roundAvatar
                key={index}
                title={l.name}
                onPress={() => {
                  this.props.navigation.navigate(l.subtitle, {
                    ...l.params
                  })
                }}
              />
            })
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

