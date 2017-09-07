import React, {Component} from 'react';

// 引入react-redux
import {Provider}from 'react-redux';
// 引入store文件，下步会创建
import configureStore from './redux/store/ConfigureStore';

// 调用 store 文件中的rootReducer常量中保存的方法
export const store = configureStore();

import App from './App';

/**
 * Created by wenxin on 2017/8/3.
 */

export default class Root extends Component {
    render() {
        console.disableYellowBox = true;//关闭黄色警告
        return (
            // 包装App
            <Provider store={store}>
                <App />
            </Provider>

        );
    }
}
