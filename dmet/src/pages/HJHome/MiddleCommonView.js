import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const kWidth = Dimensions.get('window').width;

class MiddleCommonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', // 标题
      subTitle: '', // 子标题
      rightIcon: '', // 右侧图片
      titleColor: '', //  字体颜色

      tplurl: '', //下级界面的URL路径
      // 回调函数
      callBackClickCell: null,
    };
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          this.ClickCell(this.props.tplurl);
        }}>
        <View style={styles.container}>
          {/*左边*/}
          <View>
            <Text style={[{color: this.props.titleColor}, styles.titlesStyle]}>
              {this.props.title}
            </Text>
            <Text style={styles.SubTitleStyle}>{this.props.subTitle}</Text>
          </View>
          {/*右边图片*/}
          <Image
            source={{uri: this.props.rightIcon}}
            style={styles.iconStyles}
          />
        </View>
      </TouchableOpacity>
    );
  }

  // 点击了cell
  ClickCell(data) {
    if (!this.props.callBackClickCell) {
      return;
    }
    // 执行回调函数
    this.props.callBackClickCell(data);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: kWidth * 0.5 - 1,
    height: 59,
    marginBottom: 1,
    marginRight: 1,
    //改变主轴方向
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titlesStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  SubTitleStyle: {
    color: 'gray',
  },
  iconStyles: {
    width: 64,
    height: 44,
    //图片显示模式
    resizeMode: 'contain',
  },
});

export default MiddleCommonView;
