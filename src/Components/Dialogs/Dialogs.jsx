import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';
import AddMessage from './Message/AddMessage/AddMessage';
import { Redirect } from 'react-router-dom';
import { reduxForm } from 'redux-form';


const Dialogs = (props) => { 
    let Dialigi = props.dialogsData.map((el, index) => {
        return <DialogItem id={el.id} name={el.name} key={index} />
    })
    
    let messagesElements = props.messagesData.map((el, index) => {
        return <Message key={index} text={el.message} />
    })
    let addNewMessageValie = (messageValue) => {
        props.addMessage(messageValue.messageValue)
        
    }
 
    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {Dialigi}
            </div>
            <div className={s.messages}>
               <div>{messagesElements}</div>
                <AddMessageForm onSubmit={addNewMessageValie}/>
            </div>
            
        </div>
    )
}

const AddMessageForm = reduxForm({form:'dialogAddMessageForm'})(AddMessage)



export default Dialogs;