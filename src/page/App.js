/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import HomePage from './homePage/HomePage'
import MyWebView from './MyWebView'
import FundCalculator from './homePage/FundCalculator'
import LoanCalculator from './homePage/LoanCalculator'
import CheckFund from './checkPage/CheckFund'
import SignIn from './checkPage/SignIn'
import FundInfo from './checkPage/FundInfo'
import BaseInfo from './checkPage/BaseInfo'
import FundReport from './newsPage/FundReport'
import ReportDetail from './newsPage/ReportDetail'
import PolicyRule from './newsPage/PolicyRule'
import MyFund from './myPage/MyFund'
import History from './myPage/History'
import Save from './myPage/Save'
import Private from './myPage/Private'
import Register from './myPage/Register'
import HistoryDetail from './myPage/HistoryDetail'
import SecurityCalculator from './security/SecurityCalculator'
import Location from './location/Location'
import WorkPlace from './location/WorkPlace'
import PlaceDetail from './location/PlaceDetail'
import HouseConstraint from './house/HouseConstraint'
import HouseDetail from './house/HouseDetail'

const HomeStack = createStackNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: {
      title: "首页",
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
  FundInfo: {
    screen: FundInfo,
    navigationOptions: {
      title: "公积金"
    }
  },
  BaseInfo: {
    screen: BaseInfo,
    navigationOptions: {
      title: "账号信息"
    }
  },
  FundReport: {
    screen: FundReport,
    navigationOptions: {
      title: "公告"
    }
  },
  PolicyRule: {
    screen: PolicyRule,
    navigationOptions: {
      title: "政策法规"
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
  Location: {
    screen: Location,
    navigationOptions: {
      title: "定位"
    }
  },
  WorkPlace: {
    screen: WorkPlace,
    navigationOptions: {
      title: "业务办理地点"
    }
  },
  PlaceDetail: {
    screen: PlaceDetail,
    navigationOptions: {
      title: "办理地点列表"
    }
  },
  HouseConstraint: {
    screen: HouseConstraint,
    navigationOptions: {
      title: "楼盘信息"
    }
  },
  HouseDetail: {
    screen: HouseDetail,
    navigationOptions: {
      title: "楼盘详情"
    }
  },
  Private: {
    screen: Private,
    navigationOptions: {
      title: "隐私协议"
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "注册协议"
    }
  },
}, {
  initialRouteName: "Home",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#26a2ff",
    },
    headerTintColor: "#f5f5f5",
    headerBackTitle: null
  }
});

const App = createAppContainer(HomeStack)

module.exports = App;
