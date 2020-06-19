import React from 'react';
import './App.css';
import { Route, withRouter, BrowserRouter, Redirect } from 'react-router-dom';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from './Components/Settings/Settings';
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import LoginPage from './Components/Login/Login';
import { getAuthMe } from './Redux/auth-reducer';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './Redux/app-reducer';
import Preloader from './Components/common/Preloader/preloader';
import store from './Redux/redux-store';
import { WithSuspense } from './Components/hoc/WithSuspense';
const DialogsContainer = React.lazy(()=> import('./Components/Dialogs/DialogsContainer'));




class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className="app-wrapper" >
                <HeaderContainer />
                <NavbarContainer store={this.props.store} />
                <div className="app-wrapper-content" >
                    <Route exect path='/' render={() => <Redirect to="profile" /> } />
                    <Route path='/dialogs' render={ WithSuspense(DialogsContainer)} />
                    <Route path='/profile/:userId?' render={WithSuspense(ProfileContainer)} />
                    <Route path='/users' render={WithSuspense(UsersContainer)} />
                    <Route path='/login' render={WithSuspense(LoginPage)} />
                    <Route path='/news' component={News} />
                    <Route path='/music' component={Music} />
                    <Route path='/settings' component={Settings} />

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, { getAuthMe, initializeApp }))(App);

let SamuraiJSApp = (props) => {
    return <BrowserRouter basename = {process.env.PUBLIC_URL} >
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}
export default SamuraiJSApp;