import React, { Component } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import withLoader from '../redux/actionCreator/withLoader'
import { getUserWiseRcipeDetails, getUserBookmarkList, postUserBookmark, getUserDetails } from '../apiManager'
import AsyncStorage from '@react-native-community/async-storage'

import { withTheme } from "styled-components";
import { ScrollView } from "react-native-gesture-handler";

import { ViewX, TextX, SafeAreaView } from "../components/common";
import StyleConfig from "../assets/styles/StyleConfig";
import AppImages from '../assets/images';
import { Account } from "./BookMarkTabs/AccountTab";
import Video from 'react-native-video';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const FilterBubble = withTheme(({ theme, item, onPress }) => {
  const { cLightCyan, filterOn } = theme;
  return (
    <TouchableOpacity onPress={onPress}>
      <ViewX style={{
        marginHorizontal: StyleConfig.convertWidthPerVal(5),
        padding: StyleConfig.convertWidthPerVal(8),
        backgroundColor: item.isSelected ? filterOn : cLightCyan,
        borderRadius: 20
      }}>
        <TextX style={{ fontSize: StyleConfig.fontSizeH3_4, color: !item.isSelected ? filterOn : cLightCyan, }} >{item.name}</TextX>
      </ViewX>
    </TouchableOpacity>
  )
})



// const POST_SIZE = StyleConfig.width / 2;
const POST_SIZE = (StyleConfig.width - 15) / 2;

const FavoriteFood = withTheme(({ theme, item, idx, onPres }) => {
  return (
    <TouchableWithoutFeedback onPress={onPres} >
      <ViewX
        style={{
          width: POST_SIZE
        }}>
        <ViewX
          style={{
            width: POST_SIZE,
            height: POST_SIZE
          }}>
          {item.image_type == "image" ? <Image
            style={{
              borderRadius: StyleConfig.convertWidthPerVal(10),
              width: "90%",
              height: "90%"
            }}
            source={{ uri: item.image }}
          /> :
            <View>
              <Video
                repeat={false}
                playInBackground={false}
                paused={true}
                resizeMode={'cover'}
                style={{
                  borderRadius: StyleConfig.convertWidthPerVal(10),
                  width: "90%",
                  height: "90%"
                }}
                source={{ uri: item.image }}
              />
              <View style={{ height: "90%", position: 'absolute', flex: 1, alignSelf: 'center', justifyContent: 'center', zIndex: 99 }}>
                <FontAwesome5 name='play' color={'#ffffffda'} size={StyleConfig.countPixelRatio(32)} />
              </View>
            </View>

          }
        </ViewX>
        <TextX style={{
          width: "88%",
          fontSize: StyleConfig.fontSizeH3
        }} >{item.recipe_title}</TextX>
      </ViewX>
    </TouchableWithoutFeedback>
  )
})
const INIT_FILTER = [
  { "name": "View All", isSelected: false },
  { "name": "Pastas", isSelected: false },
  { "name": "Salads", isSelected: false },
  { "name": "Deserts", isSelected: false },
  { "name": "Vegetarian", isSelected: false }];

class UserAccount extends Component {

  constructor() {
    super()
    this.state = {
      filters: INIT_FILTER,
      data: [],
      filteredData: [],
      hashTagAvailable: [
        INIT_FILTER[0],
      ],
      isAlreadyBookMarked: false,
      userDetails: {

      }
    }
  }

