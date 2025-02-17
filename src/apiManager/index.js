import React from 'react'
import {
  KEY_POST_LOGIN,
  REGISTER_URL,
  FORGOT_PASSWORD_URL,
  CHANGE_PASSWORD_URL,
  ADD_RECIPE_URL,
  RECIPE_DATA_URL,
  USER_DETAILS_URL,
  UPDATE_USER_DETAILS_URL,
  FAVOURITE_LIST_URL,
  BOOKMARK_USER_URL, TAG_URL,
  SEARCH_RECIPE_URL,
  GET_RECIPE_DETAILS_URL,
  GET_USER_WISE_RECIPE_DETAILS_URL,
  GET_RECENT_SEARCH_URL,
  DELETE_SEARCH_RECORD_URL,
  DELETE_RECIPE,
  FILTER_URL,
  POST_ADD_UPDATE_ACTIVITY,
  POST_USER_BOOKMARK,
  GET_COMMENT_LIST,
  POST_COMMENT_LIST,
  DELETE_COMMENT,
  SAVE_APP_USED
} from './../helper/Constants'


const ApiManager = {

  saveAppUsed: async (start_time, end_time, token) => {
    console.log({ start_time, end_time })
    return fetch(SAVE_APP_USED, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        start_time, end_time
      })
    }).then((response) => {
      return response.json()
    }, function (error) {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    });
  },
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
    await fetch("http://3.20.100.25/broadeat/api/recipe/add", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      body: data
    }).then((response) => response.json()).then((json) => {
      console.log({ "ADD_CONTANT_RES": json })
      return json;
    }, (error) => {
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
  deleteComment: async (token, commentId) => {
    console.log('DELETE COMMENT CALLED!!!!')
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json")

    return fetch(`${DELETE_COMMENT}${commentId}`, {
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

    return fetch(UPDATE_USER_DETAILS_URL, {
      method: 'POST',
      headers: myHeaders,
      body: data
    }).then((response) => {
      return response.text()
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
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json")

    return fetch(SEARCH_RECIPE_URL, {
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
  postUserBookmark: async (data, token) => {
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json")

    return fetch(POST_USER_BOOKMARK, {
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
  getRcipeDetails: async (data, token) => {
    console.log('GET RECIPE DETAILS Data: ', data)
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append('Content-Type', 'application/json')

    return fetch(GET_RECIPE_DETAILS_URL, {
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
  getUserWiseRcipeDetails: async (data, token) => {
    console.log('GET USER WISE RECIPE DETAILS Data: ', data)
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append('Content-Type', 'application/json')

    return fetch(GET_USER_WISE_RECIPE_DETAILS_URL, {
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
  getRecentSearch: async (token) => {
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)

    return fetch(GET_RECENT_SEARCH_URL, {
      method: 'GET',
      headers: myHeaders,
    }).then((response) => response.json()
    ).then((res) => {
      console.log(res);
      return res;
    }).catch((error) => {
      console.log('error', error)
    });
  },
  deleteSearchRecord: async (data, token) => {
    console.log('DELETE SEARCH RECORD Data: ', data)
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`)

    return fetch(DELETE_SEARCH_RECORD_URL, {
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
  deleteReceipe: async (recipeId, token) => {
    console.log('DELETE Recipe ID: ', `${DELETE_RECIPE}${recipeId}`)
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`)

    return fetch(`${DELETE_RECIPE}${recipeId}`, {
      method: 'GET',
      headers: myHeaders
    }).then((response) => {
      return response.json()
    }, function (error) {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    });
  },
  applyFilters: async (data, token) => {
    console.log('FILTER API CALLED Data: ', data)
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json")

    return fetch(FILTER_URL, {
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
  postFavorite: async (data, token) => {
    console.log('FAVORITE API CALLED Data: ', data)
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json")

    return fetch(POST_ADD_UPDATE_ACTIVITY, {
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
  getCommentList: async (token, recipeId) => {
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)

    console.log('GET_COMMENT_LIST API: ', GET_COMMENT_LIST + `${recipeId}`)

    return fetch(GET_COMMENT_LIST + `${recipeId}`, {
      method: 'GET',
      headers: myHeaders,
    }).then((response) => response.json()
    ).then((res) => {
      console.log("getCommentList ", res);
      return res;
    }).catch((error) => {
      console.log('error', error)
    });
  },
  postComment: async (data, token) => {
    console.log('COMMENT LIST API CALLED Data: ', data)
    await fetch(POST_COMMENT_LIST, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => response.json()).then((json) => {
      console.log("ADD_CONTANT_RES", json)
      return json;
    }, (error) => {
      console.log('error', error)
    }).catch((error) => {
      console.log('error', error)
    })
  },
}
module.exports = ApiManager;