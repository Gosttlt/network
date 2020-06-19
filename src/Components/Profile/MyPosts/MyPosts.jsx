import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../utils/validators/validators';
import { TextArea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);


const MyPosts = (props) => {
  let PostDataMap = props.postData.map((el, index) => <Post img={el.img} user_name={el.user_name} likesCount={el.likeCount} text={el.text} key={index} />);
  let addPostForm = (postvalue) => {
  props.addPost(postvalue.postvalue)
  }
  
  return (

    <div>
      <div>
        <div className={s.h1Post}>
          My posts
        </div>
        <div className={s.addPostBar}>
     <MyPostsReduxForm onSubmit={addPostForm}/>
        </div>
      </div>
      <div className={s.posts}>
        {PostDataMap}
      </div>
    </div>
  )
}


const MyPostsForm = props => {

  

  return <form onSubmit={props.handleSubmit}>
     <Field component={TextArea} 
     name={'postvalue'} 
     validate={[required, maxLength10]}
     className={s.addPostBar__textarea} cols="100" rows="2" placeholder="Поделитесь, что у вас нового?" /><br />
          <button>Добавить новость</button>
  </form>
}

const MyPostsReduxForm = reduxForm({form:'post'})(MyPostsForm)

export default MyPosts;



