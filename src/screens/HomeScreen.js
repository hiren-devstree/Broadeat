import React, { Component } from 'react';
import {
  View, Alert, TouchableWithoutFeedback,
  Image, StyleSheet, TouchableOpacity, Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import { getRecipeData } from './../apiManager'
import { IMAGE_PATH } from '../helper/Constants'
import AsyncStorage from '@react-native-community/async-storage'
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, View1CC, Devider, CText, CTextColor, TextX } from '../components/common';
import { FlatList } from 'react-native-gesture-handler';
import withUser from '../redux/actionCreator/withUser';
import HeaderSearchBar from '../components/common/HeaderSearchBar';

class HomeScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }

    props.navigation.setOptions({
      headerTitle: ({ tintColor }) => (
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('SearchScreenModal')}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'white',
              height: StyleConfig.convertHeightPerVal(38),
              width: StyleConfig.width * 0.4,
              // backgroundColor: 'black'
            }}
          >
            <Icon
              style={{ position: "absolute", alignSelf: "center", left: 10 }}
              name={"search"}
            />
            <Text style={{}} > {"Search"} </Text>
          </View>
        </TouchableWithoutFeedback>
      )
    })
  }

  async componentDidMount() {
    const { loader } = this.props
    let token = await AsyncStorage.getItem('user_token')

    loader(true)
    let response = await getRecipeData(token)
    loader(false)

    console.log(response)
    if (response.code === 1) {
      this.setState({ data: response.data })
    } else {
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }


  render() {
    return this.renderMainView()
  }

  renderMainView = () => {
    return (
      <SafeAreaView {...this.props}>
        <View1CC {...this.props} >
          {this.renderFlatList()}
        </View1CC>
      </SafeAreaView>
    )
  }

  renderFlatList = () => {
    const { data } = this.state
    return (
      <FlatList
        data={data}
        numColumns={3}
        keyExtractor={(_, idx) => `foodGlr-${idx}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={{ margin: 3, }} onPress={() => this.props.navigation.navigate('PhotoRecipeDetails', { data: item.id })}>
              <Image
                source={{ uri: item.image }}
                style={{ height: StyleConfig.convertWidthPer(29), width: StyleConfig.convertWidthPer(30) }}
              /></TouchableOpacity>
          )
        }}
      />
    )
  }
}


export default withUser(withLoader(withToast(HomeScreen)));
const styles = StyleSheet.create({


});