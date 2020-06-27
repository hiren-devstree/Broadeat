
import React, { Component } from 'react';
import {
  FlatList, View, Text,
  Image, StyleSheet, ScrollView, TouchableWithoutFeedback
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import { getTagList } from './../apiManager'
import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, View1CC, Devider, CText, CTextColor, TextX, ViewX } from '../components/common';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { withTheme } from 'styled-components';
import HeaderSearchBar from '../components/common/HeaderSearchBar';

let _this
class SearchScreen extends Component {
  constructor(props) {
    super(props)
    _this = this
    this.state = {
      data: []
    }

    props.navigation.setOptions({
      header: ({ tintColor }) => (
        <HeaderSearchBar  {...props} onChangeSearchText={this.onChangeSearchText} />
      )
    })
  }

  onChangeSearchText = (text) => {
    console.log('Search Text: ', text)
  }

  async componentDidMount() {
    const { loader } = this.props
    let token = await AsyncStorage.getItem('user_token')

    loader(true)
    let response = await getTagList(token)
    loader(false)

    console.log(response)
    if (response.code === 1) {
      this.setState({ data: response.data })
    } else {
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }

  static reloadScreen = async () => {
    let token = await AsyncStorage.getItem('user_token')
    let response = await getTagList(token)

    console.log(response)
    if (response.code === 1) {
      _this.setState({ data: response.data }, () => {
        console.log(_this.state.data)
      })
    } else {
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
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
                return (
                  <ViewX
                    style={{
                      paddingVertical: StyleConfig.convertWidthPerVal(10),
                      flexDirection: "row",
                      justifyContent: 'space-between'
                    }} key={idx}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("SearchResult")} >
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
                          <TextX> {`#${item.tag_name}`} </TextX>
                          <TextX style={{ color: theme.backgroundAlt }} > {item.category_type} </TextX>
                        </ViewX>
                      </ViewX>
                    </TouchableWithoutFeedback>
                    <Ionicons
                      name={"ios-close"}
                      color={theme.backgroundAlt}
                      size={StyleConfig.iconSize}
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