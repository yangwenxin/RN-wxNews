import React, {Component} from 'react';
import {
    AsyncStorage
} from 'react-native';

/**
 * Created by wenxin on 2017/8/22.
 */
const FAVOR_DATA = 'favorData';

export default class FavorDao {

    save(dataList) {
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem(FAVOR_DATA, JSON.stringify(dataList), (error) => {
                if (!error)
                    resolve('操作成功');
                else
                    reject('操作失败');
            });
        });
    }

    getFavouriteList() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(FAVOR_DATA, (error, result) => {
                if (!error) {
                    const list = JSON.parse(result);
                    if (list) {
                        resolve(list);
                    } else {
                        reject(null);
                    }
                } else {
                    reject(null);
                }
            });
        });
    }
}