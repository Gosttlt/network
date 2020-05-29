import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/preloader';
import ava from '../../../img/ava2.jpg';
import StatusProfileWithHooks from './ProfileStatusWithHooks';



const ProfileInfo = ({profile, status, getUpdateStatus, isOwner, savePhoto}) => {
  if(!profile) {
    return <Preloader />
  }
  const onMainPhotoSelected = (e) => {
    savePhoto(e.target.files[0])
  }
  return (
    <div className={s.ProfileInfo}>
      <img className={s.content_img} src="https://million-wallpapers.ru/wallpapers/0/15/11948421390036774686/otpusk-okean-plyazh.jpg" />
      <div className={s.ava_box}>
        <img className={s.ava_img} src={profile.photos.small || ava} />
        {isOwner && <input type="file" className={s.inputFile} onChange={onMainPhotoSelected}/>}
        </div>
        <div className={s.discription}>
         <b>Имя:</b> {profile.fullName}<br/>
         <b>Страна:</b> Россия<br/>
         <b>Город:</b> Тольятти<br/>
         <b>В поисках работы?: </b>{profile.lookingForAJob? 'Да' : 'Нет'}<br/>
         <b>Пожелания к работе: </b>{profile.lookingForAJobDescription}<br/>
         <b>Статус: </b><StatusProfileWithHooks status={status} getUpdateStatus={getUpdateStatus}/>
      </div>
      
    </div>
  )
}
export default ProfileInfo;