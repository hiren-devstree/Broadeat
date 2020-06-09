import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { ViewX, TextX, SafeAreaView } from "../../components/common";
import StyleConfig from "../../assets/styles/StyleConfig";
import AppImages from '../../assets/images';
import { withTheme } from "styled-components";
import { FlatList } from "react-native-gesture-handler";

const Account = withTheme(({ theme }) => (
    <ViewX style={{
        paddingVertical: StyleConfig.convertHeightPerVal(10),
        flexDirection: "row",
        alignItems: "center",
    }} >
        <ViewX style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start" }} >
            <Image
                style={{ width: StyleConfig.convertWidthPerVal(56), height: StyleConfig.convertWidthPerVal(56) }}
                source={AppImages.mock_user_1}
            />
            <ViewX style={{ paddingHorizontal: StyleConfig.convertHeightPerVal(20) }} >
                <TextX style={{ color: theme.text, fontSize: StyleConfig.fontSizeH3 }}>{"Mark Driven"}</TextX>
                <TextX style={{ color: theme.textHint, fontSize: StyleConfig.fontSizeH3_4 }} >{"French Cooker"}</TextX>
            </ViewX>
        </ViewX>
        <Image
            resizeMode="contain"
            style={{ width: StyleConfig.iconSize, aspectRatio: 1 }}
            source={AppImages.ic_fav_selected}
        />
    </ViewX>
))

class AccountTab extends React.Component {
    render() {
        return (
            <SafeAreaView>
                <ViewX style={{}} {...this.props} >
                    <FlatList
                        style={{ width: "100%", paddingHorizontal: StyleConfig.convertWidthPerVal(20) }}
                        data={[...Array(10)]}
                        keyExtractor={(itm, idx) => `$user-${idx}`}
                        renderItem={({ item, index }) => <Account {...{ item, index }} />}
                    />
                </ViewX>
            </SafeAreaView >
        )
    }
}

export default AccountTab;