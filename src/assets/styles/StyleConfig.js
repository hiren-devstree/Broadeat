import { Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');
const deviceType = width < 480 ? 'phone' : 'tablet';
const iPhoneX = Platform.OS === 'ios' && (height === 812 || height === 896 || width === 812 || width === 896);
const iPhone5 = (Platform.OS === 'ios' && height === 568);

const smartScale = (value) => {
  let val = height > width ? height : width
  const dev_height = Platform.OS === 'ios' ? iPhoneX ? val - 78 : val : val - 24
  if (deviceType == 'phone') {
    return Math.round((value * dev_height) / 812);
  } else {
    return Math.round((value * dev_height) / 812);
  }
}
const ratioCount = Math.sqrt(height * height + width * width) / 1000;

const widthPer = width / 100;
const heightPer = height / 100;
export default {
  countPixelRatio: (defaultValue) => {
    return smartScale(defaultValue);
  },
  convertWithRatioCount: (size) => size * ratioCount,
  convertWidthPer: (per, isLandscape = false) => per * (isLandscape && width < height ? heightPer : widthPer),
  convertHeightPer: (per, isLandscape = false) => per * (isLandscape && width < height ? widthPer : heightPer),
  convertWidthPerVal: (val) => val * height / 812,
  convertHeightPerVal: (val) => val * width / 375,

  width,
  height,
  // fontRegular: 'Roboto-Regular',
  // fontMedium: 'Roboto-Medium',
  // fontBold: 'Roboto-Bold',
  // fontItalic: 'Roboto-Italic',
  // fontBoldItalic: 'Roboto-Bold-Italic',
  bubleFontSize: 17*ratioCount,
  fontSizeH1: 26 * ratioCount,
  fontSizeH2: 20 * ratioCount,
  fontSizeH2_3: 18 * ratioCount,
  fontSizeH3: 15 * ratioCount,
  fontSizeH3_4: 13 * ratioCount,
  fontSizeH4: 10 * ratioCount,
  fontSizeParagraph: 13 * ratioCount,
  iconSize: 26 * ratioCount,
  headerHeight: iPhoneX ? 90 * width / 375 : 60 * width / 375,
  black: '#000',
  white: '#ffffff',
  grey: '#808080',
  grey_light: '#D3D3D3',
  yellow: '#FA9000',
  blue: '#0465C6',
  cLightCyan: '#CCF7F5',
  isIphone: Platform.OS === 'ios',
  iPhoneX,
  statusBarHeight: 55,
  isPad: Platform.OS === 'ios' && Platform.isPad,
}
