import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { TextX, ViewX } from "../../components/common";

const RecipesTab = (props) => (
    <ViewX style={styles.container}>
        <TextX>RecipesTab</TextX>
    </ViewX>
)
export default RecipesTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});