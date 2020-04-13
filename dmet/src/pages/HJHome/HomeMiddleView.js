import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import MiddleCommonView from './MiddleCommonView';

// 导入数据
import MiddleJSON from '../../config/data/HomeTopMiddleLeft.json';

const kWidth = Dimensions.get('window').width;

class HomeMiddleView extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*左侧视图*/}
        {this.renderLeftView()}

        {/*右侧视图*/}
        <View>{this.renderRightView()}</View>
      </View>
    );
  }

  renderLeftView() {
    //拿到左侧视图数据
    var LeftData = MiddleJSON.dataLeft[0];
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          alert('跳转界面!!');
        }}>
        <View style={styles.LeftViewStyle}>
          <Image source={{uri: LeftData.img1}} style={styles.leftImageStyle} />
          <Image source={{uri: LeftData.img2}} style={styles.leftImageStyle} />
          <Text style={{color: 'gray', fontSize: 15}}>{LeftData.title}</Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'blue', marginRight: 5}}>
              {LeftData.price}
            </Text>
            <Text style={{color: 'orange', backgroundColor: 'yellow'}}>
              {LeftData.sale}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderRightView() {
    var RightArr = [];
    // 右侧视图数据
    var RightData = MiddleJSON.dataRight;

    for (var i = 0; i < RightData.length; i++) {
      // 拿到每一条数据
      var OneRightData = RightData[i];

      RightArr.push(
        <MiddleCommonView
          key={i}
          title={OneRightData.title}
          subTitle={OneRightData.subTitle}
          rightIcon={OneRightData.rightImage}
          titleColor={OneRightData.titleColor}
        />,
      );
    }

    return RightArr;
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,

    flexDirection: 'row',
  },

  LeftViewStyle: {
    width: kWidth * 0.5 - 1,
    height: 119,
    marginRight: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftImageStyle: {
    width: 100,
    height: 30,

    //图片内容模式
    resizeMode: 'contain',
  },
});

export default HomeMiddleView;
