/**
 * Created by wenxin on 2017/8/4.
 */

import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    Platform, TouchableNativeFeedback
} from 'react-native';

import theme from "../../constants/theme";
import {pxToDp} from "../../utils/ScreenUtil";

export default class ListItem extends React.Component {
    render() {
        const {
            thumb,
            children,
            extra,
            arrow,
            center,
            border,
            onPress,
            itemStyle,
            style
        } = this.props;
        let listItemStyle = [styles.list_item_con, StyleSheet.flatten(itemStyle)];
        let wrapStyle = [styles.list_item_wrap, StyleSheet.flatten(style)];
        if (!center) {
            listItemStyle.push({justifyContent: 'space-between'});
        }

        if (border) {
            listItemStyle.push({
                borderBottomWidth: 0.5,
                borderColor: theme.lineColor
            });
        }
        if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback
                    style={wrapStyle}
                    onPress={onPress ? onPress : undefined}
                >
                    <View style={listItemStyle}>
                        <View style={[styles.before]}>
                            {thumb && <Image source={thumb} style={{marginRight: pxToDp(15)}}/>}
                            {children
                                ? typeof children === 'string'
                                    ? <Text>{children}</Text>
                                    : children
                                : null}
                        </View>
                        {center}
                        {extra || arrow
                            ? <View style={[styles.after]}>
                                {extra
                                    ? typeof extra === 'string' ? <Text>{extra}</Text> : extra
                                    : null}
                                {arrow &&
                                <Icon
                                    name="ios-arrow-forward"
                                    size={pxToDp(36)}
                                    style={{marginLeft: pxToDp(10)}}
                                />}
                            </View>
                            : null}
                    </View>
                </TouchableNativeFeedback>
            );
        } else {

            return (
                <TouchableHighlight
                    style={wrapStyle}
                    underlayColor="#ccc"
                    onPress={onPress ? onPress : undefined}
                >
                    <View style={listItemStyle}>
                        <View style={[styles.before]}>
                            {thumb && <Image source={thumb} style={{marginRight: pxToDp(15)}}/>}
                            {children
                                ? typeof children === 'string'
                                    ? <Text>{children}</Text>
                                    : children
                                : null}
                        </View>
                        {center}
                        {extra || arrow
                            ? <View style={[styles.after]}>
                                {extra
                                    ? typeof extra === 'string' ? <Text>{extra}</Text> : extra
                                    : null}
                                {arrow &&
                                <Icon
                                    name="ios-arrow-forward"
                                    size={pxToDp(36)}
                                    style={{marginLeft: pxToDp(10)}}
                                />}
                            </View>
                            : null}
                    </View>
                </TouchableHighlight>
            );

        }
    }
}

const styles = StyleSheet.create({
    list_item_wrap: {

        backgroundColor: '#FFF'
    },
    list_item_con: {
        padding: pxToDp(20),
        paddingLeft: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    before: {
        paddingLeft: pxToDp(30),
        flexDirection: 'row',
        alignItems: 'center'
    },
    after: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
