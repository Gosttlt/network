import React from 'react';
import { fieldCreator, InputForm, TextArea } from '../../common/FormsControls/FormsControls';
import { reduxForm } from 'redux-form';
import s from '../../common/FormsControls//FormsControls.module.css';

const ProfileDataForm = ({ handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
        <div><button>Save</button></div>
        {error && <div className={s.formSummaryEror}>
{error}
        </div>}
        <b>Имя:</b> {fieldCreator('Full name', 'fullName', InputForm, [])}<br />
        <b>В поисках работы?: </b>{fieldCreator('', 'lookingForAJob', InputForm, [], 'checkbox')}<br />
        <div><b>My professional skills: </b><br />
        {fieldCreator('My professional skills', 'lookingForAJobDescription', TextArea, [])}
        </div>
        <b>About me: </b><br />
        {fieldCreator('About me', 'aboutMe', 'textarea', [])}

        {Object.keys(profile.contacts).map(key => {
          return <div key={key}><b>{key}</b> {fieldCreator(key, 'contacts.' + key, InputForm, [])}</div>}) }
      </form>)
  }

const ProfileDataFormReduxForm = reduxForm({form:'edit-profile'})(ProfileDataForm)

  export default ProfileDataFormReduxForm;