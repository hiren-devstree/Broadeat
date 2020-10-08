
import React, { Component } from 'react';
import {
  FlatList, View, Text,
  Image, StyleSheet, ScrollView, TouchableWithoutFeedback, Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import { getRecentSearch, getSearchRecipeList, deleteSearchRecord } from './../apiManager'
import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, View1CC, Devider, CText, CTextColor, TextX, ViewX } from '../components/common';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { withTheme } from 'styled-components';
import HeaderSearchBar from '../components/common/HeaderSearchBar';

let _this = undefined
class SearchScreen extends Component {
  constructor(props) {
    super(props)

    _this = this
    this.state = {
      data: [],
      searchText: ''
    }

    props.navigation.setOptions({
      header: ({ tintColor }) => (
        <HeaderSearchBar  {...props} reload={true} onChangeSearchText={this.onChangeSearchText} onSubmitPressed={this._onSubmitPressed} />
      )
    })
  }

  onChangeSearchText = (text) => {
    this.setState({ searchText: text })
  }

  _onSubmitPressed = () => {
    this._getSearchResultListAPICalling(this.state.searchText)
  }

  _onDeleteRecord = async (item) => {
    let token = await AsyncStorage.getItem('user_token')
    let data = {
      id: item.id
    }

    var formdata = new FormData();
    formdata.append("id", item.id);
    let response = await deleteSearchRecord(formdata, token)
    console.log('deleteSearchRecord', response)
    if (response.code === 1) {
      this._getRecentSearchAPICalled()
    } else {
      console.log(response.message)
    }
  }

  componentDidMount() {
    console.log('==========================')

    this._getRecentSearchAPICalled()
  }

  _getRecentSearchAPICalled = async () => {
    const { loader } = this.props
    let token = await AsyncStorage.getItem('user_token')

    // loader(true)
    let response = await getRecentSearch(token)
    // loader(false)

    console.log("response ==> ", response)
    if (response && response.code === 1) {
      this.setState({ data: response.data })
    } else {
      this.setState({ data: [] })
      //console.log(response.message)

    }
  }

  static reloadScreen = async () => {
    if (_this) {
      _this.props.navigation.setOptions({
        header: ({ tintColor }) => (
          <HeaderSearchBar  {..._this.props} isBack={true} onChangeSearchText={_this.onChangeSearchText} onSubmitPressed={_this._onSubmitPressed} />
        )
      })
    }

    let token = await AsyncStorage.getItem('user_token')
    let response = await getRecentSearch(token)

    if (response.code === 1) {
      _this.setState({ data: response.data })
    } else {

      // setTimeout(() => {
      //   Alert.alert(response.message)
      // }, 500)
    }
  }

  _getSearchResultListAPICalling = async (tagName) => {
    const { searchText } = this.state
    let sText = `${tagName}`.length > 0 ? tagName : searchText
    let token = await AsyncStorage.getItem('user_token')
    let data = {
      "title": sText
    }
    let response = await getSearchRecipeList(data, token)
    if (response.code === 1) {
      if (response.data.length > 0) {
        this.props.navigation.navigate("SearchResult", { data: response.data, text: tagName })
      } else {
        Alert.alert(response.message)
      }
    } else {
      Alert.alert(response.message)
    }
  }

  render() {
    const { data } = this.state
    const { theme, navigation } = this.props;

    return (
      <SafeAreaView  {...this.props}>
        <ViewX style={{
          flex: 1,
          paddingHorizontal: StyleConfig.convertWidthPerVal(20),
        }} {...this.props} >
          <ViewX
            style={{
              alignSelf: "flex-start"
            }}>
            <TextX
              style={{
                padding: StyleConfig.convertHeightPerVal(10),
                fontSize: StyleConfig.fontSizeH3,
                fontWeight: "bold",
                textAlign: "left"
              }} >{"Recent"}</TextX>
          </ViewX>
          <ScrollView
            style={{
              width: "100%"
            }}
          >
            {
              data.map((item, idx) => {
                let count = `${item.related_count} ${item.related_count < 2 ? 'post' : 'posts'}`
                return (
                  <ViewX
                    style={{
                      paddingVertical: StyleConfig.convertWidthPerVal(10),
                      flexDirection: "row",
                      justifyContent: 'space-between'
                    }} key={idx}>
                    <TouchableWithoutFeedback onPress={() => this._getSearchResultListAPICalling(item.search_text)} >
                      <ViewX style={{ flexDirection: "row", borderColor: "white" }} >
                        <TextX style={{
                          borderColor: theme.backgroundAlt,
                          padding: StyleConfig.convertWidthPerVal(5),
                          fontSize: StyleConfig.fontSizeH1
                        }}  > {"#"} </TextX>
                        <ViewX
                          style={{
                            alignItems: 'flex-start',
                            paddingHorizontal: StyleConfig.convertWidthPerVal(20)
                          }} >
                          <TextX>{`#${item.search_text}`} </TextX>
                          <TextX style={{ color: '#999' }}> {count}</TextX>
                        </ViewX>
                      </ViewX>
                    </TouchableWithoutFeedback>
                    <Ionicons
                      name={"ios-close"}
                      color={theme.text}
                      size={StyleConfig.iconSize * 1.4}
                      onPress={() => this._onDeleteRecord(item)}
                    />
                  </ViewX>
                )
              })
            }
          </ScrollView>
        </ViewX>
      </SafeAreaView >
    );
  }
}


export default withTheme(withLoader(withToast(SearchScreen)));
const styles = StyleSheet.create({


});