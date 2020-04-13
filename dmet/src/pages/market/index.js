('use strict');
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ListView,
  Platform,
  ActivityIndicator,
} from 'react-native';

let API = require('../../network/api');
let Util = require('../../util/util');

import Category from './Category';
import Loading from '../../components/Loading';

let resultsCache = {
  dataForCategory: {},
  dataForGoods: {},
  totalForGoods: {},
};

class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store_id: 8805,
      goodsList: {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
        loadingmore: false,
      },
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  //加载网络数据
  _fetchData() {
    let thiz = this;
    let thizDataSource = thiz.state.dataSource;
    Util.post(API.CATEGORYLIST, {store_id: '8805'}, function(ret) {
      if (ret.code == 0 && ret.data.assortment.length > 0) {
        resultsCache.dataForCategory = ret.data.assortment;
        thiz.setState({
          loaded: true,
        });
        thiz._fetchGoodsByCategory(ret.data.assortment[0].cate_id);
      }
    });
  }

  _fetchGoodsByCategory(category_id) {
    let thiz = this;
    let thizDataSource = thiz.state.goodsList.dataSource;

    let params = {
      store_id: 8805,
      page: 1,
      limit: 30,
      cate_id: category_id,
    };
    Util.post(API.GOODSLIST, params, function(ret) {
      thiz._setGoodsList(ret.data);
    });
  }

  _setGoodsList(goodsList) {
    let thizDataSource = this.state.goodsList.dataSource;
    this.setState({
      goodsList: {
        dataSource: thizDataSource.cloneWithRows(goodsList),
        loaded: true,
      },
    });
  }

  _selectCategory(rowID, cate_id) {
    this._fetchGoodsByCategory(cate_id);
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    let style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
      style = [style, styles.rowSeparatorHide];
    }
    return <View key={'SEP_' + sectionID + '_' + rowID} style={style} />;
  }

  renderFooter() {
    if (this.state.goodsList.loadingmore) {
      if (Platform.OS === 'ios') {
        return <ActivityIndicator style={styles.scrollSpinner} />;
      } else {
        return (
          <View style={{alignItems: 'center'}}>
            {/* <ProgressBarAndroid styleAttr="Large" /> */}
          </View>
        );
      }
    } else {
      return <Text style={{color: '#626770'}}>全部商品加载完毕</Text>;
    }
  }

  _renderGoodsList(rowData, sectionID, rowID) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{uri: rowData.default_image}} />
          <View style={{flex: 1}}>
            <Text style={{flex: 1}}>{rowData.goods_name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={{color: '#626770'}}>倍全价:</Text>
              <Text style={{color: '#f28006', flex: 1}}>
                {rowData.shichang}
              </Text>
              <Image
                style={{height: 25, width: 25, marginRight: 10}}
                source={require('image!ic_goods_add')}
              />
            </View>
          </View>
        </View>
        <View style={styles.line} />
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return <Loading loadingtext="正在加载商品分类..." />;
    }

    let goodsListLoading = null;
    if (!this.state.goodsList.loaded) {
      goodsListLoading = <Loading loadingtext="正在加载商品..." />;
    }

    return (
      <View style={styles.container}>
        <Category
          style={{flex: 1}}
          onSelect={this._selectCategory}
          categoryList={resultsCache.dataForCategory}
        />

        <View style={{flex: 3}}>
          {goodsListLoading}
          <ListView
            ref="listview"
            renderFooter={this.renderFooter}
            onEndReached={this.onEndReached}
            renderSeparator={this.renderSeparator} //分割线
            dataSource={this.state.goodsList.dataSource}
            renderRow={this._renderGoodsList}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eef0f3',
    marginBottom: 120,
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  thumb: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  line: {
    backgroundColor: '#eef0f3',
    height: 1,
  },
  textContainer: {
    flex: 1,
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC',
  },
  title: {
    fontSize: 20,
    color: '#656565',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    height: 90,
    justifyContent: 'center',
  },
});

export default Market;
