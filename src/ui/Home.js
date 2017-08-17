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
    StyleSheet, Image, ScrollView
} from 'react-native';
import {pxToDp} from "../utils/ScreenUtil";
import Toast from "../utils/Toast";
import theme from "../constants/theme";
import {getCurrentDate, getYesterdayFromDate} from "../utils/DateUtils";
import * as Actions from "../redux/actions/requestHomeData";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
        };
        this.imageHeight = pxToDp(700);
        this.tabIcon = ['logo-android', 'logo-apple', 'logo-chrome', 'ios-film', 'ios-book', 'ios-apps', 'ios-radio'];
    }

    //界面渲染完回调该方法
    componentDidMount() {
        this.props.actions.fetchHomeData(getCurrentDate());
    }


    render() {
        let {loading, dataSource, hasData} = this.props;

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.toolbar, {opacity: this.state.opacity}]}>
                    <StatusBar
                        backgroundColor="#7e83e3"
                        barStyle="light-content"
                    />

                    <View
                        style={{
                            backgroundColor: "#7e83e3",
                            height: theme.toolbar.height,
                            alignItems: 'center',
                            width: theme.screenWidth,
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{color: 'white', fontSize: pxToDp(30),}}
                        >最新干货</Text>
                    </View>
                </Animated.View>

                <ScrollView
                    scrollEnabled={this.state.scrollEnabled}
                    onScroll={this._onScroll.bind(this)}
                    refreshControl={

                        <RefreshControl
                            refreshing={loading}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    {((hasData && dataSource.category.length > 0) ?
                            <View>
                                <View style={{height: this.imageHeight, width: theme.screenWidth}}>
                                    <ImageView
                                        imgUrl={dataSource.results.福利[0].url}
                                        labelTime={getCurrentDate()}/>
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


    _onScroll(event) {
        var offsetY = event.nativeEvent.contentOffset.y;
        console.log('offsetY', offsetY);

        if (offsetY <= this.imageHeight - theme.toolbar.height) {
            var opacity = offsetY / (this.imageHeight - theme.toolbar.height);
            this.setState({opacity: opacity});
        } else {
            this.setState({opacity: 1});
        }
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
        height: pxToDp(700),
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
})

const mapStateToProps = (state) => {
    return {
        loading: state.HomeReducer.loading,
        hasData: state.HomeReducer.hasData,
        dataSource: state.HomeReducer.dataSource,
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);