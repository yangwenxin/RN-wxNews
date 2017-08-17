/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

function convertTime(time) {
    if (time <= 9)
        return '0' + time;
    return time;
}

export function getCurrentDate() {
    var date = new Date();
    return date.getFullYear() + '/' + convertTime(date.getMonth() + 1) + '/' + convertTime(date.getDate());
}

export function getYesterdayFromDate(date) {
    var date = new Date(date);
    date.setDate(date.getDate() - 1);

    return date.getFullYear() + '/' + convertTime(date.getMonth() + 1) + '/' + convertTime(date.getDate());
}

/*
 * 时间格式化
 */
export const formatTime = (timestamp,
                           fmt = 'yyyy-MM-dd hh:mm:ss',
                           ms = false) => {
    let data = new Date();
    data.setTime(ms ? timestamp : timestamp * 1000);

    var o = {
        'M+': data.getMonth() + 1,
        'd+': data.getDate(),
        'h+': data.getHours(),
        'm+': data.getMinutes(),
        's+': data.getSeconds(),
        'q+': Math.floor((data.getMonth() + 3) / 3),
        S: data.getMilliseconds()
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (data.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }

    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            );
        }
    }

    return fmt;
};