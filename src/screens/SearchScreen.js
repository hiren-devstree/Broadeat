
import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';

import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, View1CC, Devider, CText, CTextColor, TextX, ViewX } from '../components/common';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { withTheme } from 'styled-components';
class SearchScreen extends Component {
  constructor(props) {
    super(props);

  }
  render() {

    const { theme, navigation } = this.props;

    return (
      <SafeAreaView  {...this.props}>
        <ViewX style={{
          flex: 1,
          paddingHorizontal: StyleConfig.convertWidthPerVal(20),
        }} {...this.props} >
          <ViewX
            style={{
              alignSelf: "flex-start"
            }}>
            <TextX
              style={{
                padding: StyleConfig.convertHeightPerVal(10),
                fontSize: StyleConfig.fontSizeH3,
                fontWeight: "bold",
                textAlign: "left"
              }} >{"Recent"}</TextX>
          </ViewX>
          <ScrollView
            style={{
              width: "100%"
            }}
          >
            {
              [...Array(10)].map((item, idx) => {
                return (
                  <ViewX
                    style={{
                      paddingVertical: StyleConfig.convertWidthPerVal(10),
                      flexDirection: "row",
                      justifyContent: 'space-between'
                    }} >
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("SearchResult")} >
                      <ViewX style={{ flexDirection: "row", borderColor: "white" }} >
                        <TextX style={{
                          borderColor: theme.backgroundAlt,
                          padding: StyleConfig.convertWidthPerVal(5),
                          fontSize: StyleConfig.fontSizeH1
                        }}  > {"#"} </TextX>
                        <ViewX
                          style={{
                            alignItems: 'flex-start',
                            paddingHorizontal: StyleConfig.convertWidthPerVal(20)
                          }} >
                          <TextX> {"#sundaeGood"} </TextX>
                          <TextX style={{ color: theme.backgroundAlt }} > {"8m posts"} </TextX>
                        </ViewX>
                      </ViewX>
                    </TouchableWithoutFeedback>
                    <Ionicons
                      name={"ios-close"}
                      color={theme.backgroundAlt}
                      size={StyleConfig.iconSize}
                    />
                  </ViewX>
                )
              })
            }
          </ScrollView>
        </ViewX>
      </SafeAreaView >
    );
  }
}


export default withTheme(withLoader(withToast(SearchScreen)));
const styles = StyleSheet.create({


});