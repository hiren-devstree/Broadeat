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
import AppImages from '../assets/images';
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
              borderColor: '#777',
              height: StyleConfig.convertHeightPerVal(38),
              width: StyleConfig.width * 0.4,
              // backgroundColor: 'black'
            }} >
            <View style={{position: "absolute", alignSelf: "center", left: 10 }}>
            <Image 
              source={AppImages.ic_search}
              style={{ 
                height: StyleConfig.convertHeightPerVal(20),
              width: StyleConfig.convertHeightPerVal(20), tintColor:'#777' }}
            />
            </View>
            <Text style={{}} > {"Search"} </Text>
          </View>
        </TouchableWithoutFeedback>
      )
    })
  }
  static reloadScreen = async () => {
    const { loader } = this.props
    loader(true)
    let token = await AsyncStorage.getItem('user_token')
    let response = await getRecipeData(token)
    console.log("Loader",false)
    loader(false)
    console.log("getRecipeData",response)
    if (response.code === 1) {
      this.setState({ data: response.data })
    } else {
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }
  componentDidMount= async () => {
    const { loader } = this.props
    loader(true)
    let token = await AsyncStorage.getItem('user_token')
    let response = await getRecipeData(token)
    console.log("Loader",false)
    loader(false)
    console.log("getRecipeData",response)
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
    const width = (StyleConfig.convertWidthPer(100) - 8)/3 ;
    return (
      <FlatList
        data={data}
        numColumns={3}
        bounces={false}
        keyExtractor={(_, idx) => `foodGlr-${idx}`}
        ItemSeparatorComponent={
          () => <View style={{ height: 3, }}/>
        }
        renderItem={({ item, index }) => (
            <TouchableOpacity style={{marginLeft: index > 0 ? 3 : 0}} onPress={() => this.props.navigation.navigate('PhotoRecipeDetails', { data: item.id })}>
              <Image
                source={{ uri: item.image }}
                style={{ height: width, width: width }}
              /></TouchableOpacity>
          )
        }
      />
    )
  }
}


export default withUser(withLoader(withToast(HomeScreen)));
const styles = StyleSheet.create({


});