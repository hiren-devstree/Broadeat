import React, { Component } from 'react';
import {
  View, Text, TextInput,
  Image, StyleSheet, ScrollView, Alert, TouchableOpacity
} from 'react-native';
import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import withLoader from '../redux/actionCreator/withLoader';
import AsyncStorage from '@react-native-community/async-storage'

import { withTheme } from 'styled-components'
import { SafeAreaView, TextX, ViewX } from '../components/common';

import imgShowPsw from '../assets/images/ic_show_psw.png'
import imghidePsw from '../assets/images/ic_hide_psw.png'

import { changePassword } from './../apiManager'


export class ChangePassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      isHideOldPsw: true,
      isHideNewPsw: true,
      isHideConfirmPsw: true,
    }
  }

  render() {
    return this.renderMainView()
  }

  _toggleOldPassword = () => {
    this.setState({ isHideOldPsw: !this.state.isHideOldPsw })
  }

  _toggleNewPassword = () => {
    this.setState({ isHideNewPsw: !this.state.isHideNewPsw })
  }

  _toggleConfirmPassword = () => {
    this.setState({ isHideConfirmPsw: !this.state.isHideConfirmPsw })
  }

  _onPressConfirmChangedPassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = this.state
    const { loader } = this.props

    let token = await AsyncStorage.getItem('user_token')

    if (oldPassword == '') {
      Alert.alert('Please enter your old password')
    } else if (newPassword == '') {
      Alert.alert('Please enter your new password')
    } else if (newPassword.length < 8) {
      Alert.alert('Password should contain minimum 8 character')
    } else if (confirmPassword == '') {
      Alert.alert('Please enter your confirm password')
    } else if (newPassword != confirmPassword) {
      Alert.alert('Confirm password is matched')
    } else {
      let data = {
        "old_password": oldPassword,
        "password": newPassword
      }

      loader(true)
      let response = await changePassword(data, token)
      loader(false)

      if (response.code === 1) {
        setTimeout(() => {
          Alert.alert(
            'Alert',
            `${response.message}`,
            [{ text: 'Okay', onPress: () => { this.props.navigation.goBack() } }],
            { cancelable: false }
          )
        }, 500)
      } else {
        setTimeout(() => {
          Alert.alert(response.message)
        }, 500)
      }
    }

  }

  renderMainView = () => {
    return (
      <SafeAreaView {...this.props}>
        <ScrollView style={{ paddingHorizontal: StyleConfig.convertWidthPerVal(30), }}>
          {this.renderHeaderView()}
          {this.renderOldPasswordField()}
          {this.renderNewPasswordField()}
          {this.renderConfirmPasswordField()}
          {this.renderConfirmChangeButton()}
        </ScrollView>
      </SafeAreaView>
    )
  }

  renderHeaderView = () => {
    return (
      <>
        <Image
          resizeMode={'contain'}
          style={styles.logoStyle}
          source={AppImages.ic_broad_eat}
        />
        <TextX fontSize={24} style={{ alignSelf: 'flex-start', marginTop: 20 }}>Create new password</TextX>
      </>
    )
  }

  renderOldPasswordField = () => {
    const { theme } = this.props
    const { isHideOldPsw } = this.state
    let img = isHideOldPsw ? imgShowPsw : imghidePsw
    return (
      <ViewX style={[styles.inputFieldContainer, { marginTop: 40 }]}>
        <TextInput
          placeholder={'Enter your old password'}
          placeholderTextColor={theme.text}
          onChangeText={(val) => this.setState({ oldPassword: val })}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={isHideOldPsw}
          style={[styles.inputField, { color: theme.text }]}
        />
        <TouchableOpacity onPress={() => this._toggleOldPassword()}>
          <Image source={img} style={styles.heideShowimg} resizeMode='contain' />
        </TouchableOpacity>
      </ViewX>
    )
  }

  renderNewPasswordField = () => {
    const { theme } = this.props
    const { isHideNewPsw } = this.state
    let img = isHideNewPsw ? imgShowPsw : imghidePsw
    return (
      <ViewX style={styles.inputFieldContainer}>
        <TextInput
          placeholder={'Enter your new password'}
          placeholderTextColor={theme.text}
          onChangeText={(val) => this.setState({ newPassword: val })}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={isHideNewPsw}
          style={[styles.inputField, { color: theme.text }]}
        />
        <TouchableOpacity onPress={() => this._toggleNewPassword()}>
          <Image source={img} style={styles.heideShowimg} resizeMode='contain' />
        </TouchableOpacity>
      </ViewX>
    )
  }

  renderConfirmPasswordField = () => {
    const { theme } = this.props
    const { isHideConfirmPsw } = this.state
    let img = isHideConfirmPsw ? imgShowPsw : imghidePsw
    return (
      <ViewX style={styles.inputFieldContainer}>
        <TextInput
          placeholder={'Enter your confirm password'}
          placeholderTextColor={theme.text}
          onChangeText={(val) => this.setState({ confirmPassword: val })}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={isHideConfirmPsw}
          style={[styles.inputField, { color: theme.text }]}
        />
        <TouchableOpacity onPress={() => this._toggleConfirmPassword()}>
          <Image source={img} style={styles.heideShowimg} resizeMode='contain' />
        </TouchableOpacity>
      </ViewX>
    )
  }

  renderConfirmChangeButton = () => {
    return (
      <TouchableOpacity style={styles.confirmChange} activeOpacity={0.5} onPress={() => this._onPressConfirmChangedPassword()}>
        <TextX fontSize={20}>Confirm changed</TextX>
      </TouchableOpacity>
    )
  }
}

export default withTheme(withLoader(ChangePassword))


const styles = StyleSheet.create({
  logoStyle: {
    width: StyleConfig.convertWidthPerVal(166),
    height: StyleConfig.convertHeightPerVal(40),
    alignSelf: 'center',
    marginTop: StyleConfig.countPixelRatio(50)
  },
  inputFieldContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    borderRadius: 5,
    borderColor: StyleConfig.grey,
    borderWidth: 1,
    paddingRight: 8
  },
  inputField: {
    height: StyleConfig.convertWidthPerVal(40),
    paddingHorizontal: 6,
    flex: 1
  },
  heideShowimg: {
    height: StyleConfig.convertWidthPerVal(20),
    width: StyleConfig.convertWidthPerVal(25),
    tintColor: '#95989A'
  },
  confirmChange: {
    backgroundColor: '#2294E3',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 8,
    paddingHorizontal: StyleConfig.convertWidthPerVal(40),
    paddingVertical: StyleConfig.convertWidthPerVal(4)
  }
})