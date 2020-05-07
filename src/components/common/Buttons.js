import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import StyleConfig from '../../assets/styles/StyleConfig';

export const Button=(props)=>{
    return(
        <TouchableOpacity style={[styles.buttonWrapper, props.containerStyle]} onPress={props.onPress}>
            <Text style={[styles.textStyle, props.textStyle]}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonWrapper:{
        borderRadius:9,
        minHeight:StyleConfig.countPixelRatio(36),
        flexDirection:'row',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        marginVertical:StyleConfig.countPixelRatio(12)
    },
    textStyle:{
        fontSize:StyleConfig.countPixelRatio(18),
        fontWeight:'bold'
    }
});