import { userAPI } from "../Components/api/api";
import { updateObjectInArray } from "../Components/utils/object-helpers";

const FOLLOW_USER = 'FOLLOW-USER';
const UNFOLLOW_USER = 'UNFOLLOW-USER';
const SET_USERS = 'SET-USERS';
const SET_CORRENT_PAGE = 'SET-CORRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 3000,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}



const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })


                // state.users.map(u => {
                //     if (action.userId === u.id) {
                //         return { ...u, followed: true }
                //     }
                //     return u
                // })
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


export const followSuccess = (userId) => ({ type: FOLLOW_USER, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW_USER, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CORRENT_PAGE, currentPage })
export const setUsersTotalCount = (count) => ({ type: SET_TOTAL_USERS_COUNT, count })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, id) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id })


export const getUsers = (currentPage = 1, pageSize = 5) => {
    return (dispatch) => {
        dispatch(setCurrentPage(currentPage))
        dispatch(toggleIsFetching(true));
        userAPI.getUsers(currentPage, pageSize).then((data) => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setUsersTotalCount(data.totalCount));
        });

    }
}
const followUnfollowFlow = async (userId, dispatch, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await apiMethod(userId);
    if (data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))


}
export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(userId, dispatch, userAPI.userFollow.bind(userAPI), followSuccess)
    }
}
export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(userId, dispatch, userAPI.userUnfollow.bind(userAPI), unfollowSuccess)
    }
}

// export const follow = (userId) => {
//     return async (dispatch) => {
//         dispatch(toggleFollowingProgress(true, userId))
//         let data = await userAPI.userFollow(userId);
//         if (data.resultCode == 0) {
//             dispatch(followSuccess(userId))
//         }
//         dispatch(toggleFollowingProgress(false, userId))
//     }
// }
// export const unfollow = (userId) => {
//     return async (dispatch) => {
//         dispatch(toggleFollowingProgress(true, userId))
//         let data = await userAPI.userUnfollow(userId)
//         if (data.resultCode == 0) {
//             dispatch(unfollowSuccess(userId))
//         }
//         dispatch(toggleFollowingProgress(false, userId))
//     }
// }


export default usersReducer;