/**
 * Created by wenxin on 2017/8/17.
 */
import React, {Component} from 'react';
import * as types from "../actions/Types";

//定义初始化数据
const initialState = {
    loading: false,
    hasData: false,
    dataSource: {},
}


export default function HomeReducer(state = initialState, action) {

    switch (action.type) {

        case types.FETCH_HOME_DATA_SUCCESS: {
            //数据请求成功
            return Object.assign({}, state, {
                ...state,
                loading: false,
                hasData: true,
                dataSource: action.dataSource,
            });
        }

        case types.FETCH_HOME_DATA_REQUEST: {
            return Object.assign({}, state, {
                ...state,
                loading: true,
                hasData: false,
            });
        }

        default:
            return state;
    }
}