/**
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750
 * height:1334
 */

import {
    Dimensions,
} from 'react-native';


//设备的宽度
const deviceWidthDp = Dimensions.get('window').width;
// UI 默认给图是 750 x 1334
const uiWidthPx = 750;

export function pxToDp(uiElementPx) {
    return uiElementPx *  deviceWidthDp / uiWidthPx;
}