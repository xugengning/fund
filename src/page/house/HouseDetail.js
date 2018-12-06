import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  ActionSheetIOS,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {Divider, Badge} from "react-native-elements"
import Icon from 'react-native-vector-icons/Ionicons'
import HttpUtils from '../../common/HttpUtils'
import {houseApi, houseAppKey} from '../../common/config'
import Swiper from 'react-native-swiper';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      house_id: 0,
      detailDatail: ""
    }
  }

  componentWillMount() {
    const {navigation} = this.props;
    const house_id = navigation.getParam('house_id') || 55043

    this.setState({
      house_id
    }, () => {
      this.getHouseDetail()
    })
  }

  getUrl = (url, data) => {
    let tempUrl = `${url}?`

    for (let k in data) {
      if (!data[k]) continue
      tempUrl += k + "=" + data[k] + "&"
    }

    return tempUrl.slice(0, -1)
  }

  getHouseDetail = () => {
    const _this = this
    const {house_id} = this.state
    _this.setState({
      loadingState: true
    })

    let data = {
      appKey: houseAppKey,
      house_id,
    }

    let url = this.getUrl(`${houseApi}house_detaile`, data)

    HttpUtils.get(url)
      .then((res) => {
        if (res.ERRORCODE == "0") {
          console.log(res.RESULT.house_info);
          _this.setState({
            detailDatail: res.RESULT.house_info,
            loadingState: false
          })
        } else {
          _this.setState({
            detailDatail: "",
            loadingState: false
          })
        }

      })
  }

  render() {
    const {detailDatail, loadingState} = this.state

    return (
      <View style={styles.container}>
        {
          loadingState ? <View style={[styles.horizontal]}>
            <ActivityIndicator animating={true} size="large" color="#4a98f0"/>
          </View> : (
            <View>
              {
                detailDatail ? <ScrollView>
                  <Swiper style={styles.wrapper} autoplay>
                    {
                      detailDatail.img_urls.map((item, index) => {
                        return (
                          <View style={styles.slide1} key={index}>
                            <Image
                              style={{width: "100%", height: "100%"}}
                              source={{uri: item}}
                            />
                          </View>
                        )
                      })
                    }
                  </Swiper>
                  <View style={styles.detailInfo}>
                    <View style={styles.infoTip}>
                      <Text style={styles.tip}>{detailDatail.sale_status}</Text>
                      <Text style={[styles.tip, {backgroundColor: "#f46820"}]}>{detailDatail.service_type}</Text>
                    </View>
                    <Text style={styles.infoTitle}>{detailDatail.house_name}</Text>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoName}>参考均价：</Text>
                      <Text style={[styles.infoValue, {color: "#f73535"}]}>{detailDatail.price}元/平</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoName}>参考总价：</Text>
                      <Text style={[styles.infoValue]}>{detailDatail.total_space}万/套</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoName}>开盘：</Text>
                      <Text style={[styles.infoValue]}>{detailDatail.price}元/平</Text>
                    </View>
                    <TouchableOpacity style={styles.infoItem} onPress={() => {
                      this.props.navigation.navigate("Location", {
                        address: detailDatail.address
                      })
                    }}>
                      <Text style={styles.infoName}>地址：</Text>
                      <Text style={[styles.infoValue]}>{detailDatail.address}</Text>
                      <Icon name="ios-arrow-dropright" size={20} style={[styles.infoIcon, {color: "#ccc"}]}/>
                    </TouchableOpacity>
                    <View style={styles.infoItem}>
                      {
                        detailDatail.house_trait.split(",").map((val, idx) => {
                          return <View key={idx}>
                            <Text style={[styles.tip, {backgroundColor: "#eee", color: "#666",marginBottom: 5}]}>{val}</Text>
                          </View>
                        })
                      }
                    </View>
                  </View>
                  <View style={styles.dynamic}>
                    <Text style={styles.dynamicTitle}>楼盘动态</Text>
                    {
                      detailDatail.dynamic_infos.map((val, idx) => {
                        return <View key={idx}>
                          <View style={styles.dynamicItem}>
                            <Text>{val.dynamic_content}</Text>
                            <View style={[styles.infoItem, styles.dynamicInfo]}>
                              <Text style={[styles.tip, {backgroundColor: "#f46820"}]}>{val.dynamic_type}</Text>
                              <Text style={{color: "#999"}}>{val.push_time}</Text>
                            </View>
                          </View>
                          <Divider style={{backgroundColor: '#ccc'}}/>
                        </View>
                      })
                    }
                  </View>
                </ScrollView> : <View/>
              }
            </View>
          )
        }

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  wrapper: {
    height: 200,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  noBuild: {
    fontSize: 20,
    color: "#666"
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 200,
  },
  detailInfo: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  infoTip: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 8,
  },
  tip: {
    color: "#fff",
    backgroundColor: "#03A9F4",
    fontSize: 12,
    padding: 2,
    paddingRight: 5,
    paddingLeft: 5,
    marginRight: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    flexWrap: "wrap",
    position: "relative"
  },
  infoName: {
    fontSize: 12,
    color: "#999"
  },
  infoIcon: {
    position: "absolute",
    right: 10,
  },
  dynamic: {
    padding: 20,
    backgroundColor: "#fff",
  },
  dynamicTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  dynamicInfo: {
    justifyContent: "space-between"
  },
  dynamicItem: {
    marginBottom: 5,
    marginTop: 10,
  }
});

