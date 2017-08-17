/**
 * Created by wenxin on 2017/8/3.
 */
import React, {Component} from 'react';
import request from "./request";

export const getCommonData = (type, page) => {
    return request(`data/${type}/20/${page}`, {});
}

export const getDaily = (date) => {
    return request(`day/${date}`, {});

}

export const getRandom = (url) => {
    return request(`random/data/${url}`, {});
}




