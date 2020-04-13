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

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loaded: false,
      loadingMore: false,
      isLoadingTail: false,
    };
  }

  componentDidMount() {
    this._getOrderList(1);
  }

  _getOrderList(pageIndex) {
    let params = Global.user;
    params.page = pageIndex;
    params.limit = PAGESIZE;
    let thiz = this;
    Util.post(API.ORDERLIST, Global.user, function(ret) {
      if (ret.code == 0 && ret.data.length > 0) {
        for (let ii = 0; ii < ret.data.length; ii++) {
          resultsCache.dataForOrder.push(ret.data[ii]);
        }
        alert(resultsCache.dataForOrder.length + ',' + resultsCache.pageIndex);
        thiz.setState({
          dataSource: thiz.state.dataSource.cloneWithRows(
            resultsCache.dataForOrder,
          ),
          loaded: true,
          loadingMore: false,
        });
      }
    });
  }

  onEndReached() {
    let query = this.state.filter;
    if (!this.hasMore || this.state.loadingMore || this.state.isLoadingTail) {
      // We're already fetching or have all the elements so noop
      return;
    }
    alert('loading data');
    this.setState({
      isLoadingTail: true,
      loadingMore: true,
    });
    resultsCache.pageIndex++;
    setTimeout(() => this._getOrderList(resultsCache.pageIndex), 1000);
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    let style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
      style = [style, styles.rowSeparatorHide];
    }
    return <View key={'SEP_' + sectionID + '_' + rowID} style={style} />;
  }

  hasMore() {
    return (
      resultsCache.dataForOrder.length != resultsCache.pageIndex * PAGESIZE
    );
  }

  renderFooter() {
    if (!this.state.isLoadingTail) {
      return <View style={styles.scrollSpinner} />;
    }

    if (Platform.OS === 'ios') {
      return <ActivityIndicator style={styles.scrollSpinner} />;
    } else {
      return (
        <View style={{alignItems: 'center'}}>
          <ProgressBarAndroid styleAttr="Large" />
        </View>
      );
    }
  }

  _renderListItem(rowData) {
    let imageViews = [];
    let goods = rowData.orders_goods;
    if (goods) {
      for (let i = 0; i < goods.length && i < 3; i++) {
        imageViews.push(
          <Image style={[styles.thumb]} source={{uri: goods[i].goods_image}} />,
        );
      }
    }
    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={[styles.row, {padding: 10}]}>
          <View style={{flex: 1}}>
            <Text style={{color: '#585c64'}}>{rowData.title}</Text>
            <View style={[styles.row]}>
              <Text style={{fontSize: 12, color: '#929aa2'}}>订单号:</Text>
              <Text style={{fontSize: 12, color: '#929aa2', marginLeft: 5}}>
                {rowData.order_sn}
              </Text>
            </View>
          </View>
          <Text>查看订单</Text>
        </View>
        <View style={styles.line} />
        <View style={[styles.row, {padding: 10}]}>{imageViews}</View>
        <View style={styles.line} />
        <View
          style={[
            styles.row,
            {height: 40, alignItems: 'center', paddingLeft: 10},
          ]}>
          <Text style={{fontSize: 14, color: '#929aa2'}}>实付款:</Text>
          <Text style={{fontSize: 14, color: '#ee7700', marginLeft: 5}}>
            {rowData.order_amount}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return <Loading loadingtext="正在加载订单列表..." />;
    }
    return (
      <View style={styles.container}>
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
    marginBottom: 110,
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

export default OrderList;
