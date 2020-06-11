
import React, { Component } from 'react'
import {
  Image, StyleSheet, TouchableOpacity, ScrollView,
  Text, View, Switch, AsyncStorage
} from 'react-native'
import ImagePicker from "react-native-customized-image-picker";
import withLoader from '../redux/actionCreator/withLoader'
import withToast from '../redux/actionCreator/withToast'

import StyleConfig from '../assets/styles/StyleConfig'
import { SafeAreaView, View1CC, ViewX, CText, TextX } from '../components/common'

import imgBack from '../assets/images/ic_back.png'
import imgDummy from '../assets/images/ic_dummy.png'

class ProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isHideProfile: false,
      isDarkTheme: false,
      isEnableNotifiation: false,
    }
  }

  addContent = () => {
    const { navigation } = this.props;
    ImagePicker.openPicker({
      multiple: true,
      isHidePreview: true,
    }).then(images => {
      navigation.navigate('AddContent', { images: images });
    });
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
    return (
      <>
        <ViewX style={styles.userDetails}>
          <Image source={imgDummy} style={styles.imgProfile} />

          <ViewX style={styles.userDetailTextContainer}>
            <TextX fontSize={StyleConfig.countPixelRatio(16)}>{'User Name'}</TextX>
            <TextX fontSize={StyleConfig.countPixelRatio(16)}>{'email@mail.com'}</TextX>
          </ViewX>

          <TouchableOpacity onPress={() => this.props.navigation.push('EditAccount')}>
            <Text style={{ color: StyleConfig.blue, fontSize: StyleConfig.countPixelRatio(16) }}>{'Edit Account'}</Text>
          </TouchableOpacity>

        </ViewX>
        <View style={{ height: 6, width: '100%', backgroundColor: StyleConfig.grey, }} />
      </>
    )
  }

  renderMiddleContainer = () => {
    const { isHideProfile } = this.state
    return (
      <>
        <ViewX style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionbtnContainer}>
            <TextX fontSize={StyleConfig.countPixelRatio(16)}>View Profile</TextX>
          </TouchableOpacity>

          <ViewX style={styles.hideProfileContainer}>
            <TextX fontSize={StyleConfig.countPixelRatio(16)}>Hide Profile</TextX>
            <Switch value={isHideProfile} onValueChange={() => this.setState({ isHideProfile: !isHideProfile })} />
          </ViewX>

          <TouchableOpacity onPress={() => this.addContent()} style={styles.optionbtnContainer}>
            <TextX fontSize={StyleConfig.countPixelRatio(16)}>Add Content</TextX>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionbtnContainer}>
            <TextX fontSize={StyleConfig.countPixelRatio(16)}>Promote Content</TextX>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionbtnContainer}>
            <TextX fontSize={StyleConfig.countPixelRatio(16)}>Switch Account</TextX>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionbtnContainer}>
            <TextX fontSize={StyleConfig.countPixelRatio(16)}>Logout</TextX>
          </TouchableOpacity>

        </ViewX>
        <View style={{ height: 6, width: '100%', backgroundColor: StyleConfig.grey, marginTop: StyleConfig.countPixelRatio(12) }} />
      </>
    )
  }

  themeChange= async () => {
    const {isDarkTheme} = this.state
    await AsyncStorage.setItem(isDarkTheme? 'light':'dark')
    this.setState({ isDarkTheme: !isDarkTheme })

  }

  renderSettingsOptions = () => {
    const { isEnableNotifiation, isDarkTheme } = this.state
    return (
      <ViewX style={styles.optionContainer}>
        <TouchableOpacity style={styles.optionbtnContainer}>
          <TextX fontSize={StyleConfig.countPixelRatio(16)}>Settings</TextX>
        </TouchableOpacity>

        <ViewX style={styles.hideProfileContainer}>
          <TextX fontSize={StyleConfig.countPixelRatio(16)}>Dark Theme</TextX>
          <Switch value={isDarkTheme} onValueChange={ this.themeChange } />
        </ViewX>

        <ViewX style={styles.hideProfileContainer}>
          <TextX fontSize={StyleConfig.countPixelRatio(16)}>Notifications</TextX>
          <Switch value={isEnableNotifiation} onValueChange={() => this.setState({ isEnableNotifiation: !isEnableNotifiation })} />
        </ViewX>

        <TouchableOpacity style={styles.optionbtnContainer}>
          <TextX fontSize={StyleConfig.countPixelRatio(16)}>About</TextX>
        </TouchableOpacity>
      </ViewX>
    )
  }

}


export default withLoader(withToast(ProfileScreen))
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
    height: StyleConfig.countPixelRatio(56),
    width: StyleConfig.countPixelRatio(56),
    borderRadius: StyleConfig.countPixelRatio(28)
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
    paddingVertical: StyleConfig.countPixelRatio(10),
  },
  hideProfileContainer: {
    paddingVertical: StyleConfig.countPixelRatio(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }
})