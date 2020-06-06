import React from "react";
import {
    Platform
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import StyleConfig from "../../assets/styles/StyleConfig";
import { withTheme } from "styled-components";

const isIOS = Platform.OS === "ios"

const BackButton = withTheme(({ navigation, theme }) => (
    <Ionicons
        onPress={() => { navigation && navigation.pop() }}
        name={`${isIOS ? "ios" : "md"}-arrow-back`}
        style={{ paddingHorizontal: StyleConfig.convertHeightPerVal(20) }}
        color={theme.text}
        size={StyleConfig.iconSize}

    />
))
export default BackButton;