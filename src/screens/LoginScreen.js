import React, { Component } from 'react';
import {
  View, Text, Modal, Switch,
  Image, StyleSheet, ScrollView, Alert, TouchableOpacity
} from 'react-native';
import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { TextInputWithIcon } from '../components/common/TextInputs';
import { Button } from '../components/common/Buttons';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import withUser from '../redux/actionCreator/withUser';
import styled from 'styled-components/native';
import { SafeAreaViewC, CTextColor, Devider, CText, CTextInputWithIcon, TextX } from '../components/common';
import BaseComponent from '../containers/BaseComponent';
import ForgotPasswordModal from '../components/hybridComponents/ForgotPasswordModal';
import { postLogin, updateProfile } from '../apiManager'
import AsyncStorage from '@react-native-community/async-storage'
//api

import { BASE_URL, EMAIL_REGEX, UPDATE_USER_DETAILS_URL } from '../helper/Constants'
import { CommonActions } from '@react-navigation/native';

const SUPPORTED_ORIENTATIONS = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];


class LoginScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      showForgotPasswordModal: false,
      email: '',
      password: '',
      isOpenVeggieModal: false,
      isRemember: false,
      showPassText: false
    }
  }


  onPressSignIn = () => {
    setTimeout(() => {
      if (this._validate()) {
        this._authorizeUser()
      }
    }, 1000)
  }

  _navigateToDashboard = async (meal) => {
    const { navigation, loader } = this.props;
    const { name,
      website,
      mobile_number,
      description,
      location, email } = this.state.responseData.data;

    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${this.state.responseData.token}`)

    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("name", name);
    formdata.append("location", location);
    formdata.append("website", website);
    formdata.append("description", description);
    formdata.append("mobile_number", mobile_number);
    formdata.append("meal_preference", meal);

    console.log(formdata)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    fetch(UPDATE_USER_DETAILS_URL, requestOptions)
      .then(response => response.text())
      .then(result => {
        let response = JSON.parse(result)
        if (response.code === 1) {
          this.setState({ isOpenVeggieModal: false }, () =>
            navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Dashboard' }] }))
          )
        } else {
          Alert.alert("update Meal Preferance failed..");
        }
      });




    // loader(true);
    // let res = await updateProfile({name,
    //   website,
    //   mobile_number,
    //   description,
    //   location,
    //   meal_preference: meal});
    //   console.log("update profile res=>:", res)
    // loader(false);
    // this.setState({ isOpenVeggieModal: false }, () =>
    //   navigation.dispatch(CommonActions.reset({ index: 1, routes: [{ name: 'Dashboard' }] }))
    // )
  }

  _authorizeUser = async () => {
    const { loader, toast, loginSuccess } = this.props
    loader(true)
    const { email, password, isRemember } = this.state
    let response = await postLogin(email, password)
    loader(false)
    if (response.code === 1) {
      AsyncStorage.setItem('user_token', response.token)
      AsyncStorage.setItem('user_id', `${response.data.id}`)
      AsyncStorage.setItem('is_remember', isRemember ? '1' : '0')
      loginSuccess(response);
      this.setState({ isOpenVeggieModal: true, responseData: response })
    } else {
      setTimeout(() => {
        Alert.alert(response.message)
      }, 500)
    }
  }

  _validate = () => {
    const { email, password } = this.state

    if (email === '') {
      Alert.alert('Please enter your email-address')
      return false
    } else if (!EMAIL_REGEX.test(email)) {
      Alert.alert('Please enter Valid email-address')
      return false
    } else if (password === '') {
      Alert.alert('Please enter your password')
      return false
    } else if (password.length < 8) {
      Alert.alert('Password should contain minimum 8 character')
      return false
    } else {
      return true
    }
  }

  renderVeggieModal = () => {
    return (
      <Modal
        supportedOrientations={SUPPORTED_ORIENTATIONS}
        animationType={"fade"}
        transparent={true}
        visible={this.state.isOpenVeggieModal}
        onRequestClose={() => { console.log("Modal has been closed.") }}>
        <View style={styles.modalTransparentView}>
          <View style={styles.modalMainView}>
            <Text style={styles.modalHeaderText} >Meal Preferences</Text>

            <TouchableOpacity style={[styles.popUpBtn, { marginTop: StyleConfig.countPixelRatio(40) }]} onPress={() => this._navigateToDashboard("all_meals")}>
              <Text style={styles.popUpBtnText} >All Meals</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.popUpBtn} onPress={() => this._navigateToDashboard("vegetarian")}>
              <Text style={styles.popUpBtnText} >Vegetarian</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.popUpBtn, { marginBottom: StyleConfig.countPixelRatio(40) }]} onPress={() => this._navigateToDashboard("vegan")}>
              <Text style={styles.popUpBtnText} >Vegan</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    )
  }

  render() {
    const { isRemember, showPassText } = this.state
    return (
      <SafeAreaViewC>
        <View style={styles.content}>
          <View style={styles.logoWrapper}>
            <Image
              resizeMode={'contain'}
              style={styles.logoStyle}
              source={AppImages.ic_broad_eat}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ marginLeft: StyleConfig.convertHeightPerVal(12) }}>
                <CTextColor align={'left'} color={"#8A8A8F"} fontSize={StyleConfig.countPixelRatio(20)} >Login</CTextColor>
              </View>
              <CTextInputWithIcon
                icon={AppImages.ic_account_circle}
                placeholder={'Email'}
                color={'#111'}
                placeholderTextColor={'#444'}
                background={'#fff'}
                onChangeText={(val) => this.setState({ email: val })}
                autoCapitalize="none"
                keyboardType={"email-address"}
                value={this.state.email}
              />

              <CTextInputWithIcon
                icon={AppImages.ic_lock}
                rightIcon={showPassText ? AppImages.ic_eye_hide : AppImages.ic_eye_show}
                onRightPress={() => { this.setState({ showPassText: !showPassText }) }}
                placeholder={'Password'}
                secureTextEntry={!showPassText}
                color={'#111'}
                placeholderTextColor={'#444'}
                background={'#fff'}
                onChangeText={(val) => this.setState({ password: val })}
                value={this.state.password}
              />
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                <Switch
                  // trackColor={{ false: "#767577", true: "#81b0ff" }}
                  // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  // ios_backgroundColor="#3e3e3e"
                  onValueChange={() => this.setState({
                    isRemember: !isRemember
                  })}
                  value={isRemember} />
                <View style={{ width: 16 }} />
                <CTextColor align={'right'} color={"#999"} fontSize={StyleConfig.countPixelRatio(14)} >{'Remember Me'}</CTextColor>
              </View>


              <Button
                onPress={this.onPressSignIn}
                containerStyle={styles.buttonContainer}
                textStyle={styles.buttonText}
                text={'Sign In'}
              />

              <TouchableOpacity style={{ marginVertical: StyleConfig.convertHeightPerVal(15) }} onPress={() => this.props.navigation.navigate('Register')}>
                <CTextColor
                  color={"#2294E3"}
                  fontSize={StyleConfig.countPixelRatio(16)}
                >{'Register new Account'}</CTextColor>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginVertical: StyleConfig.convertHeightPerVal(15) }} onPress={() => this.setState({ showForgotPasswordModal: true })}>
                <CTextColor
                  color={"#2294E3"}
                  fontSize={StyleConfig.countPixelRatio(16)}
                >{'Forgot Password'}</CTextColor>
              </TouchableOpacity>
            </ScrollView>
          </View>

        </View>
        <ForgotPasswordModal
          {...this.props}
          onCalcelPress={() => this.setState({ showForgotPasswordModal: false })}
          onSendPress={() => this.setState({ showForgotPasswordModal: false })}
          visible={this.state.showForgotPasswordModal} />

        {this.renderVeggieModal()}
      </SafeAreaViewC>
    );
  }
}


export default withUser(withToast(withLoader(LoginScreen)));


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: StyleConfig.convertHeightPerVal(130)
  },
  logoStyle: {
    width: StyleConfig.convertWidthPerVal(166),
    height: StyleConfig.convertHeightPerVal(40)
  },
  content: {
    flex: 1,
    paddingHorizontal: StyleConfig.convertWidthPerVal(46),
  },
  headerText: {

    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.33,
    textAlign: 'center',
    marginBottom: StyleConfig.countPixelRatio(16)
  },
  buttonContainer: {
    backgroundColor: "#2294E3",
    borderColor: "#2294E3",
    marginHorizontal: StyleConfig.convertWidthPerVal(70)
  },
  buttonText: { color: 'white' },
  detailsText: {
    fontSize: 14,
    marginTop: StyleConfig.convertHeightPerVal(20),
    color: "#95989a",
    letterSpacing: 0.5,
    marginHorizontal: StyleConfig.convertWidthPerVal(36),
    textAlign: 'center'
  },
  bottomContainer: {
    height: StyleConfig.convertHeightPerVal(80),
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTransparentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000088',
  },
  modalMainView: {
    backgroundColor: StyleConfig.cLightCyan,
    borderRadius: StyleConfig.countPixelRatio(15),
    width: '90%',
    paddingVertical: StyleConfig.countPixelRatio(20),
  },
  modalHeaderText: {
    fontSize: StyleConfig.countPixelRatio(20),
    color: StyleConfig.grey,
    alignSelf: 'center'
  },
  popUpBtn: {
    width: '70%',
    alignSelf: 'center',
    borderRadius: StyleConfig.countPixelRatio(10),
    borderColor: StyleConfig.grey,
    borderWidth: 1.0,
    paddingVertical: StyleConfig.countPixelRatio(5),
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: StyleConfig.countPixelRatio(15)
  },
  popUpBtnText: {
    fontSize: StyleConfig.countPixelRatio(20),
    color: StyleConfig.grey
  }


});