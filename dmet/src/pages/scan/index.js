'use strict';
import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  ListView,
  Platform,
  ActivityIndicator,
  ProgressBarAndroid,
} from 'react-native';

let Global = require('../../util/global');
let API = require('../../network/api');
let Util = require('../../util/util');

import Loading from '../../components/Loading';

let PAGESIZE = 6;

let resultsCache = {
  dataForOrder: [],
  nextPageNumberForQuery: {},
  totalForQuery: {},
  pageIndex: 1,
};

class Scan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loaded: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>新模块</Text>
        <ListView
          ref="listview"
          renderFooter={this.renderFooter}
          onEndReached={this.onEndReached}
          renderSeparator={this.renderSeparator} //分割线
          dataSource={this.state.dataSource}
          renderRow={this._renderListItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef0f3',
  },
  thumb: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 10,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
  line: {
    height: 1,
    backgroundColor: '#eef0f3',
  },
  row: {
    flexDirection: 'row',
  },
});

export default Scan;
