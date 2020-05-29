import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { InputForm, fieldCreator } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../utils/validators/validators';
import { login } from '../../Redux/auth-reducer';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import s from '../common/FormsControls/FormsControls.module.css'

const maxLength7 = maxLengthCreator(20);

const LoginForm = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        {fieldCreator('email', 'email', InputForm, [required, maxLength7])}
        {fieldCreator('password', 'password', InputForm, [required, maxLength7], 'password' )}
        {fieldCreator('', 'RememberMe', 'input', [], 'checkbox', 'Remember me')}
        {/* <div><Field placeholder="Email" name={'email'} component={InputForm} validate={[required, maxLength7]}/></div> */}
        {/* <div><Field placeholder="password" name={'password'} component={InputForm} type='password'  validate={[required, maxLength7]}/></div>
        <div><Field type="checkbox" name={'RememberMe'} component={'input'} /> Remember me</div> */}
        {error && <div className={s.formSummaryEror}>
{error}
        </div>}
        <div><button>Login</button></div>
    </form>
}
const LoginReduxForm = reduxForm({form:'login'})(LoginForm);



const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
if(props.isAuth){
    return <Redirect to={'/profile'} />
}
    return <div><h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}


const mapStateToProps = (state) => ({
isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);