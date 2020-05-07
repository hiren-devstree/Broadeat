import React from 'react';
import {View, Image, TextInput, StyleSheet} from 'react-native';
import StyleConfig from '../../assets/styles/StyleConfig';

export const TextInputWithIcon=({icon, ...rest})=>{
    return(
        <View style={styles.inputWrapper}>
            <Image source={icon} resizeMode={'contain'} style={styles.leftIcon} />
            <TextInput 
                {...rest} 
                underlineColorAndroid={'transparent'} 
                placeholderTextColor={'#000'}
                style={styles.textInputStyle} />
                <View style={{width:StyleConfig.countPixelRatio(28)}} />
        </View>
    )
}



const styles= StyleSheet.create({
    inputWrapper:{ 
        borderRadius:9, 
        marginVertical:StyleConfig.countPixelRatio(12), 
        minHeight:StyleConfig.countPixelRatio(40), 
        alignItems:'center', 
        borderWidth:1, 
        paddingVertical:4, 
        paddingHorizontal: 6,
        borderColor:'#707070', 
        flexDirection:'row'
    },
    leftIcon:{
        height:StyleConfig.countPixelRatio(18), 
        width:StyleConfig.countPixelRatio(22), 
        marginRight:8 
    },
    textInputStyle:{
        flex:1, 
        textAlign:'center',
        fontSize:StyleConfig.countPixelRatio(16)
    }
});