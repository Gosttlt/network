import React, { Suspense } from 'react';
import Preloader from '../common/Preloader/preloader';
export let WithSuspense = (Component) => {
    return (props) => {
    return <Suspense fallback={<Preloader/>}> 
        <Component {...props}/> 
        </Suspense>}} 

