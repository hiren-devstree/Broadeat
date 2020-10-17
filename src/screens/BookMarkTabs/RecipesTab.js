import React, { Component } from "react";
import {
  View, Alert, StyleSheet,
  FlatList, Image, TouchableWithoutFeedback
} from "react-native"
import AsyncStorage from '@react-native-community/async-storage'

import withLoader from '../../redux/actionCreator/withLoader'
import { getFavouriteListRecipe } from '../../apiManager'
import { IMAGE_PATH } from '../../helper/Constants'
import { withTheme } from "styled-components";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { ViewX, TextX, SafeAreaView } from "../../components/common";
import StyleConfig from "../../assets/styles/StyleConfig";
import AppImages from '../../assets/images';
import Video from 'react-native-video';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const INIT_FILTER = [
  { "_id": 0, "name": "View All", isSelected: true },
  { "_id": 1, "name": "Pastas", isSelected: false },
  { "_id": 2, "name": "Salads", isSelected: false },
  { "_id": 3, "name": "Desserts", isSelected: false },
  { "_id": 4, "name": "Vegetarian", isSelected: false }];
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
          width: POST_SIZE,
          justifyContent: 'flex-start'
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
                ref={(ref) => {
                  this[`player${idx}`] = ref
                }}
                onLoad={() => { idx != undefined && this[`player${idx}`].seek(0) }}
                repeat={false}
                resizeMode={'cover'}
                playInBackground={false}
                paused={true}
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
          width: "90%",
          fontSize: StyleConfig.fontSizeH3
        }} >{`${item.recipe_title}`}</TextX>
      </ViewX>
    </TouchableWithoutFeedback>
  )
})

let _this
class RecipesTab extends Component {

  constructor() {
    super()
    _this = this
    this.state = {
      filters: INIT_FILTER,
      data: [],
      filteredData: [],
      hashTagAvailable: [
        INIT_FILTER[0],
      ]
    }
  }

  componentDidMount() {
    this._getFavouriteListAPICalled()
  }


  static reloadScreen = async () => {
    console.log('Receipe Tag Reload screen')
    let token = await AsyncStorage.getItem('user_token')
    let response = await getFavouriteListRecipe(token)
    if (response.code === 1) {
      let hashTagAvailable = [INIT_FILTER[0]];
      let strHash = [];
      for (let ind in response.data) {
        for (let subInd in response.data[ind].recipe_hashtags) {
          strHash.push(response.data[ind].recipe_hashtags[subInd].hashtag_name)
        }
      }
      for (let ind in INIT_FILTER) {
        if (strHash.includes(INIT_FILTER[ind].name)) {
          hashTagAvailable.push(INIT_FILTER[ind]);
        }
      }
      _this.setState({ data: response.data, filteredData: response.data, hashTagAvailable })
    } else {
      if (response.message != 'No data found') {
        Alert.alert(response.message)
      }
    }
  }

  _getFavouriteListAPICalled = async () => {
    let token = await AsyncStorage.getItem('user_token')
    let response = await getFavouriteListRecipe(token)
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
      this.setState({ data: response.data, filteredData: response.data, hashTagAvailable })
    } else {
      if (response.message != 'No data found') {
        Alert.alert(response.message)
      }
    }
  }

  onFoodItemPress(item) {
    console.log({ item })
    this.props.navigation.navigate('PhotoRecipeDetails', { data: item.recipe_id })
  }
  _onFilterChange = (item) => {
    let { data, filters } = this.state

    for (let filInd in filters) {
      if (filters[filInd].name == item.name) {
        filters[filInd].isSelected = !filters[filInd].isSelected;
      }
    }
    if (item._id == 0) {
      for (let filInd in filters) {
        filters[filInd].isSelected = filInd == 0 ? true : false
      }
    } else if (item._id != 0 && filters[0].isSelected) {
      filters[0].isSelected = false
    }

    let fil = []
    for (let ind in filters) {
      if (filters[ind].isSelected == true)
        fil.push(filters[ind].name);
    }

    let isAllFalse = false
    filters.forEach((item, idx) => {
      if (item.isSelected == true) {
        isAllFalse = true
      }
    })

    if (!isAllFalse) {
      filters[0].isSelected = true
    }

    console.log({ fil, filters })
    if (fil.length == 0 || (fil.length == 1 && fil[0] == filters[0].name)) {
      console.log("State 1", data)
      this.setState({ filteredData: data, filters });
    } else {
      console.log("State 2")
      let filteredData = [];
      for (let ind in data) {
        for (let subInd in data[ind].recipe_hashtags) {
          if (fil.includes(data[ind].recipe_hashtags[subInd].hashtag_name)) {
            filteredData.push(data[ind])
            break;
          }
        }
      }
      this.setState({ filteredData: filteredData, filters });
    }
  }
  render() {
    const { hashTagAvailable, filteredData } = this.state;
    const { search } = this.props;
    let afterSearch = filteredData;

    if (search.length > 0 && afterSearch.length > 0) {
      afterSearch = afterSearch.filter((item) => item.recipe_title.toLowerCase().includes(search.toLowerCase()));
    }

    return (
      <SafeAreaView {...this.props}>
        <ViewX style={{ flexDirection: 'row' }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <ViewX style={{
              marginVertical: StyleConfig.convertHeightPerVal(5),
              flexDirection: "row"
            }} >
              {
                hashTagAvailable.map((item, idx) => <FilterBubble
                  onPress={() => this._onFilterChange(item)}
                  key={`filter-${idx}`} {...{ item }} />)
              }
            </ViewX>
          </ScrollView>
        </ViewX>
        <FlatList
          contentContainerStyle={{ paddingVertical: 20, }}
          numColumns={2}
          keyExtractor={(_, idx) => `foodGlr-${idx}`}
          data={afterSearch}
          extraData={this.props | this.state}
          renderItem={({ item, idx }) => <FavoriteFood {...{ item, idx }} onPres={() => this.onFoodItemPress(item)} />}
        />
      </SafeAreaView>
    );
  }
}
export default withLoader(RecipesTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});