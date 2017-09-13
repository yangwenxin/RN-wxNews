/**
 * Created by wenxin on 2017/9/13.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {pxToDp} from "../utils/ScreenUtil";
import theme from "../constants/theme";
import {NavigationActions} from "react-navigation";

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'myTab'}),
    ]
});

export default class Splash extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.dispatch(resetAction);
        }, 2000)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logo_container}>
                    <Text style={styles.logo_icon}>Gank.io</Text>
                </View>
                <Text style={styles.appName}>干货集中营</Text>

                <Text style={{position: 'absolute', bottom: pxToDp(80), fontSize: pxToDp(30),}}>获取每日干货</Text>

            </View>
        )

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logo_container: {
        alignItems: 'center',
        marginTop: pxToDp(230),
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
    appName: {
        marginTop: pxToDp(16),
        fontSize: pxToDp(33),
    }
});