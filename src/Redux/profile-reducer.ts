import { profileAPI } from "../Components/api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO = 'SAVE_PHOTO';
const DELETE_POST = 'PROFILE-REDUCER/DELETE_POST'

type PostType = {
    img: string
    likeCount: number
    user_name: string
    text: string
    postId: number
}

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type PhotosType = {
    small: null | string
    large: null | string
}


type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

let initialState = {
    PostsData: [
        { img: 'https://avatars.mds.yandex.net/get-pdb/1025945/86f10e6d-eab5-4572-8c07-c672b854d2a5/s1200?webp=false', likeCount: 20, user_name: 'Ivan Ivanov', text: 'post 1 teeeext raznii', postId:0 },
        { img: 'https://avatars.mds.yandex.net/get-pdb/1667260/3ec2154a-cd3f-4c24-b13b-6c60951dd0b0/s1200', likeCount: 30, user_name: 'Vasilii Ivanov', text: 'post 2 teeeext raznii', postId:1 },
        { img: 'https://i.livelib.ru/auface/471251/o/ab9f/Yurij_Belous.jpg', likeCount: 10, user_name: 'Petr Ivanov', text: 'post 3 teeeext raznii', postId:2 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    text: '',

}

export type initialStateType = typeof initialState;





const profileReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                PostsData: [{
                    img: 'https://i.livelib.ru/auface/471251/o/ab9f/Yurij_Belous.jpg',
                    likeCount: 0,
                    user_name: 'Petr Ivanov',
                    text: action.postValue,
                    postId: 3,
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
            return {
                ...state, profile: { ...state.profile, photos: action.photoFile } as ProfileType
            }
        case DELETE_POST: 
        return {
            ...state, 
            PostsData: state.PostsData.filter(post => post.postId !== action.postId)
        }

        default: return state;

    }
}

type AddPostActionType = {
    type: typeof ADD_POST
    postValue: string
}
export const addPost = (postValue: string): AddPostActionType => ({ type: ADD_POST, postValue });
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId })
type SetPhotoProfileActionType = {
    type: typeof SAVE_PHOTO
    photoFile: PhotosType
}
const setPhotoProfile = (photoFile: PhotosType): SetPhotoProfileActionType => ({ type: SAVE_PHOTO, photoFile });


export const getProfile = (userId: number) => {
    return async (dispatch: any) => {
        let data = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(data))
    }
}

export const getStatus = (userId: number) => {
    return async (dispatch: any) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(setStatus(data))
    }
}

export const getUpdateStatus = (status: string) => {
    return async (dispatch: any) => {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode == 0) {
            dispatch(setStatus(status))
        }
    }
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode == 0) {
        dispatch(setPhotoProfile(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode == 0) {
        dispatch(getProfile(userId))
    }
    else {
        dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0])

    }
}

export default profileReducer;  