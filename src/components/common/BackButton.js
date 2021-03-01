import React from "react";
import {
    Platform, TouchableOpacity, Image
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import StyleConfig from "../../assets/styles/StyleConfig";
import { withTheme } from "styled-components";

import imgBack from '../../assets/images/ic_back.png'
import SearchScreen from '../../screens/SearchScreen'

const isIOS = Platform.OS === "ios"

const BackButton = withTheme(({ navigation, theme, reload }) => (
    // <Ionicons
    //     onPress={() => { navigation && navigation.pop() }}
    //     name={`${isIOS ? "ios" : "md"}-arrow-back`}
    //     style={{ paddingHorizontal: StyleConfig.convertHeightPerVal(20) }}
    //     color={'blue'}
    //     size={22}

    // />
    <TouchableOpacity onPress={() => {
        if (reload) {
            SearchScreen.reloadScreen()
        }
        navigation && navigation.pop()
    }}>
        <Image source={imgBack} style={{
            width: StyleConfig.countPixelRatio(22),
            height: StyleConfig.countPixelRatio(22),
            marginLeft: 8
        }} />
    </TouchableOpacity>
))
export default BackButton;