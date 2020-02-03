import * as actionTypes from './actionTypes';

export const puchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData
    }
}

export const puchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    // return dispatch => {
    //     dispatch(purchaseBurgerStart());

    //     axios.post('/orders.json?auth=' + token, orderData)
    //         .then(res => {
    //             dispatch(puchaseBurgerSuccess(res.data.name, orderData));
    //         })
    //         .catch(err => {
    //             dispatch(puchaseBurgerFail(err));
    //         });
    // }
    return {
        type: actionTypes.PURCHASE_BURGER,
        token: token,
        orderData: orderData
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userID) => {
    // return dispatch => {
    //     dispatch(fetchOrdersStart());

    //     const queryParam = '?auth=' + token + '&orderBy="userID"&equalTo="' + userID + '"';
    //     axios.get('/orders.json' + queryParam)
    //         .then(res => {
    //             const fetchedOrders = [];

    //             for (let key in res.data) {
    //                 fetchedOrders.push({
    //                     ...res.data[key],
    //                     id: key
    //                 });
    //             }

    //             dispatch(fetchOrdersSuccess(fetchedOrders));
    //         })
    //         .catch(err => {
    //             dispatch(fetchOrdersFail(err));
    //         });
    // }
    return {
        type: actionTypes.FETCH_ORDERS,
        token: token,
        userID: userID
    }
}