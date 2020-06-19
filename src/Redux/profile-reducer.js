import { profileAPI } from "../Components/api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO = 'SAVE_PHOTO';

let initialState = {
    PostsData: [
        { img: 'https://avatars.mds.yandex.net/get-pdb/1025945/86f10e6d-eab5-4572-8c07-c672b854d2a5/s1200?webp=false', likeCount: '20', user_name: 'Ivan Ivanov', text: 'post 1 teeeext raznii' },
        { img: 'https://avatars.mds.yandex.net/get-pdb/1667260/3ec2154a-cd3f-4c24-b13b-6c60951dd0b0/s1200', likeCount: '30', user_name: 'Vasilii Ivanov', text: 'post 2 teeeext raznii' },
        { img: 'https://i.livelib.ru/auface/471251/o/ab9f/Yurij_Belous.jpg', likeCount: '10', user_name: 'Petr Ivanov', text: 'post 3 teeeext raznii' },
    ],
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let body = action.postValue;
            return {
                ...state,
                PostsData: [{
                    img: 'https://i.livelib.ru/auface/471251/o/ab9f/Yurij_Belous.jpg',
                    likeCount: '0',
                    user_name: 'Petr Ivanov',
                    text: body,
                }, ...state.PostsData]
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return { ...state, status: action.status }
        case SAVE_PHOTO:
            return { ...state, profile: { ...state.profile, photos: action.photoFile } }

        default: return state;

    }
}

export const addPost = (postValue) => ({ type: ADD_POST, postValue });
const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
const setStatus = status => ({ type: SET_STATUS, status });
const setPhotoProfile = photoFile => ({ type: SAVE_PHOTO, photoFile });


export const getProfile = (userId) => {
    return async (dispatch) => {
        let data = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(data))
    }
}

export const getStatus = (userId) => {
    return async (dispatch) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(setStatus(data))
    }
}

export const getUpdateStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode == 0) {
            dispatch(setStatus(status))
        }
    }
}
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode == 0) {
        dispatch(setPhotoProfile(response.data.data.photos))
    }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode == 0) {
        dispatch(getProfile(userId))
    }
    else {
        dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0])

    }
}

export default profileReducer;  