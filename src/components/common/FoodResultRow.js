import React, { PureComponent } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import StyleConfig from '../../assets/styles/StyleConfig';
import { SafeAreaView, View0CC, Devider, CText, CTextColor } from '../../components/common';

class FoodResultRow extends PureComponent {

    render() {
        const { data, index } = this.props;
        return (
            <View style={{}} >
                <Image
                    resizeMode="cover"
                    style={{ width: StyleConfig.width, height: StyleConfig.convertHeightPerVal(205) }} source={data}
                />
                <View style={{ flex: 1, flexDirection: "row", padding: 10 }} >
                    <Image
                        style={{ width: StyleConfig.convertHeightPerVal(50), aspectRatio: 1, borderRadius: StyleConfig.convertHeightPerVal(50) }}
                        source={data}
                    />
                    <View style={{ flex: 1, alignItems: 'center' }} >
                        <CTextColor color={"#8A8A8F"} fontSize={StyleConfig.fontSizeH2}>{'Food Title'}</CTextColor>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }} >
                            <CTextColor color={"#8A8A8F"} fontSize={StyleConfig.fontSizeH3_4}>{'Mark Driven'}</CTextColor>
                            <View style={{ flex: 1, flexDirection: "row" }} >
                                <CTextColor color={"#8A8A8F"} fontSize={StyleConfig.fontSizeH3_4}>{'Time'}</CTextColor>
                                <CTextColor color={"#8A8A8F"} fontSize={StyleConfig.fontSizeH3_4}>{'Food Type'}</CTextColor>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}
export default FoodResultRow;
