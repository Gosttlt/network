import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/preloader';
import ava from '../../../img/ava2.jpg';
import StatusProfileWithHooks from './ProfileStatusWithHooks';
import { useState } from 'react';
import ProfileDataFormReduxForm from './ProfileDataForm';
import { reduxForm } from 'redux-form';



const ProfileInfo = ({ profile, status, getUpdateStatus, isOwner, savePhoto, saveProfile }) => {
  const [editMode, setEditMode] = useState(false);



  if (!profile) {
    return <Preloader />
  }
  const onMainPhotoSelected = (e) => {
    savePhoto(e.target.files[0])
  }
  const onSubmit = (formData) => {
    saveProfile(formData).then(
      () => {
        setEditMode(false);
      }
    );
  }
  return (
    <div className={s.ProfileInfo}>
      <img className={s.content_img} src="https://million-wallpapers.ru/wallpapers/0/15/11948421390036774686/otpusk-okean-plyazh.jpg" />
      <div className={s.ava_box}>
        <img className={s.ava_img} src={profile.photos.small || ava} />
        {isOwner && <input type="file" className={s.inputFile} onChange={onMainPhotoSelected} />}
      </div>
      <div className={s.discription}>
        {editMode ?
          <ProfileDataFormReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile} /> :
          <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />
        }
        <b>Статус: </b><StatusProfileWithHooks status={status} getUpdateStatus={getUpdateStatus} />
      </div>
    </div>
  )
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
      <b>Имя:</b> {profile.fullName}<br />
      <b>Страна:</b> Россия<br />
      <b>Город:</b> Тольятти<br />
      <b>В поисках работы?: </b>{profile.lookingForAJob ? 'Да' : 'Нет'}<br />
      {profile.lookingForAJob && <div><b>My professional skills: </b>{profile.lookingForAJobDescription}<br /></div>}
      <b>About me: </b>{profile.aboutMe}<br />
      {Object.keys(profile.contacts).map(key => {
        return <Contact contactTitle={key} key={key} contactValue={profile.contacts[key]} />
      })}

    </div>)

}



export const Contact = ({ contactTitle, contactValue }) => {
  return <div><b>{contactTitle}</b>: {contactValue}</div>
}



export default ProfileInfo;