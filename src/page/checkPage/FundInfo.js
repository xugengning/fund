import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Divider} from "react-native-elements"
import Icon from 'react-native-vector-icons/Ionicons'

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fundData: {},
      eyeClose: true
    }
  }

  componentWillMount() {
    const {navigation} = this.props;

    const fundData = navigation.getParam('fundData') || {}

    console.log(fundData);

    fundData.bill_record = fundData.bill_record.reverse()

    this.setState({
      fundData
    })
  }

  render() {
    let {fundData, eyeClose} = this.state
    let {base_info, bill_record} = fundData

    console.log(bill_record);

    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={require("../../images/fundBgI.png")} style={styles.baseInfo}>
          <Text style={styles.title}>账号余额(元)</Text>
          <View style={styles.cust}>
            <Text style={styles.balance}>{eyeClose ? "***" : base_info.balance}</Text>
            <Icon name={eyeClose ? "ios-eye-off" : "ios-eye"} size={28} style={{color: "#f5f5f5"}} onPress={() => {
              this.setState({
                eyeClose: !eyeClose
              })
            }}/>
          </View>
          <View style={styles.cust}>
            <Text style={styles.name}>*{base_info.name.slice(1)}</Text>
            <View style={styles.line}></View>
            <Text style={styles.name}>{base_info.cust_no}</Text>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => {
            this.props.navigation.navigate('BaseInfo', {
              base_info
            })
          }}>
            <Text style={[styles.name,]}>查看账户信息</Text>
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.recordInfo}>
          <Text style={styles.recordTitle}>我的缴存</Text>
          <View style={styles.content}>
            <Text style={styles.recordText}>最近缴存{bill_record[0].deal_time}</Text>
            <Text style={styles.recordText}>{bill_record[0].income ? bill_record[0].income + "元" : "暂无"}</Text>
          </View>
        </View>
        <Divider style={{backgroundColor: '#ccc'}}/>
        <View style={styles.list}>
          <View style={styles.listHeader}>
            <Text style={{fontSize: 16, fontWeight: "bold"}}>缴存记录列表</Text>
          </View>
          <Divider style={{backgroundColor: '#eee'}}/>
          {
            bill_record.map((item, index) => {
              return (
                <View key={index}>
                  <View style={styles.item}>
                    <View style={styles.leftActions}>
                      <Text>{item.deal_time}</Text>
                      <Text style={{marginLeft: 10,}}>{item.desc}</Text>
                    </View>
                    <Text>{item.income ? `${item.income}元` : ""}</Text>
                  </View>
                  <Divider style={{backgroundColor: '#eee'}}/>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  baseInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 200,
  },
  title: {
    margin: 10,
    marginTop: 20,
    color: "#fff",
  },
  cust: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  balance: {
    color: "#fff",
    marginRight: 10,
    fontSize: 18,
  },
  name: {
    color: "#fff",
  },
  line: {
    width: 2,
    height: 15,
    backgroundColor: "#ccc",
    margin: 10,
  },
  btn: {
    width: 150,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#f5f5f5",
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 20,
  },
  recordInfo: {
    display: "flex",
    padding: 20,
    backgroundColor: "#fff",
  },
  recordTitle: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  recordText: {
    color: "#999",
    marginRight: 10,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  leftActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  list: {
    marginTop: 20,
  },
  listHeader: {
    backgroundColor: "#fff",
    padding: 20,
  }
});

