import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
} from "react-native";

import { withTheme } from "styled-components";
import { ScrollView } from "react-native-gesture-handler";

import { ViewX, TextX, SafeAreaView } from "../../components/common";
import StyleConfig from "../../assets/styles/StyleConfig";
import AppImages from '../../assets/images';

const FilterBubble = withTheme(({ theme, item }) => {
    const { cLightCyan, filterOn } = theme;
    return (
        <ViewX style={{
            marginHorizontal: StyleConfig.convertWidthPerVal(5),
            padding: StyleConfig.convertWidthPerVal(8),
            backgroundColor: cLightCyan,
            borderRadius: 20
        }}>
            <TextX style={{ fontSize: StyleConfig.fontSizeH3_4, color: filterOn }} >{item}</TextX>
        </ViewX>
    )
})

// const POST_SIZE = StyleConfig.width / 2;
const POST_SIZE = (StyleConfig.width - 15) / 2;

const FavoriteFood = withTheme(({ theme, item, idx }) => {
    return (
        <ViewX
            style={{
                width: POST_SIZE
            }}>
            <ViewX
                style={{
                    width: POST_SIZE,
                    height: POST_SIZE
                }}>
                <Image
                    style={{
                        borderRadius: StyleConfig.convertWidthPerVal(10),
                        width: "90%",
                        height: "90%"
                    }}
                    source={item}
                />
            </ViewX>
            <TextX style={{
                fontSize: StyleConfig.fontSizeH3
            }} >{" Tomato & Broccoli Conchiglie Pasta"}</TextX>
        </ViewX>
    )
})

class RecipesTab extends Component {

    constructor() {
        super()
        this.state = {
            filters: ["View All", "Pastas", "Salads", "Deserts", "Vegetarian"]
        }
    }

    render() {

        const { filters } = this.state;
        let data = []
        for (let ind = 0; ind < 20; ind++) {
            let ii = ind % 13;
            data.push(AppImages.homeItems[ii]);
        }
        return (
            <SafeAreaView {...this.props}>
                <ViewX>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <ViewX style={{
                            marginVertical: StyleConfig.convertHeightPerVal(5),
                            flexDirection: "row"
                        }} >
                            {
                                filters.map((item, idx) => <FilterBubble key={`filter-${idx}`} {...{ item }} />)
                            }
                        </ViewX>
                    </ScrollView>
                </ViewX>
                <FlatList
                    contentContainerStyle={{ paddingVertical: 20, alignSelf: "center" }}
                    numColumns={2}
                    keyExtractor={(_, idx) => `foodGlr-${idx}`}
                    data={data}
                    renderItem={({ item, idx }) => <FavoriteFood {...{ item, idx }} />}
                />
            </SafeAreaView>
        );
    }
}
export default RecipesTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});