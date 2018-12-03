import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActionSheetIOS
} from 'react-native';
import {FormLabel, FormInput, Button, Text, ButtonGroup} from "react-native-elements"

export default class FundCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnGroup: ['等额本息', '等额本金'],
      yearGroup: Object.keys(Array.apply(null, {length: 30})).map(function (item) {
        return +item + 1;
      }),
      rateGroup: [
        {
          value: 20,
          label: '首套房优惠(30%)利率'
        },
        {
          value: 21,
          label: '基准利率'
        },
        {
          value: 22,
          label: '第二套房上浮(10%)利率'
        },
      ],
      selectedIndex: 0,
      yearValue: 20,
      rateValue: 1,
      loanTotalValue: '',
      fundValue: '',
      businessValue: '',
      calcData: {
        loanTotal: 0,
        fundRate: 0,
        loanMonth: 0,
        everyLoan: 0,
      }
    }
  }

  componentWillMount() {
    this.setHkRate()
  }

  checkForm = () => {
    const {loanTotalValue} = this.state

    console.log(loanTotalValue - 0);

    if (!(Number(loanTotalValue))) {
      alert("请输入正确的贷款总额")
    }

    this.calcFund()
  }

  calcFund = () => {
    !this.state.selectedIndex ? this.dxLoanCalc() : this.djLoanCalc()
  }

  selectYear = () => {
    let _this = this
    const {yearGroup} = this.state
    const selectData = yearGroup.map((item) => {
      return `${item}年（${item * 12}期）`
    })

    ActionSheetIOS.showActionSheetWithOptions({
        options: selectData,
        destructiveButtonIndex: 0,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        _this.setState({
          yearValue: buttonIndex + 1
        })

        this.setHkRate()
      });
  }

  selectRate = () => {
    let _this = this
    const {rateGroup} = this.state
    const selectData = rateGroup.map((item) => {
      return item.label
    })

    ActionSheetIOS.showActionSheetWithOptions({
        options: selectData,
        destructiveButtonIndex: 0,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        _this.setState({
          rateValue: buttonIndex
        })

        _this.setHkRate()
      });
  }

  setHkRate = () => {
    const {rateGroup, rateValue, yearValue, businessValue, fundValue} = this.state
    let obj = rateGroup[rateValue].value
    let obj1 = fundValue;
    let obj2 = businessValue;
    let pfcRate, comRate

    if (obj == 24) {
      obj1.readOnly = false;
      obj2.readOnly = false;
      pfcRate = this.getPfcLoanRate(21, 20);
      comRate = this.getComLoanRate(21, 20);

      this.setState({
        fundValue: Math.round(pfcRate * 100000) / 1000 + '%',
        businessValue: Math.round(comRate * 100000) / 1000 + '%',
      })
    } else {
      obj1.readOnly = true;
      obj2.readOnly = true;
      let years = yearValue;
      let rateClass = rateGroup[rateValue].value;
      pfcRate = this.getPfcLoanRate(rateClass, years);
      comRate = this.getComLoanRate(rateClass, years);

      this.setState({
        fundValue: Math.round(pfcRate * 100000) / 1000 + '%',
        businessValue: Math.round(comRate * 100000) / 1000 + '%',
      })
    }

    this.calcFund()
  }

  updateIndex = (selectedIndex) => {
    this.setState({
      selectedIndex,
      calcData: {
        loanTotal: 0,
        fundRate: 0,
        loanMonth: 0,
        everyLoan: 0,
      }
    })
  }

  getPfcLoanRate = (rateClass, years) => {
    return this.getLoanRate(rateClass, 2, years);
  }

  getComLoanRate = (rateClass, years) => {
    return this.getLoanRate(rateClass, 1, years);
  }

  getLoanRate = (rateClass, type, years) => {

    let gjj5belongyear = parseFloat("3.25");


    let gjj5belowyear = parseFloat("2.75");


    let sy5add = parseFloat("4.90");


    let sy1to5 = parseFloat("4.75");


    let syn1 = parseFloat("4.35");


    //公积金5年以下
    let gjj_1_3 = parseFloat(gjj5belowyear / 100);
    let gjj_3_5 = parseFloat(gjj5belowyear / 100);

    //纯公积金贷款大于5年时利率
    let gjj_5__ = parseFloat(gjj5belongyear / 100);

    //商业一年以内利率
    let dk_1 = parseFloat(syn1 / 100);

    //商业一至五年利率
    let dk_1_3 = parseFloat(sy1to5 / 100);
    let dk_3_5 = parseFloat(sy1to5 / 100);

    //商业贷款5年以上
    let dk_5__ = parseFloat(sy5add / 100);
    let gjjloan = 90;

    let pfcrate;
    let comRate;
    if (years <= 5) {
      if (years == 1) {
        if (rateClass == 20) {
          pfcRate = gjj_1_3;
          comRate = dk_1 * 0.7;
        } else if (rateClass == 21) {
          pfcRate = gjj_1_3;
          comRate = dk_1;
        } else if (rateClass == 24) {
          pfcRate = gjj_1_3;
          comRate = dk_1 * 0.85;
        } else if (rateClass == 22) {
          pfcRate = gjj_1_3 * 1.1;
          comRate = dk_1 * 1.1;
        } else if (rateClass == 23) {
          pfcRate = gjj_1_3 * 1.1;
          comRate = 0.0711;
        } else {
          alert("您输入的不存在，请重新输入");
        }
      }
      if (years <= 3 && years > 1) {
        if (rateClass == 20) {
          pfcRate = gjj_1_3;
          comRate = dk_1_3 * 0.70;
        } else if (rateClass == 21) {
          pfcRate = gjj_1_3;
          comRate = dk_1_3;
        } else if (rateClass == 24) {
          pfcRate = gjj_1_3;
          comRate = dk_1_3 * 0.85;
        } else if (rateClass == 22) {
          pfcRate = gjj_1_3 * 1.1;
          comRate = dk_1_3 * 1.1;
        } else if (rateClass == 23) {
          pfcRate = gjj_1_3 * 1.1;
          comRate = 0.0711;
        } else {
          alert("您输入的不存在，请重新输入");
        }
      }
      if (years <= 5 && years > 3) {
        if (rateClass == 20) {
          pfcRate = gjj_3_5;
          comRate = dk_3_5 * 0.70;
        } else if (rateClass == 21) {
          pfcRate = gjj_3_5;
          comRate = dk_3_5;
        } else if (rateClass == 24) {
          pfcRate = gjj_3_5;
          comRate = dk_3_5 * 0.85;
        } else if (rateClass == 22) {
          pfcRate = gjj_3_5 * 1.1;
          comRate = dk_3_5 * 1.1;
        } else if (rateClass == 23) {
          pfcRate = gjj_3_5 * 1.1;
          comRate = 0.0711;
        } else {
          alert("您输入的不存在，请重新输入");
        }
      }
    } else {
      if (rateClass == 20) {
        pfcRate = gjj_5__;
        comRate = dk_5__ * 0.70;
      } else if (rateClass == 21) {
        pfcRate = gjj_5__;
        comRate = dk_5__;
      } else if (rateClass == 24) {
        pfcRate = gjj_5__;
        comRate = dk_5__ * 0.85;
      } else if (rateClass == 22) {
        pfcRate = gjj_5__ * 1.1;
        comRate = dk_5__ * 1.1;
      } else if (rateClass == 23) {
        pfcRate = gjj_5__ * 1.1;
        comRate = 0.0711;
      } else {
        alert("您输入的不存在，请重新输入");
      }
    }
    if (type == 1) {
      return comRate;
    } else if (type == 2) {
      return pfcRate;
    } else {
      alert("对不起，您请求的数据不存在");
      return null;
    }

  }

  getDxMonthPay = (rate, totalLoan, month) => {
    var monthRate = rate / 12;//月利率
    return totalLoan * monthRate * Math.pow(1 + monthRate, month) / ( Math.pow(1 + monthRate, month) - 1 );
  }

  zeroPlus = (myLength, myString) => {
    var stringLength = myString.length; //输入字符串长度
    var zeroLength = myLength - stringLength; //0字符串长度
    var zeroString = ''; //补0后返回的字符串

    //生成0字符串

    for (var i = 0; i < zeroLength; i++) {
      zeroString += '0';
    }

    //拼接
    zeroString += myString;
    return zeroString;
  }

  dxLoanCalc = () => {
    const {loanTotalValue, yearValue, fundValue, businessValue} = this.state
    var pfcLoan = loanTotalValue * 10000; //获取页面录入公积金贷款金额
    var gjjloan_ = 90 * 10000;  //公积金最大贷款额度
    if (pfcLoan > gjjloan_) {
      alert("公积金贷款最高为" + 90 + "万");
      return;
    }
    var comLoan = 0;
    var years = yearValue
    var months = years * 12;
    var monthPayInfo = "";
    var gjj = fundValue
    var dk = businessValue

    var str1 = new Array();
    var str2 = new Array();
    str1 = gjj.split("%");
    str2 = dk.split("%");
    var str1gjj = str1[0] / 100;
    var str2dk = str2[0] / 100;
    pfcMonthPay = Math.round(this.getDxMonthPay(str1gjj, pfcLoan, months) * 100) / 100;
    comMonthPay = Math.round(this.getDxMonthPay(str2dk, comLoan, months) * 100) / 100;
    pfcTotalPay = months * pfcMonthPay;
    comTotalPay = months * comMonthPay;
    totalPay = pfcTotalPay + comTotalPay;
    var lixi = 0;
    var pfclixi = 0;
    var comlixi = 0;
    var benjin = 0;
    var pfcbenjin = 0;
    var combenjin = 0;
    var zongbenjin = 0;
    var zongpfcbenjin = 0;
    var zongcombenjin = 0;
    var m = '0';
    var monthRate0 = str1gjj / 12;//月利率
    var monthRate1 = str2dk / 12;//月利率
    for (i = 0; i < months; i++) {
      pfcTotalPay += pfcMonthPay;
      comTotalPay += comMonthPay;
      var monthPay = comMonthPay + pfcMonthPay;
      var n = 1 + i;
      var l = n.toString();
      m = this.zeroPlus(3, l);
      if (i == 0) {
        pfclixi = pfcLoan * monthRate0;
        comlixi = comLoan * monthRate1;
        lixi = pfclixi + comlixi;
        pfcbenjin = pfcMonthPay - pfclixi;
        combenjin = comMonthPay - comlixi;
        zongpfcbenjin += pfcbenjin;
        zongcombenjin += combenjin
        benjin = pfcbenjin + combenjin;
        zongbenjin += benjin;
      } else {
        pfclixi = (pfcLoan - zongpfcbenjin) * monthRate0;
        comlixi = (comLoan - zongcombenjin) * monthRate1;
        lixi = pfclixi + comlixi;
        pfcbenjin = pfcMonthPay - pfclixi;
        combenjin = comMonthPay - comlixi;
        zongpfcbenjin += pfcbenjin;
        zongcombenjin += combenjin
        benjin = pfcbenjin + combenjin;
        zongbenjin += benjin
      }


      monthPayInfo += m + "        " + (Math.round(benjin * 100) / 100).toFixed(2) + "      " + (Math.round(lixi * 100) / 100).toFixed(2) + "      " + (Math.round(monthPay * 100) / 100).toFixed(2) + " \n";
    }

    this.setState({
      calcData: {
        loanTotal: Math.round(pfcLoan * 100) / 100,
        fundRate: gjj,
        loanMonth: months + '月',
        everyLoan: pfcMonthPay + comMonthPay,
      }
    })
  }

  //计算等额本金 ##3
  djLoanCalc = () => {
    const {loanTotalValue, yearValue, fundValue, businessValue} = this.state
    var pfcLoan = loanTotalValue * 10000;
    var gjjloan_ = 90 * 10000;
    if (pfcLoan > gjjloan_) {
      alert("公积金贷款最高为" + 90 + "万");
      return;
    }

    var comLoan = 0;
    var years = yearValue
    var months = years * 12;
    var pfcTotalPay = 0;
    var comTotalPay = 0;
    var pfcMonthPay = 0;
    var comMonthPay = 0;
    var DjMothll = 0;
    var firstMonthPay = 0;
    var lastMonthPay = 0;
    var monthPayInfo = "";
    var gjj = fundValue
    var dk = businessValue

    var str1 = new Array();
    var str2 = new Array();
    str1 = gjj.split("%");
    str2 = dk.split("%");
    var str1gjj = str1[0] / 100;
    var str2dk = str2[0] / 100;
    var m = '0';
    for (i = 0; i < months; i++) {
      pfcMonthPay = this.getDjMonthPay(str1gjj, pfcLoan, months, i);
      comMonthPay = this.getDjMonthPay(str2dk, comLoan, months, i);
      pfcTotalPay += pfcMonthPay;
      comTotalPay += comMonthPay;
      var monthPay = comMonthPay + pfcMonthPay
      DjpfcMothll = this.getDjMothll(str1gjj, pfcLoan, months, i);
      DjcomMothll = this.getDjMothll(str2dk, comLoan, months, i);
      DjMothll = DjpfcMothll + DjcomMothll;
      var loanMonth = parseFloat(pfcLoan) / months;
      var n = 1 + i;
      var l = n.toString();
      m = this.zeroPlus(3, l);
      if (i == 0) {
        firstMonthPay = monthPay;
      }
      if (i == months - 1) {
        lastMonthPay = monthPay;
      }

      monthPayInfo += m + "        " + (Math.round(loanMonth * 100) / 100).toFixed(2) + "      " + (Math.round(DjMothll * 100) / 100).toFixed(2) + "      " + (Math.round(monthPay * 100) / 100).toFixed(2) + " \n";

    }

    this.setState({
      calcData: {
        loanTotal: Math.round(pfcLoan * 100) / 100,
        fundRate: gjj,
        loanMonth: months + '月',
        everyLoan: Math.round(firstMonthPay * 100) / 100,
      }
    })
  }

  getDjMonthPay = (rate, totalLoan, month, curMonth) => {
    var monthRate = parseFloat(rate) / 12;
    var loanMonth = parseFloat(totalLoan) / month;
    return (totalLoan - loanMonth * curMonth) * monthRate + loanMonth;
  }


  getDjMothll = (rate, totalLoan, month, curMonth) => {
    var monthRate = parseFloat(rate) / 12;
    var loanMonth = parseFloat(totalLoan) / month;
    var DjMoth = (totalLoan - loanMonth * curMonth) * monthRate + 0;
    return DjMoth;
  }

  render() {
    const _this = this
    const {loanTotalValue, calcData, btnGroup, selectedIndex, yearValue, rateGroup, rateValue, fundValue, businessValue} = _this.state

    return (
      <ScrollView style={styles.container}>
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
            <FormLabel>贷款总额(万元)</FormLabel>
            <FormInput
              value={loanTotalValue}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  loanTotalValue: newText
                })
              }}/>
          </View>
          <View>
            <FormLabel>按揭年数</FormLabel>
            <TouchableOpacity style={styles.selectStyle} onPress={this.selectYear}>
              <Text style={styles.selectText}>{`${yearValue}年（${yearValue * 12}期）`}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FormLabel>利率</FormLabel>
            <TouchableOpacity style={styles.selectStyle} onPress={this.selectRate}>
              <Text style={styles.selectText}>{rateGroup[rateValue].label}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FormLabel>公积金</FormLabel>
            <View style={styles.selectStyle}>
              <Text style={styles.selectText}>{fundValue}</Text>
            </View>
          </View>
          <View>
            <FormLabel>商业</FormLabel>
            <View style={styles.selectStyle}>
              <Text style={styles.selectText}>{businessValue}</Text>
            </View>
          </View>
          <View>
            <Button
              raised
              backgroundColor="#4a98f0"
              onPress={this.checkForm}
              style={styles.btn}
              title='计算'/>
          </View>
        </View>
        <View style={styles.calcView}>
          <Text h4 style={styles.title}>还款总计</Text>
          <View style={styles.result}>
            <View style={styles.item}>
              <Text style={styles.text}>贷款总额：</Text>
              <Text style={styles.val}>{calcData.loanTotal}元</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>公积金贷款利率：</Text>
              <Text style={styles.val}>{calcData.fundRate}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>贷款月数：</Text>
              <Text style={styles.val}>{calcData.loanMonth}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>{!selectedIndex ? '每月还款额：' : '首月还款额：'}</Text>
              <Text style={styles.val}>{calcData.everyLoan}元</Text>
            </View>
          </View>
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

