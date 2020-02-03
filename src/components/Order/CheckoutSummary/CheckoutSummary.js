import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import { withRouter } from 'react-router-dom';

import styles from './CheckoutSummary.module.css';

function CheckoutSummary({ ingredients, history }) {

    const checkoutCancelHandler = () => {
        history.goBack();
    }

    const checkoutContinueHandler = () => {
        history.replace('/checkout/contact-data');
    }

    return (
        <div className={styles.checkoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={ingredients} />
            </div>
            <Button btnType="Danger" clicked={checkoutCancelHandler}>CANCEL</Button>
            <Button btnType="Success" clicked={checkoutContinueHandler}>CONTINUE</Button>
        </div>
    )
}

export default withRouter(CheckoutSummary);