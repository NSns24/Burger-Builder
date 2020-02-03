import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../helpers/utility';

function Auth({ auth, burger, onAuth, onSetAuthRedirectPath, isAuthenticated }) {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            error: null
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            error: null
        }
    });

    const [isSignUp, setIsSignUp] = useState(true);

    useEffect(() => {   
        if (!burger.building && auth.authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [onSetAuthRedirectPath, burger.building, auth.authRedirectPath]);

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...authForm
        }

        const updatedFormEl = {
            ...updatedForm[inputIdentifier]
        }

        updatedFormEl.value = event.target.value;
        updatedFormEl.touched = true;
        const msgError = checkValidity(updatedFormEl.value, updatedFormEl.validation);
        if (msgError !== '') {
            updatedFormEl.valid = false;
            updatedFormEl.error = inputIdentifier + ' ' + msgError;
        }
        else {
            updatedFormEl.valid = true;
            updatedFormEl.error = null;
        }
        updatedForm[inputIdentifier] = updatedFormEl;

        setAuthForm(updatedForm);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        onAuth(authForm.email.value, authForm.password.value, isSignUp);
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(prevState => !prevState);
    }

    const formElArr = [];
    for (let key in authForm) {
        formElArr.push({
            id: key,
            config: authForm[key]
        });
    }

    let form = formElArr.map(formEl => (
        <Input
            key={formEl.id}
            elementType={formEl.config.elementType}
            elementConfig={formEl.config.elementConfig}
            value={formEl.config.value}
            invalid={!formEl.config.valid}
            touched={formEl.config.touched}
            errorMessage={formEl.config.error}
            changed={(e) => inputChangedHandler(e, formEl.id)} />
    ));

    if (auth.loading) {
        form = <Spinner />;
    }

    let erroMsg = null;

    if (auth.error) {
        erroMsg = <p>{auth.error.message}</p>;
    }

    if (isAuthenticated) {
        return <Redirect to={auth.authRedirectPath} />
    }

    return (
        <div className={styles.auth}>
            <h2>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</h2>
            {erroMsg}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthModeHandler}>{isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer,
        isAuthenticated: state.authReducer.token !== null,
        burger: state.burgerReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass, isSignUp) => dispatch(actions.auth(email, pass, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);