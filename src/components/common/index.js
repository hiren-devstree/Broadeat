import React from 'react';
import { TouchableOpacity, Image, ViewProps, TextInput, TextProps, View, } from 'react-native';
import styled from 'styled-components';
import StyleConfig from '../../assets/styles/StyleConfig';


export const SafeAreaView = props => <SAFEAREAVIEW>{props.children}</SAFEAREAVIEW>
const SAFEAREAVIEW = styled.SafeAreaView`
  flex: 1;  
  background: ${props => props.theme.background};
`

export const SafeAreaViewC = props => <SAFEAREAVIEWC>{props.children}</SAFEAREAVIEWC>
const SAFEAREAVIEWC = styled.SafeAreaView`
  flex: 1;  
  background: ${props => props.theme.cLightCyan};
`
export const ViewX = (props: ViewProps) => <VIEWX {...props} >{props.children}</VIEWX>
const VIEWX = styled.View`
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.background};
`;

export const TextX = (props: TextProps) => <TEXTX {...props} >{props.children}</TEXTX>
const TEXTX = styled.Text`
  text-align:${props => props.align ? props.align : 'center'};
  font-size:${props => props.fontSize ? props.fontSize : StyleConfig.countPixelRatio(12)}px ;
  color: ${props => props.theme.text};
  font-weight: ${props => props.fontWeight ? props.fontWeight : '500'};
`

export const View1CC = props => <VIEW1CC>{props.children}</VIEW1CC>
const VIEW1CC = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.background};
`

export const View0CC = props => <VIEW0CC {...props}>{props.children}</VIEW0CC>
const VIEW0CC = styled.View`
  justify-content: center;
  align-items: center;
  width: ${props => props.width ? props.width : StyleConfig.width}px;
  height: ${props => props.height ? props.height : StyleConfig.convertHeightPerVal(60)}px;
  background: ${props => props.theme.background};
`

export const Devider = props => <DEVIDER width={StyleConfig.width} height={props.height ? props.height : 2} />
const DEVIDER = styled.View`
  height: ${props => props.height};
  width:  ${props => props.width};
  background: ${props => props.theme.devider};
`

export const CText = props => <CTEXT {...props}>{props.children}</CTEXT>
const CTEXT = styled.Text.attrs(props => ({
  onPress: props.onPress
}))`
  flex: 1;
  text-align:center;
  font-size:${props => props.fontSize ? props.fontSize : StyleConfig.countPixelRatio(12)}px;
  color: ${props => props.theme.text};
  font-weight: ${props => props.fontWeight ? props.fontWeight : '500'};
`

export const CTextColor = props => <CTEXTCOLOR {...props}>{props.children}</CTEXTCOLOR>
const CTEXTCOLOR = styled.Text`
  flex: 1;
  text-align:${props => props.align ? props.align : 'center'};
  font-size:${props => props.fontSize ? props.fontSize : StyleConfig.countPixelRatio(12)}px ;
  color: ${props => props.color};
  font-weight: ${props => props.fontWeight ? props.fontWeight : '500'};
`

export const CButtonColor = props => <TouchableOpacity style={props.containerStyle} onPress={props.onPress}>
  <CBUTTONCOLOR {...props}>{props.children}</CBUTTONCOLOR></TouchableOpacity>
const CBUTTONCOLOR = styled.View` 
  border-radius: 10px;
  height: 50px;
  border: ${props => props.borderColor};
  background: ${props => props.color};
  justify-content: center;
  align-items: center;
  padding: 10px 
`

export const CTextInputWithIcon = props => <INPUT_WRAPPER {...props}>
  <Image source={props.icon} resizeMode={'contain'} style={{
    height: StyleConfig.countPixelRatio(18),
    width: StyleConfig.countPixelRatio(22),
    marginRight: 8
  }} />
  <TEXTINPUT
    {...props}
  />
  <View style={{ width: StyleConfig.countPixelRatio(28) }} />
</INPUT_WRAPPER>
const INPUT_WRAPPER = styled.View` 
border-radius: 10px;
border: ${props => props.theme.border};
flex: 1;
flex-direction: row;
minHeight:40px;
align-items: center;
padding: 4px ;
margin-vertical: 12px;
background-color: ${props => props.background ? props.background : "#00000000"}
`
export const TEXTINPUT = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.placeholderTextColor ? props.placeholderTextColor : props.theme.textHint,
  placeholder: props.placeholder,
  secureTextEntry: props.secureTextEntry ? props.secureTextEntry : false,
  underlineColorAndroid: "#00000000",
  textAlign: props.align ? props.align : 'center'
}))`
  color: ${props => props.color ? props.color : props.theme.text};
  flex: 1;
  font-size: ${StyleConfig.countPixelRatio(16)}px;
`;

export const CTextInput = props => <INPUT_WRAPPER2 {...props}>
  <TEXTINPUT
    {...props}
  />
</INPUT_WRAPPER2>
const INPUT_WRAPPER2 = styled.View` 
border-radius: 10px;
border: ${props => props.theme.border};
flex-direction: row;
minHeight:40px;
align-items: center;
padding: 4px ;
margin-left: 22px;
margin-right: 22px;
background-color: ${props => props.background ? props.background : "#00000000"}
`


export const ModalView = props => <MODAL_VIEW {...props}>{props.children}</MODAL_VIEW>
const MODAL_VIEW = styled.View`
  border: 2px solid ${props => props.theme.border};
  border-radius: 8px;
  width: ${props => props.width ? props.width : StyleConfig.width}px;
  height: ${props => props.height ? props.height : StyleConfig.convertHeightPerVal(200)}px;
  background: ${props => props.theme.background};
`

