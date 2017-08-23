/**
 * Created by wenxin on 2017/8/21.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet, ActivityIndicator, WebView, TouchableOpacity
} from 'react-native';
import {pxToDp} from "../utils/ScreenUtil";
import Icon from 'react-native-vector-icons/Ionicons';
import theme from "../constants/theme";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../redux/actions/favorData";

class WebViewPage extends Component {


    constructor(proprs) {
        super(proprs);
        this.bottomIconNames = [
            'ios-arrow-back-outline',
            'ios-arrow-forward-outline',
            'ios-refresh-outline'
        ];
        this.bottomIconSize = [pxToDp(50), pxToDp(50), pxToDp(64)];
        this.dataSource = this.props.navigation.state.params.data;
        console.log('dataID',this.dataSource._id);
    }

    componentDidMount() {

        this.props.actions.getStarState(this.dataSource);
    }

    render() {
        const {data} = this.props.navigation.state.params;

        return (
            <View style={styles.container}>

                <WebView
                    ref={(ref) => this.webView = ref}
                    source={{uri: data.url}}
                    renderLoading={this._renderLoading.bind(this)}
                    renderError={this._renderError.bind(this)}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                />

                <View style={styles.bottomInfo}>
                    {this.bottomIconNames.map((item, index) => {
                        return (
                            <View key={index} style={{flex: 1, alignItems: 'center'}}>
                                <TouchableOpacity
                                    onPress={this._btnOnPressCallback.bind(this, index)}
                                    activeOpacity={0.8}>
                                    <Icon name={item} color="#1e90ff" size={this.bottomIconSize[index]}/>
                                </TouchableOpacity>

                            </View>
                        )
                    })}

                    <View style={{flex: 1, alignItems: 'center'}}>
                        {this.props.isStarred ?
                            <TouchableOpacity
                                onPress={this._btnOnPressCallback.bind(this, 4)}
                                activeOpacity={0.8}>
                                <Icon name='ios-heart' color="#32cd32" size={pxToDp(50)}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={this._btnOnPressCallback.bind(this, 3)}
                                activeOpacity={0.8}>
                                <Icon name='ios-heart-outline' color="#32cd32" size={pxToDp(50)}/>
                            </TouchableOpacity>
                        }
                    </View>

                </View>

            </View>
        )

    }

    _btnOnPressCallback(index) {

        if (index == 0) {
            this.webView.goBack();
        } else if (index == 1) {
            this.webView.goForward();
        } else if (index == 2) {
            this.webView.reload();
        } else if (index == 3) {
            //收藏
            this.props.actions.starData(this.dataSource);

        } else if (index == 4) {
            //取消收藏
            this.props.actions.unStarData(this.dataSource);
        }

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

const mapStateToProps = (state) => {

    return {
        isStarred: state.favorReducer.isStarred,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebViewPage);


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomInfo: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,.9)',
        height: pxToDp(100),
        alignItems: 'center',
        flexDirection: 'row',
        borderTopWidth: 0.5,
        width: theme.screenWidth,
    },
})