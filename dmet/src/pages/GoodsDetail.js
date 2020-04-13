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
  ScrollView,
} from 'react-native';
import HTMLView from 'react-native-htmlview';

let Global = require('../util/global');
let API = require('../network/api');
let Util = require('../util/util');
import Loading from '../../components/Loading';

let resultsCache = {
  dataForOrder: [],
  nextPageNumberForQuery: {},
  totalForQuery: {},
  pageIndex: 1,
};

class GoodsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: null,
    };
  }

  componentDidMount() {
    let intent = this.props.intent;
    this.setState({
      goods: intent,
    });
    this._fetchGoods(intent.spec_id);
  }

  _fetchGoods(spec_id) {
    let thiz = this;
    Util.post(API.GOODSDETAIL, {spec_id: spec_id}, function(ret) {
      if (ret.code == 0) {
        thiz.setState({
          goods: ret.data,
        });
      } else {
        alert(ret.msg);
      }
    });
  }

  render() {
    let goods = this.state.goods;
    if (!goods) {
      return <Loading loadingtext="正在加载商品..." />;
    }
    let htmlContent = goods.description || '';
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={{width: Util.size.width, height: 490}}
            source={{uri: goods.default_image}}
          />
          <Text
            style={[
              styles.textprimary,
              styles.paddingLeftRight,
              styles.marginTop10,
            ]}>
            商品名称：{goods.goods_name}
          </Text>
          <Text
            style={[
              styles.textPrice,
              styles.paddingLeftRight,
              styles.marginTop10,
            ]}>
            倍全价：{goods.shichang}
          </Text>
          <View style={[styles.line1, styles.marginTop10]} />
          <Text
            style={[
              styles.textsecond,
              styles.paddingLeftRight,
              styles.marginTop10,
            ]}>
            品牌：{goods.brand}
          </Text>
          <View style={[styles.line10, styles.marginTop10]} />
          <Text
            style={[
              styles.textprimary,
              styles.paddingLeftRight,
              styles.marginTop10,
            ]}>
            商品图文详情
          </Text>
          <Text
            style={[
              styles.textprimary,
              styles.paddingLeftRight,
              styles.marginTop10,
            ]}>
            {htmlContent}
          </Text>
          <HTMLView value={htmlContent} style={styles.container} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    marginBottom: 100,
  },
  thumb: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  line1: {
    height: 1,
    backgroundColor: '#dadce2',
  },
  line10: {
    height: 10,
    backgroundColor: '#ebeef1',
  },
  textprimary: {
    fontSize: 18,
    color: '#4a4d52',
  },
  textsecond: {
    fontSize: 18,
    color: '#929aa2',
  },
  textPrice: {
    fontSize: 18,
    color: '#fb7e00',
  },
  marginTop10: {
    marginTop: 15,
  },
  paddingLeftRight: {
    paddingLeft: 10,
    paddingRight: 10,
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

export default GoodsDetail;
