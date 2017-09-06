/**
 * Created by wenxin on 2017/8/16.
 */
import React, {Component} from 'react';
import {getRandom} from "../../http/api";
import Toast from "../../utils/Toast";
import * as types from "../actions/Types";

function fetchMoreDataSuccess(dataSource) {
    return {
        type: types.DUSCIVERT_MORE_DATA_SUCCESS,
        dataSource: dataSource,
    }
}

function fetchSuccess(dataSource) {
    return {
        type: types.DUSCIVERT_DATA_SUCCESS,
        dataSource: dataSource,
    };
}

function handlerData(dataSource) {

    dataSource.map((item, index) => {
        item.key = item._id;
    });

    return dataSource.sort();
}

function fetchRequest() {
    return {
        type: types.DUSCIVERT_DATA_REQUEST,
    };
}

function fetchMoreRequest() {
    return {
        type: types.DUSCIVERT_MORE_REQUEST,
    };
}

export function fetchRandomData(isMoreData = false) {

    var results = [];
    const randomCategory = ['Android/2', 'iOS/2', '前端/2', '休息视频/2', '拓展资源/2', 'App/2', '瞎推荐/2'];
    var index = 0;

    function fetchCategoryData(dispatch) {
        getRandom(randomCategory[Math.floor(Math.random() * 7)])
            .then((res) => {
                index += 2;
                results = results.concat(res.results);
                if (index >= 10) {
                    let dataSource = handlerData(results);
                    if (isMoreData) {
                        dispatch(fetchMoreDataSuccess(dataSource));
                    } else {
                        dispatch(fetchSuccess(dataSource));
                    }

                } else {
                    fetchCategoryData(dispatch);
                }

            })
            .catch((err) => {
                Toast("获取数据失败" + {err});
                console.log('err', err);
            })

    }

    return (dispatch) => {
        if (isMoreData)
            dispatch(fetchMoreRequest());
        else
            dispatch(fetchRequest());

        fetchCategoryData(dispatch);
    }
}

