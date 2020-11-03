// Global Imports
import React, { Component } from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity,
  FlatList, KeyboardAvoidingView, TextInput, ScrollView,
  Alert, Platform
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image'

// File Imports
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import StyleConfig from '../assets/styles/StyleConfig';
import { getCommentList, postComment, deleteComment } from './../apiManager'

// Component Imports
import {
  SafeAreaView, ViewX, TextX,
} from '../components/common'

import imgBack from '../assets/images/ic_back.png'

class CommentList extends Component {
  constructor(props) {
    super(props)

    console.disableYellowBox = true

    this.state = {
      comments: [],
      commentText: "",
      commentId: undefined,
      user_id: undefined,
      recipeData: undefined
    }
  }

  componentDidMount() {
    let recipeData = this.props.route.params.recipeData
    if (recipeData != undefined) this.setState({ recipeData: recipeData }, () => this._getCommentList())
    AsyncStorage.getItem("user_id").then((user_id) => this.setState({ user_id: user_id }))

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

  onBack = () => {
    this.props.navigation.goBack()
  }

  _replyBtnPressed = (item) => {
    this.setState({ commentId: item.comment_id }, () => {
      this.inputRef.focus()
    })
  }
  _deleteBtnPressed=async (item)=>{
    const { comment_id } = item
    let token = await AsyncStorage.getItem('user_token')
    const { loader } = this.props

    loader(true)
    let result = await deleteComment(token, comment_id)
    console.log(result)
    this._getCommentList()
  }

  _onSendBtnPressed = async () => {
    const { commentId, commentText, user_id, recipeData } = this.state
    let token = await AsyncStorage.getItem('user_token')
    const { loader } = this.props

    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append("Accept", "application/json")
    myHeaders.append("Content-Type", "application/json")

    var urlencoded = {}

    if (commentId != undefined) {
      urlencoded = {
        "recipe_id": recipeData.Recipe.id,
        "user_id": user_id,
        "comment_type": "reply",
        "reply_comment_id": commentId,
        "message": commentText,
      }
    } else {
      urlencoded = {
        "recipe_id": recipeData.Recipe.id,
        "user_id": user_id,
        "comment_type": "comment",
        "message": commentText,
      }
    }

    loader(true)
    let result = await postComment(urlencoded, token)
    console.log(result)
    this._getCommentList()
  }

  _getCommentList = async () => {
    const { recipeData } = this.state
    const { loader } = this.props
    loader(true)
    let token = await AsyncStorage.getItem('user_token')
    let response = await getCommentList(token, recipeData.Recipe.id)
    this.props.loader(false)

    if (response.code === 1) {
      this.setState({ comments: response.data, commentText: '' })
    } else  if(response.message != "No data found"){
      this.setState({ comments: [], commentText: '' })
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }else{
      this.setState({ comments: [], commentText: '' })
    }
  }


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
    return (
      <SafeAreaView {...this.props} style={{ flex: 1 }}>
        {this.renderHeaderView()}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' && 'padding'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          style={{ flex: 1 }}
        >
          <ScrollView style={{ flex: 1, }} contentContainerStyle={{ paddingBottom: 20, justifyContent: 'center', }}>
            {this.renderFlatlistVIew()}
          </ScrollView>
          {this.renderCommentInputView()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
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

  renderFlatlistVIew = () => {
    const { comments, user_id } = this.state
    return (
      <FlatList
        style={{ flex: 1 }}
        data={comments}
        renderItem={({ item, index }) => (
          <View style={{
            width: StyleConfig.width,
            flexDirection: 'row',
            alignItems: 'flex-start',
            backgroundColor: 'transparent',
            justifyContent: 'flex-start',
            paddingHorizontal: StyleConfig.countPixelRatio(16),
            paddingVertical: StyleConfig.countPixelRatio(8)
          }}>

            <View style={{ width: StyleConfig.width * 0.9, backgroundColor: 'transparent', flexDirection: 'row', }}>
              <Image source={{ uri: item.profilepic }} style={styles.imgProfile} />
              <View style={{
                width: StyleConfig.width * 0.9 - StyleConfig.countPixelRatio(68),
                marginLeft: StyleConfig.countPixelRatio(8),
                paddingHorizontal: StyleConfig.countPixelRatio(8),
                paddingVertical: StyleConfig.countPixelRatio(4),
                backgroundColor: 'transparent'
              }}>
                <TextX align={'left'} fontSize={StyleConfig.fontSizeH3} >{item.name}</TextX>
                <TextX align={'left'} fontSize={StyleConfig.fontSizeH2_3} style={{ flexWrap: 'wrap' }} >{item.message}</TextX>
                <View style={{flexDirection:'row-reverse'}}>
                  <TouchableOpacity onPress={() => this._replyBtnPressed(item)}>
                    <TextX align={'right'} fontSize={StyleConfig.fontSizeH3} >{'Reply'}</TextX>
                  </TouchableOpacity>
                  
                  <View style={{width:StyleConfig.countPixelRatio(16)}} />
                  
                  {item.user_id == user_id && <TouchableOpacity onPress={() => this._deleteBtnPressed(item)}>
                    <TextX align={'right'} fontSize={StyleConfig.fontSizeH3} >{'Delete'}</TextX>
                  </TouchableOpacity>}
                  
                </View>
                

                {item.reply && item.reply.length > 0 &&
                  item.reply.map((item, index) => {
                    return this.renderReplyUI(item, index)
                  })
                }
              </View>
            </View>
          </View>)}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }

  renderCommentInputView = () => {
    const { commentText } = this.state
    return (
      <View style={{
        marginHorizontal: 16,
        marginVertical: 8,
        height: 40,
        flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#777',
        alignItems: 'center',
        alignSelf: 'flex-end',
      }}>
        <TextInput
          ref={(input) => this.inputRef = input}
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
          <TouchableOpacity style={{ marginRight: 16 }} onPress={() => this._onSendBtnPressed()}>
            <Feather name='send' color={"#777"} size={22} />
          </TouchableOpacity>
        }
      </View>
    )
  }

  renderReplyUI = (item, index) => {
    return (
      <View key={index} style={{
        marginTop: StyleConfig.countPixelRatio(10),
      }}>
        <View style={{ width: StyleConfig.width * 0.9, backgroundColor: 'transparent', flexDirection: 'row', }}>
          <Image source={{ uri: item.profilepic }} style={styles.imgProfile} />
          <View style={{
            width: StyleConfig.width * 0.9 - StyleConfig.countPixelRatio(68),
            marginLeft: StyleConfig.countPixelRatio(8),
            paddingHorizontal: StyleConfig.countPixelRatio(8),
            paddingVertical: StyleConfig.countPixelRatio(4),
            backgroundColor: 'transparent'
          }}>
            <TextX align={'left'} fontSize={StyleConfig.fontSizeH3} >{item.name}</TextX>
            <TextX align={'left'} fontSize={StyleConfig.fontSizeH2_3} style={{ flexWrap: 'wrap' }} >{item.message}</TextX>
          </View>
        </View>
      </View>
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
    marginTop: StyleConfig.countPixelRatio(4)
  },
})

export default withLoader(withToast(CommentList))