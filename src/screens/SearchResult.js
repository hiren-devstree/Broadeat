
import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, View1CC, ViewX, Devider, CText, CTextColor, TextX } from '../components/common';
import FoodResultRow from '../components/common/FoodResultRow';
import Video from 'react-native-video';
import HeaderSearchBar from '../components/common/HeaderSearchBar'
import { withTheme } from 'styled-components';
const FilterBubble = withTheme(({ theme, ...props }) => {
  const { name, onPress, isSelected } = props
  return (
    <ViewX style={{
      borderRadius: StyleConfig.convertWidthPerVal(20),
      padding: StyleConfig.convertWidthPerVal(10),
      margin: StyleConfig.convertWidthPerVal(5),
      backgroundColor: isSelected ? theme.filterOn : theme.filterOff
    }} >
      <TextX style={{ fontWeight: "bold", fontSize: StyleConfig.fontSizeH3 }} >{name}</TextX>
    </ViewX>

  )
})

class SearchResult extends Component {
  constructor(props) {
    super(props)
    console.log("text-- ", props.route.params.text)
    this.state = {
      data: [],
      showFilter: false,
      selectedTag: props.route.params.selectedTag
    }
  }

  onFilterPress = () => {
    this.setState({ showFilters: true })
  }
  componentDidMount() {

    this.props.navigation.setOptions({
      header: ({ tintColor }) => (
        <HeaderSearchBar  {...this.props} showMenu showFilter={this.props.route.params.selectedTag ? true : false} showFilterMenu onFilterPress={this.onFilterPress} back={true} reload={true} text={this.props.route.params.text} />
      )
    })

    let data = this.props.route.params.data
    this.setState({ data })
  }

  render() {
    const { selectedTag, showFilters } = this.state;
    return (
      <SafeAreaView {...this.props}>
        <View1CC style={{ flex: 0, }} {...this.props} >
          {selectedTag && selectedTag.length > 0 && showFilters &&
            <View style={{ width: StyleConfig.width, height: StyleConfig.convertHeightPerVal(54) }}>
              <FlatList
                horizontal
                data={selectedTag}
                extraData={this.state}
                renderItem={({ item, index }) => (
                  <View key={`header-${index}`}>
                    <FilterBubble
                      name={item}
                      isSelected={true}
                    />
                  </View>
                )}
              />
            </View>}
          <FlatList
            data={this.state.data}
            keyExtractor={(_, idx) => `search-${idx}`}
            renderItem={({ item, index }) => <FoodResultRow {...this.props} data={item} index={index} />}
          />
        </View1CC>
      </SafeAreaView>
    );
  }
}


export default withLoader(withToast(SearchResult));
const styles = StyleSheet.create({


});