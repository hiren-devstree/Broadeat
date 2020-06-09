
import React, { Component } from 'react'
import {
  Image, StyleSheet, TouchableOpacity, ScrollView,
  Text, View, Switch
} from 'react-native'
import withLoader from '../redux/actionCreator/withLoader'
import withToast from '../redux/actionCreator/withToast'

import StyleConfig from '../assets/styles/StyleConfig'
import { SafeAreaView, View1CC, ViewX, TEXTINPUT, TextX } from '../components/common'

import imgDummy from '../assets/images/ic_dummy.png'

class EditAccount extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isHiddenUserInformation: true
    }
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
        <TouchableOpacity onPress={() => { }}>
          <Text style={{ color: StyleConfig.blue, fontSize: StyleConfig.countPixelRatio(16) }}>{'Done'}</Text>
        </TouchableOpacity>
      </ViewX>
    )
  }

  renderUserDetailsView = () => {
    return (
      <>
        <ViewX style={styles.userDetails}>
          <Image source={imgDummy} style={styles.imgProfile} />

          <TouchableOpacity style={{ marginTop: 15 }} onPress={() => { }}>
            <Text style={{ color: StyleConfig.blue, fontSize: StyleConfig.countPixelRatio(16) }}>{'Change Profile Image'}</Text>
          </TouchableOpacity>

        </ViewX>
        <View style={{ height: 6, width: '100%', backgroundColor: StyleConfig.grey, }} />
      </>
    )
  }

  renderUserPersonalDetails = () => {
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
            <TEXTINPUT align={'left'} placeholder={'Enter your name'} />
          </ViewX>

          <ViewX style={styles.userPersonalDetails}>
            <TextX
              style={{ width: '35%' }}
              align='left'
              fontSize={StyleConfig.countPixelRatio(16)}>
              {'Username'}
            </TextX>
            <TEXTINPUT align={'left'} placeholder={'Enter your username'} />
          </ViewX>

          <ViewX style={styles.userPersonalDetails}>
            <TextX
              style={{ width: '35%' }}
              align='left'
              fontSize={StyleConfig.countPixelRatio(16)}>
              {'Website'}
            </TextX>
            <TEXTINPUT align={'left'} placeholder={'htttp://www.website.com…'} />
          </ViewX>

          <ViewX style={styles.userPersonalDetails}>
            <TextX
              style={{ width: '35%' }}
              align='left'
              fontSize={StyleConfig.countPixelRatio(16)}>
              {'Description'}
            </TextX>
            <TEXTINPUT multiline align={'left'} placeholder={'DescriptionDescriptionDescriptionDescriptionDescription'} />
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
            <TEXTINPUT align={'left'} placeholder={'user@email.com'} />
          </ViewX>

          <ViewX style={styles.userPersonalDetails}>
            <TextX
              style={{ width: '35%' }}
              align='left'
              fontSize={StyleConfig.countPixelRatio(16)}>
              {'Mobile'}
            </TextX>
            <TEXTINPUT align={'left'} placeholder={'+1-999-999-9999'} />
          </ViewX>

          <ViewX style={styles.userPersonalDetails}>
            <TextX
              style={{ width: '35%' }}
              align='left'
              fontSize={StyleConfig.countPixelRatio(16)}>
              {'Location'}
            </TextX>
            <TEXTINPUT multiline align={'left'} placeholder={'1900 Street, New York, NY, United States - zip-code'} />
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