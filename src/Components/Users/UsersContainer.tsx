import React from 'react'
import Users from './Users'
import { connect } from 'react-redux'
import {setCurrentPage, toggleFollowingProgress, getUsers, follow, unfollow } from '../../Redux/users-reducer'
import { compose } from 'redux'
import Preloader from '../common/Preloader/preloader'
import { getUsersSelect, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../Redux/users-selectors'
import {UserType} from '../../types/types'
import {AppStateType} from '../../Redux/redux-store'


type MapStatePropsType = {
    currentPage:number
    pageSize: number
    isFetching: boolean
    totalUsersCount:number
    users: Array<UserType>
    followingInProgress:Array<number>
}
type MapDispatchPropsType = {
    getUsers:(currentPage:number,  pageSize: number) => void
    unfollow: (userId:number) => void
    follow: (userId:number) => void
}
type ownPropsType= {
    pageTitle:string
}


type PropsType = MapStatePropsType & MapDispatchPropsType & ownPropsType



class UsersContainer extends React.Component <PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
            this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber:number) => {
        const {pageSize, getUsers} = this.props;
        getUsers(pageNumber, pageSize)
      
    }

    render() {
        
        return <>
        <h2>{this.props.pageTitle}</h2>
      {this.props.isFetching ? <Preloader /> : null}
        <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            followingInProgress={this.props.followingInProgress}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
        />
        
        </>
    }
}

let mapStateToProps = (state:AppStateType):MapStatePropsType => {    
    return {
        users: getUsersSelect(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress:getFollowingInProgress(state),
    }
}

export default compose(
    connect <MapStatePropsType, MapDispatchPropsType, ownPropsType, AppStateType>(mapStateToProps, { follow,  getUsers, unfollow})
    )(UsersContainer)
