'use strict';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Loading from '../../components/Loading';
import {FlatList} from 'react-native-gesture-handler';

let Global = require('../../util/global');
let API = require('../../network/api');
let Util = require('../../util/util');

class CouponList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this._getCouponList();
  }

  _getCouponList() {
    let that = this;
    let thatDataSource = that.state.dataSource;
    Util.post(API.COUPONLIST, Global.user, function(ret) {
      if (ret.code === 0 && ret.data.length > 0) {
        that.setState({
          dataSource: thatDataSource.cloneWithRows(ret.data),
          loaded: true,
        });
      } else {
        alert('暂无红包');
        that.setState({loaded: true});
      }
    });
  }

  _renderListItem(rowData) {
    return (
      <View style={{padding: 15, backgroundColor: 'white', marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#424242'}}>text1</Text>
          <Text style={{color: '#424242', marginLeft: 20}}>text2</Text>
        </View>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return <Loading loadingtext="正在加载红包列表数据..." />;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this._renderListItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CouponList;
