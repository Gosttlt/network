
import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div className={s.post}>
      <img className={s.ava_post} src={props.img} alt="Пользователь" />
      <div className={s.user_name}><b>{props.user_name}</b></div>
  <div className={s.text}>{props.text}</div>
  <div className={s.like}>Like:{props.likesCount}</div>
    </div>

  )
}
export default Post;