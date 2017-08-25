/**
 * Created by wenxin on 2017/8/3.
 */
import React, {Component, PropTypes} from 'react';
import {
    StatusBar,
    Text,
    View,
    Animated,
    RefreshControl,
    StyleSheet,
    Image,
    ScrollView,
    Platform
} from 'react-native';
import {pxToDp} from "../utils/ScreenUtil";
import theme from "../constants/theme";
import {getCurrentDate} from "../utils/DateUtils";
import * as Actions from "../redux/actions/requestHomeData";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import SectionListForHome from "../components/SectionListForHome";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollDist: new Animated.Value(0),
        };
        this.imageHeight = pxToDp(900);
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        this.props.actions.fetchHomeData(getCurrentDate());
        this.props.actions.fetchMeiZiData();
    }

    render() {
        let {loading, dataSource, hasData, meiziData} = this.props;
        let random = Math.round(Math.random() * 99);

        let opacity = this.state.scrollDist.interpolate({
            inputRange: [0, 400],
            outputRange: [0, 1]
        });

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.themeColor}
                    barStyle="light-content"
                />
                <Animated.View style={[styles.toolbar, {opacity: opacity}]}>
                    <View
                        style={{
                            backgroundColor: theme.themeColor,
                            height: theme.toolbar.height,
                            alignItems: 'center',
                            width: theme.screenWidth,
                            justifyContent: 'center',
                            paddingTop: Platform.OS === 'android' ? 0 : pxToDp(30),
                        }}
                    >
                        <Text
                            style={{color: 'white', fontSize: pxToDp(30),}}
                        >最新干货</Text>
                    </View>

                </Animated.View>

                <ScrollView
                    scrollEnabled={this.state.scrollEnabled}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollDist}}}]
                    )}
                    refreshControl={

                        <RefreshControl
                            refreshing={loading}
                            onRefresh={this._onRefresh.bind(this)}
                            colors={[theme.themeColor]}
                            title="拼命加载中..."
                        />

                    }
                >
                    {((hasData && meiziData.length > 0) ?
                            <View>
                                <View style={{height: this.imageHeight, width: theme.screenWidth}}>
                                    <ImageView
                                        imgUrl={meiziData[random].url}
                                        labelTime={getCurrentDate()}/>
                                </View>

                                <View>
                                    {/*列表*/}
                                    <SectionListForHome
                                        dataSource={dataSource}
                                        navigation={this.props.navigation}
                                    />
                                </View>

                            </View>
                            : null
                    )}

                </ScrollView>
            </View>

        )
    }

    _onRefresh() {
        this.props.actions.fetchHomeData(getCurrentDate());
    }
}

class ImageView extends Component {
    static propTypes = {
        imgUrl: PropTypes.string,
        labelTime: PropTypes.string
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: this.props.imgUrl}} style={styles.img}/>
                <View style={styles.dateLabel}>
                    <Text style={styles.label}>{this.props.labelTime}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        position: 'absolute',
        zIndex: 1,
        width: theme.screenWidth,
    },
    img: {
        width: theme.screenWidth,
        height: pxToDp(900),
        resizeMode: 'cover'
    },
    dateLabel: {
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'relative',
        width: theme.screenWidth,
        height: pxToDp(100),
        bottom: pxToDp(100),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    label: {
        color: '#fff',
        fontSize: pxToDp(40),
        marginRight: pxToDp(40),
        fontWeight: 'bold'
    },
});

const mapStateToProps = (state) => {
    return {
        loading: state.HomeReducer.loading,
        hasData: state.HomeReducer.hasData,
        dataSource: state.HomeReducer.dataSource,
        meiziData: state.HomeReducer.meiziData,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);