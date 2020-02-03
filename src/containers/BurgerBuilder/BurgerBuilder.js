import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export function BurgerBuilder({ history, burger, onAddedIngredients, 
        onRemovedIngredients, onInitIngredients, onInitPurchase, 
        isAuthenticated, onSetAuthRedirectPath 
    }) {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const purchaseStatus = (ingredients) => {
        const sum = Object.values(ingredients).map(val => {
            return val;
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) setPurchasing(true);
        else {
            onSetAuthRedirectPath('/checkout');
            history.push('/auth');
        }
    }

    const cancelPurchaseHandler = () => {
        setPurchasing(false);
    }

    const continuePurchaseHandler = () => {
        // const queryParams = [];
        // for (let i in burger.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(burger.ingredients[i]));
        // }
        // queryParams.push('price=' + burger.totalPrice);

        // const queryString = queryParams.join('&');

        // history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });

        onInitPurchase();
        history.push('/checkout');
    }

    const disableInfo = {
        ...burger.ingredients
    };

    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }

    let modalBody = null;
    let mainBody = burger.error ? 
        <p style={{textAlign: 'center'}}>Error Loading Ingredients: {burger.error.message}</p> : 
        <Spinner />;

    if (burger.ingredients) {
        mainBody = (
            <>
                <Burger ingredients={burger.ingredients} />
                <BuildControls
                    isAuth={isAuthenticated}
                    addIngredient={onAddedIngredients}
                    removeIngredient={onRemovedIngredients}
                    disabledInfo={disableInfo}
                    totalPrice={burger.totalPrice}
                    purchaseable={purchaseStatus(burger.ingredients)}
                    ordered={purchaseHandler} />
            </>
        );

        modalBody = (
            <OrderSummary
                ingredients={burger.ingredients}
                totalPrice={burger.totalPrice}
                canceled={cancelPurchaseHandler}
                continued={continuePurchaseHandler} />
        );
    }
   
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={cancelPurchaseHandler}>
                {modalBody}
            </Modal>
            {mainBody}
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        burger: state.burgerReducer,
        isAuthenticated: state.authReducer.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddedIngredients: (ingName) => dispatch(actions.addIngredient(ingName)),
        onRemovedIngredients: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));