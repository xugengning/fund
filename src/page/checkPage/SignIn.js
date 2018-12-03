import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActionSheetIOS,
  ActivityIndicator
} from 'react-native';
import HttpUtils from "../../common/HttpUtils"
import {shujuHost, appKey} from "../../common/config"
import {FormLabel, FormInput, Button, ButtonGroup, Divider} from "react-native-elements"

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      btnGroup: [],
      selectedIndex: 0,
      loadingState: true,
      formData: {}
    }
  }

  componentWillMount() {
    const _this = this
    const {navigation} = this.props;
    const areaNumber = navigation.getParam('areaNumber') || 440300

    _this.getListData(areaNumber)
  }

  getListData = (areaNumber) => {
    const _this = this

    HttpUtils.get(`${shujuHost}paramsInfo?appKey=${appKey}&areaNumber=${areaNumber}`).then((res) => {
      if (res.desc == "success") {
        const listData = res.needParams

        console.log(listData);

        const btnGroup = listData.map((item) => {
          return item[0].desc
        })

        _this.setState({
          listData,
          btnGroup,
          loadingState: false,
        })
      }
    })
  }

  getPicCode = (formData) => {
    const _this = this
    const {navigation} = this.props;
    const areaNumber = navigation.getParam('areaNumber') || 440300

    let url = `${shujuHost}login?appKey=${appKey}&areaNumber=${areaNumber}`
    Object.keys(formData).forEach((item) => {
      url += `&${item}=${formData[item]}`
    })

    HttpUtils.get(url).then((res) => {
      console.log(res);
      _this.getFundData(res.token)
    })
  }

  getFundData = (token) => {
    const _this = this

    HttpUtils.get(`${shujuHost}getData?appKey=${appKey}&token=${token}`)
      .then((res) => {
        if (res.data) {
          _this.setState({
            loadingState: false
          })
        }
        console.log(res);
      })
  }

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex, formData: {}})
  }

  signIn = () => {
    const {formData} = this.state
    this.setState({
      loadingState: true
    })
    this.getPicCode(formData)
  }

  render() {
    const {listData, selectedIndex, btnGroup, formData, loadingState} = this.state
    const _this = this

    return (
      <View style={styles.container}>
        {
          !loadingState ? <View>
            <View style={styles.btnGroup}>
              <ButtonGroup
                onPress={_this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={btnGroup}
                selectedButtonStyle={styles.btnStyle}
                selectedTextStyle={styles.textStyle}
                containerStyle={{height: 30}}
              />
            </View>
            <Divider style={{backgroundColor: '#ccc'}}/>
            <View style={styles.form}>
              {
                listData.length ? listData[selectedIndex].map((item, index) => {
                  return (
                    <View key={index}>
                      <FormLabel>{item.desc}</FormLabel>
                      <FormInput
                        value={formData[item.key] || ""}
                        onChangeText={(value) => {
                          _this.setState({
                            formData: {
                              ...formData,
                              [item.key]: value
                            }
                          })
                        }}/>
                    </View>
                  )
                }) : <View/>
              }

              <View>
                <Button
                  raised
                  backgroundColor="#4a98f0"
                  onPress={this.signIn}
                  style={styles.btn}
                  title='登录'/>
              </View>
            </View>
          </View> : <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator animating={true} size="large" color="#4a98f0"/>
          </View>
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
  },
  btnGroup: {
    backgroundColor: "#fff",
    padding: 20
  },
  btnStyle: {
    backgroundColor: "#4a98f0",
  },
  textStyle: {
    color: "#fff"
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

