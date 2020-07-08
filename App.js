import React, { Component } from 'react'
import { View } from 'react-native'
import AppNavigator from './src/AppRouter/AppNavigator'
import MainContainer from './src/containers/MainContainer'
import { Provider } from 'react-redux'
import Store from './src/redux/store'
import { ThemeManager } from './src/managers/ThemeManager';
export default class App extends Component<Props> {
  constructor(props) {
    super(props)

    console.disableYellowBox = true
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