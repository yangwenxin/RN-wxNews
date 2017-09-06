/**
 * Created by wenxin on 2017/8/4.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ListView,
    StyleSheet,
    RefreshControl,
    ActivityIndicator,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform,
    TouchableOpacity,
    Image

} from 'react-native';
import theme from "../constants/theme";
import {bindActionCreators} from "redux";
import * as Actions from "../redux/actions/requestRandomData";
import {connect} from "react-redux";
import {pxToDp} from "../utils/ScreenUtil";
import Icon from 'react-native-vector-icons/Ionicons';
import getCorrectImageSizeUrl from '../utils/imageFactory';

class Discovery extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    componentDidMount() {
        this.props.actions.fetchRandomData();
    }

    _handleCreateTime(time) {
        return time.substring(0, 10);
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
                <View style={styles.imgPart}>
                    {(rowData.images) ?
                        <Image style={styles.image} source={{uri: getCorrectImageSizeUrl(rowData.images[0])}}/>
                        :
                        <Image style={[styles.image]} source={require('../images/user_article_no_data.png')}/>
                    }
                </View>
            </View>
        );
    }


    _tabOnPress(data) {

        if (data.title !== '福利') {
            this.props.navigation.navigate('commonPage', {title: data.title});
            return;
        }

    }

    _renderTabIcon(data) {
        return (
            <View
                style={[styles.tabIcon, {backgroundColor: data.color}]}
            >
                <Icon name={data.icon} color="#fff" size={iconSize / 2}/>
            </View>
        )
    }

    _header = () => {
        return (
            <View>
                <View style={styles.tabList}>
                    {this.headerData.map((data, index) => {
                        return (
                            <View style={{
                                alignItems: 'center',
                                marginTop: pxToDp(20),
                                marginRight: index === 3 || index === 7 ? 0 : pxToDp(50),
                                marginBottom: pxToDp(20),
                            }}>
                                <TouchableOpacity
                                    onPress={this._tabOnPress.bind(this, data)}
                                    activeOpacity={0.8}>
                                    {this._renderTabIcon(data, index)}
                                </TouchableOpacity>

                                <Text style={{marginTop: pxToDp(10)}}>{data.title}</Text>
                            </View>
                        )
                    })}
                </View>

                <View style={styles.itemHeader}>
                    <Icon name="md-aperture" size={pxToDp(30)}/>
                    <Text style={{marginLeft: pxToDp(10)}}>{this.props.loading ? '刷新中...' : '随机干货'}</Text>
                </View>
            </View>
        )
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

    _separator = () => {
        return <View style={{height: 0.5}}/>;
    };

    _loadMore = () => {
        if (!this.props.isRenderFooter && !this.props.loading) {
            this.props.actions.fetchRandomData(true);
        }
    };

    _onRefresh = () => {
        this.props.actions.fetchRandomData();
    };

    render() {
        let {loading, dataSource, isRenderFooter} = this.props;
        return (
            <ListView
                enableEmptySections={true}
                renderFooter={this._footer}
                renderHeader={this._header}
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
        );
    }

    headerData = [
        {
            'title': 'Android',
            'icon': 'logo-android',
            'color': 'rgb(141,192,89)',
        },
        {
            'title': 'iOS',
            'icon': 'logo-apple',
            'color': '#000',
        },
        {
            'title': '前端',
            'icon': 'logo-chrome',
            'color': 'rgb(51,154,237)',
        },
        {
            'title': 'App',
            'icon': 'ios-apps',
            'color': 'rgb(249,89,58)',
        },
        {
            'title': '休息视频',
            'icon': 'ios-film',
            'color': '#9370db',
        },
        {
            'title': '拓展资源',
            'icon': 'ios-book',
            'color': '#00ced1',
        },
        {
            'title': '瞎推荐',
            'icon': 'ios-radio',
            'color': '#ffa500',
        },
        {
            'title': '福利',
            'icon': 'ios-images',
            'color': 'lightpink',
        }
    ];

}

const mapStateToProps = (state) => {
    return {
        dataSource: state.RandomReducer.dataSource,
        loading: state.RandomReducer.loading,
        isRenderFooter: state.RandomReducer.isRenderFooter,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discovery);
const iconSize = pxToDp(120);
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
    itemHeader: {
        height: pxToDp(80),
        backgroundColor: '#fff',
        paddingLeft: pxToDp(20),
        borderBottomWidth: 0.5,
        borderColor: theme.lineColor,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 0.5,
        marginTop: pxToDp(30),
    },

    tabList: {
        borderColor: theme.lineColor,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        padding: pxToDp(35),
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: pxToDp(30),
    },

    tabIcon: {
        width: iconSize,
        height: iconSize,
        borderRadius: iconSize / 2,
        alignItems: 'center',
        justifyContent: 'center',
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