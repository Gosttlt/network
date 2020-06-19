import { authAPI, securityAPI } from "../Components/api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'NETWORK_AUTH_GET_CAPTCHA_URL_SUCCESS';



let initialState  = {
    id: null as null | string, 
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captchaUrl: null as null | string,
}
export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any) :InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    id: string|null
    email: string|null
    login: string|null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (id: string|null, email: string|null, login:string|null, isAuth: boolean) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } });

export type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload:{captchaUrl: string}
}



export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } });

export const getAuthMe = () => async (dispatch: any) => {
    let response = await authAPI.getAuth();
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}



export const login = (email:string, password:string, rememberMe:boolean, captcha:string) => async (dispatch:any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthMe())
    }
    else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error';
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCapchaURL();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}



export default authReducer;