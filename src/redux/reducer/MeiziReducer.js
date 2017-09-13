/**
 * Created by wenxin on 2017/8/17.
 */
import React, {Component} from 'react';
import * as types from "../actions/Types";

//定义初始化数据
const initialState = {
    loading: false,
    dataSource: [],
    isRenderFooter: false,
    isError: false,
    page: 1,
};

export default function MeiziReducer(state = initialState, action) {

    switch (action.type) {

        case types.MEIZI_DATA_SUCCESS: {
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                dataSource: action.dataSource,
                page: 2,
            });
        }

        case types.MEIZI_MORE_DATA_SUCCESS: {

            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                dataSource: state.dataSource.concat(action.dataSource),
                page: ++state.page,
            })
        }

        case types.MEIZI_MORE_REQUEST: {
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: true,
            })
        }

        case types.MEIZI_DATA_REQUEST: {
            return Object.assign({}, state, {
                ...state,
                loading: true,
                isRenderFooter: false,
            })
        }

        case types.MEIZI_DATA_FAILURE: {
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                isError: true,
                page: 1,
                dataSource: [],
            })
        }

        case types.MEIZI_STATE_RESUME: {
            return Object.assign({}, state, {
                ...state,
                loading: false,
                dataSource: [],
                isRenderFooter: false,
                isError: false,
                page: 1,
            })
        }

        default:
            return state;
    }
}