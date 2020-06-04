
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
class SearchScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <SafeAreaView {...this.props}>
                <TextX style={{ paddingVertical: StyleConfig.convertHeightPerVal(10) }} fontSize={StyleConfig.countPixelRatio(16)}>SearchScreen</TextX>
                <View1CC style={{ flex: 0 }} {...this.props} >
                    <FlatList
                        data={AppImages.homeItems}
                        keyExtractor={(_, idx) => `search-${idx}`}
                        renderItem={({ item, index }) => <FoodResultRow data={item} index={index} />}
                    />
                </View1CC>
            </SafeAreaView>
        );
    }
}


export default withLoader(withToast(SearchScreen));
const styles = StyleSheet.create({


});