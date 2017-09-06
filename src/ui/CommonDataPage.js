/**
 * Created by wenxin on 2017/9/6.
 */
import React, {Component} from 'react';
import {
    Image,
    ListView, RefreshControl,
    Text, TouchableNativeFeedback,
    View, Platform, TouchableHighlight, ActivityIndicator, Button, StyleSheet
} from 'react-native';
import theme from "../constants/theme";
import {pxToDp} from "../utils/ScreenUtil";
import Icon from 'react-native-vector-icons/Ionicons';
import getCorrectImageSizeUrl from '../utils/imageFactory';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from "../redux/actions/requestCommonData";

class CommonDataPage extends Component {

    constructor(props) {
        super(props);
        this.title = props.navigation.state.params.title;
    }

    componentDidMount() {
        this.props.actions.fetchCommonData(false, this.title, this.props.page);
    }

    _fethchData() {
        this.props.actions.fetchCommonData(false, this.title, this.props.page);
    }

    _itemOnPress(rowData) {
        this.props.navigation.navigate('webView', {data: rowData});
    }

    _renderItem = (rowData, sectionID, rowID) => {

        if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback
                    overflow="hidden"
                    key={rowID}
                    onPress={this._itemOnPress.bind(this, rowData)}>
                    {this._renderRowContent(rowData)}
                </TouchableNativeFeedback>
            );
        } else if (Platform.OS === 'ios') {
            return (
                <TouchableHighlight
                    overflow="hidden"
                    key={rowID}
                    onPress={this._itemOnPress.bind(this, rowData)}
                    underlayColor={'#ccc'}>
                    {this._renderRowContent(rowData)}
                </TouchableHighlight>
            );
        }
    };

    _renderRowContent(rowData) {
        let color = '#aaa';
        return (
            <View style={styles.itemContainer}>
                <View style={styles.imgPart}>
                    {(rowData.images) ?
                        <Image style={styles.image} source={{uri: getCorrectImageSizeUrl(rowData.images[0])}}/>
                        :
                        <Image style={[styles.image]} source={require('../images/user_article_no_data.png')}/>
                    }
                </View>

                <View style={[styles.rowItem]}>
                    <View style={styles.titlePart}>
                        <Text style={[styles.title]} numberOfLines={2}>{rowData.desc}</Text>
                    </View>
                    <View style={styles.infoPart}>
                        <Icon name="ios-pricetag-outline"/>
                        <Text style={styles.detailsLabel}>{rowData.type}</Text>
                        <Icon name="ios-create-outline" color={color}/>
                        <Text style={styles.detailsLabel}>{rowData.who ? rowData.who : 'null'}</Text>
                        <Icon name="ios-time-outline" color={color}/>
                        <Text
                            style={styles.detailsLabel}>{this._handleCreateTime(rowData.publishedAt)}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _handleCreateTime(time) {
        return time.substring(0, 10);
    }

    _separator = () => {
        return <View style={{height: 0.5}}/>;
    };

    _loadMore = () => {
        if (!this.props.isRenderFooter && !this.props.loading) {
            this.props.actions.fetchCommonData(true, this.title, this.props.page);
        }
    };

    _onRefresh = () => {
        this.props.actions.fetchCommonData(true, this.title, 0);
    };

    _footer = () => {
        if (this.props.isRenderFooter && !this.props.loading) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator
                        color={theme.mainColor}
                    />
                    <Text style={{marginLeft: pxToDp(20)}}>拼命获取中...</Text>
                </View>

            )
        } else {
            return null;
        }
    };

    render() {
        let {loading, dataSource, isError} = this.props;
        return (
            <View style={{flex: 1}}>
                {dataSource.length > 0 ?
                    <ListView
                        enableEmptySections={true}
                        renderFooter={this._footer}
                        renderSeparator={this._separator}
                        renderRow={this._renderItem}
                        dataSource={this.ds.cloneWithRows(dataSource)}
                        initialListSize={10}
                        pageSize={10}
                        onEndReachedThreshold={0.5}
                        onEndReached={this._loadMore}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={this._onRefresh}
                                colors={[theme.mainColor]}
                                title="拼命加载中..."
                            />
                        }
                    >
                    </ListView>
                    :
                    isError ? this._renderError() : this._renderLoading()
                }
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
                <Text>加载失败，请检查网络后重试～</Text>
                <Button
                    style={{marginTop: pxToDp(20)}}
                    onPress={this._fethchData.bind(this)} title="重新获取"
                    color={theme.mainColor}
                />
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        dataSource: state.CommonDataReducer.dataSource,
        loading: state.CommonDataReducer.loading,
        isRenderFooter: state.CommonDataReducer.isRenderFooter,
        isError: state.CommonDataReducer.isError,
        page: state.CommonDataReducer.page,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonDataPage);

const styles = StyleSheet.create({

    footer: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: pxToDp(120),
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsLabel: {
        marginLeft: pxToDp(8),
        marginRight: pxToDp(28),
        fontSize: pxToDp(22),
        color: '#aaa'
    },
    titlePart: {
        flex: 70,
    },
    infoPart: {
        flex: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowItem: {
        height: pxToDp(152),
        padding: pxToDp(22),
        backgroundColor: '#fff',
        flex: 80,
    },
    itemContainer: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: pxToDp(152),
    },
    imgPart: {
        flex: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: pxToDp(12),
        backgroundColor: '#fff'
    },
    image: {
        width: pxToDp(125),
        height: pxToDp(125),
        resizeMode: 'cover'
    },

});