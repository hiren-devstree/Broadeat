import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { ViewX, TextX } from "../../components/common";

const AccountTab = (props) => (
    <ViewX style={styles.container}>
        <TextX>AccountTab</TextX>
    </ViewX>
)
export default AccountTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});