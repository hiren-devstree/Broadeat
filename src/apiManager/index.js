import React from 'react'
import {
  KEY_POST_LOGIN,
  REGISTER_URL
} from './../helper/Constants'


const ApiManager = {
  postLogin: async (email, password) => {
    console.log({email,password})
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
  }
}
module.exports = ApiManager;