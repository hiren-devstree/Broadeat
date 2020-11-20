import React, { Component } from 'react'
import { View, AppState } from 'react-native'
import AppNavigator from './src/AppRouter/AppNavigator'
import MainContainer from './src/containers/MainContainer'
import { Provider } from 'react-redux'
import Store from './src/redux/store'
import { ThemeManager } from './src/managers/ThemeManager';
import * as Sentry from '@sentry/react-native'
import { saveAppUsed } from './src/apiManager'
import { SENTRY_URL, KEY_PREF_START_TIME } from './src/helper/Constants'
import AsyncStorage from '@react-native-community/async-storage'

Sentry.init({ dsn: SENTRY_URL, enableNative: false })

let that = null;
export default class App extends Component {

  constructor(props) {
    super(props)
    console.disableYellowBox = true
    that = this;
  }
  static reloadApp = () => that.forceUpdate()
  componentDidMount() {
    AppState.addEventListener('change',
      this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = async (nextAppState) => {
    let datetime = new Date()
    let dtime = `${datetime.getFullYear()}-${datetime.getMonth() + 1}-${datetime.getDate()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`

    if (nextAppState == 'background') {
      let start_time = await AsyncStorage.getItem(KEY_PREF_START_TIME)
      let token = await AsyncStorage.getItem('user_token')
      console.log(`NextAppState -> ${nextAppState} ${dtime} ${start_time} ${token}`)
      if (start_time != null && token != null) {
        await AsyncStorage.removeItem(KEY_PREF_START_TIME)
        let res = await saveAppUsed(start_time, dtime, token)
        console.log('SaveAppState- ', res)
      }
    } else if (nextAppState == 'active') {
      console.log(`NextAppState -> ${nextAppState} ${dtime}`)
      await AsyncStorage.setItem(KEY_PREF_START_TIME, dtime)

    }
  }
  render() {
    return (
      <ThemeManager>
        <Provider store={Store}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <AppNavigator />
            </View>
            <MainContainer />
          </View>
        </Provider>
      </ThemeManager>
    );
  }
}