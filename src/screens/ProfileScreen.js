
import React, { Component } from 'react'
import {
  Image, StyleSheet, TouchableOpacity, ScrollView,
  Text, View, Switch, Alert
} from 'react-native'
//import ImagePicker from "react-native-customized-image-picker";
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import withLoader from '../redux/actionCreator/withLoader'
import withToast from '../redux/actionCreator/withToast'
import AsyncStorage from '@react-native-community/async-storage'
import { CommonActions } from '@react-navigation/native'

import { getUserDetails } from './../apiManager'

import StyleConfig from '../assets/styles/StyleConfig'
import { SafeAreaView, View1CC, ViewX, CText, TextX } from '../components/common'

import imgBack from '../assets/images/ic_back.png'
import imgDummy from '../assets/images/ic_dummy.png'
import { withTheme } from 'styled-components';
let _this
const BUTTON_TEXT = StyleConfig.convertHeightPerVal(16);

class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    _this = this
    this.state = {
      isHideProfile: false,
      isDarkTheme: false,
      isEnableNotifiation: false,
      userDetails: undefined
    }
  }

  componentDidMount() {
    this._getProfileDetailsAPICalling()
  }

  static reloadScreen = async () => {
    let token = await AsyncStorage.getItem('user_token')

    let response = await getUserDetails(token)

    if (response.code === 1) {
      _this.setState({ userDetails: response.data })
    } else {
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
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

  addContent = async  () => {
    const { navigation } = this.props;
    // await ImagePicker.clean();

    const options = {
      // title: 'Select Avatar',
      // storageOptions: {
      //   skipBackup: true,
      //   path: 'images',
      // },
      
      mediaType: 'mixed'
    };

    ImagePicker.launchImageLibrary(options, (images) => {
      console.log({images})
      navigation.navigate('AddContent', { images: [images] });
    });

    // ImagePicker.openPicker({
    //   multiple: true,
    // }).then(images => {
    //   console.log({images})
    //   navigation.navigate('AddContent', { images: images });
    // });


    // ImagePicker.openPicker({
    //   multiple: true,
    //   isHidePreview: true,
    //   isVideo: true
    // }).then(images => {
    //   navigation.navigate('AddContent', { images: images });
    // });
  }

  render() {
    return this.renderMainView()
  }

  /*
  ..######...#######..##.....##.########...#######..##....##.########.##....##.########..######.
  .##....##.##.....##.###...###.##.....##.##.....##.###...##.##.......###...##....##....##....##
  .##.......##.....##.####.####.##.....##.##.....##.####..##.##.......####..##....##....##......
  .##.......##.....##.##.###.##.########..##.....##.##.##.##.######...##.##.##....##.....######.
  .##.......##.....##.##.....##.##........##.....##.##..####.##.......##..####....##..........##
  .##....##.##.....##.##.....##.##........##.....##.##...###.##.......##...###....##....##....##
  ..######...#######..##.....##.##.........#######..##....##.########.##....##....##.....######.
  */

  renderMainView = () => {
    return (
      <SafeAreaView {...this.props}>
        {this.renderHeaderView()}
        <ScrollView style={{ flex: 1 }}>
          {this.renderUserDetailsView()}
          {this.renderMiddleContainer()}
          {this.renderSettingsOptions()}
        </ScrollView>
      </SafeAreaView>
    )
  }

  renderHeaderView = () => {
    const { userDetails } = this.state
    return (
      <ViewX style={styles.headerTopView}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image source={imgBack} style={styles.backBtn} />
        </TouchableOpacity>
        <TextX
          fontSize={StyleConfig.countPixelRatio(16)}
          style={{ marginLeft: 15 }}
        >
          {'Account'}
        </TextX>
      </ViewX>
    )
  }

  renderUserDetailsView = () => {
    const { userDetails } = this.state
    const { theme } = this.props
    return (
      <>
        <ViewX style={styles.userDetails}>
          {userDetails != undefined && userDetails.profilepic != '' ?
            <Image source={{ uri: userDetails.profilepic }} style={styles.imgProfile} /> :
            <Image source={imgDummy} style={styles.imgProfile} />
          }

          <ViewX style={styles.userDetailTextContainer}>
            <TextX fontSize={BUTTON_TEXT}>{userDetails ? userDetails.name : ''}</TextX>
            <TextX fontSize={StyleConfig.countPixelRatio(14)}>{userDetails ? userDetails.email : ''}</TextX>
          </ViewX>

          <TouchableOpacity onPress={() => this.props.navigation.push('EditAccount', { userDetails: userDetails })}>
            <Text style={{ color: StyleConfig.blue, fontSize: StyleConfig.countPixelRatio(16) }}>{'Edit Account'}</Text>
          </TouchableOpacity>

        </ViewX>
        <View style={{ height: StyleConfig.convertHeightPerVal(6), width: '100%', backgroundColor: theme.profileDeviderColor, marginTop: 8 }} />
      </>
    )
  }

  renderMiddleContainer = () => {
    const { isHideProfile, userDetails } = this.state
    const { theme } = this.props;
    return (
      <>
        <ViewX style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionbtnContainer} onPress={() => {
            this.props.navigation.navigate('UserAccount', { userDetails: userDetails })
          }}>
            <TextX fontSize={BUTTON_TEXT}>View Profile</TextX>
          </TouchableOpacity>

          <ViewX style={styles.hideProfileContainer}>
            <TextX fontSize={BUTTON_TEXT}>Hide Profile</TextX>
            <Switch value={isHideProfile} onValueChange={() => this.setState({ isHideProfile: !isHideProfile })} />
          </ViewX>

          <TouchableOpacity onPress={() => this.addContent()} style={styles.optionbtnContainer}>
            <TextX fontSize={BUTTON_TEXT}>Add Content</TextX>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionbtnContainer}>
            <TextX fontSize={BUTTON_TEXT}>Promote Content</TextX>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={true}
            style={styles.optionbtnContainer}>
            <TextX fontSize={BUTTON_TEXT}>Switch Account</TextX>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionbtnContainer} onPress={this._onLogout}>
            <TextX fontSize={BUTTON_TEXT}>Logout</TextX>
          </TouchableOpacity>

        </ViewX>
        <View style={{ height: StyleConfig.convertHeightPerVal(6), width: '100%', backgroundColor: theme.profileDeviderColor, marginTop: StyleConfig.countPixelRatio(12) }} />
      </>
    )
  }
  _onLogout = async () => {
    Alert.alert(
      "Do you want to Logout?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            await AsyncStorage.setItem("is_remember", "0");
            this.props.navigation.dispatch(CommonActions.reset({ index: 1, routes: [{ name: 'Login' }] }))
          }
        }
      ],
      { cancelable: false }
    );

  }

  themeChange = async () => {
    const { isDarkTheme } = this.state
    await AsyncStorage.setItem(isDarkTheme ? 'light' : 'dark')
    this.setState({ isDarkTheme: !isDarkTheme })

  }

  renderSettingsOptions = () => {
    const { isEnableNotifiation, isDarkTheme } = this.state

    return (
      <ViewX style={styles.optionContainer}>
        <TouchableOpacity style={styles.optionbtnContainer} onPress={() => this.props.navigation.navigate('ChangePassword')}>
          <TextX fontSize={BUTTON_TEXT}>Settings</TextX>
        </TouchableOpacity>

        {!StyleConfig.isIphone && <ViewX style={styles.hideProfileContainer}>
          <TextX fontSize={BUTTON_TEXT}>Dark Theme</TextX>
          <Switch value={isDarkTheme} onValueChange={this.themeChange} />
        </ViewX>}

        <ViewX style={styles.hideProfileContainer}>
          <TextX fontSize={BUTTON_TEXT}>Notifications</TextX>
          <Switch value={isEnableNotifiation} onValueChange={() => this.setState({ isEnableNotifiation: !isEnableNotifiation })} />
        </ViewX>

        <TouchableOpacity style={styles.optionbtnContainer}>
          <TextX fontSize={BUTTON_TEXT}>About</TextX>
        </TouchableOpacity>
      </ViewX>
    )
  }

}


