'use strict';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

class AddAddress extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>添加地址</Text>;
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddAddress;
