/**
 * Created by wenxin on 2017/8/4.
 */
import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import theme from "../constants/theme";

export default class Discovery extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#333',
        }
    };

    constructor(props) {
        super(props);

    }


    //界面渲染完回调该方法
    componentDidMount() {

    }

    render() {

        return (
            <Text>发现</Text>
        )

    }

}