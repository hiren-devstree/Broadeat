
import React, { Component } from 'react';
import {
    FlatList,
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TextInput,
    TextInputProps
} from 'react-native';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';

import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, TextX, ViewX } from '../components/common';
import FoodResultRow from '../components/common/FoodResultRow';
import styled, { withTheme, ThemeConsumer } from 'styled-components';


const IngredientTextInput = (props: TextInputProps) => <InputTextX {...props} >{props.children}</InputTextX>

const InputTextX = styled.TextInput`
    paddingVertical: ${StyleConfig.convertHeightPerVal(10)}px;
    font-size: ${StyleConfig.fontSizeH3}px;
    background: ${props => props.theme.text};
    text-align: center;
`

class AddContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    componentDidMount() {
        const _ = this.props.route.params;
        this.setState({ images: _.images })
    }


    render() {
        const { images } = this.state;
        const { theme } = this.props;

        return (
            <SafeAreaView {...this.props}>
                <ScrollView>

                    <ViewX style={{
                        paddingVertical: 5,
                        width: StyleConfig.width,
                        flexWrap: "wrap",
                        // justifyContent: "flex-start",
                        flexDirection: "row"
                    }} >
                        {
                            images.map((itm, idx) => <ViewX
                                style={{
                                    borderRadius: 2,
                                    width: StyleConfig.convertWidthPerVal(120),
                                    height: StyleConfig.convertWidthPerVal(120)
                                }}>
                                <Image
                                    key={`images-${idx}`}
                                    style={{ width: "95%", height: "95%" }}
                                    source={{ uri: itm.path }}
                                />
                            </ViewX>)
                        }
                    </ViewX>
                    <TextInput
                        style={{
                            color: theme.text,
                            fontSize: StyleConfig.fontSizeH3,
                            padding: StyleConfig.convertWidthPerVal(10)
                        }}
                        placeholderTextColor={theme.textHint}
                        onChange={() => { }}
                        placeholder={"Write a title..."}
                    />
                    <TextInput
                        multiline
                        style={{
                            color: theme.text,
                            fontSize: StyleConfig.fontSizeH3,
                            padding: StyleConfig.convertWidthPerVal(10)
                        }}
                        placeholderTextColor={theme.textHint}
                        onChange={() => { }}
                        placeholder={"Description"}
                    />

                    <TextX
                        style={{
                            textAlign: "left",
                            color: theme.text,
                            fontSize: StyleConfig.fontSizeH3,
                            padding: StyleConfig.convertWidthPerVal(10)
                        }}
                    >Add Ingredients</TextX>
                    <ViewX style={{
                        flex: 1,
                        paddingVertical: 20,
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row"
                    }} >
                        <TextX style={{ width: StyleConfig.convertWidthPerVal(80), fontSize: StyleConfig.fontSizeH3 }}>Qty</TextX>
                        <TextX style={{
                            // flex: 1,
                            width: StyleConfig.convertWidthPerVal(StyleConfig.width / 3.2),
                            fontSize: StyleConfig.fontSizeH3
                        }} >Measure</TextX>
                        <TextX style={{
                            // flex: 1,
                            width: StyleConfig.convertWidthPerVal(StyleConfig.width / 3.2),
                            fontSize: StyleConfig.fontSizeH3
                        }} >Ingredient</TextX>
                    </ViewX>
                    <ViewX style={{
                        flex: 1,
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row"
                    }} >
                        <IngredientTextInput
                            style={{
                                width: StyleConfig.convertWidthPerVal(80)
                            }}
                            placeholder={"Qty"}
                        />
                        <IngredientTextInput
                            style={{
                                // flex: 1,
                                width: StyleConfig.convertWidthPerVal(StyleConfig.width / 3.2),
                                // marginHorizontal: 8,
                                backgroundColor: theme.text,
                                textAlign: "center"
                            }}
                            placeholder={"Measure"}
                        />
                        <IngredientTextInput
                            style={{
                                // flex: 1,
                                width: StyleConfig.convertWidthPerVal(StyleConfig.width / 3.2),
                                backgroundColor: theme.text,
                                textAlign: "center"
                            }}
                            placeholder={"Ingredient"}
                        />
                    </ViewX>
                </ScrollView>

            </SafeAreaView >
        );
    }
}


export default withTheme(withLoader(withToast(AddContent)));
const styles = StyleSheet.create({


});