import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

function Orders({ order, auth, onFetchOrders }) {
    useEffect(() => {
        onFetchOrders(auth.token, auth.userID);
    }, [onFetchOrders, auth.token, auth.userID]);

    let orders = order.orders.map(order => {
        return <Order
            key={order.id}
            ingredients={order.ingredients}
            totalPrice={order.totalPrice} />
    });

    if (order.loading) {
        orders = <Spinner />;
    }

    return (
        <div>
            {orders}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        order: state.orderReducer,
        auth: state.authReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userID) => dispatch(actions.fetchOrders(token, userID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));