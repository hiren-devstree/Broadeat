import React from "react";
import {
  TouchableOpacity, Image, Alert
} from "react-native"
import AsyncStorage from '@react-native-community/async-storage'

import withLoader from '../../redux/actionCreator/withLoader'
import { getUserBookmarkList } from '../../apiManager'
import { IMAGE_PATH } from '../../helper/Constants'

import { ViewX, TextX, SafeAreaView } from "../../components/common";
import StyleConfig from "../../assets/styles/StyleConfig";
import AppImages from '../../assets/images';
import { withTheme } from "styled-components";
import { FlatList } from "react-native-gesture-handler";

export const Account = withTheme(({ item, theme, onPres, isActive }) => (
  <ViewX style={{
    paddingVertical: StyleConfig.convertHeightPerVal(10),
    flexDirection: "row",
    alignItems: "center",
  }} >
    <TouchableOpacity style={{ flex: 1 }} onPress={onPres}>
      <ViewX style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start" }} >
        <Image
          style={{ width: StyleConfig.convertWidthPerVal(56), height: StyleConfig.convertWidthPerVal(56) }}
          source={AppImages.mock_user_1}
        />
        <ViewX style={{ paddingHorizontal: StyleConfig.convertHeightPerVal(20) }} >
          <TextX style={{ color: theme.text, fontSize: StyleConfig.fontSizeH3 }}>{item.name}</TextX>
          <TextX style={{ color: theme.textHint, fontSize: StyleConfig.fontSizeH3_4 }} >{item.description}</TextX>
        </ViewX>
      </ViewX>
    </TouchableOpacity>
    <Image
      resizeMode="contain"
      style={{ width: StyleConfig.iconSize, aspectRatio: 1 }}
      source={isActive ? AppImages.ic_fav_selected : AppImages.ic_bookmark}
    />
  </ViewX>
))

let _this
class AccountTab extends React.Component {

  constructor(props) {
    super(props)
    _this = this
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this._getBookmarListAPICalled()
  }


  _goToBookamrk = (item) => {
    this.props.navigation.navigate('UserAccount')
  }

  static async reloadScreen() {
    console.log('ajksdakshdjkahdajksdhajksdhkjas')
    let token = await AsyncStorage.getItem('user_token')
    let response = await getUserBookmarkList(token)

    if (response.code === 1) {
      _this.setState({ data: response.data })
    } else {
      Alert.alert(response.message)
    }
  }

  _getBookmarListAPICalled = async () => {
    let token = await AsyncStorage.getItem('user_token')
    let response = await getUserBookmarkList(token)

    if (response.code === 1) {
      this.setState({ data: response.data })
    } else {
      Alert.alert(response.message)
    }
  }

  render() {
    const { data } = this.state
    return (
      <SafeAreaView>
        <ViewX style={{}} {...this.props} >
          <FlatList
            style={{ width: "100%", paddingHorizontal: StyleConfig.convertWidthPerVal(20) }}
            data={data}
            keyExtractor={(itm, idx) => `$user-${idx}`}
            renderItem={({ item, index }) => <Account {...{ item, index }} isActive onPres={() => this._goToBookamrk(item)} />}
          />
        </ViewX>
      </SafeAreaView >
    )
  }
}

export default withLoader(AccountTab);