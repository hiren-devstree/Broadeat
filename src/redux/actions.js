export const LOADER_SET = 'loader/SET'
export const TOAST_SET = 'toast/SET'
export const INTERNET_CONN_SET = 'internet/SET'

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"

export const UPDATE_PROFILE = "UPDATE_PROFILE"

// action creators

export const loaderSet = state => ({
    type: LOADER_SET,
    state
});

export const toastSet = text => ({
    type: TOAST_SET,
    text
});

export const internetConnSet = state => ({
    type: INTERNET_CONN_SET,
    state
});

export const loginSuccess = state => ({
    type: LOGIN_SUCCESS,
    state
});