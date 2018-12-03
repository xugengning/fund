import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from "react-native-elements"

export default class LoanCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        localSalary: '0',
        lastMonthSalary: '0',
        personProportion: '8',
        companyProportion: '8',
      },
      correctness: {
        localSalaryCorrectness: false,
        lastMonthSalaryCorrectness: false,
        personProportionCorrectness: false,
        companyProportionCorrectness: false,
      },
      calcData: {
        handInFund: 0,
        companyHandInFund: 0,
        personHandInFund: 0,
      }
    }
  }

  checkForm = () => {
    const {formData, correctness} = this.state
    let flag = false

    for (let k in formData) {
      let val = parseFloat(formData[k])
      if (val < 0 || isNaN(val)) {
        correctness[k + "Correctness"] = true
        flag = true
      }
    }

    this.setState({
      correctness
    })

    if (flag) return

    this.calcFund()
  }

  calcFund = () => {
    const {formData} = this.state
    let localSalary = Number(formData.localSalary)
    let lastMonthSalary = Number(formData.lastMonthSalary)
    let personProportion = Number(formData.personProportion)
    let companyProportion = Number(formData.companyProportion)

    if (lastMonthSalary > localSalary * 3) {
      lastMonthSalary = localSalary * 3;
    }

    if (lastMonthSalary < localSalary * 0.6) {
      lastMonthSalary = localSalary * 0.6;
    }

    let v_dwjc = lastMonthSalary * companyProportion / 100;
    let v_grjc = lastMonthSalary * personProportion / 100;
    let v_gjjze = v_dwjc + v_grjc;

    this.setState({
      calcData: {
        handInFund: v_gjjze,
        companyHandInFund: v_dwjc,
        personHandInFund: v_grjc,
      }
    })
  }


  render() {
    const _this = this
    const {formData, correctness, calcData} = _this.state

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View>
          <FormLabel>您上月度平均工资(元)</FormLabel>
          <FormInput
            value={formData.lastMonthSalary}
            keyboardType='numeric'
            onChangeText={(value) => {
              const newText = value.replace(/[^\d]+/, '');
              _this.setState({
                correctness: {
                  ...correctness,
                  lastMonthSalaryCorrectness: false,
                },
                formData: {
                  ...formData,
                  lastMonthSalary: newText
                }
              })
            }}/>
          {correctness.lastMonthSalaryCorrectness ? <FormValidationMessage>请输入正确的上月度平均工资</FormValidationMessage> :
            <View/>}
        </View>
          <View>
            <FormLabel>本地平均工资(元)</FormLabel>
            <FormInput
              value={formData.localSalary}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  correctness: {
                    ...correctness,
                    localSalaryCorrectness: false,
                  },
                  formData: {
                    ...formData,
                    localSalary: newText
                  }
                })
              }}/>
            {correctness.localSalaryCorrectness ? <FormValidationMessage>请输入正确的本地平均工资</FormValidationMessage> : <View/>}
          </View>
          <View>
            <FormLabel>单位缴存比例(%)</FormLabel>
            <FormInput
              value={formData.companyProportion}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  correctness: {
                    ...correctness,
                    companyProportionCorrectness: false,
                  },
                  formData: {
                    ...formData,
                    companyProportion: newText
                  }
                })
              }}/>
            {correctness.personProportionCorrectness ? <FormValidationMessage>请输入正确的单位缴存比例</FormValidationMessage> :
              <View/>}
          </View>
          <View>
            <FormLabel>个人缴存比例(%)</FormLabel>
            <FormInput
              value={formData.personProportion}
              keyboardType='numeric'
              onChangeText={(value) => {
                const newText = value.replace(/[^\d]+/, '');
                _this.setState({
                  correctness: {
                    ...correctness,
                    personProportionCorrectness: false,
                  },
                  formData: {
                    ...formData,
                    personProportion: newText
                  }
                })
              }}/>
            {correctness.companyProportionCorrectness ? <FormValidationMessage>请输入正确的个人缴存比例</FormValidationMessage> :
              <View/>}
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
          <Text h4 style={styles.title}>计算结果</Text>
          <View style={styles.result}>
            <View style={styles.item}>
              <Text style={styles.text}>您每月缴存的住房公积金：</Text>
              <Text style={styles.val}>{calcData.handInFund}元</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>其中单位缴存：</Text>
              <Text style={styles.val}>{calcData.companyHandInFund}元</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>个人缴存：</Text>
              <Text style={styles.val}>{calcData.personHandInFund}元</Text>
            </View>
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
    padding: 10
  },
  calcView: {
    backgroundColor: "#fff",
    padding:10,
    marginTop: 20
  },
  result: {
    marginTop: 20,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  text: {

  },
  val: {
    color: "#4a98f0"
  },
});

