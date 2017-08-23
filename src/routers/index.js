/**
 * Created by wenxin on 2017/8/3.
 */

import React from 'react';
import {Image, Platform, TouchableOpacity, View, StyleSheet} from "react-native";

import Home from "../ui/Home";
import {TabNavigator} from "react-navigation";
import Find from "../ui/Discovery";
import Collect from "../ui/Collect";
import More from "../ui/More";
import {pxToDp} from "../utils/ScreenUtil";
import WebViewPage from "../ui/WebViewPage";

const HomeIcon = require('../images/home.png');
const FindIcon = require('../images/find.png');
const MoreIcon = require('../images/more.png');
const CollectIcon = require('../images/collect.png');
const androidHeaderHeight = pxToDp(90);
const iosHeaderHeight = pxToDp(110);


//创建底部导航
const MyTab = new TabNavigator({
        //首页
        home: {
            screen: Home,
            navigationOptions: () => TabOptions('首页', HomeIcon, null),
        },

        //发现
        find: {
            screen: Find,
            navigationOptions: () => TabOptions('发现', FindIcon, '发现'),
        },

        //收藏
        collect: {
            screen: Collect,
            navigationOptions: () => TabOptions('收藏', CollectIcon, '收藏'),
        },

        more: {
            screen: More,
            navigationOptions: () => TabOptions('更多', MoreIcon, '更多'),
        }
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        backBehavior: 'none',
        tabBarOptions: {
            // tabbar上label的style
            labelStyle: {
                fontSize: pxToDp(22),
                alignSelf: 'center',
                marginTop: pxToDp(-8),
                marginBottom: Platform.OS === 'android' ? 0 : pxToDp(10),
            },
            // tabbar的Iconstyle
            iconStyle: {
                height: pxToDp(58),
                width: pxToDp(60),
            },
            // tabbar的style
            style: {
                height: pxToDp(105),
                backgroundColor: 'white'
            },
            // label和icon的背景色 活跃状态下
            activeBackgroundColor: 'white',
            // label和icon的前景色 活跃状态下（选中）
            activeTintColor: '#7e83e3',
            // label和icon的背景色 不活跃状态下
            inactiveBackgroundColor: 'white',
            // label和icon的前景色 不活跃状态下(未选中)
            inactiveTintColor: '#aaa',
            showIcon: true,
            // 不透明度为按选项卡(iOS和Android < 5.0)
            pressOpacity: 0.3,

            indicatorStyle: {
                height: 0, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了,
            }
        }
    }
)


export default {

    MyTab: {
        screen: MyTab,
    },

    webView: {
        screen: WebViewPage,
        navigationOptions: ({navigation}) => navigationOptions(navigation, '详细内容'),
    }
}

//配置底部导航和title
const TabOptions = (tabBarTitle, icon, navTitle) => {
    const header = null;
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor, focused}) => {
        return (
            <Image
                source={icon}
                style={[{
                    height: pxToDp(45),
                    width: pxToDp(45),
                    marginBottom: Platform.OS === 'android' ? pxToDp(12) : pxToDp(10),
                }, {
                    tintColor: tintColor
                }
                ]}
            />
        )
    });

    const headerTitleStyle = {
        color: 'white',
        fontWeight: 'normal',
        alignSelf: 'center',
        headerBackTitle: null,
        fontSize: pxToDp(30),
    };

    const headerTitle = navTitle;

    // header的style
    const headerStyle = {
        backgroundColor: '#7e83e3',
        height: Platform.OS === 'android' ? androidHeaderHeight : iosHeaderHeight,
    };
    const tabBarVisible = true;
    if (navTitle == null) {
        return {tabBarLabel, tabBarIcon, headerTitle, headerTitleStyle, headerStyle, tabBarVisible, header};
    }
    return {tabBarLabel, tabBarIcon, headerTitle, headerTitleStyle, headerStyle, tabBarVisible};

};


const navigationOptions = (navigation, title) => {

    const headerTitle = title ? title : '';
    const headerStyle = styles.headerStyle;
    const headerTitleStyle = {
        color: 'white',
        fontWeight: 'normal',
        alignSelf: 'center',
    };
    const headerRight = <View/>;
    const headerTintColor = 'white';

    return {headerTitle, headerTitleStyle, headerRight, headerStyle,headerTintColor};
}


const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#7e83e3',
        height: Platform.OS === 'ios' ? iosHeaderHeight : androidHeaderHeight,
        borderColor: '#EBEBEB',
    }
})


