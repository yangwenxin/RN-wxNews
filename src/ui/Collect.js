/**
 * Created by wenxin on 2017/8/4.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';
import {connect} from "react-redux";
import ListViewForCollect from "../components/ListViewForCollect";
class Collect extends Component {

    componentDidMount() {
        //收到监听
        this.listener = DeviceEventEmitter.addListener('favorChange', () => {
            this.setState({
                isChange: true,
            })
        });
    }

    componentWillUnmount() {
        // 移除监听
        this.listener.remove();
    }

    render() {

        return (
            <View style={{flex: 1}}>
                {this.props.dataSource.length > 0 ?
                    <ScrollView>
                        <ListViewForCollect
                            dataSource={this.props.dataSource}
                            navigation={this.props.navigation}
                        />
                    </ScrollView>
                    :
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>还没有任何收藏数据，找篇文章收藏吧～</Text>
                    </View>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        dataSource: state.favorReducer.dataSource,
    }
};


export default connect(mapStateToProps)(Collect);