export default withTheme(withLoader(withToast(ProfileScreen)))
const styles = StyleSheet.create({
  headerTopView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: StyleConfig.countPixelRatio(12),
    marginBottom: StyleConfig.countPixelRatio(12),
    height: StyleConfig.countPixelRatio(44)
  },
  backBtn: {
    width: StyleConfig.countPixelRatio(22),
    height: StyleConfig.countPixelRatio(22)
  },
  userDetails: {
    flexDirection: 'row',
    paddingVertical: StyleConfig.countPixelRatio(10),
    paddingHorizontal: StyleConfig.countPixelRatio(30),
    justifyContent: 'flex-start',
  },
  imgProfile: {
    height: StyleConfig.countPixelRatio(60),
    width: StyleConfig.countPixelRatio(60),
    borderRadius: StyleConfig.countPixelRatio(30)
  },
  userDetailTextContainer: {
    paddingHorizontal: StyleConfig.countPixelRatio(10),
    alignItems: 'flex-start',
    flex: 1
  },
  optionContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: StyleConfig.countPixelRatio(30),
    marginTop: StyleConfig.countPixelRatio(15),
  },
  optionbtnContainer: {
    paddingVertical: StyleConfig.countPixelRatio(16),
  },
  hideProfileContainer: {
    paddingVertical: StyleConfig.countPixelRatio(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }
})