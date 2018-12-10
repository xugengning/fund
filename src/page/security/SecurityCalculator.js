import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActionSheetIOS
} from 'react-native';
import {FormLabel, FormInput, Button, Text, ButtonGroup} from "react-native-elements"

export default class SecurityCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnGroup: ['养老', '医疗', '失业', '工伤', '生育'],
      selectedIndex: 1,
      formData: {
        pingJunGongZi: '',
        zhiGongGongZi: '',
        jiBenDanWei: '9',
        jiBenGeRen: '2',
        daEDanWei: '1',
        daEGeRen: '3',
        gongShangDanWeiBiLi: '1.5',
        yangLaoDanWeiBiLi: '8',
        yangLaoGeRenBiLi: '8',
      },
      pingJunGongZiCalc: 0,
      zhiGongGongZiCalc: 0,
      calcData: {
        SecurityTotalValue: 0,
        SecurityJibenValue: 0,
        SecurityDaValue: 0,
        jiChuJiaoChu: 0,
        danWeiJiaoChu: 0,
        geRenJiaoChu: 0,
      }
    }
  }

  componentWillMount() {
  }

  checkMedical = () => {
    const {formData, selectedIndex} = this.state

    if (!(Number(formData.pingJunGongZi))) {
      alert("请输入正确的每月平均工资")
      return
    }
    if (!(Number(formData.zhiGongGongZi))) {
      alert("请输入正确的职工上年月平均工资")
      return
    }
    if (!(Number(formData.jiBenDanWei))) {
      alert("请输入正确的基本单位缴存比例")
      return
    }
    if (!(Number(formData.jiBenGeRen))) {
      alert("请输入正确的基本个人缴存比例")
      return
    }
    if (!(Number(formData.daEDanWei))) {
      alert("请输入正确的大额单位缴存比例")
      return
    }
    if (!(Number(formData.daEGeRen))) {
      alert("请输入正确的大额个人缴存比例")
      return
    }
    if (!(Number(formData.yangLaoDanWeiBiLi))) {
      alert("请输入正确的单位缴存比例")
      return
    }
    if (!(Number(formData.yangLaoGeRenBiLi))) {
      alert("请输入正确的个人缴存比例")
      return
    }
    if (!(Number(formData.gongShangDanWeiBiLi))) {
      alert("请输入正确的单位缴存比例")
      return
    }

    switch (selectedIndex) {
      case 0:
        this.calcPension()
        break;
      case 1:
        this.calcMedical()
        break;
      case 2:
        this.calcPension()
        break;
      case 3:
        this.calcInjury()
        break;
      case 4:
        this.calcPension()
        break;
      default:
        alert("计算错误")
    }
  }

  Format = (myFloat) => {
    return Math.round(myFloat * Math.pow(10, 2)) / Math.pow(10, 2);
  }

  calcInjury = () => {
    const {
      formData: {
        gongShangDanWeiBiLi,
      },
      pingJunGongZiCalc,
    } = this.state

    this.GetTY()

    this.setState({
      calcData: {
        jiChuJiaoChu: this.Format(pingJunGongZiCalc * parseFloat(gongShangDanWeiBiLi) / 100),
      }
    })
  }

  calcPension = () => {
    const {
      formData: {
        yangLaoDanWeiBiLi,
        yangLaoGeRenBiLi,
      },
      pingJunGongZiCalc,
    } = this.state

    this.GetTY()

    this.setState({
      calcData: {
        jiChuJiaoChu: this.Format(pingJunGongZiCalc * (parseFloat(yangLaoDanWeiBiLi) + parseFloat(yangLaoGeRenBiLi)) / 100),
        danWeiJiaoChu: this.Format(pingJunGongZiCalc * parseFloat(yangLaoDanWeiBiLi) / 100),
        geRenJiaoChu: this.Format(pingJunGongZiCalc * parseFloat(yangLaoGeRenBiLi) / 100),
      }
    })
  }

  calcMedical = () => {
    const {
      formData: {
        jiBenDanWei,
        jiBenGeRen,
        daEDanWei,
        daEGeRen
      },
      pingJunGongZiCalc,
    } = this.state

    this.GetTY()

    this.setState({
      calcData: {
        SecurityTotalValue: this.Format(pingJunGongZiCalc * (parseFloat(jiBenDanWei) + parseFloat(jiBenGeRen) + parseFloat(daEDanWei)) / 100 + parseFloat(daEGeRen)),
        SecurityJibenValue: this.Format(pingJunGongZiCalc * parseFloat(parseFloat(jiBenDanWei) + parseFloat(jiBenGeRen)) / 100),
        SecurityDaValue: this.Format(pingJunGongZiCalc * parseFloat(daEDanWei) / 100 + parseFloat(daEGeRen)),
      }
    })
  }

  updateIndex = (selectedIndex) => {
    this.setState({
      selectedIndex,
      calcData: {
        SecurityTotalValue: 0,
        SecurityJibenValue: 0,
        SecurityDaValue: 0,
      }
    })
  }

  GetTY = () => {
    const {formData} = this.state

    let pingJunGongZiCalc = parseFloat(formData.pingJunGongZi);
    let zhiGongGongZiCalc = parseFloat(formData.zhiGongGongZi);
    if (pingJunGongZiCalc < zhiGongGongZiCalc * 0.6)
      pingJunGongZiCalc = zhiGongGongZiCalc * 0.6;
    if (pingJunGongZiCalc > zhiGongGongZiCalc * 3)
      pingJunGongZiCalc = zhiGongGongZiCalc * 3;

    this.setState({
      pingJunGongZiCalc,
      zhiGongGongZiCalc,
    })
  }

  getFormItem = () => {
    const _this = this
    const {selectedIndex, formData} = this.state

    switch (selectedIndex) {
      case 0:
        return (<View>
          <View>
            <FormLabel>单位缴存比例：(%)</FormLabel>
            <FormInput
              value={formData.yangLaoDanWeiBiLi}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  formData: {
                    ...formData,
                    yangLaoDanWeiBiLi: newText
                  }
                })
              }}/>
          </View>
          <View>
            <FormLabel>个人缴存比例：(%)</FormLabel>
            <FormInput
              value={formData.yangLaoGeRenBiLi}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  formData: {
                    ...formData,
                    yangLaoGeRenBiLi: newText
                  }
                })
              }}/>
          </View>
        </View>)
      case 1:
        return (<View>
          <Text style={styles.headTitle}>基本医疗费用互助资金</Text>
          <View>
            <FormLabel>单位缴存比例：(%)</FormLabel>
            <FormInput
              value={formData.jiBenDanWei}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  formData: {
                    ...formData,
                    jiBenDanWei: newText
                  }
                })
              }}/>
          </View>
          <View>
            <FormLabel>个人缴存比例：(%)</FormLabel>
            <FormInput
              value={formData.jiBenGeRen}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  formData: {
                    ...formData,
                    jiBenGeRen: newText
                  }
                })
              }}/>
          </View>
          <Text style={styles.headTitle}>大额医疗费用互助资金</Text>
          <View>
            <FormLabel>单位缴存比例：(%)</FormLabel>
            <FormInput
              value={formData.daEDanWei}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  formData: {
                    ...formData,
                    daEDanWei: newText
                  }
                })
              }}/>
          </View>
          <View>
            <FormLabel>个人缴存比例：(%)</FormLabel>
            <FormInput
              value={formData.daEGeRen}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  formData: {
                    ...formData,
                    daEGeRen: newText
                  }
                })
              }}/>
          </View>
        </View>)
      case 2:
        return (<View>
          <View>
            <FormLabel>单位缴存比例：(%)</FormLabel>
            <FormInput
              value={formData.yangLaoDanWeiBiLi}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  formData: {
                    ...formData,
                    yangLaoDanWeiBiLi: newText
                  }
                })
              }}/>
          </View>
          <View>
            <FormLabel>个人缴存比例：(%)</FormLabel>
            <FormInput
              value={formData.yangLaoGeRenBiLi}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  formData: {
                    ...formData,
                    yangLaoGeRenBiLi: newText
                  }
                })
              }}/>
          </View>
        </View>)
      case 3:
        return (<View style={styles.result}>
          <View>
            <FormLabel>单位缴存比例：(%) 缴存比例为0.3%-1.5%</FormLabel>
            <FormInput
              value={formData.gongShangDanWeiBiLi}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  formData: {
                    ...formData,
                    gongShangDanWeiBiLi: newText
                  }
                })
              }}/>
          </View>
        </View>)
      case 4:
        return (<View>
          <View>
            <FormLabel>单位缴存比例：(%)</FormLabel>
            <FormInput
              value={formData.yangLaoDanWeiBiLi}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  formData: {
                    ...formData,
                    yangLaoDanWeiBiLi: newText
                  }
                })
              }}/>
          </View>
          <View>
            <FormLabel>个人缴存比例：(%)</FormLabel>
            <FormInput
              value={formData.yangLaoGeRenBiLi}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  formData: {
                    ...formData,
                    yangLaoGeRenBiLi: newText
                  }
                })
              }}/>
          </View>
        </View>)
    }
  }

  getResultItem = () => {
    const {selectedIndex, calcData} = this.state
    switch (selectedIndex) {
      case 0:
        return (<View style={styles.result}>
          <View style={styles.item}>
            <Text style={styles.text}>每月缴存的基本养老保险金：</Text>
            <Text style={styles.val}>{calcData.jiChuJiaoChu || 0}元</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>其中单位缴存：</Text>
            <Text style={styles.val}>{calcData.danWeiJiaoChu || 0}元</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>个人缴存：</Text>
            <Text style={styles.val}>{calcData.geRenJiaoChu || 0}元</Text>
          </View>
        </View>)
      case 1:
        return (<View style={styles.result}>
          <View style={styles.item}>
            <Text style={styles.text}>每月缴存的医疗保险金：</Text>
            <Text style={styles.val}>{calcData.SecurityTotalValue}元</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>其中基本医疗保险：</Text>
            <Text style={styles.val}>{calcData.SecurityJibenValue}元</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>大额医疗费用互助资金：</Text>
            <Text style={styles.val}>{calcData.SecurityDaValue}元</Text>
          </View>
        </View>)
      case 2:
        return (<View style={styles.result}>
          <View style={styles.item}>
            <Text style={styles.text}>每月缴存失业保险金：</Text>
            <Text style={styles.val}>{calcData.jiChuJiaoChu || 0}元</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>其中单位缴存：</Text>
            <Text style={styles.val}>{calcData.danWeiJiaoChu || 0}元</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>个人缴存：</Text>
            <Text style={styles.val}>{calcData.geRenJiaoChu || 0}元</Text>
          </View>
        </View>)
      case 3:
        return (<View style={styles.result}>
          <View style={styles.item}>
            <Text style={styles.text}>每月缴存的工伤保险：</Text>
            <Text style={styles.val}>{calcData.jiChuJiaoChu || 0}元</Text>
          </View>
        </View>)
      case 4:
        return (<View style={styles.result}>
          <View style={styles.item}>
            <Text style={styles.text}>每月缴存的基本生育保险金：</Text>
            <Text style={styles.val}>{calcData.jiChuJiaoChu || 0}元</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>其中单位缴存：</Text>
            <Text style={styles.val}>{calcData.danWeiJiaoChu || 0}元</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>个人缴存：</Text>
            <Text style={styles.val}>{calcData.geRenJiaoChu || 0}元</Text>
          </View>
        </View>)
    }
  }

  render() {
    const _this = this
    const {selectedIndex, btnGroup, formData} = this.state

    return (
      <ScrollView style={styles.container} keyboardDismissMode="on-drag">
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
        <View style={styles.form}>
          <View>
            <FormLabel>每月平均工资：(元)</FormLabel>
            <FormInput
              value={formData.pingJunGongZi}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  formData: {
                    ...formData,
                    pingJunGongZi: newText
                  }
                })
              }}/>
          </View>
          <View>
            <FormLabel>职工上年月平均工资：(元)</FormLabel>
            <FormInput
              value={formData.zhiGongGongZi}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  formData: {
                    ...formData,
                    zhiGongGongZi: newText
                  }
                })
              }}/>
          </View>
          {
            _this.getFormItem()
          }
          <View>
            <Button
              raised
              backgroundColor="#4a98f0"
              onPress={this.checkMedical}
              style={styles.btn}
              title='计算'/>
          </View>
        </View>
        <View style={styles.calcView}>
          <Text h4 style={styles.title}>计算结果</Text>
          {
            _this.getResultItem()
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
  headTitle: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 18,
  },
  title: {
    textAlign: "center"
  },
  btn: {
    marginTop: 20
  },
  form: {
    backgroundColor: "#fff",
    padding: 10
  },
  calcView: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 20
  },
  result: {
    marginTop: 20,
    marginBottom: 20
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  val: {
    color: "#4a98f0"
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
  selectStyle: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#bcc6ce"
  },
  selectText: {
    fontSize: 16,
    color: "#85939d"
  }
});

