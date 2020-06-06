import {
    LOADER_SET,
    TOAST_SET,
    INTERNET_CONN_SET,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    UPDATE_PROFILE
} from './actions';

export const loader = (state = false, action) => {
    switch (action.type) {
        case LOADER_SET:
            return action.state;

        default:
            return state;
    }
};

export const toast = (state = '', action) => {
    switch (action.type) {
        case TOAST_SET:
            return action.text;

        default:
            return state;
    }
};

export const internetConn = (state = false, action) => {
    switch (action.type) {
        case INTERNET_CONN_SET:
            return action.state;

        default:
            return state;
    }
};

const userInitialState = {
    token: null,
    userDetails: null,
};

export const user = (state = userInitialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:

            console.log('object', {
                ...state,
                token: action.state.token,
                userDetails: {
                    ...state.userDetails,
                    ...action.state.data,
                },
            });
            
            return {
                ...state,
                token: action.state.token,
                userDetails: {
                    ...state.userDetails,
                    ...action.state.data,
                },
            };

        case UPDATE_PROFILE:
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    ...action.state,
                },
            };

        case LOGOUT_SUCCESS:
            return userInitialState;
        default:
            return state;
    }
};