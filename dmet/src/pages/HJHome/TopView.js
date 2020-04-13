import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';

import TopListView from './TopListView';

// 导入JSON数据
import TopMenu from '../../config/data/TopMenu.json';

//屏幕宽度
const screenW = Dimensions.get('window').width;

class TopView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0, //当前页码
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          {/*显示内容部分*/}
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            //每一帧移动结束
            onMomentumScrollEnd={Scr => {
              this.ScrollEnd(Scr);
            }}>
            {this.renderScrollViewContent()}
          </ScrollView>

          {/*显示圆点指示器部分*/}
          <View style={styles.circlestyle}>{this.renderCircleCount()}</View>
        </View>
      </View>
    );
  }
  //ScrollView内容
  renderScrollViewContent() {
    var ItemArr = [];

    // 数据
    var DataArr = TopMenu.data;

    for (var i = 0; i < DataArr.length; i++) {
      ItemArr.push(
        <TopListView
          key={i}
          // 传入dataSource数据
          dataArr={DataArr[i]}
        />,
      );
    }
    //返回数组
    return ItemArr;
  }

  // 返回圆点
  renderCircleCount() {
    var CirclArr = [];
    //样式
    var style;

    for (var i = 0; i < TopMenu.data.length; i++) {
      style =
        i === this.state.currentPage ? {color: 'orange'} : {color: 'gray'};

      CirclArr.push(
        <Text key={i} style={[{fontSize: 25}, style]}>
          •
        </Text>,
      );
    }
    return CirclArr;
  }
  // 每一帧移动结束之后
  ScrollEnd(Scr) {
    // 水平方向偏移量
    const OffSetX = Scr.nativeEvent.contentOffset.x;
    // 页码
    let PageCount = OffSetX / screenW;

    // 刷新状态机
    this.setState({
      currentPage: PageCount,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },

  circlestyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

export default TopView;
