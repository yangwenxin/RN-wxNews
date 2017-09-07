/**
 * Created by wenxin on 2017/8/17.
 */
import React, {Component} from 'react';
import * as types from "../actions/Types";
import {
    DeviceEventEmitter
} from 'react-native';
//定义初始化数据
const initialState = {
    dataSource: [],
    isStarred: false,
}


export default function favorReducer(state = initialState, action) {

    switch (action.type) {

        case types.STAR_SUCCESS: {
            DeviceEventEmitter.emit('favorChange');
            return Object.assign({}, state, {
                ...state,
                isStarred: true,
                dataSource: action.dataSource,
            });
        }

        case types.UNSTAR_SUCCESS: {
            DeviceEventEmitter.emit('favorChange');
            return Object.assign({}, state, {
                ...state,
                isStarred: false,
                dataSource: action.dataSource,
            })
        }

        case types.UPDATE_STAR: {

            return Object.assign({}, state, {
                ...state,
                isStarred: action.isStarred,
            })
        }

        case types.UPDATE_STAR_DATA: {
            DeviceEventEmitter.emit('favorChange');
            return Object.assign({}, state, {
                ...state,
                dataSource: action.dataSource,
            })
        }

        default:
            return state;
    }
}