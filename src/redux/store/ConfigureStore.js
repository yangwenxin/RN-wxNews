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


// rootReducer下一步会创建
import RootReducer from "../reducer/RootReducer";

let middlewares = [];
middlewares.push(logger);
middlewares.push(thunk);

// 通过applyMiddleware将中间件添加
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

// 导出configureStore，里面携带着reducer，中间件，初始值
export default function configureStore(initialState) {
    return createStoreWithMiddleware(RootReducer, initialState);
}
