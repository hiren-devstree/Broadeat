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
import imgDummy from '../assets/images/ic_dummy.png'
import { CommonActions } from '@react-navigation/native';
const LIST_DATA=[
  {id: '1', user_id: 50, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'A'},
  {id: '2', user_id: 50, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'meaning of a writing Comments on the passage were printed in the margin. 3a : an observation or remark expressing an opinion or attitude critical comments constructive comments.'},
  {id: '3', user_id: 1, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'C',
    data:[
      {id: '111', user_id: 50, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'A'},
      {id: '112', user_id: 50, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'A'},
    ]},
  {id: '4', user_id: 50, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'D'},
  {id: '5', user_id: 1, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'meaning of a writing Comments on the passage were printed in the margin. 3a : an observation or remark expressing an opinion or attitude critical comments constructive comments.'},
  {id: '6', user_id: 50, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'F'},
  {id: '7', user_id: 50, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'G'},
  {id: '8', user_id: 1, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'H'},
  {id: '9', user_id: 50, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'I'},
  {id: '10', user_id: 50, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'J'},
  {id: '11', user_id: 50, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'K'},
  {id: '12', user_id: 1, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'L'},
  {id: '13', user_id: 1, "profile_image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcMXQcG6LW57tK_4APU5KKHj6GNQtm2k5pNw&usqp=CAU",value: 'M'}
];
class CommentList extends Component {
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
    const { theme } = this.props;
    return (
      <SafeAreaView {...this.props} style={{ flex: 1, }}>
        {this.renderHeaderView()}
        <View style={{ flex: 1, width:StyleConfig.width }}>
          <FlatList
            data={LIST_DATA}
            renderItem={({item, index})=>(<View style={{ 
              width: StyleConfig.width,
              flexDirection: 'row',
              alignItems:'flex-start',
              backgroundColor:'transparent',
              justifyContent:'flex-start',
              paddingHorizontal: StyleConfig.countPixelRatio(16),
              paddingVertical: StyleConfig.countPixelRatio(8)}}>
                
              <View style={{width:StyleConfig.width*0.9, backgroundColor:'transparent', flexDirection: 'row',}}>
                  <Image source={{uri: item.profile_image}} style={styles.imgProfile} />
                  <View style={{
                    width: StyleConfig.width*0.9 - StyleConfig.countPixelRatio(68),
                    marginLeft: StyleConfig.countPixelRatio(8),
                    paddingHorizontal: StyleConfig.countPixelRatio(8),
                    paddingVertical: StyleConfig.countPixelRatio(4),
                    backgroundColor:'transparent'
                    }}>
                    <TextX align={'left'} fontSize={StyleConfig.fontSizeH3} >{'Hiren Vaghela'}</TextX>
                    <TextX align={'left'} fontSize={StyleConfig.fontSizeH2_3} style={{flexWrap: 'wrap'}} >{item.value}</TextX>
                    
                    {item.user_id != 1 && <TextX align={'right'} fontSize={StyleConfig.fontSizeH3} >{'Reply'}</TextX>}
                  </View>
                </View>
            </View>)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
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
  },
  imgProfile: {
    height: StyleConfig.countPixelRatio(44),
    width: StyleConfig.countPixelRatio(44),
    borderRadius: StyleConfig.countPixelRatio(22),
    marginTop:StyleConfig.countPixelRatio(4)
  },
})

export default withLoader(withToast(CommentList))