/**
 * Created by wenxin on 2017/9/13.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Linking, TouchableHighlight,
} from 'react-native';
import Toast from "../utils/Toast";
import {pxToDp} from "../utils/ScreenUtil";
import colors from "../constants/colors";

const url = "https://github.com/wangdicoder/react-native-Gank";
const gankUrl = "http://gank.io";
export default class Disclaimer extends Component {

    render() {

        return (
            <View style={{
                flex: 1, paddingLeft: pxToDp(50),
                paddingRight: pxToDp(50),
            }}>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: pxToDp(100)
                }}>
                    <Text>此项目仅用于学习react-native 界面风格架构思想源于:</Text>
                    <TouchableHighlight
                        onPress={() => {
                            Linking.canOpenURL(url).then(supported => {
                                if (supported) {
                                    Linking.openURL(url);
                                } else {
                                    Toast('Cannot open it');
                                }
                            });
                        }}
                        underlayColor="#ccc"
                    >
                        <Text style={{color: colors.dodgerBlue}}>react-native-Gank</Text>
                    </TouchableHighlight>
                </View>

                <Text style={{marginTop: pxToDp(30)}}>
                    redux架构
                </Text>
                <Text style={{marginTop: pxToDp(10)}}>
                    react-navigation
                </Text>
                <Text style={{marginTop: pxToDp(10)}}>
                    react-native-vector-icons
                </Text>

                <Text style={{marginTop: pxToDp(30)}}>
                    致谢
                </Text>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: pxToDp(10)
                }}>
                    <Text>感谢</Text>
                    <TouchableHighlight
                        onPress={() => {
                            Linking.canOpenURL(gankUrl).then(supported => {
                                if (supported) {
                                    Linking.openURL(gankUrl);
                                } else {
                                    Toast('Cannot open it');
                                }
                            });
                        }}
                        underlayColor="#ccc"
                    >
                        <Text style={{color: colors.dodgerBlue}}>Gank.io</Text>

                    </TouchableHighlight>
                    <Text>
                        提供API接口支持
                    </Text>

                </View>
                <Text style={{marginTop: pxToDp(30)}} >
                    项目地址：
                </Text>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: pxToDp(10)
                }}>
                    <TouchableHighlight
                        onPress={() => {
                            Linking.canOpenURL("https://github.com/yangwenxin/RN-wxNews").then(supported => {
                                if (supported) {
                                    Linking.openURL("https://github.com/yangwenxin/RN-wxNews");
                                } else {
                                    Toast('Cannot open it');
                                }
                            });
                        }}
                        underlayColor="#ccc"
                    >
                        <Text style={{color: colors.dodgerBlue}}>https://github.com/yangwenxin/RN-wxNews</Text>

                    </TouchableHighlight>
                </View>
            </View>
        )

    }

}