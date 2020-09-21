// Global Imports
import React, { Component } from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity,
  ScrollView, FlatList, Text, Alert, Share, StatusBar, KeyboardAvoidingView, TextInput
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image'

// File Imports
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import StyleConfig from '../assets/styles/StyleConfig';

// Component Imports
import {
  SafeAreaView, ViewX, TextX, CText, CTextColor
} from '../components/common'

import imgBack from '../assets/images/ic_back.png'

import { CommonActions } from '@react-navigation/native';

class PhotoRecipeDetails extends Component {
  constructor(props) {
    super(props)

    console.disableYellowBox = true

    this.state = {
      comments: [],
      commentText: "afsdfa",
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("user_id").then((user_id) => this.setState({ user_id }))
  }

  render() {
    return this.renderMainView()
  }

  /*
  .##........#######...######...####..######...######.
  .##.......##.....##.##....##...##..##....##.##....##
  .##.......##.....##.##.........##..##.......##......
  .##.......##.....##.##...####..##..##........######.
  .##.......##.....##.##....##...##..##.............##
  .##.......##.....##.##....##...##..##....##.##....##
  .########..#######...######...####..######...######.
  */



  _keyExtractor = (item, index) => index.toString()


  /*
  ..######...#######..##.....##.########...#######..##....##.########.##....##.########..######.
  .##....##.##.....##.###...###.##.....##.##.....##.###...##.##.......###...##....##....##....##
  .##.......##.....##.####.####.##.....##.##.....##.####..##.##.......####..##....##....##......
  .##.......##.....##.##.###.##.########..##.....##.##.##.##.######...##.##.##....##.....######.
  .##.......##.....##.##.....##.##........##.....##.##..####.##.......##..####....##..........##
  .##....##.##.....##.##.....##.##........##.....##.##...###.##.......##...###....##....##....##
  ..######...#######..##.....##.##.........#######..##....##.########.##....##....##.....######.
  */

  renderMainView = () => {
    const { selectedTab, showOptionMenu, commentText } = this.state
    return (
      <SafeAreaView {...this.props} style={{ flex: 1, }}>
        {this.renderHeaderView()}
        <ViewX style={{ flex: 1 }}>

        </ViewX>
        {this.renderCommentInputView()}
      </SafeAreaView>
    )
  }

  onBack = () => {
    this.props.navigation.goBack()
  }

  renderHeaderView = () => {
    const { data } = this.state
    return (
      <>
        <ViewX style={styles.headerTopView}>
          <TouchableOpacity style={{ minWidth: 40 }} onPress={this.onBack}>
            <Image source={imgBack} style={styles.backBtn} />
          </TouchableOpacity>
          <TextX
            fontSize={StyleConfig.countPixelRatio(16)}
          >
            {"Comments"}
          </TextX>
          <View style={{ minWidth: 40 }} />
        </ViewX>
      </>
    )
  }

  renderCommentInputView = () => {
    const { commentText } = this.state
    return (
      <KeyboardAvoidingView style={{ marginHorizontal: 0 }}>
        <View style={{
          marginHorizontal: 16,
          height: 40,
          flexDirection: 'row',
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#777',
          alignItems: 'center'
        }}>
          <TextInput
            value={commentText}
            placeholder="Add a comment"
            placeholderTextColor={"#777"}
            style={{
              flex: 1,
              paddingLeft: 15,
              color: "#777",
              marginLeft: 10
            }}
            onChangeText={(text) => this.setState({ commentText: text })}
          />
          {
            commentText.length > 0 &&
            <TouchableOpacity style={{ marginRight: 16 }}>
              <Feather name='send' color={"#777"} size={22} />
            </TouchableOpacity>
          }
        </View>
      </KeyboardAvoidingView>
    )
  }

}

/*
..######..########.##....##.##.......########..######.
.##....##....##.....##..##..##.......##.......##....##
.##..........##......####...##.......##.......##......
..######.....##.......##....##.......######....######.
.......##....##.......##....##.......##.............##
.##....##....##.......##....##.......##.......##....##
..######.....##.......##....########.########..######.
*/

const styles = StyleSheet.create({
  headerTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: StyleConfig.countPixelRatio(12),
    marginBottom: StyleConfig.countPixelRatio(12),
    height: StyleConfig.countPixelRatio(40),
  },
  backBtn: {
    width: 22,

    height: 22
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: StyleConfig.grey,
  }
})

export default withLoader(withToast(PhotoRecipeDetails))