import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  Alert
} from 'react-native';
import {
  ModalView, CText, CTextInput, CTextColor
} from './../common';
import StyleConfig from '../../assets/styles/StyleConfig';
import { forgotPassword } from '../../apiManager'
import { EMAIL_REGEX } from '../../helper/Constants'
import withLoader from '../../redux/actionCreator/withLoader'
const SUPPORTED_ORIENTATIONS = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];
class ForgotPasswordModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: ''
    }
  }

  _onSendPress = async () => {
    const { email } = this.state

    if (email === '') {
      Alert.alert('Please enter your email-address')
    } else if (!EMAIL_REGEX.test(email)) {
      Alert.alert('Please enter Valid email-address')
    } else {
      const { loader } = this.props
      loader(true)
      let data = {
        email: email
      }
      let response = await forgotPassword(data)
      loader(false)
      if (response.code === 1) {
        Alert.alert(
          'Alert',
          `${response.message}`,
          [{
            text: 'Okay',
            onPress: () => { this.props.onSendPress() }
          },
          ],
          { cancelable: false }
        )
      } else {
        setTimeout(() => {
          Alert.alert(response.message)
        }, 500)
      }
    }

  }


  render() {
    return (
      <Modal
        supportedOrientations={SUPPORTED_ORIENTATIONS}
        animationType={"fade"}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => { console.log("Modal has been closed.") }}>
        {/*All views of Modal*/}
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00000088',
        }}>
          <ModalView width={StyleConfig.convertWidthPer(80)} {...this.props} >
            {/* <View style={{ marginHorizontal:StyleConfig.countPixelRatio(22), marginVertical:StyleConfig.countPixelRatio(20), backgroundColor:'grey'}}>  */}
            <View style={{ height: 22 }} />
            <CText fontSize={StyleConfig.countPixelRatio(20)} fontWeight={'bold'}>{'Forgot Password?'}</CText>
            <CText fontSize={StyleConfig.countPixelRatio(14)} >{'Enter your email to request \n a new password.'}</CText>
            <CTextInput
              placeholder={'Enter your email address'}
              onChangeText={(val) => this.setState({ email: val })}
              autoCapitalize='none'
              autoCorrect={false}
            />
            {/* </View> */}
            <View style={{ flex: 1 }} />
            <View style={{ borderTopWidth: 1, paddingVertical: 8, borderColor: '#999', flexDirection: 'row' }}>

              <CTextColor onPress={this.props.onCalcelPress} color={'#2294E3'} fontSize={StyleConfig.countPixelRatio(16)} fontWeight={'bold'}>{'Cancel'}</CTextColor>
              <View style={{ backgroundColor: "#999", width: 1 }} />
              <CTextColor onPress={this._onSendPress} color={'#2294E3'} fontSize={StyleConfig.countPixelRatio(16)} fontWeight={'bold'}>{'Send'}</CTextColor>

            </View>
          </ModalView>
        </View>
      </Modal>
    )
  }
}

export default withLoader(ForgotPasswordModal);