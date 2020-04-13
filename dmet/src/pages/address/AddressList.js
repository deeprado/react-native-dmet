'use strict';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
} from 'react-native';

let Global = require('../../util/global');
let API = require('../../network/api');
let Util = require('../../util/util');

import Loading from '../../components/Loading';
import AddAddress from './AddAddress';

class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this._getAddressList();
  }

  _getAddressList() {
    let that = this;
    let thatDataSource = that.state.dataSource;
    Util.post(API.ADDRESSLIST, Global.user, function(ret) {
      if (ret.code === 0 && ret.data.length > 0) {
        that.setState({
          dataSource: thatDataSource.cloneWithRows(ret.data),
          loaded: true,
        });
      }
    });
  }

  _renderListItem(rowData) {
    return (
      <View style={{padding: 15, backgroundColor: 'white', marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#424242'}}>{rowData.consignee}</Text>
          <Text style={{color: '#424242', marginLeft: 20}}>
            {rowData.phone_mob}
          </Text>
        </View>
        <Text>{rowData.address}</Text>
      </View>
    );
  }

  _addAddr() {
    this.props.navigator.push({
      title: '地址添加',
      component: AddAddress,
      passProps: {
        data: {},
      },
    });
  }

  render() {
    if (!this.state.loaded) {
      return <Loading loadingtext="正在加载地址列表数据..." />;
    }
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderListItem}
        />
        <TouchableHighlight
          underlayColor="#eef0f3"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: '#ee7700',
          }}
          onPress={() => this._addAddr()}>
          <Text style={{fontSize: 18, color: 'white'}}>添加地址</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef0f3',
  },
});

export default Market;
