/**
 * Created by wenxin on 2017/8/16.
 */
import React, {Component} from 'react';
import Toast from "../../utils/Toast";
import {getDaily, getRandom} from "../../http/api";
import {getYesterdayFromDate} from "../../utils/DateUtils";
import * as types from "../actions/Types";

function isValidData(responseData) {
    if (responseData.category.length > 0)
        return true;
    return false;
}


function requestSuccess(res) {
    return {
        type: types.FETCH_HOME_DATA_SUCCESS,
        dataSource: res,
    }
}

function requestData() {
    return {
        type: types.FETCH_HOME_DATA_REQUEST,
    }
}

export function fetchHomeData(date) {

    return (dispatch => {
        dispatch(requestData())
        getDaily(date)
            .then(res => {
                if (isValidData(res)) {
                    dispatch(requestSuccess(res));
                } else {
                    fetchHomeData(getYesterdayFromDate(date));
                }

            }).catch(error => {
            Toast('获取数据失败');
        });
    })

}