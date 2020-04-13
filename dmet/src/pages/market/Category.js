'use strict';
import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryIndex: 0,
      dataSource: [],
      loaded: false,
    };
  }

  _genRows(index) {
    var holderList = [];
    for (var ii = 0; ii < this.props.categoryList.length; ii++) {
      holderList[ii] = ii === index;
    }
    return holderList;
  }

  _rowPressed(rowID, cate_id) {
    this.props.onSelect(rowID, cate_id);
    this.setState({
      categoryIndex: rowID,
      dataSource: this.state.dataSource,
    });
  }

  renderSeparator() {
    return;
  }

  renderCategoryItem(rowData, sectionID, rowID) {
    var cate = this.props.categoryList[rowID];
    var selected = this.state.categoryIndex == rowID;
    var styles_bg = selected
      ? Styles.category_bg_select
      : Styles.category_bg_normal;

    return (
      <TouchableHighlight
        underlayColor="#eef0f3"
        style={[Styles.category, styles_bg]}
        onPress={() => this._rowPressed(rowID, cate.cate_id)}>
        <Text> {cate.cate_name} </Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={Styles.container}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this.renderCategoryItem.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef0f3',
  },
  category: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  category_bg_select: {
    backgroundColor: '#d7ead6',
  },
  category_bg_normal: {
    backgroundColor: '#ffffff',
  },
  line: {
    backgroundColor: '#eef0f3',
    height: 1,
  },
});

export default Category;
