import React, {Component} from "react";
import {
    Alert,
} from 'react-native';
import Geo from 'Geolocation'
import HttpUtils from './HttpUtils'

const baiduAK = 'rmrMmHruC7LtAdOQ8FKmgKAbqhAWG98f';
const baiduURL = 'http://api.map.baidu.com/geocoder/v2/'

export default class Geolocation extends Component {
    static location() {
        return new Promise((resolve, reject) => {
            Geo.getCurrentPosition(
                ({coords}) => {
                  this.address(coords).then((res) => {
                        resolve(res)
                    })
                },
                (error) => {
                    if (!this.state.locationData) {
                        Alert.alert("提示", '无法获取定位数据，请打开GPS定位功能')
                    } else {
                        reject(error)
                    }
                },
                {timeout: 20000}
            );
        })
    }

    static address(addressData) {
        return new Promise((resolve, reject) => {
            let url = baiduURL + '?location=' + addressData.latitude + ',' + addressData.longitude + '&output=json&ak=' + baiduAK
            HttpUtils.get(url)
                .then((res) => {
                    addressData = {
                      ...addressData,
                      ...res.result
                    }
                    resolve(addressData)
                }, (err) => {

                console.log(err);
                    reject(err);
                })
        })
    }
}