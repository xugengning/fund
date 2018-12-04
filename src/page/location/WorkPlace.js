import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {placeList} from '../../staticData/staticData'
import { Divider } from 'react-native-elements'


export default class WorkPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: placeList
    }
  }

  componentWillMount() {
    console.log(placeList);
  }

  render() {
    const { list } = this.state
    return (
      <ScrollView style={styles.container}>
        {
          list.map((item, index) => {
            return <View style={styles.item} key={index}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.tip}>{item.workTime[0]}</Text>
              <Divider style={{ backgroundColor: '#03A9F4' }} />
              <View style={styles.content}>
                {
                  item.place.length > 0 ? (item.place.map((val, idx) => {
                    return <TouchableOpacity key={idx} style={styles.link} onPress={() => {
                      this.props.navigation.navigate('PlaceDetail', {
                        target: `${item.title}-${val}`,
                      })
                    }}><Text>{val}</Text></TouchableOpacity>
                  })) : item.list.map((val, idx) => {
                    return <TouchableOpacity style={styles.word} key={idx} onPress={() => {
                      this.props.navigation.navigate('Location', {
                        name: val.nameList,
                        address: val.placeList
                      })
                    }}>
                      <Text style={styles.name}>{val.nameList}</Text>
                      <Text style={styles.address}>地址：{val.placeList}</Text>
                      <Text style={styles.address}>电话：{val.telList}</Text>
                      <Divider style={{ backgroundColor: '#f5f5f5' }} />
                    </TouchableOpacity>
                  })
                }
              </View>
            </View>
          })
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
    marginBottom: 5,
  },
  address: {
    marginBottom: 5,
    fontSize: 12,
  }
});

