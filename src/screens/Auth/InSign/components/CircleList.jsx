import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { SelectElemet } from '~components';

export default class extends Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      main: {
        flexDirection: 'row',
        alignSelf: 'center',
      },
      circle: { height: 7, width: 7, borderRadius: 3.5, marginHorizontal: 3.5 },
    });
  }

  render() {
    return (
      <View style={[this.props.style, this.styles.main]}>
        <SelectElemet
          style={this.styles.circle}
          selectColor={'#577334'}
          noSelectColor={'#FFFFFF'}
          isSelected={this.props.index == 0}
        />
        <SelectElemet
          style={this.styles.circle}
          selectColor={'#577334'}
          noSelectColor={'#FFFFFF'}
          isSelected={this.props.index == 1}
        />
        <SelectElemet
          style={this.styles.circle}
          selectColor={'#577334'}
          noSelectColor={'#FFFFFF'}
          isSelected={this.props.index == 2}
        />
        <SelectElemet
          style={this.styles.circle}
          selectColor={'#577334'}
          noSelectColor={'#FFFFFF'}
          isSelected={this.props.index == 3}
        />
      </View>
    );
  }
}
