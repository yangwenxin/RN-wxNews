/**
 * Created by wenxin on 2017/8/3.
 */

import {combineReducers} from 'redux';
import nav from './nav';
import HomeReducer from "./HomeReducer";

const RootReducer = combineReducers({
    nav,
    HomeReducer,

});
export default RootReducer;
