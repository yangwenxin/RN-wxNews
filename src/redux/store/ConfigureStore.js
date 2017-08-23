/**
 * Created by wenxin on 2017/8/3.
 */

// redux库里面提供的方法，创建store和middleware中间件
import {createStore, applyMiddleware} from 'redux';

// redux-thunk是用来发送异步请求的中间件，用了thunk之后，
// 一般的操作是将网络请求的方法放在action中
import thunk from 'redux-thunk';

// redux-logger打印logger的中间件
import logger from 'redux-logger';

import RootReducer from "../reducer/RootReducer";

let middlewares = [];
middlewares.push(thunk);

// 通过applyMiddleware将中间件添加
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore() {
    return createStoreWithMiddleware(RootReducer);
}
