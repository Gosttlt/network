import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getProfile, getStatus, getUpdateStatus, savePhoto } from '../../Redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';



class ProfileContainer extends React.Component {
  refrashProfile(){
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authId;
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.props.getStatus(userId);
    this.props.getProfile(userId);
  }

  componentDidMount() {
    this.refrashProfile()
  }
  componentDidUpdate(prevProps){
if(prevProps.match.params.userId != this.props.match.params.userId){this.refrashProfile()}
  }
  render() {
    return <Profile {...this.props} isOwner={!this.props.match.params.userId} />
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authId: state.auth.id,
    isAuth: state.auth.isAuth,
  }
}

export default compose(
  connect(mapStateToProps, { getProfile, getStatus, getUpdateStatus, savePhoto }),
  withRouter)(ProfileContainer)
