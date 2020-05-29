import { getAuthMe, login } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const FAKE = 'FAKE';


const initialState = {
    initialized: false,
    fake: 10,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        case FAKE:
            return {
                ...state,
                fake: state.fake + 1,
            }
        default:
            return state;
    }
}
export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });
export const initializeApp = () => (dispatch) => {
    let promis = dispatch(getAuthMe());
    Promise.all([promis])
        .then(() => {
            dispatch(initializedSuccess())
        })
}


export default appReducer;