import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet

} from 'react-native';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';

import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, View1CC, Devider, CText, CTextColor } from '../components/common';
import { FlatList } from 'react-native-gesture-handler';
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

        return (
            <SafeAreaView {...this.props}>
                <View1CC {...this.props} >
                    <CText fontSize={StyleConfig.countPixelRatio(16)}>Home</CText>
                    <FlatList
                        data={data}
                        numColumns={3}
                        keyExtractor={(_, idx) => `foodGlr-${idx}`}
                        renderItem={({ item }) => <Image source={item}
                            style={{ margin: 3, height: StyleConfig.convertWidthPer(29), width: StyleConfig.convertWidthPer(30) }}
                        />}
                    />
                </View1CC>
            </SafeAreaView>
        );
    }
}


export default withLoader(withToast(HomeScreen));
const styles = StyleSheet.create({


});