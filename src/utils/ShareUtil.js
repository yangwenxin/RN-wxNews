/**
 * Created by wangdi on 1/12/16.
 */
'use strict';

import {Share} from 'react-native';
import Toast from "./Toast";

export default class ShareUtil {

    share(content, url) {
        Share.share({
            message: url,
            url: url,
            title: content
        }).then(this._showResult).catch((error) => {
            Toast("分享失败")
        });
    }

    _showResult(result) {
        if (result.action === Share.sharedAction) {
            //Toast.show('分享成功',{position: px2dp(-80)});
        }
    }
}