import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback
} from "react-native";

import { withTheme } from "styled-components";
import { ScrollView } from "react-native-gesture-handler";

import { ViewX, TextX, SafeAreaView } from "../components/common";
import StyleConfig from "../assets/styles/StyleConfig";
import AppImages from '../assets/images';
import { Account } from "./BookMarkTabs/AccountTab";

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
            source={item}
          />
        </ViewX>
        <TextX style={{
          fontSize: StyleConfig.fontSizeH3
        }} >{" Tomato & Broccoli Conchiglie Pasta"}</TextX>
      </ViewX>
    </TouchableWithoutFeedback>
  )
})

class UserAccount extends Component {

  constructor() {
    super()
    this.state = {
      filters: ["View All", "Pastas", "Salads", "Deserts", "Vegetarian"]
    }
  }

  onFoodItemPress(item) {
    this.props.navigation.navigate('PhotoRecipeDetails', { data: item })
  }

  render() {
    const { theme } = this.props
    const { filters } = this.state;
    let userDetails = this.props.route.params.userDetails
    let data = []
    for (let ind = 0; ind < 20; ind++) {
      let ii = ind % 13;
      data.push(AppImages.homeItems[ii]);
    }
    return (
      <SafeAreaView {...this.props}>
        <ViewX style={{ marginVertical: 10, padding: 20 }} >


          <ViewX style={{
            paddingVertical: StyleConfig.convertHeightPerVal(10),
            flexDirection: "row",
            alignItems: "center",
          }} >
            <TouchableOpacity style={{ flex: 1 }} onPress={() => { }}>
              <ViewX style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start" }} >
                <Image
                  style={{ width: StyleConfig.convertWidthPerVal(56), height: StyleConfig.convertWidthPerVal(56) }}
                  source={AppImages.mock_user_1}
                />
                <ViewX style={{ paddingHorizontal: StyleConfig.convertHeightPerVal(20) }} >
                  <TextX style={{ color: theme.text, fontSize: StyleConfig.fontSizeH3 }}>{userDetails.name}</TextX>
                  <TextX style={{ color: theme.textHint, fontSize: StyleConfig.fontSizeH3_4 }} >{userDetails.description}</TextX>
                </ViewX>
              </ViewX>
            </TouchableOpacity>
            <Image
              resizeMode="contain"
              style={{ width: StyleConfig.iconSize, aspectRatio: 1 }}
              source={AppImages.ic_bookmark}
            />
          </ViewX>


        </ViewX>
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
          data={data}
          renderItem={({ item, idx }) => <FavoriteFood {...{ item, idx }} onPres={() => this.onFoodItemPress(item)} />}
        />
      </SafeAreaView>
    );
  }
}
export default withTheme(UserAccount);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});