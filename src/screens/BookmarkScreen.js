
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Platform

} from 'react-native';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';

import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, View1CC, Devider, CText, CTextColor, ViewX, TextX } from '../components/common';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AccountTab from './BookMarkTabs/AccountTab';
import RecipesTab from './BookMarkTabs/RecipesTab';
import { withTheme } from 'styled-components';
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import HeaderSearchBar from '../components/common/HeaderSearchBar';
import { SearchBar } from 'react-native-elements';

const TABBAR_BORDER_RADIUS = StyleConfig.convertWidthPerVal(10);
const TABBAR_MARGIN = StyleConfig.convertWidthPerVal(10);
const TABBAR_HEIGHT = StyleConfig.convertHeightPerVal(32);

const initialLayout = { width: Dimensions.get('window').width };
class BookmarkScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      search:'',
      routes: [
        { key: 'recipes', title: 'Recipes' },
        { key: 'account', title: 'Accounts' },
      ]
    }
  }

  componentDidMount() {
    // AccountTab.reloadScreen()
  }


  _renderScene = ({ route }) => {
    const { navigation } = this.props;
    switch (route.key) {
      case "recipes":
        return <RecipesTab {...{ navigation, search:this.state.search }} />;
      case 'account':
        return <AccountTab {...{ navigation, search:this.state.search }} />;
      default:
        return <View />;
    }
  };

  _renderTabLabel = ({ route, focused }) => {
    const { theme } = this.props;

    return (<TextX
      style={[{
        textAlignVertical: "center",
        fontSize: StyleConfig.fontSizeH3,
        marginTop: Platform.OS == 'android' ? -18 : -15,
        color: focused ? theme.text : theme.filterOn,
      }]}>{""}{route.title}{""}</TextX>)
  }

  _renderTabOverlayIndicator = ({ navigationState, position, width, getTabWidth }) => {
    const { routes } = this.state;
    const { theme } = this.props;

    const inputRange = routes.map((_, i) => i);

    // every index contains widths at all previous indices
    const outputRange = routes.reduce((acc, _, i) => {
      if (i === 0) return [0];
      return [...acc, acc[i - 1] + getTabWidth(i - 1)];
    }, []);

    const translateX = interpolate(position, {
      inputRange,
      outputRange,
      extrapolate: Extrapolate.CLAMP,
    });

    return (
      <Animated.View
        style={{
          backgroundColor: theme.filterOn,
          width,
          height: "100%",
          borderRadius: TABBAR_BORDER_RADIUS,
          transform: [{ translateX }]
        }}
      />
    )
  }

  _renderTabBar = (props) => {
    const { theme } = this.props;
    return (
      <TabBar
        labelStyle={{ height: TABBAR_HEIGHT }}
        renderLabel={(rest) => this._renderTabLabel(rest)}
        renderIndicator={(rest) => this._renderTabOverlayIndicator(rest)}
        indicatorStyle={{ backgroundColor: theme.filterOn }}
        style={{
          margin: TABBAR_MARGIN,
          backgroundColor: theme.background,
          borderRadius: TABBAR_BORDER_RADIUS,
          borderWidth: 1,
          height: TABBAR_HEIGHT,
          borderColor: theme.filterOn,
        }}
        {...props}
      />
    );
  }

  _renderLazyPlaceholder = ({ route }) => {
    <ViewX>
      <Text>Loading {route.title}…</Text>
    </ViewX>
  }

  render() {

    const { index, routes, search } = this.state;
    const { theme } = this.props;

    return (
      <SafeAreaView {...this.props}>
        <SearchBar
          ref={input => {
            this.searchTextInput = input;
          }}
          containerStyle={{
            alignSelf: "center",
            backgroundColor: "transparent",
            borderBottomWidth: 0,
            borderTopWidth: 0,
          }}
          inputStyle={{ fontSize: StyleConfig.fontSizeH3 }}
          inputContainerStyle={{
            borderRadius: 10,
            width: StyleConfig.width * 0.6,
            height: StyleConfig.convertHeightPerVal(38),
            backgroundColor: theme.backgroundAlt
          }}
          textContentType={"name"}
          placeholder="Search"
          returnKeyType="search"
          onChangeText={(search)=> this.setState({search})}
          //onSubmitEditing={this.moveToSearchResults}
          value={search}
        />
        <TabView
          style={{ flex: 1 }}
          // position={position}      //Animated value: Accessible but no usecase of now
          lazy
          navigationState={{ index, routes }}
          renderScene={(rest) => this._renderScene(rest)}
          renderTabBar={(rest) => this._renderTabBar(rest)}
          renderLazyPlaceholder={(rest) => this._renderLazyPlaceholder(rest)}
          onIndexChange={(index) => {
            if (index == 0) {
              RecipesTab.reloadScreen()
            } else {
              AccountTab.reloadScreen()
            }
            this.setState({ index })
          }}
          initialLayout={initialLayout}
        />
      </SafeAreaView>
    );
  }
}


export default withTheme(withLoader(withToast(BookmarkScreen)));
const styles = StyleSheet.create({


});