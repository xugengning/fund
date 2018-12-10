import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {placeDetail} from '../../staticData/staticData'
import {Divider} from 'react-native-elements'


export default class WorkPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: {}
    }
  }

  componentWillMount() {
    const {navigation} = this.props;
    const target = navigation.getParam('target')
    const index = placeDetail.findIndex((item) => item.title == target)

    this.setState({
      listData: placeDetail[index]
    })
  }

  render() {
    const {listData} = this.state
    console.log(listData);
    return (
      <ScrollView style={styles.container}>
        {
          listData.list ? listData.list.map((item, index) => {
            return <View style={styles.item} key={index}>
              <View style={styles.content}>
                <TouchableOpacity style={styles.word} key={index} onPress={() => {
                  this.props.navigation.navigate('Location', {
                    name: item.nameList,
                    address: item.placeList
                  })
                }}>
                  <Text style={styles.name}>{item.nameList}</Text>
                  <Text style={styles.address}>地址：{item.placeList}</Text>
                  <Text style={styles.address}>电话：{item.telList}</Text>
                </TouchableOpacity>
              </View>
            </View>
          }) : <Divider/>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  item: {
    display: "flex",
    // marginBottom: 20,
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  tip: {
    fontSize: 10,
    color: "#666",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  content: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  link: {
    display: "flex",
    width: "25%",
    padding: 10,
    textAlign: "center"
  },
  word: {
    marginBottom: 10,
    width: "100%",
  },
  name: {
    marginBottom: 10,
    fontSize: 18,
  },
  address: {
    marginBottom: 5,
  }
});

