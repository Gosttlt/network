import React from 'react';
import s from './FormsControls.module.css';
import { Field } from 'redux-form';

const FormControls = ({input, meta:{error, touched}, children}) => {
    const hasError = error && touched;
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
        <div>
       {children}
        </div>
        {hasError &&  <span>
            {error}
        </span>}
    </div>
    )
}
 
export const TextArea = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControls {...props}><textarea {...restProps} {...input}/></FormControls>
        )
}
export const InputForm = (props) => {
    const {input, meta, ...restProps} = props;
    return (
    <FormControls {...props}><input {...restProps} {...input}/></FormControls>
    )
} 
export const fieldCreator = (placeholder = null, name, component, validate, type = null, text) => {
    return <div>
        <Field placeholder={placeholder} name={name} component={component} validate={validate} type={type}/> {text}
    </div>
}