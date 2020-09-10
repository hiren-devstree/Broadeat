import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import withLoader from '../redux/actionCreator/withLoader';
import withToast from '../redux/actionCreator/withToast';
import { SafeAreaViewC, CButtonColor, CTextColor, CTextColor2 } from '../components/common';
import BaseComponent from '../containers/BaseComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommonActions } from '@react-navigation/native';

class InitScreen extends BaseComponent {

    componentDidMount= () =>{
        AsyncStorage.getItem('is_remember').then((response)=>{
            if(response != null && response != undefined && response != '0'){
                this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Dashboard' }] }))
            }
        })
    }

    render() {
        return (
            <SafeAreaViewC>
                <View style={styles.content}>
                    <Image
                        resizeMode={'contain'}
                        style={styles.logoStyle}
                        source={AppImages.ic_broad_eat}
                    />
                    <View style={{ flex: 1 }} />
                    <View style={{ marginHorizontal: StyleConfig.convertWidthPerVal(46) }} >
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                            </View>
                            <View style={{ height: StyleConfig.convertHeightPerVal(95),
                                    //backgroundColor:'#ffffff99', 
                                    alignItems:'flex-start',
                                    justifyContent:'space-around',
                                    minWidth:StyleConfig.countPixelRatio(200),
                                     }} >
                                         <View style={{height:StyleConfig.convertHeightPerVal(35), }}>    
                                        <CTextColor2 color={"#8A8A8F"} fontSize={StyleConfig.countPixelRatio(32)}>{'Welcome'}</CTextColor2>
                                        </View>
                                        <View style={{height:StyleConfig.convertHeightPerVal(35), position:'absolute', marginTop:StyleConfig.convertHeightPerVal(20)}}>    
                                <CTextColor2 color={"#8A8A8F"} align={'left'} fontSize={StyleConfig.countPixelRatio(30)}>{'to'}<CTextColor2 color={"#fa9000"} fontSize={StyleConfig.countPixelRatio(30)}>{" BROAD"}<CTextColor2 color={"#80d155"} fontSize={StyleConfig.countPixelRatio(39)}>{'eat'}</CTextColor2></CTextColor2></CTextColor2>
                                </View>
                                <View style={{height:StyleConfig.convertHeightPerVal(20), position:'absolute', marginTop:StyleConfig.convertHeightPerVal(56) }}>
                                <CTextColor2 color={"#8A8A8F"} fontSize={StyleConfig.countPixelRatio(18)}>{'Broadcast your recipes!'}</CTextColor2>
                                </View>
                                
                        </View>
                        </View>
                        
                        {/* <Image
                            source={AppImages.welcome_broadeat}
                            resizeMode={'contain'}
                            style={{
                                height: StyleConfig.convertHeightPerVal(95),
                                width: StyleConfig.convertWidthPerVal(202),
                                alignSelf: 'flex-end'
                            }}
                        /> */}
                        <CButtonColor
                            color={"#83D557"}
                            borderColor={"#fff"}
                            onPress={() => this.props.navigation.navigate('Register')}
                            containerStyle={{ marginBottom: StyleConfig.convertHeightPerVal(22), marginTop: StyleConfig.convertHeightPerVal(27) }}
                        >
                            <CTextColor style={{ marginTop: 2 }} color={"#fff"} fontWeight={'bold'} fontSize={StyleConfig.countPixelRatio(20)}>{'SIGN UP'}</CTextColor>
                        </CButtonColor>

                        <CButtonColor
                            color={"#fff"}
                            borderColor={"#83D557"}
                            onPress={ () => this.props.navigation.navigate('Login') } >
                            <CTextColor style={{ marginTop: 2 }} color={"#83D557"} fontWeight={'bold'} fontSize={StyleConfig.countPixelRatio(20)}>{'LOGIN'}</CTextColor>
                        </CButtonColor>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: StyleConfig.convertHeightPerVal(60), marginBottom: StyleConfig.convertHeightPerVal(20) }}>
                            <Icon name="chevron-up" size={16} color="#8A8A8F" />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: StyleConfig.convertHeightPerVal(28) }}>
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
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
        paddingHorizontal: StyleConfig.convertWidthPerVal(24),
    },
    logoWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StyleConfig.convertHeightPerVal(20),
        marginVertical: StyleConfig.convertHeightPerVal(40)
    },
    logoStyle: {
        width: StyleConfig.convertWidthPerVal(166),
        height: StyleConfig.convertHeightPerVal(40)
    },

    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.33,
        textAlign: 'center',
        marginBottom: StyleConfig.countPixelRatio(16)
    },
    buttonContainer: {
        backgroundColor: "#2294E3",
        borderColor: "#2294E3"
    },
    buttonText: { color: 'white' },
    detailsText: {
        fontSize: 14,
        marginTop: StyleConfig.convertHeightPerVal(20),
        color: "#95989a",
        letterSpacing: 0.5,
        marginHorizontal: StyleConfig.convertWidthPerVal(36),
        textAlign: 'center'
    },

    bottomContainer: {
        height: StyleConfig.convertHeightPerVal(80),
        alignItems: 'center',
        justifyContent: 'center'
    }


});