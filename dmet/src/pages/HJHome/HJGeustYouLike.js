import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
} from 'react-native';

// 导入组件
import CellsSection from './HJCellsSectionView';

// 导入外部的json数据
import youLikeData from '../../config/data/HomeGeustYouLike.json';

import {API_URL} from '../../config';

class HJGeustYouLike extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <CellsSection leftIcon="cnxh" leftTitle="猜你喜欢" />
        {/*ListView*/}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
  //每一行数据
  renderRow(rowData) {
    <TouchableOpacity activeOpacity={0.5} onPress={() => alert()}>
      <View style={styles.cellStyles}>
        {/*左边*/}
        <Image
          source={{uri: this.dealWithImgUrl(rowData.imageUrl)}}
          style={styles.imageStyles}
        />
        {/*右边*/}
        <View>
          <View>
            <text>{rowData.title}</text>
            <text>{rowData.topRightInfo}</text>
          </View>
          <text>{rowData.subTitle}</text>
          <View>
            <Text>{rowData.subMessage}</Text>
            <Text>{rowData.bottomRightInfo}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>;
  }
  // 处理图像的尺寸
  dealWithImgUrl(url) {
    if (url.search('w.h') == -1) {
      // 'w.h' Url中不含有`w.h`
      return url;
    } else {
      return url.replace('w.h', '120.90');
    }
  }
  // 从网络请求数据
  componentDidMount() {
    this.loadDataFormNet();
  }

  // loadDataFromNet(){
  //       fetch(this.props.API_URL)
  //           .then((response) => response.json())  //转换成Json数据格式
  //           .then((responseData) =>{
  //
  //               // 更新数据源
  //               this.setState({
  //                    dataSource:this.state.dataSource.cloneWithRows(responseData.data)
  //
  //               })
  //
  //           })
  //           //网络异常加载本地数据
  //           .catch((error) =>{
  //               this.setState({
  //                   dataSource:this.state.dataSource.cloneWithRows(youLikeData.data)
  //               })
  //           })
  // }
  loadDataFormNet() {
    fetch(this.props.api_url)
      .then(response => response.json()) // 下一步
      .then(responseData => {
        // 更新数据源
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
        });
      })
      .catch(error => {
        // 更新数据源
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(youLikeData.data),
        });
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',

    marginTop: 15,
  },
  imageStyles: {
    width: 120,
    height: 90,
    resizeMode: 'contain',
  },
});

export default HJGeustYouLike;
