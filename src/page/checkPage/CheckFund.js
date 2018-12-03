import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActionSheetIOS,
  ScrollView
} from 'react-native';
import Geolocation from "../../common/Geolocation"
import HttpUtils from "../../common/HttpUtils"
import {shujuHost, appKey} from "../../common/config"
import {Button, Text} from "react-native-elements"

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceData: [],
      province: "",
      cityData: "",
      city: "",
      countyData: "",
      county: "",
      areaNumber: "",
      listData: []
    }
  }

  async componentWillMount() {
    const _this = this

    HttpUtils.get(`${shujuHost}areaInfo?appKey=${appKey}`).then((res) => {
      const province = '广东'
      const city = '深圳'
      const countyData = Object.keys(res[province][city])

      _this.setState({
        listData: res,
      })

      _this.updateState({province, city, county: countyData[0]})
    })
  }

  updateState = ({province, city, county}) => {
    const listData = this.state.listData
    const provinceData = Object.keys(listData)
    const newprovince = province || this.state.province
    const cityData = Object.keys(listData[newprovince])
    const newcity = city ? city : (province ? cityData[0] : this.state.city)
    const countyData = Object.keys(listData[newprovince][newcity])
    const newcounty = (province || city) ? countyData[0] : (county || this.state.county)

    this.setState({
      province: newprovince,
      city: newcity,
      county: newcounty,
      areaNumber: listData[newprovince][newcity][newcounty],
      provinceData,
      cityData,
      countyData
    })
  }

  selectGround = (target) => {
    let _this = this
    ActionSheetIOS.showActionSheetWithOptions({
        options: this.state[`${target}Data`],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        const val = _this.state[`${target}Data`][buttonIndex]
        _this.updateState({
          [target]: val
        })
      });
  }

  render() {
    const {province, city, county, areaNumber} = this.state
    const _this = this

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.item}>
            <Text style={styles.label}>省：</Text>
            <TouchableOpacity style={styles.ipt} onPress={() => {
              _this.selectGround('province')
            }}>
              <Text>{province}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>市：</Text>
            <TouchableOpacity style={styles.ipt} onPress={() => {
              _this.selectGround('city')
            }}>
              <Text>{city}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>县/区：</Text>
            <TouchableOpacity style={styles.ipt} onPress={() => {
              _this.selectGround('county')
            }}>
              <Text>{county}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>渠道号：</Text>
            <View style={styles.ipt}>
              <Text>{areaNumber}</Text>
            </View>
          </View>
          <View>
            <Button
              raised
              backgroundColor="#4a98f0"
              onPress={() => {
                _this.props.navigation.navigate('SignIn', {
                  areaNumber
                });
              }}
              style={styles.btn}
              title='下一步'/>
          </View>
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
  title: {
    textAlign: "center"
  },
  btn: {
    marginTop: 20
  },
  form: {
    backgroundColor: "#fff",
    padding: 10,
  },
  item: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  label: {
    width: 60,
    textAlign: "right",
  },
  ipt: {
    flex: 1,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  }
});

