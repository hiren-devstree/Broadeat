
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
        <TextX style={{ fontWeight: "bold", fontSize: StyleConfig.fontSizeH2 }} > {name} </TextX>
      </ViewX>
    </TouchableWithoutFeedback>
  )
})

const FilterHeader = withTheme(({ theme, onPress, ...props }) => {

  const { navigation } = props;
  const [value, setValue] = useState('')
  const onChange = (value) => (setValue(value));

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
            borderTopWidth:0,
            borderBottomWidth:0

          }}

          inputStyle={{ color: theme.text }}
          inputContainerStyle={{
            // borderWidth: StyleConfig.countPixelRatio(0.6),
            // borderColor: theme.text,
            // borderRadius: StyleConfig.convertHeightPerVal(20),
            backgroundColor: "transparent",
            alignSelf: 'center',
            height: 40,
            marginTop: -15,
          }}
          onChange={onChange}
          value={value}
        />
      </View>
      <Button
        title={"Done"}
        buttonStyle={{ backgroundColor: theme.background }}
        onPress={() => onPress()}
      />
    </ViewX>
  )
})

class FilterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: [
        {
          title: "Main dishes",
          data: [
            { type: "Pizza", select: false },
            { type: "Burger", select: false, },
            { type: "Risotto", select: false, },
          ]
        },
        {
          title: "Sides",
          data: [
            { type: "French Fries", select: false, },
            { type: "Onion Rings", select: false, },
            { type: "Fried Shrimps", select: false, }
          ]
        },
        {
          title: "Drinks",
          data: [
            { type: "Water", select: false },
            { type: "Coke", select: false },
            { type: "Beer", select: false },
          ]
        },
        {
          title: "Desserts",
          data: [
            { type: "Cheese Cake", select: false },
            { type: "Ice Cream", select: false }]
        }
      ],
      data: [],
      selectedTag: []
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

    this.setState({ data: tempArr })
  }

  _applyFilters = async () => {
    const { selectedTag } = this.state
    let token = await AsyncStorage.getItem('user_token')
    let data = selectedTag.toString()

    let raw = {
      tags: data
    }

    let response = await applyFilters(raw, token)
    console.log(response)
    if (response.code === 1) {
      if (response.data.length > 0) {
        this.props.navigation.navigate("SearchResult", { data: response.data })
      } else {
        Alert.alert(response.message)
      }
    } else {
      Alert.alert(response.message)
    }
  }

  render() {
    const { theme, navigation } = this.props;
    const { data } = this.state
    let selectedTag = [];
    for(let ind in data){
      for(let subInd in data[ind].data){
        if(data[ind]['data'][subInd].select){
          selectedTag.push(data[ind]['data'][subInd])
        }
      }
    }
    return (
      <SafeAreaView  {...this.props}>
        <FilterHeader {...{ navigation }} onPress={() => this._applyFilters()} />
        {selectedTag.length > 0 && 
          <View style={{height: StyleConfig.convertHeightPerVal(54)}}>
          <FlatList
            horizontal 
            data={selectedTag}
            extraData={this.state}
            renderItem={({item,index})=>(
              <View key={`header-${index}`}>
              <FilterBubble
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
              data.map((_, idx) => {
                return (
                  <ViewX
                    key={`filter-${idx}`}
                    style={{
                      padding: 10,
                      borderColor: "pink",
                    }}
                  >
                    <TextX style={{
                      color: theme.text,
                      alignSelf: "flex-start",
                      fontWeight: "bold",
                      fontSize: StyleConfig.fontSizeH3
                    }} > {_.title.toUpperCase()} </TextX>

                    <ViewX style={{
                      paddingVertical: 5,
                      width: StyleConfig.width,
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      flexDirection: "row"
                    }} >
                      {
                        _.data
                          .map((itm, idx) => <FilterBubble
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
                    </ViewX>
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