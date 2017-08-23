/**
 * Created by wenxin on 2017/8/3.
 */

import {combineReducers} from 'redux';
import nav from './nav';
import HomeReducer from "./HomeReducer";
import favorReducer from "./favorReducer";

const RootReducer = combineReducers({
    nav,
    HomeReducer,
    favorReducer,
});
export default RootReducer;
