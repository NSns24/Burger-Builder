import React, { } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

function Checkout({ match, burger, order }) {
    // const initState = () => {
    //     const query = new URLSearchParams(location.search);
    //     const ingredients = {};
    //     let price = 0;

    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         }
    //         else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }

    //     return {
    //         ingredients: ingredients,
    //         totalPrice: price
    //     }
    // }

    // const [burger] = useState(() => {
    //     const initialState = initState();
    //     return initialState;
    // });

    let summary = <Redirect to="/" />;

    if (burger.ingredients) {
        const purchaseRedirect =  order.purchased ? <Redirect to="/" /> : null;

        summary = (
            <>
                {purchaseRedirect}
                <CheckoutSummary ingredients={burger.ingredients} />
                {/* <Route path={match.path + '/contact-data'} render={(props) => <ContactData ingredients={burger.ingredients} totalPrice={burger.totalPrice} {...props} />} /> */}
                <Route path={match.path + '/contact-data'} component={ContactData} />
            </>
        );
    }

    return (
        <div>
            {summary}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        burger: state.burgerReducer,
        order: state.orderReducer
    }
}

export default connect(mapStateToProps)(Checkout);