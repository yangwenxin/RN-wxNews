/**
 * Created by wenxin on 2017/8/16.
 */
import React, {Component} from 'react';
import Toast from "../../utils/Toast";
import * as api from "../../http/api";
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

function requestFailure() {
    return {
        type: types.FETCH_HOME_DATA_FAILURE,
    }
}


function requestMeiZiSuccess(res) {
    return {
        type: types.FETCH_MEIZI_DATA_SUCCESS,
        meiziData: res.results,
    }
}

function handleData(res, keys) {

    return (dispatch => {

        let data = res.results;
        let list = Object.keys(data).map(key => {
            return data[key];
        });
        list.map(item => {
            item.map(childItem => {
                if (childItem.type !== '福利') {

                    let section = keys[childItem.type];

                    if (!section) {
                        section = {data: [], key: childItem.type};
                        keys[childItem.type] = section;
                    }
                    section.data.push(childItem);
                }
            })
        });
        dispatch(requestSuccess(keys));
    })
}

export function fetchHomeData(date) {

    return (dispatch => {
        api.getDaily(date).then(res => {
            if (isValidData(res)) {
                dispatch(handleData(res, {}));
            } else {
                dispatch(fetchHomeData(getYesterdayFromDate(date)));
            }
        })
            .catch(error => {
                dispatch(requestFailure());
            });
    })
}


export function fetchMeiZiData() {
    return (dispatch => {
        api.getMeiziData(1)
            .then(res => {
                if (!res.error && res.results.length > 0) {
                    dispatch(requestMeiZiSuccess(res));
                }
            })
            .catch(error => {
                dispatch(requestFailure());
            })
    });


}