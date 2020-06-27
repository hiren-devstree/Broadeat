import React from 'react'
import {
  KEY_POST_LOGIN, REGISTER_URL, FORGOT_PASSWORD_URL, CHANGE_PASSWORD_URL,
  ADD_RECIPE_URL, RECIPE_DATA_URL, USER_DETAILS_URL, UPDATE_USER_DETAILS_URL,
  FAVOURITE_LIST_URL, BOOKMARK_USER_URL, TAG_URL, SEARCH_RECIPE_URL
} from './../helper/Constants'


const ApiManager = {
  postLogin: async (email, password) => {
    console.log({ email, password })
    return fetch(KEY_POST_LOGIN, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    }).then((response) => {
      return response.json()
    }, function (error) {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    });
  },
  register: async (registerData) => {
    console.log(registerData, '!!!!')
    return fetch(REGISTER_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    }).then((response) => {
      return response.json()
    }, function (error) {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    });
  },
  forgotPassword: async (forgotPasswordData) => {
    console.log(forgotPasswordData, '!!!!')
    return fetch(FORGOT_PASSWORD_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(forgotPasswordData)
    }).then((response) => {
      return response.json()
    }, function (error) {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    });
  },
  changePassword: async (data, token) => {
    console.log('Change password data ', data)
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json")

    return fetch(CHANGE_PASSWORD_URL, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json()
    }, function (error) {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    });
  },
  addContentApiCalling: async (data, token) => {
    console.log('addContect Data: ', data)
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append('Content-Type', 'application/json')

    return fetch(ADD_RECIPE_URL, {
      method: 'POST',
      headers: myHeaders,
      body: data
    }).then((response) => {
      return response.json()
    }, function (error) {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    });
  },
  getRecipeData: async (token) => {
    console.log('GET RECIPE CALLED!!!!')
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json")

    return fetch(RECIPE_DATA_URL, {
      method: 'GET',
      headers: myHeaders,
    }).then((response) => {
      return response.json()
    }, function (error) {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    });
  },
  getUserDetails: async (token) => {
    console.log('GET PROFILE CALLED!!!!')
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)

    return fetch(USER_DETAILS_URL, {
      method: 'GET',
      headers: myHeaders,
    }).then((response) => {
      return response.json()
    }, function (error) {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    });
  },
  updateProfile: async (data, token) => {
    console.log('Update profile data ', data)
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json")

    return fetch(UPDATE_USER_DETAILS_URL, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json()
    }, function (error) {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    });
  },
  getUserBookmarkList: async (token) => {
    console.log('GET BOOKMARK USER!!!!')
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)

    return fetch(BOOKMARK_USER_URL, {
      method: 'GET',
      headers: myHeaders,
    }).then((response) => {
      return response.json()
    }, function (error) {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    });
  },
  getFavouriteListRecipe: async (token) => {
    console.log('GET FAVOURITE LIST!!!!')
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)

    return fetch(FAVOURITE_LIST_URL, {
      method: 'GET',
      headers: myHeaders,
    }).then((response) => {
      return response.json()
    }, function (error) {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    });
  },
  getTagList: async (token) => {
    console.log('GET PROFILE CALLED!!!!')
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)

    return fetch(TAG_URL, {
      method: 'GET',
      headers: myHeaders,
    }).then((response) => {
      return response.json()
    }, function (error) {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    });
  },
  getSearchRecipeList: async (data, token) => {
    console.log('GET SEARCH RECIPE CALLED!!!!')
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)

    var raw = JSON.stringify(data)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
    }

    return fetch(TAG_URL, requestOptions).then((response) => {
      return response.json()
    }, function (error) {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    });
  }
}
module.exports = ApiManager;