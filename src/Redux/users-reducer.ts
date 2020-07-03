import { UserType } from '../types/types';
import { userAPI } from "../Components/api/api";
import { updateObjectInArray } from "../Components/utils/object-helpers";
import { PhotosType } from "../types/types";
import { AppStateType } from './redux-store';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const FOLLOW_USER = 'FOLLOW-USER';
const UNFOLLOW_USER = 'UNFOLLOW-USER';
const SET_USERS = 'SET-USERS';
const SET_CORRENT_PAGE = 'SET-CORRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 3000,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,// array users ids
}
type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CORRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id != action.id)
            }
        }
        default:
            return state;
    }
}

type ActionTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType | 
SetUsersTotalCountActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW_USER
    userId: number
}
export const followSuccess = (userId: number):FollowSuccessActionType => ({ type: FOLLOW_USER, userId })

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW_USER
    userId: number
}
export const unfollowSuccess = (userId:number): UnfollowSuccessActionType => ({ type: UNFOLLOW_USER, userId })

type SetUsersActionType = { 
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>):SetUsersActionType => ({ type: SET_USERS, users })

type SetCurrentPageActionType = {
    currentPage:number
    type: typeof SET_CORRENT_PAGE
}
export const setCurrentPage = (currentPage:number):SetCurrentPageActionType => ({ type: SET_CORRENT_PAGE, currentPage })

type SetUsersTotalCountActionType = {
    count: number
    type: typeof SET_TOTAL_USERS_COUNT
}
export const setUsersTotalCount = (count: number):SetUsersTotalCountActionType => ({ type: SET_TOTAL_USERS_COUNT, count })

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean):ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleFollowingProgressActionType = {
    isFetching: boolean
    id: number
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
}

export const toggleFollowingProgress = (isFetching: boolean, id:number):ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id })

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>


export const getUsers = (currentPage = 1, pageSize = 5):ThunkType => {

    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage))
            let data = await userAPI.getUsers(currentPage, pageSize)
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setUsersTotalCount(data.totalCount));
    }
}
const _followUnfollowFlow = async (userId:number, dispatch:DispatchType, apiMethod:any, actionCreator:(userId:number)=>FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await apiMethod(userId);
    if (data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}
export const follow = (userId:number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(userId, dispatch, userAPI.userFollow.bind(userAPI), followSuccess)
    }
}
export const unfollow = (userId:number):ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(userId, dispatch, userAPI.userUnfollow.bind(userAPI), unfollowSuccess)
    }
}

export default usersReducer;