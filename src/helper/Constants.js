const SERVER = 'http://3.20.100.25/'
const BASE_URL = `${SERVER}broadeat/api/`
export const IMAGE_PATH = `${SERVER}broadeat/`

export const KEY_POST_LOGIN = `${BASE_URL}user/login`
export const REGISTER_URL = `${BASE_URL}user/register`
export const FORGOT_PASSWORD_URL = `${BASE_URL}user/forgotpassword`
export const CHANGE_PASSWORD_URL = `${BASE_URL}user/resetpassword`
export const RECIPE_DATA_URL = `${BASE_URL}recipe/list`
export const ADD_RECIPE_URL = `${BASE_URL}recipe/add`
export const USER_DETAILS_URL = `${BASE_URL}user/get/profile`
export const UPDATE_USER_DETAILS_URL = `${BASE_URL}user/update/profile`
export const FAVOURITE_LIST_URL = `${BASE_URL}recipe/Getfavoritelist`
export const BOOKMARK_USER_URL = `${BASE_URL}recipe/UserBookmarklist`
export const TAG_URL = `${BASE_URL}tag`
export const GET_RECENT_SEARCH_URL = `${BASE_URL}recipe/getSearchList`
export const DELETE_SEARCH_RECORD_URL = `${BASE_URL}recipe/deleteSearchRecord`
export const FILTER_URL = `${BASE_URL}recipe/SearchWithTagsFilter`
export const SEARCH_RECIPE_URL = `${BASE_URL}recipe/search`
export const GET_RECIPE_DETAILS_URL = `${BASE_URL}recipe/data`
export const GET_USER_WISE_RECIPE_DETAILS_URL = `${BASE_URL}recipe/UserRecipeList`
export const POST_ADD_UPDATE_ACTIVITY = `${BASE_URL}recipe/AddUpdateActivity`;
export const POST_USER_BOOKMARK = `${BASE_URL}recipe/UserBookmark`;
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export const KEY_PREF_ANDROID_THEME = "PREF_ANDROID_THEME"