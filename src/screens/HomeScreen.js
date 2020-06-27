import React, { Component } from 'react';
import {
  View, Alert,
  Image, StyleSheet, TouchableOpacity
} from 'react-native';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import { getRecipeData } from './../apiManager'
import { IMAGE_PATH } from '../helper/Constants'
import AsyncStorage from '@react-native-community/async-storage'
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, View1CC, Devider, CText, CTextColor, TextX } from '../components/common';
import { FlatList } from 'react-native-gesture-handler';
import withUser from '../redux/actionCreator/withUser';
class HomeScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
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
            <TouchableOpacity style={{ margin: 3, }} onPress={() => this.props.navigation.navigate('PhotoRecipeDetails', { data: item.user_id })}>
              <Image
                source={{ uri: IMAGE_PATH + item.image }}
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