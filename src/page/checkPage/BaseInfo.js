import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Divider} from "react-native-elements"


export default class BaseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseInfo: {}
    }
  }

  componentWillMount() {
    const {navigation} = this.props;
    const baseInfo = navigation.getParam('base_info') || {}

    this.setState({
      baseInfo: baseInfo
    })
  }

  render() {
    const {baseInfo} = this.state
    console.log(baseInfo);

    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <View style={[styles.leftWord, styles.header]}>
            <View style={styles.line}></View>
            <Text>账号信息</Text>
          </View>
          <Text style={[styles.rightWord, styles.tip]}>{baseInfo.pay_status_desc}</Text>
        </View>
        <Divider style={{backgroundColor: '#ccc'}}/>
        <View style={styles.item}>
          <Text style={styles.leftWord}>姓名</Text>
          <Text style={styles.rightWord}>{baseInfo.name}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.leftWord}>证件号码</Text>
          <Text style={styles.rightWord}>{baseInfo.cert_no.slice(0,5)}****{baseInfo.cert_no.slice(15)}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.leftWord}>缴存单位</Text>
          <Text style={styles.rightWord}>{baseInfo.corp_name}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.leftWord}>缴存基数(元)</Text>
          <Text style={styles.rightWord}>{baseInfo.base_number.toFixed(2)}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.leftWord}>缴存比例</Text>
          <Text style={styles.rightWord}>{baseInfo.monthly_corp_proportion}%</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.leftWord}>学历学位</Text>
          <Text style={styles.rightWord}>{baseInfo.education}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.leftWord}>手机号码</Text>
          <Text style={styles.rightWord}>{baseInfo.mobile.slice(0,3)}****{baseInfo.mobile.slice(7)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  leftWord: {
    fontSize: 16,
    color: "#999"
  },
  line: {
    width: 3,
    height: 15,
    backgroundColor: "#03A9F4",
    marginRight: 5,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tip: {
    borderWidth: 1,
    borderColor: "green",
    fontSize: 12,
    padding: 3,
    color: "green",
    borderRadius: 5,
  }
});

