/**
 * Created by wenxin on 2017/8/4.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {pxToDp} from "../utils/ScreenUtil";
import theme from "../constants/theme";
import ListItem from "../components/List/ListItem";
import ShareUtil from "../utils/ShareUtil";

export default class More extends Component {


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logo_container}>
                    <Text style={styles.logo_icon}>Gank.io</Text>
                </View>
                <Text style={styles.version}>V1.0.0</Text>

                <View style={styles.item}>
                    {ITEM.map((item, index) => {
                        let {title} = item;
                        return (
                            <ListItem
                                key={index}
                                onPress={this._itemOnPress.bind(this, index)}
                                border
                                arrow
                            >
                                {title}
                            </ListItem>
                        );
                    })}
                </View>

            </View>
        )
    }

    _itemOnPress(index) {
        if (index === 0) {
            let share = new ShareUtil();
            share.share('一款码农必备获取开源信息的神器，快来试试', 'https://github.com/yangwenxin/RN-wxNews');
        }else {
            this.props.navigation.navigate('disclaimer');
        }
    }

}

const ITEM = [
    {
        title: '分享',
    },
    {
        title: '免责声明',
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logo_container: {
        alignItems: 'center',
        marginTop: pxToDp(100),
        height: pxToDp(160),
        width: pxToDp(150),
        justifyContent: 'center',
        backgroundColor: theme.mainColor,
        borderRadius: pxToDp(20),
    },
    logo_icon: {
        fontSize: pxToDp(36),
        color: '#fff',
        textShadowOffset: {width: 3, height: 5},
        textShadowColor: 'black',
    },
    version: {
        color: '#aaa',
        marginTop: pxToDp(10),
    },
    item: {
        backgroundColor: '#fff',
        width: theme.screenWidth,
        marginTop: pxToDp(100),
    }
});