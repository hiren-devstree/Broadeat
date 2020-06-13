import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	Alert

} from 'react-native';
import AppImages from '../assets/images';
import StyleConfig from '../assets/styles/StyleConfig';
import { TextInputWithIcon } from '../components/common/TextInputs';
import { Button } from '../components/common/Buttons';
import { SafeAreaView, View1CC, CTextInputWithIcon, Devider, CText } from '../components/common';
import { EMAIL_REGEX } from '../helper/Constants';
import { register } from './../ApiManager'
import withLoader from '../redux/actionCreator/withLoader';
class RegisterScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			fullName: '',
			userName: '',
			password: '',
			cPassword: ''
		}
	}
	
	_onSignUpPressed = () => {
		if (this._validate()) {
			this._registerUser()
		}
	}

	_registerUser = async () => {
		const { loader } = this.props
		
		loader(true)
		const { email, fullName, password , userName} = this.state
		let data = {
			name: fullName,
			email: email,
			username: userName,
			password: password
		}

		let response = await register(data)
		console.log(response)
		if (response.code === 1) {
			this.props.navigation.navigate("EmailVerify")
			// this.props.navigation.dispatch(
			// 	CommonActions.reset({
			// 		index: 1,
			// 		routes: [
			// 			{
			// 				name: 'Dashboard',
			// 			},
			// 		],
			// 	})
			// );
		} else {

		}
		loader(false)
	}

	_validate = () => {
		const { email, fullName, userName, password, cPassword } = this.state

		if (email === '') {
			Alert.alert('Please enter your Email-Address')
			return false
		} else if (!EMAIL_REGEX.test(email)) {
			Alert.alert('Please enter valid Email-Address')
			return false
		} else if (fullName === '') {
			Alert.alert('Please enter Your Full name')
			return false
		} else if (userName === '') {
			Alert.alert('Please enter user name')
			return false
		} else if (password ===' ') {
			Alert.alert('Please enter password')
			return false
		} else if (cPassword === '') {
			Alert.alert('Please enter confirm password')
			return false
		} else if (password != cPassword) {
			Alert.alert('Passwords do not match')
			return false
		} else {
			return true
		}
	}

	render() {
		return (
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
						<ScrollView>
							<Text style={styles.headerText}>Sign up to see your favorite food recipes.</Text>
							<CTextInputWithIcon
								icon={AppImages.ic_mail}
								placeholder={'Email'}
								onChangeText={(val) => this.setState({ email: val })}
								autoCapitalize="none"
								value={this.state.email}
							/>
							<CTextInputWithIcon
								icon={AppImages.ic_contact_mail}
								placeholder={'Full Name'}
								onChangeText={(val) => this.setState({ fullName: val })}
								value={this.state.fullName}
							/>
							<CTextInputWithIcon
								icon={AppImages.ic_account_circle}
								placeholder={'User Name'}
								onChangeText={(val) => this.setState({ userName: val })}
								value={this.state.userName}
							/>
							<CTextInputWithIcon
								icon={AppImages.ic_lock}
								placeholder={'Password'}
								secureTextEntry={true}
								onChangeText={(val) => this.setState({ password: val })}
								value={this.state.password}
							/>
							<CTextInputWithIcon
								icon={AppImages.ic_lock}
								placeholder={'Confirm Password'}
								secureTextEntry={true}
								onChangeText={(val) => this.setState({ cPassword: val })}
								value={this.state.cPassword}
							/>
							<Button
								onPress={() => this._onSignUpPressed()}
								containerStyle={styles.buttonContainer}
								textStyle={styles.buttonText}
								text={'Sign Up'}
							/>
							<Text style={styles.detailsText}>{'By signing up, you agree to our Terms, Data Policy and Cookies Policy.'}</Text>
						</ScrollView>
					</View>
					<Devider height={StyleConfig.convertHeightPerVal(6)} />
					<View style={styles.bottomContainer}>
						<View style={{ flexDirection: 'row' }}>
							<CText fontSize={StyleConfig.countPixelRatio(16)}>Have an account?<Text onPress={() => this.props.navigation.navigate('Login')} style={{ color: "#2294E3" }}> Log in</Text></CText>
						</View>
					</View>
				</View1CC>
			</SafeAreaView>
		);
	}
}


export default withLoader( RegisterScreen);
const styles = StyleSheet.create({
	logoWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: StyleConfig.convertHeightPerVal(40)
	},
	logoStyle: {
		width: StyleConfig.convertWidthPerVal(166),
		height: StyleConfig.convertHeightPerVal(40)
	},
	content: {
		flex: 1,
		paddingHorizontal: StyleConfig.convertWidthPerVal(48),
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#8a8a8f',
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
		height: StyleConfig.convertHeightPerVal(72),
		alignItems: 'center',
		justifyContent: 'center'
	}


});