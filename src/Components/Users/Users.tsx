import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User'
import {UserType} from '../../types/types'

type PropsType = {
    totalUsersCount: number
    pageSize: number 
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress:Array<number>
    unfollow: (userId:number) => void
    follow: (userId:number) => void
}

const Users: React.FC<PropsType> = ({ onPageChanged, currentPage, users, totalUsersCount, pageSize, ...props }) => {

    
    return (
        <div>
            <Paginator onPageChanged={onPageChanged} currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize} />
            <div>
                {users.map((u) => <User user={u} key={u.id} followingInProgress={props.followingInProgress} unfollow={props.unfollow} follow={props.follow} />)}
            </div>
        </div>
    )
}

export default Users