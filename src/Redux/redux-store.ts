import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import sidebarReducer from './sidebar-reducer';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialigs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReduser} from 'redux-form';
import appReducer from './app-reducer';

let rootReducer = combineReducers({        
    profilePage: profileReducer,
    messagePage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReduser,
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


//@ts-ignore
const composeEnhancers: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunkMiddleware)));
//@ts-ignore
window.store = store;

export default store;
