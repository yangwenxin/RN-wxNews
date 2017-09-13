import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import ListItem from './ListItem';
/**
 * Created by wenxin on 2017/8/4.
 */
class List extends React.Component {
  render() {
    const { children } = this.props;
    <View>
      {children}
    </View>;
  }
}

export { List, ListItem };
