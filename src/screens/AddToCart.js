
import React, { Component } from 'react';
import {
    FlatList,
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';

import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, View1CC, Devider, CText, CTextColor, TextX } from '../components/common';
import FoodResultRow from '../components/common/FoodResultRow';

class AddToCart extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <SafeAreaView {...this.props}>
                <TextX style={{ paddingVertical: StyleConfig.convertHeightPerVal(10) }} fontSize={StyleConfig.countPixelRatio(16)}>AddToCart</TextX>
            </SafeAreaView>
        );
    }
}


export default withLoader(withToast(AddToCart));
const styles = StyleSheet.create({


});