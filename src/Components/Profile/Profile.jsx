import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';



const Profile = (props) => {


  return (
    <div>
      <ProfileInfo saveProfile={props.saveProfile} savePhoto={props.savePhoto} profile={props.profile} status={props.status} getUpdateStatus = {props.getUpdateStatus} isOwner={props.isOwner}/>
      <MyPostsContainer />
    </div>
  )
}
export default Profile;