  _getProfileDetailsAPICalling = async () => {
    const { loader } = this.props
    let token = await AsyncStorage.getItem('user_token')
    loader(true)
    let response = await getUserDetails(token)
    loader(false)
    console.log("getUserDetails", response)
    if (response.code === 1) {
      await this.setState({ userDetails: response.data })
    } else {
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }

  async componentDidMount() {
    const { loader } = this.props
    loader(true);
    console.log("PARAMS->", this.props.route.params)
    if (this.props.route.params == undefined) {
      await this._getProfileDetailsAPICalling()
    }
    let token = await AsyncStorage.getItem('user_token')
    let currentUserId = await AsyncStorage.getItem('user_id')
    let userId = this.props.route.params == undefined ? undefined : this.props.route.params.userId
    let isAlreadyBookMarked = false;
    if (userId == undefined) {
      userId = currentUserId
    } else {
      bookMarkedCooks = await getUserBookmarkList(token)
      console.log({ bookMarkedCooks })
      if (!bookMarkedCooks.error && bookMarkedCooks.data.length > 0) {
        let filteredBookMarkedCooks = bookMarkedCooks.data.filter((item) => item.id == userId)
        isAlreadyBookMarked = filteredBookMarkedCooks.length == 0 ? false : true;
      }
    }
    let data = {
      user_id: userId
    }
    let response = await getUserWiseRcipeDetails(data, token)
    loader(false)
    console.log("RES1=>", response)
    if (response.code === 1) {
      let hashTagAvailable = [INIT_FILTER[0]];
      let strHash = [];
      for (let ind in response.data) {
        for (let subInd in response.data[ind].recipe_hashtags) {
          strHash.push(response.data[ind].recipe_hashtags[subInd].hashtag_name)
        }
      }
      for (let ind in this.state.filters) {
        if (strHash.includes(this.state.filters[ind].name)) {
          hashTagAvailable.push(this.state.filters[ind]);
        }
      }
      this.setState({ data: response.data, filteredData: response.data, hashTagAvailable, isAlreadyBookMarked, user_id: currentUserId })
    } else {
      Alert.alert(response.message)
    }
  }


  onFoodItemPress(item) {
    this.props.navigation.navigate('PhotoRecipeDetails', { data: item.id })
  }
  _onFilterChange = (index) => {
    let { data, filters } = this.state
    filters[index].isSelected = !filters[index].isSelected;
    let fil = []
    for (let ind in filters) {
      if (filters[ind].isSelected == true)
        fil.push(filters[ind].name);
    }
    if (fil.length > 0) {
      let filteredData = [];
      for (let ind in data) {
        for (let subInd in data[ind].recipe_hashtags) {
          if (fil.includes(data[ind].recipe_hashtags[subInd].hashtag_name)) {
            filteredData.push(data[ind])
          }
        }
      }
      this.setState({ filteredData: filteredData, filters });
    } else {
      this.setState({ filteredData: data, filters });
    }

  }
  _onBookmarkUser = async () => {
    const { loader } = this.props
    const { isAlreadyBookMarked } = this.state
    loader(true);
    let token = await AsyncStorage.getItem('user_token')
    let user_id = this.props.route.params.userId
    let response = await postUserBookmark({
      "isboolmark": !isAlreadyBookMarked,
      "User_bookmark_id": user_id
    }, token);
    console.log("USER_BOOKMARK-> ", response)
    loader(false);
    this.setState({ isAlreadyBookMarked: !isAlreadyBookMarked })
  }
  render() {
    const { theme } = this.props
    let userDetails = this.props.route.params && this.props.route.params.userDetails ? this.props.route.params.userDetails : this.state.userDetails
    const { hashTagAvailable, filteredData, user_id, isAlreadyBookMarked } = this.state;

    let showBookmark = true;
    if (this.props.route.params == undefined || (this.props.route.params.userId == undefined || this.props.route.params.userId == user_id)) {
      showBookmark = false;
    }
    return (
      <SafeAreaView {...this.props}>
        <ViewX style={{ marginBottom: 0, paddingHorizontal: 20, paddingBottom: 20 }} >
          <ViewX style={{
            paddingVertical: StyleConfig.convertHeightPerVal(5),
            flexDirection: "row",
            alignItems: "center",
          }} >
            <ViewX style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start" }} >
              <Image source={{ uri: userDetails.profilepic }} style={styles.imgProfile} />
              <ViewX style={{ paddingHorizontal: StyleConfig.convertHeightPerVal(20), alignItems: 'flex-start' }} >
                <TextX align={'left'} style={{ color: theme.text, fontSize: StyleConfig.fontSizeH3 }}>{`${userDetails.name}`}</TextX>
                <TextX align={'left'} style={{ color: theme.textHint, fontSize: StyleConfig.fontSizeH3_4 }} >{userDetails.email}</TextX>
              </ViewX>
            </ViewX>
            {showBookmark && <TouchableOpacity onPress={this._onBookmarkUser}>
              <Image
                resizeMode="contain"
                style={{ width: 25, height: 30, tintColor: isAlreadyBookMarked ? 'blue' : 'grey' }}
                source={AppImages.ic_bookmark}
              />
            </TouchableOpacity>}
          </ViewX>


        </ViewX>
        <ViewX style={{
          flexDirection: "row"
        }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <ViewX style={{
              marginHorizontal: StyleConfig.convertHeightPerVal(5),
              flexDirection: "row"
            }} >
              {
                hashTagAvailable.map((item, idx) => <FilterBubble
                  onPress={() => this._onFilterChange(idx)}
                  key={`filter-${idx}`} {...{ item }} />)
              }
            </ViewX>
          </ScrollView>
        </ViewX>
        <FlatList
          contentContainerStyle={{ paddingVertical: 20 }}
          numColumns={2}
          keyExtractor={(_, idx) => `foodGlr-${idx}`}
          data={filteredData}
          renderItem={({ item, idx }) => <FavoriteFood {...{ item, idx }} onPres={() => this.onFoodItemPress(item)} />}
        />
      </SafeAreaView>
    );
  }
}
export default withLoader(withTheme(UserAccount));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgProfile: {
    height: StyleConfig.countPixelRatio(60),
    width: StyleConfig.countPixelRatio(60),
    borderRadius: StyleConfig.countPixelRatio(30)
  },

});