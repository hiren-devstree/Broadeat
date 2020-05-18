import React, {Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet

} from 'react-native';
import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { SafeAreaView, View1CC, Devider, CText,CTextColor } from '../components/common'; 
class EmailVerifyScreen extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <SafeAreaView {...this.props}>
            <View1CC {...this.props} >
      
                    <View style={styles.logoWrapper}>
                        <Image
                        resizeMode={'contain'}
                        style={styles.logoStyle}
                        source={AppImages.ic_broad_eat}
                        />
                    </View>
                    <View style={styles.content}>
                        <CTextColor
                            color={"#2294E3"}
                            fontSize={StyleConfig.countPixelRatio(20)}
                        >{'Account created successfully.\nVerify your email to continue.'}</CTextColor>
                    </View>
                    <Devider height={StyleConfig.convertHeightPerVal(6)} />
                    <View style={styles.bottomContainer}>
                        <View style={{ flexDirection:'row'}}>
                            <CText fontSize={StyleConfig.countPixelRatio(16)}>Have an account?<Text onPress={()=> this.props.navigation.navigate('Login')} style={{color:"#2294E3"}}> Log in</Text></CText>
                        </View>
                    </View>
                </View1CC>
            </SafeAreaView>
        );
    }
}


export default EmailVerifyScreen ;
const styles = StyleSheet.create({
    logoWrapper:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:StyleConfig.convertHeightPerVal(40)
    },
    logoStyle:{
        width: StyleConfig.convertWidthPerVal(166),
        height: StyleConfig.convertHeightPerVal(40)
    },
    content:{
        flex:1,
        paddingHorizontal: StyleConfig.convertWidthPerVal(30),
    },
   
    bottomContainer:{
        height:StyleConfig.convertHeightPerVal(72), 
        alignItems:'center', 
        justifyContent:'center'
    }


});