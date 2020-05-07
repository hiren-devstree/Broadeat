import React, {Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    ScrollView

} from 'react-native';
import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { TextInputWithIcon } from '../components/common/TextInputs';
import {Button} from '../components/common/Buttons';
class LoginScreen extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <SafeAreaView style={styles.container} >
                <View style={styles.container} >
                    <View style={styles.logoWrapper}>
                        <Image
                        resizeMode={'contain'}
                        style={styles.logoStyle}
                        source={AppImages.ic_broad_eat}
                        />
                    </View>
                    <View style={styles.content}>
                        <ScrollView>
                        <Text style={styles.headerText}>Sign up to see your favorite food recipes.</Text>
                        <TextInputWithIcon 
                            icon={AppImages.ic_mail} 
                            placeholder={'Email'}
                        />
                        <TextInputWithIcon 
                            icon={AppImages.ic_lock} 
                            placeholder={'Password'}
                            secureTextEntry={true}
                        />
                        <Button 
                            onPress={()=>alert("Sign Up")}
                            containerStyle={styles.buttonContainer}
                            textStyle={styles.buttonText}
                            text={'Sign In'}
                        />
                        <Text style={styles.detailsText}>{'By signing up, you agree to our Terms, Data Policy and Cookies Policy.'}</Text>
                    </ScrollView>
                    </View>
                    <View style={styles.devider} />
                    <View style={styles.bottomContainer}>
                            <Text style={{fontSize:16, color:'#000'}}>Have an account?<Text onPress={()=> this.props.navigation.navigate('Register')} style={{color:"#2294E3"}}> Sign Up</Text></Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}


export default LoginScreen ;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
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
        paddingHorizontal: StyleConfig.convertWidthPerVal(48),
    },
    headerText:{
        fontSize:20,
        fontWeight:'bold',
        color:'#8a8a8f',
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
    devider:{
        height:StyleConfig.countPixelRatio(10),
        backgroundColor:"#EFEDED", 
        borderWidth:0.5, 
        borderColor:"#95989a"
    },
    bottomContainer:{
        height:StyleConfig.convertHeightPerVal(80), 
        alignItems:'center', 
        justifyContent:'center'
    }


});