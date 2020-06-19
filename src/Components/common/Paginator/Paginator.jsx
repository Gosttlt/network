import React, { useState } from 'react';
import s from './Paginator.module.css';
import cn from 'classnames';

const Paginator = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 10}) => {
    let pageCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

let portionCount = Math.ceil(pageCount/portionSize);
let [portionNumber, setPortionNumber] = useState(1);
let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
let rightPortionPageNumber = portionNumber * portionSize;


    return <div className={s.pogContainer}>

        {portionNumber > 1 && 
        <button onClick={() => {setPortionNumber(portionNumber -1)}}>Prev</button>
        }
{pages.filter(p => p >= leftPortionPageNumber &&  p<=rightPortionPageNumber).map(p => <span onClick={(e) => {onPageChanged(p)}}
                className={currentPage === p ? s.selectPageActive : null} key={p}>{p}</span>)}

{portionCount > portionNumber && 
<button onClick={() => {setPortionNumber(portionNumber + 1)}}>Next</button> 
}

        </div>
      
}

export default Paginator