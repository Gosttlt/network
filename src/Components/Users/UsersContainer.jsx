import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import {setCurrentPage, toggleFollowingProgress, getUsers, follow, unfollow } from '../../Redux/users-reducer';
import { withAuthRedirect } from '../hoc/WithAuthRedirect';
import { compose } from 'redux';
import Preloader from '../common/Preloader/preloader';
import { getPageSize, getUsersSel, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, superHardCore } from '../../Redux/selectors';



class UsersContainer extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
            this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber) => {
        const {pageSize, getUsers} = this.props;
        getUsers(pageNumber, pageSize)
      
    }

    render() {
        return <>
      {this.props.isFetching ? <Preloader /> : null}
        <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            usersPage={this.props.usersPage}
            isFetching={this.props.isFetching}
            followingInProgress={this.props.followingInProgress}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            
        />
        
        </>
    }
}

// let mapStateToProps = (state) => {
//     return {
//         usersPage: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress:state.usersPage.followingInProgress,
//     }
// }

let mapStateToProps = (state) => {
  
    return {
        usersPage: getUsersSel(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress:getFollowingInProgress(state),
    }
}
// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (id) => {
//             dispatch(followAC(id))
//         },
//         unFollow: (id) => {
//             dispatch(unfollowAC(id))
//         },
//         setUsers: (users) => {
//             dispatch(setUsers(users))
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPageAC(currentPage))
//         },
//         setUsersTotalCount: (totalCount) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }



export default compose(
    connect(mapStateToProps, 
    {setCurrentPage,toggleFollowingProgress, follow,  getUsers, unfollow}))(UsersContainer)
