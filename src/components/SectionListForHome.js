/**
 * Created by wenxin on 2017/8/18.
 */
import React, {Component, PropTypes} from 'react';
import {
    Text,
    View,
    SectionList,
    StyleSheet,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import {pxToDp} from "../utils/ScreenUtil";
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from "../utils/Toast";


export default class SectionListForHome extends Component {

    static propTypes = {
        dataSource: PropTypes.object,
        navigation: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.tabIcon = ['logo-android', 'logo-apple', 'logo-chrome', 'ios-film', 'ios-book', 'ios-apps', 'ios-radio'];
        this.tabColor = ['rgb(141,192,89)', '#000', 'rgb(51,154,237)', '#9370db', '#00ced1', 'rgb(249,89,58)', '#ffa500'];
    }

    render() {
        let dataSource = this.props.dataSource;
        let sections = Object.keys(dataSource).map(key => {
            return dataSource[key];
        });

        return (
            <SectionList
                sections={sections}
                renderItem={this._renderListItem}
                renderSectionHeader={this._renderSectionHeader}
                keyExtractor={item => item.url}
            />
        )
    }

    _renderListItem = ({item}) => {
        if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback
                    onPress={() => {
                        this._btnClick(item)
                    }}
                >
                    {this._renderRowContent(item)}
                </TouchableNativeFeedback>
            );
        } else if (Platform.OS === 'ios') {
            return (
                <TouchableHighlight
                    style={styles.btn}
                    onPress={() => {
                        this._btnClick(item)
                    }}
                    underlayColor="#ccc"
                >
                    {this._renderRowContent(item)}
                </TouchableHighlight>
            )
        }
    }

    _btnClick(item) {
        this.props.navigation.navigate('webView', {data: item});
    }

    _renderRowContent(item) {
        return (
            <View
                style={styles.btn}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="ios-create-outline" color={'#aaa'}/>
                    <Text style={{fontSize: pxToDp(25), color: '#aaa'}}> {item.who ? item.who : 'null'}</Text>
                </View>
                <Text style={{color: '#000', fontSize: pxToDp(30),}} numberOfLines={2}>{item.desc}</Text>
            </View>
        )

    }

    _renderSectionHeader = ({section}) => {
        let width = pxToDp(50);
        return (

            <View
                style={styles.section_container}
            >
                <View
                    style={[styles.section_header, {backgroundColor: this.tabColor[this._judgeIconAttribute(section.key)]}]}
                >
                    <Icon name={this.tabIcon[this._judgeIconAttribute(section.key)]} color="#fff" size={width / 2}/>

                </View>

                <Text
                    style={{
                        color: 'steelblue',
                        fontSize: pxToDp(40),
                        marginLeft: pxToDp(20),
                    }}

                >{section.key}</Text>
            </View>
        )
    }

    _judgeIconAttribute(hearderLabel) {
        switch (hearderLabel) {
            case 'Android':
                return 0;
            case 'iOS':
                return 1;
            case '前端':
                return 2;
            case '休息视频':
                return 3;
            case '拓展资源':
                return 4;
            case 'App':
                return 5;
            case '瞎推荐':
                return 6;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section_header: {
        width: pxToDp(50),
        height: pxToDp(50),
        borderRadius: pxToDp(50) / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding:Platform.OS === 'android'? pxToDp(30): pxToDp(15),
    },
    section_container: {
        padding: pxToDp(30),
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff'
    }

})
