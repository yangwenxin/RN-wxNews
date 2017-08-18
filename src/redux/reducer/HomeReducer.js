/**
 * Created by wenxin on 2017/8/17.
 */
import React, {Component} from 'react';
import * as types from "../actions/Types";

//定义初始化数据
const initialState = {
    loading: true,
    hasData: false,
    dataSource: {},
    meiziData: [],
    mzData:false,
}


export default function HomeReducer(state = initialState, action) {

    switch (action.type) {

        case types.FETCH_HOME_DATA_SUCCESS: {
            return Object.assign({}, state, {
                ...state,
                loading: false,
                hasData: true,
                dataSource: action.dataSource,
            });
        }

        case types.FETCH_HOME_DATA_FAILURE: {
            return Object.assign({}, state, {
                ...state,
                loading: false,
                hasData: false,
            })
        }

        case types.FETCH_MEIZI_DATA_SUCCESS: {

            return Object.assign({}, state, {
                ...state,
                meiziData:action.meiziData,
            })
        }


        default:
            return state;
    }
}