import React, {Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView

} from 'react-native';
import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { TextInputWithIcon } from '../components/common/TextInputs';
import {Button} from '../components/common/Buttons';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import styled from 'styled-components/native';
import { SafeAreaViewC,  CButtonColor, CTextColor } from '../components/common'; 
import BaseComponent from '../containers/BaseComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

class InitScreen extends BaseComponent{
    
    render(){
        return(
            <SafeAreaViewC>
                <View style={styles.content}>
                    <Image
                        resizeMode={'contain'}
                        style={styles.logoStyle}
                        source={AppImages.ic_broad_eat}
                    />
                     <View style={{flex:1}} />

                     
                        <View style={{marginHorizontal: StyleConfig.convertWidthPerVal(46)}} >
                        <Image 
                            source={AppImages.welcome_broadeat}
                            resizeMode={'contain'}
                            style={{
                                height: StyleConfig.convertHeightPerVal(95),
                                width: StyleConfig.convertWidthPerVal(202),
                                alignSelf: 'flex-end'
                            }}
                        />
                        <CButtonColor
                            color={"#83D557"}
                            borderColor={"#fff"}
                            onPress={()=> this.props.navigation.navigate('Register')}
                            containerStyle={{marginBottom: StyleConfig.convertHeightPerVal(22), marginTop: StyleConfig.convertHeightPerVal(27)}}
                        >
                         <CTextColor color={"#fff"} fontWeight={'bold'} fontSize={StyleConfig.countPixelRatio(20)}>{'SIGN UP'}</CTextColor>
                        </CButtonColor>

                        <CButtonColor
                            color={"#fff"}
                            borderColor={"#83D557"}
                            onPress={()=> this.props.navigation.navigate('Login')}
                            
                        >
                         <CTextColor color={"#83D557"} fontWeight={'bold'} fontSize={StyleConfig.countPixelRatio(20)}>{'LOGIN'}</CTextColor>
                        </CButtonColor>
                        <View style={{flexDirection:'row' , justifyContent:'center', marginTop:StyleConfig.convertHeightPerVal(60), marginBottom: StyleConfig.convertHeightPerVal(20)}}>
                             <Icon name="chevron-up" size={16} color="#8A8A8F" />
                        </View>
                        <View style={{flexDirection:'row' , justifyContent:'center', marginBottom: StyleConfig.convertHeightPerVal(28)}}>
                        
                        <CTextColor color={"#8A8A8F"} fontSize={StyleConfig.countPixelRatio(16)}>{'Swipe up to learn more'}</CTextColor>
                        </View>
                    
                    </View>
                </View>
             </SafeAreaViewC>
        );
    }
}


export default withToast(withLoader(InitScreen));


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white'
    },
    content:{
        flex:1,
        paddingHorizontal: StyleConfig.convertWidthPerVal(24),
    },
    logoWrapper:{
        alignItems:'center',
        justifyContent:'center',
        marginTop: StyleConfig.convertHeightPerVal(20),
        marginVertical:StyleConfig.convertHeightPerVal(40)
    },
    logoStyle:{
        width: StyleConfig.convertWidthPerVal(166),
        height: StyleConfig.convertHeightPerVal(40)
    },
    
    headerText:{
        fontSize:20,
        fontWeight:'bold',
        letterSpacing: 0.33,
        textAlign:'center',
        marginBottom:StyleConfig.countPixelRatio(16)
    },
    buttonContainer:{
        backgroundColor:"#2294E3",
        borderColor:"#2294E3"
    },
    buttonText:{color:'white'},
    detailsText:{
        fontSize:14, 
        marginTop:StyleConfig.convertHeightPerVal(20), 
        color:"#95989a", 
        letterSpacing:0.5, 
        marginHorizontal:StyleConfig.convertWidthPerVal(36), 
        textAlign:'center'   
    },
    
    bottomContainer:{
        height:StyleConfig.convertHeightPerVal(80), 
        alignItems:'center', 
        justifyContent:'center'
    }


});