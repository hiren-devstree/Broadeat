import React, { createContext, useState, useEffect } from 'react'
import { StatusBar, AsyncStorage } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import { Appearance, AppearanceProvider } from 'react-native-appearance'
import lightTheme from './themes/light'
import darkTheme from './themes/dark'
import {KEY_PREF_ANDROID_THEME} from './../helper/Constants'
import StyleConfig from '../assets/styles/StyleConfig'
const defaultMode = 'dark';
const ThemeContext = createContext({
  mode: defaultMode,
  setMode: mode => console.log(mode)
})

export const useTheme = () => React.useContext(ThemeContext)

const getAndroidThemeState = async(callback)=>{
  let themestate = await AsyncStorage.getItem(KEY_PREF_ANDROID_THEME)
  callback(themestate == 'dark' ? 'dark' : 'light')
}


export const ManageThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useState(defaultMode)
  const setMode = mode => {
    setThemeState(mode)
  }
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeState(colorScheme)
    })
    return () => subscription.remove()
  }, [])
  if(!StyleConfig.isIphone){
    getAndroidThemeState( (theme)=>{
      setThemeState(theme)
    })
  }
  
  return (
    <ThemeContext.Provider value={{ mode: themeState, setMode }}>
      <ThemeProvider
        theme={themeState === 'dark' ? darkTheme.theme : lightTheme.theme}>
        <>
          <StatusBar
            barStyle={themeState === 'dark' ? 'light-content' : 'dark-content'}
          />
          {children}
        </>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}