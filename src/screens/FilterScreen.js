
import React, { Component, useState } from 'react';
import {
  StyleSheet, TouchableWithoutFeedback,
  TouchableOpacity, Image, Alert, View, ScrollView
} from 'react-native';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import AsyncStorage from '@react-native-community/async-storage'

import { getTagList, applyFilters } from './../apiManager'

import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, ViewX, TextX } from '../components/common';
import { withTheme } from 'styled-components';

import { SearchBar, Button } from 'react-native-elements';
import imgBack from '../assets/images/ic_back.png'
import { FlatList } from 'react-native-gesture-handler';

const FilterBubble = withTheme(({ theme, ...props }) => {
  const { name, onPress, isSelected } = props
  return (
    <TouchableWithoutFeedback onPress={onPress} >
      <ViewX style={{
        borderRadius: StyleConfig.convertWidthPerVal(20),
        padding: StyleConfig.convertWidthPerVal(10),
        margin: StyleConfig.convertWidthPerVal(5),
        backgroundColor: isSelected ? theme.filterOn : theme.filterOff
      }} >
        <TextX style={{ fontWeight: "bold", fontSize: StyleConfig.fontSizeH3 }} >{name}</TextX>
      </ViewX>
    </TouchableWithoutFeedback>
  )
})

const FilterHeader = withTheme(({ theme, onPress, onChangeValue, ...props }) => {

  const { navigation } = props;
  const [value, setValue] = useState('')
  const onChange = (value) => {
    const { text } = value.nativeEvent
    onChangeValue(text)
    setValue(value)
  }

  return (
    <ViewX style={{ flexDirection: "row", }} >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={imgBack} style={[styles.backBtn, { tintColor: 'blue', marginHorizontal: 8 }]} />
      </TouchableOpacity>
      <View style={{
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        paddingVertical: 5
      }}>
        <SearchBar
          containerStyle={{
            flex: 1,
            backgroundColor: "transparent",
            borderTopWidth: 0,
            borderBottomWidth: 0

          }}

          inputStyle={{ color: theme.text, textAlign: 'center' }}
          inputContainerStyle={{
            // borderWidth: StyleConfig.countPixelRatio(0.6),
            // borderColor: theme.text,
            // borderRadius: StyleConfig.convertHeightPerVal(20),
            backgroundColor: "transparent",
            alignSelf: 'center',
            height: 40,
            marginTop: -15,
          }}
          placeholder={'Search'}
          placeholderTextColor={theme.textHint}
          onChange={onChange}
          value={value}
        />
      </View>
      <Button
        title={"Done"}
        buttonStyle={{ backgroundColor: theme.background }}
        titleStyle={{ color: StyleConfig.blue }}
        onPress={() => onPress()}
      />
    </ViewX>
  )
})

class FilterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedTag: [],
      searchText: ''
    }
  }

  componentDidMount() {
    this._getFilterAPICalling()
  }


  _getFilterAPICalling = async () => {
    let token = await AsyncStorage.getItem('user_token')
    let response = await getTagList(token)
    let tempArr = []
    response.data.category_list.forEach(item => {
      let temp = []
      response.data.tag_list[`${item.category_type}`].forEach((ele) => {
        temp.push({ ...ele, isSelected: false })
      })
      tempArr.push({ title: item.category_type, data: temp })
    })
    console.log({ "data": tempArr })
    this.setState({ data: tempArr })
  }

  _applyFilters = async () => {
    const { selectedTag, searchText } = this.state
    console.log({ searchText })
    let token = await AsyncStorage.getItem('user_token')
    let data = selectedTag.toString()
    if (data.length > 0) {
      let raw = {
        tags: data
      }
      let response = await applyFilters(raw, token)

      if (response.code === 1) {
        if (response.data.length > 0) {
          this.props.navigation.navigate("SearchResult", { data: response.data, selectedTag, text: searchText })
        } else {
          Alert.alert(response.message)
        }
      } else {
        Alert.alert(response.message)
      }
    }

  }

  _onChangeSearchValue = (value) => {
    this.setState({ searchText: value })
  }

  render() {
    const { theme, navigation } = this.props;
    const { data, searchText } = this.state
    let selectedTag = [];
    for (let ind in data) {
      for (let subInd in data[ind].data) {
        if (data[ind]['data'][subInd].select) {
          selectedTag.push(data[ind]['data'][subInd])
        }
      }
    }
    let formatedData = [];
    for (let ind in data) {
      let { data: subData, ...rest } = data[ind];
      let newSubData = [[]];
      let currInd = 0;
      for (let subInd in data[ind].data) {
        newSubData[currInd].push(data[ind]['data'][subInd]);
        if ((subInd + 1) % 3 == 0) {
          newSubData.push([]);
          currInd++;
        }
      }
      formatedData.push({ ...rest, data: newSubData });
    }

    return (
      <SafeAreaView  {...this.props}>
        <FilterHeader {...{ navigation }} onChangeValue={(event) => this._onChangeSearchValue(event)} onPress={this._applyFilters} />
        {selectedTag.length > 0 &&
          <View style={{ height: StyleConfig.convertHeightPerVal(54) }}>
            <FlatList
              horizontal
              data={selectedTag}
              extraData={this.state}
              renderItem={({ item, index }) => (
                <View key={`header-${index}`}>
                  <FilterBubble
                    onPress={() => {
                      item.select = !item.select
                      let selectedTag = this.state.selectedTag
                      if (selectedTag.includes(item.tag_name)) {
                        let index = selectedTag.indexOf(item.tag_name)
                        if (index !== -1) {
                          selectedTag.splice(index, 1)
                        }
                      } else {
                        selectedTag.push(item.tag_name)
                      }
                      this.setState({ data: data, selectedTag: selectedTag })
                    }}
                    name={item.tag_name}
                    isSelected={item.select}
                  />
                </View>
              )}
            />
          </View>}
        <ScrollView>
          <ViewX style={{ alignItems: 'flex-start' }}  {...this.props} >
            {
              formatedData.map((_, idx) => {
                return (
                  <ViewX
                    key={`filter-${idx}`}
                    style={{
                      padding: 10,
                      borderColor: "pink",
                    }} >
                    <TextX style={{
                      color: theme.text,
                      alignSelf: "flex-start",
                      fontWeight: "bold",
                      fontSize: StyleConfig.fontSizeH3
                    }} >{_.title.toUpperCase()}</TextX>
                    <View>
                      {_.data.map((mItem, ind) => <ViewX style={{
                        paddingVertical: 5,
                        width: StyleConfig.width,
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                        flexDirection: "row"
                      }} >
                        {
                          mItem.map((itm, idx) => <FilterBubble
                            key={`fb-${idx}`}
                            name={itm.tag_name}
                            isSelected={itm.select}
                            onPress={() => {
                              itm.select = !itm.select
                              let selectedTag = this.state.selectedTag
                              if (selectedTag.includes(itm.tag_name)) {
                                let index = selectedTag.indexOf(itm.tag_name)
                                if (index !== -1) {
                                  selectedTag.splice(index, 1)
                                }
                              } else {
                                selectedTag.push(itm.tag_name)
                              }
                              console.log(selectedTag)
                              this.setState({ data: data, selectedTag: selectedTag })
                            }}
                          />)
                        }
                      </ViewX>)}
                    </View>

                  </ViewX>
                )
              })
            }
          </ViewX>
        </ScrollView>
      </SafeAreaView >
    );
  }
}


export default withTheme(withLoader(withToast(FilterScreen)));
const styles = StyleSheet.create({
  backBtn: {
    width: StyleConfig.countPixelRatio(22),
    height: StyleConfig.countPixelRatio(22),
    tintColor: 'white'
  },

});