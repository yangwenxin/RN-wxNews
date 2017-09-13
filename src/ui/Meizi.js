/**
 * Created by wenxin on 2017/9/13.
 */
import React, {Component} from 'react';
import {
    ActivityIndicator, Button, ListView,
    RefreshControl,
    Text,
    View,
    StyleSheet, Image, TouchableOpacity, Modal
} from 'react-native';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../redux/actions/requestMeiziData";
import theme from "../constants/theme";
import {pxToDp} from "../utils/ScreenUtil";
import AutoResponisve from 'autoresponsive-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Meizi extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            modalVisible: false,
            imageWidth: 0,
            imageHeight: 0,
            imageUrl: '',
            loadedHD: false
        };
    }

    _itemOnPress(item) {
        let url = item.url;
        console.log('url',url);
        this._triggerModal();
        this.setState({
            imageUrl: url,
        });

        this._fetchHDImage(url);
    }

    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <AutoResponisve {...this.getAutoResponsiveProps()}>
                {this._WelfareItem(this.props.dataSource)}
            </AutoResponisve>
        )
    };

    _WelfareItem = (dataSource) => {
        return dataSource.map((item, i) => {
            return (
                <TouchableOpacity key={i}
                                  style={{height: item.imageHeight, width: item.imageWidth, marginLeft: pxToDp(16)}}
                                  onPress={this._itemOnPress.bind(this, item)}
                >
                    <Image
                        source={{uri: item.url}}
                        style={[styles.imageStyle, {
                            height: item.imageHeight,
                            width: item.imageWidth,
                        }]}
                    />
                </TouchableOpacity>
            );
        }, this);
    };

    render() {
        let {loading, dataSource, isError, modalVisible} = this.props;
        return (
            <View style={{flex: 1}}>
                {dataSource.length > 0 ?
                    this._fetchSuccess(loading, modalVisible)
                    :
                    isError ? this._renderError() : this._renderLoading()
                }
            </View>
        )

    }

    _fetchSuccess(loading,modalVisible) {
        return (
            <View>
                <ListView
                    renderFooter={this._footer}
                    renderRow={this._renderRow}
                    dataSource={this.ds.cloneWithRows([{_id: '1'}])}
                    keyExtractor={item => item._id}
                    pageSize={10}
                    numColumns={2}
                    onEndReachedThreshold={0.2}
                    onEndReached={this._loadMore}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={this._onRefresh}
                            colors={[theme.mainColor]}
                            title="拼命加载中..."
                        />
                    }
                />
                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={this._triggerModal.bind(this)}
                    transparent={true}>
                    <View style={styles.modalBackground}>
                        {this.state.loadedHD ?
                            <View>
                                <Image style={{width: this.state.imageWidth, height: this.state.imageHeight}}
                                       source={{uri: this.state.imageUrl}}/>
                            </View>
                            :
                            <ActivityIndicator size="large" color={theme.mainColor}/>
                        }
                        <View style={styles.closeBtn}>
                            <TouchableOpacity
                                onPress={this._triggerModal.bind(this)}
                                activeOpacity={0.8}>
                                <Icon name="ios-close-circle-outline" color="#fff" size={pxToDp(60)}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    _triggerModal() {
        this.setState({modalVisible: !this.state.modalVisible, loadedHD: false});
    }

    componentDidMount() {
        this.props.actions.fetchMeiziData(false, this.props.page);
    }

    componentWillUnmount() {
        this.props.actions.stateResume();
    }

    _loadMore = () => {
        if (!this.props.isRenderFooter && !this.props.loading) {
            this.props.actions.fetchMeiziData(true, this.props.page);
        }
    };

    _onRefresh = () => {
        this.props.actions.fetchMeiziData(false, 0);
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

    _fetchHDImage(url) {
        var correctWidth = theme.screenWidth;
        var correctHeight = theme.screenWidth;
        Image.getSize(url, (width, height) => {
            const ratioWidth = theme.screenWidth / width;
            const ratioHeight = theme.screenHeight / height;
            if (ratioWidth > ratioHeight) {
                correctWidth = ratioHeight * width;
                correctHeight = theme.screenHeight;
            } else {
                correctWidth = theme.screenWidth;
                correctHeight = ratioWidth * height;
            }
            this.setState({imageWidth: correctWidth, imageHeight: correctHeight, loadedHD: true});
        }, (error) => {
            this.setState({imageWidth: correctWidth, imageHeight: correctHeight, loadedHD: true});
        })
    }

    getAutoResponsiveProps() {
        return {
            itemMargin: pxToDp(16),
        };
    };

    _fethchData() {
        this.props.actions.fetchMeiziData(false, this.props.page);
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


const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: pxToDp(120),
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        marginHorizontal: pxToDp(10),
        marginVertical: pxToDp(10),
    },
    modalBackground: {
        width: theme.screenWidth,
        height: theme.screenHeight,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeBtn: {
        position: 'absolute',
        top: 0,
        width: theme.screenWidth,
        height: pxToDp(100),
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingTop: pxToDp(40),
        paddingRight: pxToDp(40),
        zIndex: 1
    }
});

const mapStateToProps = (state) => {
    return {
        dataSource: state.MeiziReducer.dataSource,
        loading: state.MeiziReducer.loading,
        isRenderFooter: state.MeiziReducer.isRenderFooter,
        isError: state.MeiziReducer.isError,
        page: state.MeiziReducer.page,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meizi);