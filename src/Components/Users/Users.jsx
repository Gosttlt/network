import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User'

const Users = ({ onPageChanged, currentPage, usersPage, totalUsersCount, pageSize, ...props }) => {
    return (
        <div>
            <Paginator onPageChanged={onPageChanged} currentPage={currentPage} usersPage={usersPage} totalItemsCount={totalUsersCount} pageSize={pageSize} />
            <div>
                {usersPage.map((u) => <User user={u} key={u.id} followingInProgress={props.followingInProgress} unfollow={props.unfollow} follow={props.follow} />)}
            </div>
        </div>
    )
}

export default Users