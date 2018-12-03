/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import HomePage from './homePage/HomePage'
import MyWebView from './MyWebView'
import FundCalculator from './homePage/FundCalculator'
import LoanCalculator from './homePage/LoanCalculator'
import CheckFund from './checkPage/CheckFund'
import SignIn from './checkPage/SignIn'
import FundReport from './newsPage/FundReport'
import ReportDetail from './newsPage/ReportDetail'
import MyFund from './myPage/MyFund'
import History from './myPage/History'
import Save from './myPage/Save'
import HistoryDetail from './myPage/HistoryDetail'
import SecurityCalculator from './security/SecurityCalculator'

const HomeStack = createStackNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: {
      title: "首页"
    }
  },
  MyWebView: {
    screen: MyWebView,
    navigationOptions: {
      title: "详情"
    }
  },
  FundCalculator: {
    screen: FundCalculator,
    navigationOptions: {
      title: "公积金贷款"
    }
  },
  LoanCalculator: {
    screen: LoanCalculator,
    navigationOptions: {
      title: "公积金计算"
    }
  },
  MyFund: {
    screen: MyFund,
    navigationOptions: {
      title: "我的"
    }
  },
  History: {
    screen: History,
    navigationOptions: {
      title: "历史"
    }
  },
  Save: {
    screen: Save,
    navigationOptions: {
      title: "收藏"
    }
  },
  HistoryDetail: {
    screen: HistoryDetail,
    navigationOptions: {
      title: "详情"
    }
  },
  Check: {
    screen: CheckFund,
    navigationOptions: {
      title: "公积金查询"
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "登录"
    }
  },
  FundReport: {
    screen: FundReport,
    navigationOptions: {
      title: "公告"
    }
  },
  ReportDetail: {
    screen: ReportDetail,
    navigationOptions: {
      title: "详情"
    }
  },
  SecurityCalculator: {
    screen: SecurityCalculator,
    navigationOptions: {
      title: "社保计算器"
    }
  },
}, {
  initialRouteName: "Home",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#4a98f0",
    },
    headerTintColor: "#f5f5f5",
    headerBackTitle: null
  }
});

const App = createAppContainer(HomeStack)

module.exports = App;
