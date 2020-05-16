import React from 'react'
import {  AppearanceProvider } from 'react-native-appearance'
import {ManageThemeProvider} from './ManageThemeProvider'
export const ThemeManager = ({ children }) => (
    <AppearanceProvider>
      <ManageThemeProvider>{children}</ManageThemeProvider>
    </AppearanceProvider>
  )

 