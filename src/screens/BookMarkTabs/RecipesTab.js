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
import { ScrollView } from "react-native-gesture-handler";

import { ViewX, TextX, SafeAreaView } from "../../components/common";
import StyleConfig from "../../assets/styles/StyleConfig";
import AppImages from '../../assets/images';

const FilterBubble = withTheme(({ theme, item }) => {
  const { cLightCyan, filterOn } = theme;
  return (
    <ViewX style={{
      marginHorizontal: StyleConfig.convertWidthPerVal(5),
      padding: StyleConfig.convertWidthPerVal(8),
      backgroundColor: cLightCyan,
      borderRadius: 20
    }}>
      <TextX style={{ fontSize: StyleConfig.fontSizeH3_4, color: filterOn }} >{item}</TextX>
    </ViewX>
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
          <Image
            style={{
              borderRadius: StyleConfig.convertWidthPerVal(10),
              width: "90%",
              height: "90%"
            }}
            source={{ uri: item.image }}
          />
        </ViewX>
        <TextX style={{
          fontSize: StyleConfig.fontSizeH3
        }} >{item.recipe_title}</TextX>
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
      filters: ["View All", "Pastas", "Salads", "Deserts", "Vegetarian"],
      data: []
    }
  }

  componentDidMount() {
    this._getFavouriteListAPICalled()
  }


  static reloadScreen() {
    _this._getFavouriteListAPICalled()
  }

  _getFavouriteListAPICalled = async () => {
    let token = await AsyncStorage.getItem('user_token')
    let response = await getFavouriteListRecipe(token)
    console.log({"favoriteRes":response.data})
    if (response.code === 1) {
      this.setState({ data: response.data })
    } else {
      Alert.alert(response.message)
    }
  }

  onFoodItemPress(item) {
    this.props.navigation.navigate('PhotoRecipeDetails', { data: item })
  }

  render() {
    const { filters, data } = this.state;
    const { search } =this.props;
    let afterSearch = data;
    console.log({afterSearch})
    if(search.length > 0 && afterSearch.length > 0){
      afterSearch = afterSearch.filter((item)=> item.recipe_title.toLowerCase().includes(search.toLowerCase()));
    }

    return (
      <SafeAreaView {...this.props}>
        <ViewX>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <ViewX style={{
              marginVertical: StyleConfig.convertHeightPerVal(5),
              flexDirection: "row"
            }} >
              {
                filters.map((item, idx) => <FilterBubble key={`filter-${idx}`} {...{ item }} />)
              }
            </ViewX>
          </ScrollView>
        </ViewX>
        <FlatList
          contentContainerStyle={{ paddingVertical: 20, alignSelf: "center" }}
          numColumns={2}
          keyExtractor={(_, idx) => `foodGlr-${idx}`}
          data={afterSearch}
          extraData={this.props|this.state}
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