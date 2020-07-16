
import React, { Component } from 'react'
import {
  Image, StyleSheet, TouchableOpacity, ScrollView,
  Text, View, Alert, Platform
} from 'react-native'
import withLoader from '../redux/actionCreator/withLoader'
import withToast from '../redux/actionCreator/withToast'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from "react-native-customized-image-picker"

import { UPDATE_USER_DETAILS_URL } from './../helper/Constants'
import ProfileScreen from './ProfileScreen'

import StyleConfig from '../assets/styles/StyleConfig'
import { SafeAreaView, ViewX, TEXTINPUT, TextX } from '../components/common'

import imgDummy from '../assets/images/ic_dummy.png'

class EditAccount extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isHiddenUserInformation: true,
      userDetails: undefined,
      proPic: undefined,
      name: '',
      username: '',
      website: '',
      description: '',
      email: '',
      mobile: '',
      location: ''
    }
  }

  componentDidMount() {
    let userDetails = this.props.route.params.userDetails
    this.setState({
      userDetails: userDetails,
      proPic: { path: userDetails.profilepic },
      name: userDetails.name,
      username: userDetails.username,
      website: userDetails.website,
      description: userDetails.description,
      email: userDetails.email,
      mobile: userDetails.mobile_number ? userDetails.mobile_number : '',
      location: userDetails.location ? userDetails.location : '',
    })
  }

  _validations = () => {
    const { name, username, website, description, email, mobile, location } = this.state

    if (name == '') {
      Alert.alert('Please enter name')
      // } else if (username == '') {
      //   Alert.alert('Please enter username')
      // } else if (website == '') {
      //   Alert.alert('Please enter website')
      // } else if (description == '') {
      //   Alert.alert('Please enter description')
      // } else if (email == '') {
      //   Alert.alert('Please enter email')
      // } else if (mobile == '') {
      //   Alert.alert('Please enter mobile')
      // } else if (location == '') {
      //   Alert.alert('Please enter location')
    } else {
      this._updateProfileAPICalled()
    }
  }

  _updateProfileAPICalled = async () => {
    const { loader } = this.props
    const { name, email, website, mobile, description, location, proPic } = this.state
    let token = await AsyncStorage.getItem('user_token')

    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)

    var photo = {
      uri: proPic ? proPic.path : '',
      type: 'image/jpg',
      name: proPic ? proPic.filename ? proPic.filename : 'image' : 'image',
    }

    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("name", name);
    formdata.append("location", location);
    formdata.append("website", website);
    formdata.append("description", description);
    formdata.append("mobile_number", mobile);
    if (proPic) formdata.append("profilepic", photo);

    console.log(formdata)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    loader(true)
    fetch(UPDATE_USER_DETAILS_URL, requestOptions)
      .then(response => response.text())
      .then(result => {
        loader(false)
        let response = JSON.parse(result)
        if (response.code === 1) {
          setTimeout(() => {
            Alert.alert(
              `Profile Updated Successfully`,
              [{
                text: 'Okay', onPress: () => {
                  ProfileScreen.reloadScreen()
                  this.props.navigation.goBack()
                }
              }],
              { cancelable: false }
            )
          }, 500)
        } else {
          setTimeout(() => {
            Alert.alert(response.message)
          }, 500)
        }
      })
      .catch(error => {
        loader(false)
        console.log('error', error.config)
        setTimeout(() => {
          Alert.alert('Please try again later')
        }, 500)
      });
  }

  render() {
    return this.renderMainView()
  }

  renderMainView = () => {
    return (
      <SafeAreaView {...this.props}>
        {this.renderHeaderView()}
        <ScrollView style={{ flex: 1 }}>
          {this.renderUserDetailsView()}
          {this.renderUserPersonalDetails()}
          {this.renderUserInformation()}
        </ScrollView>
      </SafeAreaView>
    )
  }

  renderHeaderView = () => {
    return (
      <ViewX style={styles.headerTopView}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <TextX fontSize={StyleConfig.countPixelRatio(16)}>Cancel</TextX>
        </TouchableOpacity>
        <TextX
          fontSize={StyleConfig.countPixelRatio(16)}
          align={'center'}
          style={{ marginLeft: 15, flex: 1 }}
        >
          {'Edit Account'}
        </TextX>
        <TouchableOpacity onPress={() => this._validations()}>
          <Text style={{ color: StyleConfig.blue, fontSize: StyleConfig.countPixelRatio(16) }}>{'Done'}</Text>
        </TouchableOpacity>
      </ViewX>
    )
  }

  renderUserDetailsView = () => {
    const { proPic } = this.state
    return (
      <>
        <ViewX style={styles.userDetails}>
          {proPic ?
            <Image source={{ uri: proPic.path }} style={styles.imgProfile} />
            : <Image source={imgDummy} style={styles.imgProfile} />}

          <TouchableOpacity style={{ marginTop: 15 }} onPress={() => {
            ImagePicker.openPicker({
              multiple: false,
              isHidePreview: true,
            }).then(images => {
              console.log(images)
              this.setState({ proPic: Platform.OS == 'ios' ? images : images[0] })
            });
          }}>
            <Text style={{ color: StyleConfig.blue, fontSize: StyleConfig.countPixelRatio(16) }}>{'Change Profile Image'}</Text>
          </TouchableOpacity>

        </ViewX>
        <View style={{ height: 6, width: '100%', backgroundColor: StyleConfig.grey, }} />
      </>
    )
  }

  renderUserPersonalDetails = () => {
    const { name, username, website, description } = this.state
    return (
      <>
        <ViewX style={{ paddingRight: StyleConfig.countPixelRatio(15) }}>
          <ViewX style={styles.userPersonalDetails}>
            <TextX
              style={{ width: '35%' }}
              align='left'
              fontSize={StyleConfig.countPixelRatio(16)}>
              {'Name'}
            </TextX>
            <TEXTINPUT
              align={'left'}
              placeholder={'Enter your name'}
              value={name}
              onChangeText={(text) => this.setState({ name: text })}
            />
          </ViewX>

          <ViewX style={styles.userPersonalDetails}>
            <TextX
              style={{ width: '35%' }}
              align='left'
              fontSize={StyleConfig.countPixelRatio(16)}>
              {'Username'}
            </TextX>
            <TEXTINPUT
              editable={false}
              align={'left'}
              placeholder={'Enter your username'}
              value={username}
              onChangeText={(text) => this.setState({ username: text })}
            />
          </ViewX>

          <ViewX style={styles.userPersonalDetails}>
            <TextX
              style={{ width: '35%' }}
              align='left'
              fontSize={StyleConfig.countPixelRatio(16)}>
              {'Website'}
            </TextX>
            <TEXTINPUT
              // editable={false}
              align={'left'}
              placeholder={'htttp://www.website.com…'}
              value={website}
              onChangeText={(text) => this.setState({ website: text })}
            />
          </ViewX>

          <ViewX style={styles.userPersonalDetails}>
            <TextX
              style={{ width: '35%' }}
              align='left'
              fontSize={StyleConfig.countPixelRatio(16)}>
              {'Description'}
            </TextX>
            <TEXTINPUT
              // editable={false}
              multiline
              align={'left'}
              placeholder={'Description'}
              value={description}
              onChangeText={(text) => this.setState({ description: text })}
            />
          </ViewX>
        </ViewX>
        <View style={{ height: 6, width: '100%', backgroundColor: StyleConfig.grey, marginVertical: StyleConfig.countPixelRatio(15) }} />
      </>
    )
  }

  renderUserInformation = () => {
    const { isHiddenUserInformation } = this.state
    return (
      <>
        <ViewX style={styles.userInformation}>
          <TextX
            align='left'
            fontSize={StyleConfig.countPixelRatio(16)}>
            {'User Information'}
          </TextX>
          <TouchableOpacity onPress={() => this.setState({ isHiddenUserInformation: !isHiddenUserInformation })}>
            <TextX
              align='left'
              fontSize={StyleConfig.countPixelRatio(16)}>
              {!isHiddenUserInformation ? 'Show' : 'Hide'}
            </TextX>
          </TouchableOpacity>
        </ViewX>
        {isHiddenUserInformation && this.renderUserInformationDetails()}
      </>
    )
  }

  renderUserInformationDetails = () => {
    const { userDetails, email, mobile, location } = this.state
    return (
      <>
        <ViewX>
          <ViewX style={styles.userPersonalDetails}>
            <TextX
              style={{ width: '35%' }}
              align='left'
              fontSize={StyleConfig.countPixelRatio(16)}>
              {'Email'}
            </TextX>
            <TEXTINPUT
              editable={false}
              align={'left'}
              placeholder={'user@email.com'}
              value={email}
              onChangeText={(text) => this.setState({ email: text })}
            />
          </ViewX>

          <ViewX style={styles.userPersonalDetails}>
            <TextX
              style={{ width: '35%' }}
              align='left'
              fontSize={StyleConfig.countPixelRatio(16)}>
              {'Mobile'}
            </TextX>
            <TEXTINPUT
              // editable={false}
              align={'left'}
              placeholder={'+1-999-999-9999'}
              value={mobile}
              onChangeText={(text) => this.setState({ mobile: text })}
            />
          </ViewX>

          <ViewX style={styles.userPersonalDetails}>
            <TextX
              style={{ width: '35%' }}
              align='left'
              fontSize={StyleConfig.countPixelRatio(16)}>
              {'Location'}
            </TextX>
            <TEXTINPUT
              // editable={false}
              multiline
              align={'left'}
              placeholder={'1900 Street, New York, NY, United States - zip-code'}
              value={location}
              onChangeText={(text) => this.setState({ location: text })}
            />
          </ViewX>
        </ViewX>
      </>
    )
  }

}

export default withLoader(withToast(EditAccount))

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
    paddingVertical: StyleConfig.countPixelRatio(10),
    paddingHorizontal: StyleConfig.countPixelRatio(30),
    justifyContent: 'flex-start',
  },
  imgProfile: {
    height: StyleConfig.countPixelRatio(128),
    width: StyleConfig.countPixelRatio(128),
    borderRadius: StyleConfig.countPixelRatio(64)
  },
  userPersonalDetails: {
    flexDirection: 'row',
    paddingLeft: StyleConfig.countPixelRatio(20),
    marginTop: StyleConfig.countPixelRatio(15)
  },
  userInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: StyleConfig.countPixelRatio(20),
  }
})