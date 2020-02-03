import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../helpers/utility';

function ContactData({ burger, auth, onOrderBurger, order }) {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            error: null
        },
        street: {
            elementType: 'textarea',
            elementConfig: {
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            error: null
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Postal Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                isNumeric: true
            },
            valid: false,
            touched: false,
            error: null
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            error: null
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
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
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            error: null
        }
    });
    
    const [isFormValid, setIsFormValid] = useState(false); 

    const orderHandler = (e) => {
        e.preventDefault();

        const formData = {};
        for (let formEl in orderForm) {
            formData[formEl] = orderForm[formEl].value;
        }

        const order = {
            ingredients: burger.ingredients,
            totalPrice: burger.totalPrice,
            orderData: formData,
            userID: auth.userID
        }

        onOrderBurger(order, auth.token);
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm
        }

        const updatedFormEl = {
            ...updatedOrderForm[inputIdentifier]
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
        updatedOrderForm[inputIdentifier] = updatedFormEl;

        let formIsValid = true;
        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }
        
        setIsFormValid(formIsValid);
        setOrderForm(updatedOrderForm);
    }

    const formElArr = [];
    for (let key in orderForm) {
        formElArr.push({
            id: key,
            config: orderForm[key]
        });
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElArr.map(formEl => (
                <Input 
                    key={formEl.id}
                    elementType={formEl.config.elementType} 
                    elementConfig={formEl.config.elementConfig} 
                    value={formEl.config.value} 
                    invalid={!formEl.config.valid}
                    touched={formEl.config.touched}
                    errorMessage={formEl.config.error}
                    changed={(e) => inputChangedHandler(e, formEl.id)} />
            ))}
            <Button btnType="Success" disabled={!isFormValid}>ORDER</Button>
        </form>
    );

    if (order.loading) {
        form = <Spinner />;
    }

    return (
        <div className={styles.contactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        burger: state.burgerReducer,
        order: state.orderReducer,
        auth: state.authReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));