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
import {Divider} from "react-native-elements"
import Icon from 'react-native-vector-icons/Ionicons'
import HttpUtils from '../../common/HttpUtils'
import {houseApi, houseAppKey} from '../../common/config'

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseData: [],
      loadingState: true,
      areaData: [],
      priceData: [
        [0, 20000],
        [20000, 30000],
        [30000, 40000],
        [40000, 50000],
        [50000, 60000],
        [60000, 80000],
        [80000, 100000],
        [100000, 999999],
      ],
      house_shapeData: ["1室", "2室", "3室", "4室", "5室"],
      service_typeData: ["住宅", "别墅", "商业", "写字楼"],
      area: "",
      house_shape: "",
      service_type: "",
      keyword: "",
      price: ""
    }
  }

  componentWillMount() {
    this.getHouseContraint()
    this.getAreas()
  }

  selectArea = (target) => {
    const areaData = this.state[`${target}Data`]
    const data = ["不限", ...areaData, "取消"]
    ActionSheetIOS.showActionSheetWithOptions({
        options: data,
        destructiveButtonIndex: 0,
        cancelButtonIndex: data.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex == data.length - 1) {
          return
        }

        let value = data[buttonIndex]

        if (buttonIndex == 0) {
          value = ""
        }

        this.setState({
          [target]: value
        })

        this.getHouseContraint()
      });
  }

  selectPrice = () => {
    const priceData = this.state.priceData.map((item) => `${item[0]}~${item[1]}元/m²以下`)
    const data = ["不限", ...priceData, "取消"]
    let value = ""
    ActionSheetIOS.showActionSheetWithOptions({
        options: data,
        destructiveButtonIndex: 0,
        cancelButtonIndex: data.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex == data.length - 1) {
          return
        }

        if (buttonIndex == 0) {
          value = ""
        } else {
          value = this.state.priceData[buttonIndex - 1]
        }

        this.setState({
          price: value
        })

        this.getHouseContraint()
      });
  }

  getAreas = () => {
    const _this = this

    HttpUtils.get(`${houseApi}areas?appKey=${houseAppKey}&city_name=深圳`)
      .then((res) => {
        if (res.ERRORCODE == "0") {
          let tempData = res.RESULT.areas_info

          _this.setState({
            areaData: tempData.map((item) => item.area_name)
          })
        }

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

  getHouseContraint = () => {
    const _this = this
    const {area, house_shape, service_type, price, keyword} = this.state
    _this.setState({
      loadingState: true
    })

    let data = {
      appKey: houseAppKey,
      city_name: "深圳",
      area,
      house_shape,
      service_type,
      keyword,
      price: price ? JSON.stringify(price) : "",
    }

    let url = this.getUrl(`${houseApi}house_constraint`, data)

    HttpUtils.get(url)
      .then((res) => {
        console.log(res);
        if (res.ERRORCODE == "0") {
          _this.setState({
            houseData: res.RESULT.houses_info,
            loadingState: false
          })
        } else {
          _this.setState({
            houseData: [],
            loadingState: false
          })
        }

      })
      .catch((res) => {
        console.log(res);
      })
  }

  searchHouse = (value) => {
    this.setState({
      keyword: value
    })
  }

  render() {
    const {loadingState, houseData, area, house_shape, service_type, price} = this.state
    console.log(houseData);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.search}>
            <TextInput
              keyboardType="web-search"
              placeholder="请输入关键字"
              style={styles.searchIpt}
              onChangeText={(text) => this.searchHouse(text)}
              value={this.state.text}
            />
            <View style={styles.searchIcon}>
              <Icon name="ios-search" size={20} style={{color: "#ccc"}}/>
            </View>
            <TouchableOpacity onPress={() => {
              this.getHouseContraint()
            }}>
              <Text style={styles.searchText}>搜索</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchArea}>
            <TouchableOpacity style={styles.searchItem} onPress={() => {
              this.selectArea("area")
            }}>
              <Text style={styles.searchAreaText}>区域</Text>
              <Icon name="ios-arrow-down" size={12} style={{color: "#ccc"}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItem} onPress={() => {
              this.selectPrice()
            }}>
              <Text style={styles.searchAreaText}>价格</Text>
              <Icon name="ios-arrow-down" size={12} style={{color: "#ccc"}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItem} onPress={() => {
              this.selectArea("house_shape")
            }}>
              <Text style={styles.searchAreaText}>户型</Text>
              <Icon name="ios-arrow-down" size={12} style={{color: "#ccc"}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItem} onPress={() => {
              this.selectArea("service_type")
            }}>
              <Text style={styles.searchAreaText}>类型</Text>
              <Icon name="ios-arrow-down" size={12} style={{color: "#ccc"}}/>
            </TouchableOpacity>
          </View>
          <Divider style={{backgroundColor: '#ccc'}}/>
          {
            area || house_shape || service_type || price ? <View style={[styles.search, styles.condition]}>
              {area ? <Text style={styles.conditionWord}>{area}</Text> : <View/>}
              {house_shape ? <Text style={styles.conditionWord}>{house_shape}</Text> : <View/>}
              {service_type ? <Text style={styles.conditionWord}>{service_type}</Text> : <View/>}
              {price ? <Text style={styles.conditionWord}>{`${price[0]}~${price[1]}元/m²以下`}</Text> : <View/>}
            </View> : <View/>
          }
          <Divider style={{backgroundColor: '#ccc'}}/>
        </View>
        <ScrollView>
          {
            loadingState ? <View style={[styles.horizontal]}>
              <ActivityIndicator animating={true} size="large" color="#4a98f0"/>
            </View> : (<View>
              {
                houseData.length ? houseData.map((item, index) => {
                  return <TouchableOpacity style={styles.item} key={index} onPress={() => {
                    this.props.navigation.navigate("HouseDetail", {
                      house_id: item.house_id
                    })
                  }}>
                    <View style={styles.leftItem}>
                      <Image
                        style={{width: "100%", height: "100%", borderRadius: 5,}}
                        source={{uri: item.house_img}}
                      />
                    </View>
                    <View style={styles.rightItem}>
                      <Text style={styles.title}>{item.house_name}</Text>
                      <View style={styles.line}>
                        <Text style={styles.placeholder}>{item.service_type}</Text>
                        <Text style={styles.placeholder}>{item.area}</Text>
                        <Text style={styles.placeholder}>{item.area_tab}</Text>
                      </View>
                      <View style={styles.line}>
                        <Text style={styles.target}>{item.sale_status}</Text>
                        {
                          item.house_trait.split(",").slice(0, 2).map((val, idx) => {
                            return <Text style={styles.tip} key={idx}>
                              {val}
                            </Text>
                          })
                        }
                      </View>
                      <View style={styles.line}>
                        <Text style={styles.price}>{item.price}元/平</Text>
                        <Text style={styles.placeholder}>{item.house_area ? `建面` : ""}</Text>
                        <Text style={styles.placeholder}>{item.house_area ? `${item.house_area}m²` : ""}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                }) : <View style={styles.horizontal}><Text style={styles.noBuild}>暂无楼盘信息</Text></View>
              }
            </View>)


          }
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 200,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
  },
  line: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5,
    alignItems: "center",
  },
  leftItem: {
    width: 100,
    height: 70,
    paddingRight: 10,
  },
  rightItem: {
    flex: 1,
  },
  title: {
    fontWeight: "bold"
  },
  placeholder: {
    fontSize: 12,
    color: "#999",
    marginRight: 5,
  },
  target: {
    color: "#fff",
    backgroundColor: "#03A9F4",
    fontSize: 12,
    padding: 2,
    paddingRight: 5,
    paddingLeft: 5,
    marginRight: 5,
  },
  tip: {
    color: "#666",
    backgroundColor: "#eee",
    fontSize: 12,
    padding: 2,
    paddingRight: 5,
    paddingLeft: 5,
    marginRight: 5,
  },
  price: {
    color: "#f73535",
    fontSize: 12,
    marginRight: 5,
  },
  search: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "relative",
  },
  searchIpt: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    borderRadius: 5,
    paddingLeft: 25,
  },
  searchText: {
    color: "#666",
    padding: 10,
  },
  searchIcon: {
    position: "absolute",
    left: 25,
    top: 7,
  },
  searchArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  searchItem: {
    width: "25%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchAreaText: {
    marginRight: 5,
  },
  noBuild: {
    fontSize: 20,
    color: "#666"
  },
  condition: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  conditionWord: {
    color: "#03A9F4",
    marginRight: 10,
  }
});

