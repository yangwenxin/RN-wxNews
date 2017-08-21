/**
 * Created by wenxin on 2017/8/21.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet, ActivityIndicator, WebView
} from 'react-native';
import {pxToDp} from "../utils/ScreenUtil";

export default class WebViewPage extends Component {

    render() {
        const {data} = this.props.navigation.state.params;

        return (
            <View
                style={styles.container}
            >
                <WebView
                    source={{uri: data.url}}
                    renderLoading={this._renderLoading.bind(this)}
                    renderError={this._renderError.bind(this)}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                />

            </View>
        )

    }

    _renderLoading() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={'#7e83e3'} size="large"/>
                <Text style={{marginTop: pxToDp(20)}}>玩命加载中...</Text>
            </View>
        );
    }

    _renderError() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>网络异常, 重新刷新下吧～</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

})