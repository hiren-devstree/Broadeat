
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

class SearchResult extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <SafeAreaView {...this.props}>
                <View1CC style={{ flex: 0 }} {...this.props} >
                    <FlatList
                        data={AppImages.homeItems}
                        keyExtractor={(_, idx) => `search-${idx}`}
                        renderItem={({ item, index }) => <FoodResultRow {...this.props} data={item} index={index} />}
                    />
                </View1CC>
            </SafeAreaView>
        );
    }
}


export default withLoader(withToast(SearchResult));
const styles = StyleSheet.create({


});