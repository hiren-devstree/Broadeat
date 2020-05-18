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
import { SafeAreaViewC, CTextColor, Devider, CText, CTextInputWithIcon } from '../components/common'; 
import BaseComponent from '../containers/BaseComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';

class LoginScreen extends BaseComponent{
    constructor(props){
        super(props);
    }
    
   
    onPressSignIn=()=>{
        const {loader, toast} = this.props
        toast({text:"Check"})
        loader(true)
        setTimeout(()=>{
             loader(false)
             this.props.navigation.navigate('Dashboard')
        }, 2000)
    }
    render(){
        return(
            <SafeAreaViewC>
                <View style={styles.content}>
                <View style={styles.logoWrapper}>
                        <Image
                        resizeMode={'contain'}
                        style={styles.logoStyle}
                        source={AppImages.ic_broad_eat}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <ScrollView>
                        <View style={{marginLeft: StyleConfig.convertHeightPerVal(12)}}>
                        <CTextColor align={'left'} color={"#8A8A8F"} fontSize={StyleConfig.countPixelRatio(20)} >Login</CTextColor>
                        </View>
                        <CTextInputWithIcon 
                            icon={AppImages.ic_account_circle} 
                            placeholder={'User Email'}
                            color={'#111'}
                            placeholderTextColor={'#444'}
                            background={'#fff'}
                        />

                        <CTextInputWithIcon 
                            icon={AppImages.ic_lock} 
                            placeholder={'Password'}
                            secureTextEntry={true}
                            color={'#111'}
                            placeholderTextColor={'#444'}
                            background={'#fff'}
                        />
                        
                        <Button 
                            onPress={this.onPressSignIn}
                            containerStyle={styles.buttonContainer}
                            textStyle={styles.buttonText}
                            text={'Sign In'}
                        />
                        
                        <TouchableOpacity style={{marginVertical: StyleConfig.convertHeightPerVal(15)}} onPress={()=> this.props.navigation.navigate('Register')}>
                        <CTextColor
                            color={"#2294E3"}
                            fontSize={StyleConfig.countPixelRatio(16)}
                        >{'Register new Account'}</CTextColor>
                        </TouchableOpacity>

                        <TouchableOpacity style={{marginVertical: StyleConfig.convertHeightPerVal(15)}} onPress={()=> alert('Forgot password screen missing.')}>
                        <CTextColor
                            color={"#2294E3"}
                            fontSize={StyleConfig.countPixelRatio(16)}
                        >{'Forgot Password'}</CTextColor>
                        </TouchableOpacity>
                    </ScrollView>
                    </View>
                  
                </View>
             </SafeAreaViewC>
        );
    }
}


export default withToast(withLoader(LoginScreen));


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white'
    },
    logoWrapper:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:StyleConfig.convertHeightPerVal(130)
    },
    logoStyle:{
        width: StyleConfig.convertWidthPerVal(166),
        height: StyleConfig.convertHeightPerVal(40)
    },
    content:{
        flex:1,
        paddingHorizontal: StyleConfig.convertWidthPerVal(46),
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
        borderColor:"#2294E3",
        marginHorizontal: StyleConfig.convertWidthPerVal(70) 
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