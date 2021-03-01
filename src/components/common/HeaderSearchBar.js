import React from 'react'
import { SearchBar, Button } from 'react-native-elements';
import { withTheme } from 'styled-components';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, TouchableOpacity } from 'react-native';

import StyleConfig from '../../assets/styles/StyleConfig';
import BackButton from './BackButton';

class SaerchHeader extends React.Component {
  constructor(props) {
    super(props)
    console.log('CONSTRUCTOR-', props.text)
    this.state = {
      search: props.text,
    }


  }


  updateSearch = search => {
    this.setState({ search });
    if (this.props.onChangeSearchText) {
      this.props.onChangeSearchText(search)
    }
  };

  componentDidMount() {
    if (this.searchTextInput) {
      this.searchTextInput.focus()
    }
    // console.log(this.props.text)
    // if (this.props.text) {
    //   this.setState({ search: this.props.text })
    // }
  }


  moveToSearchResults = () => {
    const { search } = this.state;
    const { route } = this.props;
    if (this.props.onSubmitPressed) {
      this.props.onSubmitPressed()
    } else {
      if (route && route.name !== "SearchResult") {
        this.props.navigation.push('SearchResult', { search });
      } else {
        //Search you query via redux
      }
    }
  };

  render() {
    const { search } = this.state;
    const { theme, route, showFilterMenu, showFilter, showMenu, navigation, back, reload } = this.props;
    return (
      <View style={{
        alignItems: "flex-end",
        flexDirection: "row",
        height: StyleConfig.headerHeight,
        backgroundColor: theme.background
      }} >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
          {
            back && <BackButton {...{ navigation, reload }} />
          }
          <SearchBar
            ref={input => {
              this.searchTextInput = input;
            }}
            containerStyle={{
              flex: 1,
              backgroundColor: "transparent",
              borderBottomWidth: 0,
              borderTopWidth: 0,
            }}
            inputStyle={{ fontSize: StyleConfig.fontSizeH3 }}
            inputContainerStyle={{
              borderRadius: 10,
              height: StyleConfig.convertHeightPerVal(38),
              backgroundColor: theme.searchTextInputBack
            }}
            textContentType={"name"}
            placeholder="Search"
            placeholderTextColor={theme.textPlaceholder}
            returnKeyType="search"
            onChangeText={this.updateSearch}
            onSubmitEditing={this.moveToSearchResults}
            value={search}
          />
          {
            showFilterMenu
              ?
              <View style={{ flexDirection: "row" }} >
                {showFilter && <Ionicons
                  onPress={this.props.onFilterPress}
                  style={{ paddingRight: StyleConfig.convertHeightPerVal(10) }}
                  name={"ios-funnel"}
                  color={theme.text}
                  size={StyleConfig.iconSize}
                />}
                {showMenu && <Feather
                  onPress={() => navigation.navigate('ProfileMenu')}
                  style={{ paddingRight: StyleConfig.convertHeightPerVal(10) }}
                  name={"menu"}
                  color={theme.text}
                  size={StyleConfig.iconSize}
                />}
              </View>
              : <Button
                titleStyle={{ color: theme.text }}
                buttonStyle={{ backgroundColor: theme.background, paddingHorizontal: 10 }}
                title={"Cancel"}
                onPress={() => { this.props.navigation.goBack() }}
              />
          }
        </View>
      </View>
    );
  }
}

export default withTheme(SaerchHeader)