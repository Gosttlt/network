import React from 'react';
import s from './preloader.module.css'
import preloader from '../../../img/295.gif'

let Preloader = (props) => {

   return <div>
   <img src={preloader} className={s.preloader}/>
    </div>
}

export default Preloader