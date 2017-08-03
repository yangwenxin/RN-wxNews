/**
 * Created by wenxin on 2017/8/3.
 */

import React from 'react';
import {View} from "react-native";

import Home from "../ui/Home";

//title居中设置
const headerOptions = {
    headerTitleStyle: {
        fontWeight: 'normal',
        alignSelf: 'center',
        headerBackTitle: null,
    },
    //title带返回键居中 添加个站位view
    headerRight: <View/>

};

export default {

    //首页
    home:{
        screen:Home,
        navigationOptions: {header: null,}

    }
}

