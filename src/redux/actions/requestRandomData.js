/**
 * Created by wenxin on 2017/8/16.
 */
import React, {Component} from 'react';
import {getRandom} from "../../http/api";
import Toast from "../../utils/Toast";


export function fetchRandomDate() {
    var results = [];
    const randomCategory = ['Android/2', 'iOS/2', '前端/2', '休息视频/2', '拓展资源/2', 'App/2', '瞎推荐/2'];
    var index = 0;

    function fetchCategoryData(dispatch) {

        getRandom(randomCategory[Math.floor(Math.random() * 7)])
            .then((res) => {
                if (!res.error) {

                }
            })
            .catch((err => {
                Toast("获取数据失败");
            }))

    }
}