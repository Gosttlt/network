import React from 'react';
import s from './FrendsOnline.module.css';
import Frend from './Frend/Frend';

const FrendsOnline = (props) => {
    let lol = props.state.map((el, index) => {
return (

 <Frend img={el.img} key={index} name={el.user_name} />
 )
    })

    return (
        <div className={s.ava__bar}>
            {lol}
        </div>
    )
}

export default FrendsOnline;