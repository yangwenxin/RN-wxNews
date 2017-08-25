/**
 * Created by wenxin on 2017/8/18.
 */
import React, {Component, PropTypes} from 'react';
import {
    Text,
    View,
    SectionList,
    StyleSheet,
    Platform, ListView, TouchableNativeFeedback, TouchableHighlight
} from 'react-native';
import {pxToDp} from "../utils/ScreenUtil";
import Icon from 'react-native-vector-icons/Ionicons';

export default class ListViewForCollect extends Component {

    static propTypes = {
        dataSource: PropTypes.array,
        navigation: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
    }

    render() {
        let dataSource = this.props.dataSource;
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.ds.cloneWithRows(dataSource)}
                    renderRow={this._renderRow.bind(this)}
                    renderSeparator={this._renderSeperator}
                />
            </View>
        )
    }

    _renderSeperator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: 0.5,
                    backgroundColor: '#CCCCCC',
                }}
            />
        );
    }


    _renderRow(rowData, sectionID, rowID) {

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

    }

    _renderRowContent(rowData) {

        let color = '#aaa';
        return (
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
        );
    }

    _handleCreateTime(time) {
        return time.substring(0, 10);
    }

    _itemOnPress(rowData) {
        this.props.navigation.navigate('webView', {data: rowData});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
    },
})
