import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity
} from 'react-native';
import { ModalView, CText, CTextInput, CTextColor } from './../common';
import StyleConfig from '../../assets/styles/StyleConfig';
const SUPPORTED_ORIENTATIONS = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];
export const ForgotPasswordModal = (props) =>

  <Modal
    supportedOrientations={SUPPORTED_ORIENTATIONS}
    animationType={"fade"}
    transparent={true}
    visible={props.visible}
    onRequestClose={() => { console.log("Modal has been closed.") }}>
    {/*All views of Modal*/}
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000088',
    }}>
      <ModalView width={StyleConfig.convertWidthPer(80)} {...props} >
        {/* <View style={{ marginHorizontal:StyleConfig.countPixelRatio(22), marginVertical:StyleConfig.countPixelRatio(20), backgroundColor:'grey'}}>  */}
        <View style={{ height: 22 }} />
        <CText fontSize={StyleConfig.countPixelRatio(20)} fontWeight={'bold'}>{'Forgot Password?'}</CText>
        <CText fontSize={StyleConfig.countPixelRatio(14)} >{'Enter your email to request \n a new password.'}</CText>
        <CTextInput placeholder={'Enter your email address'} />
        {/* </View> */}
        <View style={{ flex: 1 }} />
        <View style={{ borderTopWidth: 1, paddingVertical: 8, borderColor: '#999', flexDirection: 'row' }}>

          <CTextColor onPress={props.onCalcelPress} color={'#2294E3'} fontSize={StyleConfig.countPixelRatio(16)} fontWeight={'bold'}>{'Cancel'}</CTextColor>
          <View style={{ backgroundColor: "#999", width: 1 }} />
          <CTextColor onPress={props.onSendPress} color={'#2294E3'} fontSize={StyleConfig.countPixelRatio(16)} fontWeight={'bold'}>{'Send'}</CTextColor>

        </View>
      </ModalView>
    </View>
  </Modal>