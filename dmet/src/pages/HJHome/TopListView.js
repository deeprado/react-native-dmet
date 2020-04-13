import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

//屏幕宽度

var Dimensions = require('Dimensions');
var kWidth = Dimensions.get('window').width;
// 全局常量
const cols = 5;
const cellW = Platform.OS === 'ios' ? 72 : 60;
const cellH = 70;
const vMargin = (kWidth - cellW * cols) / (cols + 1);

export default class TopListView extends Component {
  // 构造
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          contentContainerStyle={styles.contentViewStyle} //ListView内容样式
        />
      </View>
    );
  }

  //每一个cell所包含的内容。
  renderItem(rowData) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          alert('跳转到' + rowData.title + '界面');
        }}>
        <View style={styles.cellStyle}>
          <Image
            source={{uri: rowData.image}}
            style={{width: 52, height: 52}}
          />
          <Text style={styles.titleStyle}>{rowData.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  contentViewStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: kWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cellStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: cellW,
    height: cellH,
    marginLeft: vMargin,
  },

  titleStyle: {
    color: 'gray',
    fontSize: Platform.OS === 'ios' ? 14 : 12,
  },
});

module.exports = TopListView;
