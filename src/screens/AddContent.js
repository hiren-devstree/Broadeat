
import React, { Component } from 'react';
import {
    FlatList,
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TextInput,
    TextInputProps,
    TouchableWithoutFeedback
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
const MultiTextInputX = (props: TextInputProps) => <MultiTextInput multiline {...props}>{props.children}</MultiTextInput>
const MultiTextInput = styled.TextInput`
    color: ${props => props.theme.text};
    border-radius: ${StyleConfig.convertHeightPerVal(10)}px;
    paddingVertical: ${StyleConfig.convertHeightPerVal(10)}px;
    font-size: ${StyleConfig.fontSizeH3_4}px;
    background: ${props => props.theme.tabBackground};
    padding: 10px;
`

const IngredientsWrapper = withTheme(({ theme, ...props }) => {
    return (<ViewX style={{
        flex: 1,
        marginVertical: StyleConfig.convertHeightPerVal(5),
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
    </ViewX>)
})

class AddContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            ingredients: [...Array(3)]
        }
    }

    componentDidMount() {
        const _ = this.props.route.params;
        this.setState({ images: _.images })
    }


    render() {
        const { images, ingredients } = this.state;
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
                    {
                        ingredients.map(() => <IngredientsWrapper />)
                    }
                    <TouchableWithoutFeedback onPress={() => {
                        this.setState((prevState, props) => {
                            return {
                                ingredients: [...prevState.ingredients, ...Array(1)]
                            }
                        })
                    }} >
                        <TextX
                            style={{
                                textAlign: "left",
                                color: theme.text,
                                fontSize: StyleConfig.fontSizeH1,
                                padding: StyleConfig.convertWidthPerVal(10),
                                paddingVertical: StyleConfig.convertHeightPerVal(10),
                            }}
                        >{"+"}</TextX>
                    </TouchableWithoutFeedback>
                    <TextX
                        style={{
                            textAlign: "left",
                            color: theme.text,
                            fontSize: StyleConfig.fontSizeH3,
                            padding: StyleConfig.convertWidthPerVal(10),
                            paddingVertical: StyleConfig.convertHeightPerVal(10),
                        }}
                    >Cooking Method</TextX>
                    {/* STEPS START */}
                    <TextX
                        style={{
                            textAlign: "left",
                            color: theme.text,
                            fontSize: StyleConfig.fontSizeH3_4,
                            padding: StyleConfig.convertWidthPerVal(10),
                            paddingVertical: StyleConfig.convertHeightPerVal(10),
                        }}
                    >Step 01</TextX>
                    <MultiTextInputX
                        style={{
                            minHeight: StyleConfig.convertHeightPerVal(100),
                            margin: 5
                        }}
                    />
                    {/* STEPS END */}
                </ScrollView>

            </SafeAreaView >
        );
    }
}


export default withTheme(withLoader(withToast(AddContent)));
const styles = StyleSheet.create({


});