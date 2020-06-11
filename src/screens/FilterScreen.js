
import React, { Component, useState } from 'react';
import {
  StyleSheet, TouchableWithoutFeedback,
  TouchableOpacity, Image

} from 'react-native';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';

import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, ViewX, TextX } from '../components/common';
import { withTheme } from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar, Button } from 'react-native-elements';
import imgBack from '../assets/images/ic_back.png'

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

const FilterHeader = withTheme(({ theme, ...props }) => {

  const { navigation } = props;
  const [value, setValue] = useState('')
  const onChange = (value) => (setValue(value));

  return (
    <ViewX style={{ flexDirection: "row" }} >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={imgBack} style={styles.backBtn} />
      </TouchableOpacity>
      <SearchBar
        containerStyle={{
          flex: 1,
          backgroundColor: "transparent"
        }}
        inputStyle={{ color: theme.text }}
        inputContainerStyle={{
          // borderWidth: StyleConfig.countPixelRatio(0.6),
          // borderColor: theme.text,
          borderRadius: StyleConfig.convertHeightPerVal(20)
        }}
        onChange={onChange}
        value={value}
      />
      <Button
        title={"Cancel"}
        buttonStyle={{ backgroundColor: theme.background }}
      />
    </ViewX>
  )
})

class FilterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
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
      ]
    }
  }

  render() {
    const { theme, navigation } = this.props;
    const { data } = this.state
    return (
      <SafeAreaView  {...this.props}>
        <FilterHeader {...{ navigation }} />
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
                            name={itm.type}
                            isSelected={itm.select}
                            onPress={() => {
                              itm.select = !itm.select
                              this.setState({ data: data })
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