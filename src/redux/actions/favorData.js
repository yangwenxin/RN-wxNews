/**
 * Created by wenxin on 2017/8/16.
 */
import React, {Component} from 'react';
import Toast from "../../utils/Toast";
import FavorDao from "../../dao/favorDao";
import * as types from "../actions/Types";
var dataSource = [];

function starSuccess(dataSource) {
    return {
        type: types.STAR_SUCCESS,
        dataSource: dataSource,
    }
}

function unStarSuccess(dataSource) {
    return {
        type: types.UNSTAR_SUCCESS,
        dataSource: dataSource,
    }
}

function updateStarState(isStarred) {
    return {
        type: types.UPDATE_STAR,
        isStarred: isStarred
    }
}

function updateList(dataSource) {
    return {
        type: types.UPDATE_STAR_DATA,
        dataSource: dataSource,
    }
}

export function fetchStarList() {
    return (dispatch) => {
        let dao = new FavorDao();
        dao.getFavouriteList().then((result) => {
            dataSource = result;
            console.log('dataSource', dataSource);
            dispatch(updateList(dataSource));
        }, (nullList) => {
            dataSource = [];
            console.log('dataSource', dataSource);
            dispatch(updateList(dataSource));
        });
    };
}

export function getStarState(rowData) {
    return (dispatch) => {
        for (let i in dataSource) {
            if (dataSource[i]._id === rowData._id) {
                dispatch(updateStarState(true));
                return;
            }
        }
        dispatch(updateStarState(false));
    };
}

export function starData(data) {
    return (dispatch => {
            let dao = new FavorDao();
            dataSource.unshift(data);
            dao.save(dataSource)
                .then(msg => {
                        dispatch(starSuccess(dataSource));
                        Toast('收藏成功');
                    }, msg => {
                        dataSource.shift();
                        Toast('收藏失败');
                    }
                )
        }
    )
}

export function unStarData(data) {

    return (dispatch => {
        let dao = new FavorDao();
        for (let i in dataSource) {
            if (dataSource[i]._id === data._id) {
                dataSource.splice(i, 1);
                dao.save(data).then((msg) => {
                    dispatch(unStarSuccess(dataSource));
                    dispatch(updateStarState(false));
                    //Toast.show(msg, {position: -80});
                }, (msg) => {
                    dataSource.splice(i, 1, data); //if save failed, roll back the list
                    Toast('取消失败');
                });
                return;
            }
        }
    })
}