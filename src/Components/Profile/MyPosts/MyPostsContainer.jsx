import { addPost } from '../../../Redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';

let mapStateToProps = (state) => {


  return {
    postsValue:state.profilePage.PostsValue,
    postData:state.profilePage.PostsData,
  }
}


const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts);

export default MyPostsContainer;