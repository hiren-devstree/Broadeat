import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';

import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, View1CC, Devider, CText, CTextColor, TextX } from '../components/common';
import { FlatList } from 'react-native-gesture-handler';
import withUser from '../redux/actionCreator/withUser';
class HomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let data = []
        for (let ind = 0; ind < 40; ind++) {
            let ii = ind % 13;
            data.push(AppImages.homeItems[ii]);
        }
        let objData = {}
        return (
            <SafeAreaView {...this.props}>
                <View1CC {...this.props} >
                    <FlatList
                        data={data}
                        numColumns={3}
                        keyExtractor={(_, idx) => `foodGlr-${idx}`}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={{margin: 3,}} onPress={()=>this.props.navigation.navigate('PhotoRecipeDetails', { data: item })}>
                            <Image
                                source={item}
                                style={{  height: StyleConfig.convertWidthPer(29), width: StyleConfig.convertWidthPer(30) }}
                            /></TouchableOpacity>}
                    />
                </View1CC>
            </SafeAreaView>
        );
    }
}


export default withUser(withLoader(withToast(HomeScreen)));
const styles = StyleSheet.create({


});