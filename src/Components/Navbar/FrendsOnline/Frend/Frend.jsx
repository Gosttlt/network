import React from 'react';
import s from './../FrendsOnline.module.css';
 const Frend = (props) => {
return (
<a href="#"><div className={s.ava_Online_Bar}> <img className={s.ava_img} src={props.img} alt=""/> <p className={s.userName}>{props.name}</p></div></a>
)
 }
 export default Frend;