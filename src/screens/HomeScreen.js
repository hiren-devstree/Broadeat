import React, { Component } from 'react';
import {
  View, Alert, TouchableWithoutFeedback,
  Image, StyleSheet, TouchableOpacity, Text
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import FastImage from 'react-native-fast-image'
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
import Video from 'react-native-video';
class HomeScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
    
    
    _getProfileDetailsAPICalling = async () => {
      const { loader } = this.props
      let token = await AsyncStorage.getItem('user_token')
      loader(true)
      let response = await getUserDetails(token)
      loader(false)
      console.log("getUserDetails", response)
      if (response.code === 1) {
        this.setState({ userDetails: response.data })
      } else {
        setTimeout(() => {
          Alert.alert(response.message)
        }, 500)
      }
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
            <View style={{ position: "absolute", alignSelf: "center", left: 10 }}>
              <Image
                source={AppImages.ic_search}
                style={{
                  height: StyleConfig.convertHeightPerVal(20),
                  width: StyleConfig.convertHeightPerVal(20), tintColor: '#777'
                }}
              />
            </View>
            <Text style={{}} > {"Search"} </Text>
          </View>
        </TouchableWithoutFeedback>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => props.navigation.navigate('ProfileMenu')}>
          <Feather
            style={{ paddingHorizontal: 20 }}
            name={"menu"}
            color={'#777'}
            size={StyleConfig.iconSize}
          />
        </TouchableOpacity>
      ),
    })
  }
  static reloadScreen = async () => {
    console.log("HOME reload screen")
    const { loader } = this.props
    loader(true)
    let token = await AsyncStorage.getItem('user_token')
    let response = await getRecipeData(token)
    console.log("Loader", false)
    this.props.loader(false)
    console.log("getRecipeData", response)
    if (response.code === 1) {
      this.setState({ data: response.data })
    } else {
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }

  refreshScreen = async () =>{
    console.log("HOME reload screen")
    const { loader } = this.props
    loader(true)
    let token = await AsyncStorage.getItem('user_token')
    let response = await getRecipeData(token)
    console.log("Loader", false)
    this.props.loader(false)
    console.log("getRecipeData", response)
    if (response.code === 1) {
      this.setState({ data: response.data })
    } else {
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }
  componentDidMount = async () => {
    const { loader } = this.props
    console.log("componentDidMount before loader ON")
    loader(true)
    let token = await AsyncStorage.getItem('user_token')
    let response = await getRecipeData(token)
    console.log("Loader", false)
    setTimeout(() => {
      loader(false)
    }, 500)
    console.log("getRecipeData", response)
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
    const width = (StyleConfig.convertWidthPer(100) - 8) / 3;
    return (
      <FlatList
        data={data}
        numColumns={3}
        bounces={false}
        keyExtractor={(_, idx) => `foodGlr-${idx}`}
        ItemSeparatorComponent={
          () => <View style={{ height: 3 }} />
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity style={{ marginLeft: index % 3 == 0 ? 0 : 3 }} onPress={() => this.props.navigation.navigate('PhotoRecipeDetails', { data: item.id, reloadScreen: this.refreshScreen})}>
            { item.thumbnail_image.length > 0 ? <FastImage
              style={{ height: width, width: width }}
              source={{
                uri: item.thumbnail_image,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            /> :
            <View>
              <Video 
                  ref={(ref) => {
                    this[`player${index}`] = ref
                  }}
                  onLoad={()=>{this[`player${index}`].seek(0)}}
                  resizeMode={'cover'}
                  repeat={false}
                  paused={true}
                  playInBackground={false}
                  style={{ height: width, width: width }}
                  source={{uri: item.image}} 
                />
              <View style={{ height:width,position:'absolute',flex:1, alignSelf:'center', justifyContent:'center',zIndex:99}}>
                  {/* <View style={{height:StyleConfig.countPixelRatio(50), width: StyleConfig.countPixelRatio(50),
                    alignItems:'center', 
                    justifyContent:'center',
                    paddingLeft:2,
                    borderRadius:StyleConfig.countPixelRatio(30), backgroundColor:'#00000066'}}> */}
                    <FontAwesome5 name='play' color={'#ffffffda'} size={StyleConfig.countPixelRatio(32)} />
                  {/* </View> */}
                </View>
              </View>
            }
          </TouchableOpacity>
        )
        }
      />
    )
  }
}


export default withUser(withLoader(withToast(HomeScreen)));
const styles = StyleSheet.create({


});