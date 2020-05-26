import AsyncStorage from '@react-native-community/async-storage'

// USER TOKEN
export const USER_TOKEN = 'USER_TOKEN'
let USER_TOKEN_IS = ''

export const getUserToken = async () => {
  USER_TOKEN_IS = await AsyncStorage.getItem(USER_TOKEN)
  return USER_TOKEN_IS
}

export const setUserToken = token => {
  AsyncStorage.setItem(USER_TOKEN, token.toString())
  log.success('user token saved', token)
}

export const removeUserToken = is => AsyncStorage.setItem(USER_TOKEN, 'USER_TOKEN')