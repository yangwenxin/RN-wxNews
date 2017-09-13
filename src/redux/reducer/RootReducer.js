/**
 * Created by wenxin on 2017/8/3.
 */

import {combineReducers} from 'redux';
import nav from './nav';
import HomeReducer from "./HomeReducer";
import favorReducer from "./favorReducer";
import RandomReducer from "./RandomReducer";
import CommonDataReducer from "./CommonDataReducer";
import MeiziReducer from "./MeiziReducer";

const RootReducer = combineReducers({
    nav,
    HomeReducer,
    favorReducer,
    RandomReducer,
    CommonDataReducer,
    MeiziReducer,
});
export default RootReducer;
