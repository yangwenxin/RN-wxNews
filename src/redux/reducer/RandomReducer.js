/**
 * Created by wenxin on 2017/8/17.
 */
import React, {Component} from 'react';
import * as types from "../actions/Types";

//定义初始化数据
const initialState = {
    loading: true,
    dataSource: [],
    isRenderFooter: false,
};

export default function RandomReducer(state = initialState, action) {

    switch (action.type) {

        case types.DUSCIVERT_DATA_SUCCESS: {
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                dataSource: action.dataSource,
            });
        }

        case types.DUSCIVERT_MORE_DATA_SUCCESS: {
            console.log('concat(action.dataSource)', state.dataSource.concat(action.dataSource));
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                dataSource: state.dataSource.concat(action.dataSource),
            })
        }

        case types.DUSCIVERT_MORE_REQUEST: {
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: true,
            })
        }

        case types.DUSCIVERT_DATA_REQUEST: {
            return Object.assign({}, state, {
                ...state,
                loading: true,
                isRenderFooter: false,
            })
        }

        default:
            return state;
    }
}