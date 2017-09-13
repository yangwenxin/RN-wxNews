/**
 * Created by wenxin on 2017/8/16.
 */
import React, {Component} from 'react';
import {getRandom} from "../../http/api";
import Toast from "../../utils/Toast";
import * as types from "../actions/Types";
import * as api from "../../http/api";
import theme from "../../constants/theme";

function fetchMoreDataSuccess(dataSource) {
    return {
        type: types.MEIZI_MORE_DATA_SUCCESS,
        dataSource: dataSource,
    }
}

function fetchSuccess(dataSource) {
    return {
        type: types.MEIZI_DATA_SUCCESS,
        dataSource: dataSource,
    };
}

function fetchFailure() {
    return {
        type: types.MEIZI_DATA_FAILURE,
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
        type: types.MEIZI_DATA_REQUEST,
    };
}

function fetchMoreRequest() {
    return {
        type: types.MEIZI_MORE_REQUEST,
    };
}


function resume() {
    return {
        type: types.MEIZI_STATE_RESUME,
    };
}

export function stateResume() {
    return (dispatch) => {
        dispatch(resume());
    }
}

export function fetchMeiziData(isMoreData, page) {

    return (dispatch) => {
        if (isMoreData)
            dispatch(fetchMoreRequest());
        else
            dispatch(fetchRequest());

        api.getCommonData('福利', page).then(res => {
            if (!res.error) {
                let results = res.results;
                results.map((item, i) => {
                    let imageWidth = theme.screenWidth / 2 - 15;
                    let imageHeight = imageWidth * 1.15;
                    imageHeight = parseInt(Math.random() * 100 + imageHeight);
                    item.imageHeight = imageHeight;
                    item.imageWidth = imageWidth;
                });

                if (isMoreData) {
                    dispatch(fetchMoreDataSuccess(results));
                } else {
                    dispatch(fetchSuccess(results));
                }
            }
        })
            .catch(error => {
                dispatch(fetchFailure());
                Toast('获取数据失败');
                console.log('error', error);
            });
    }

}

