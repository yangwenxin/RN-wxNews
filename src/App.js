/**
 * Created by wenxin on 2017/8/3.
 */

import React from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator, NavigationActions} from 'react-navigation';
import routers from './routers';
import {BackAndroid} from 'react-native'

export const AppNavigator = StackNavigator(routers, {});

class App extends React.Component {

    //全局监听Android返回按键，统一处理
    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
            })}/>
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(App);