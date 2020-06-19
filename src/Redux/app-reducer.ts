import { getAuthMe} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}


const initialState:InitialStateType = {
    initialized: false,
}


const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        
        default:
            return state;
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}


export const initializedSuccess = () : InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS });
export const initializeApp = () => (dispatch: any) => {
    let promis = dispatch(getAuthMe());
    Promise.all([promis])
        .then(() => {
            dispatch(initializedSuccess())
        })
}


export default appReducer;