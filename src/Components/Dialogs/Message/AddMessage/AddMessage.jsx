import React from 'react';
import s from './../../Dialogs.module.css';
import { Field } from 'redux-form';
import { TextArea } from '../../../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../../utils/validators/validators';

const maxLength20 = maxLengthCreator(20);

const AddMessage = (props) => {
    return (
        <form className={s.addMessageBar} onSubmit={props.handleSubmit}>
            <Field component={TextArea} 
            name='messageValue' 
            validate={[required, maxLength20]}
            placeholder="Наберите сообщение"  
            className={s.addMessageBar__textarea} cols="100" rows="2" />
            <button className={s.send_message}>Отправить</button>
        </form>
    )
}
export default AddMessage;