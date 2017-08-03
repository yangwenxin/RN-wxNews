/**
 * Created by wenxin on 2017/8/3.
 */
import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import {getCommonData} from "../http/api";

export default class Home extends Component {

    constructor(props) {
        super(props);
    }


    //界面渲染完回调该方法
    componentDidMount() {
        getCommonData('Android',1);

    }

    render() {
        return (
            <Text>首页</Text>
        )
    }

}