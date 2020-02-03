import React from 'react';

import styles from './Order.module.css';

function Order({ ingredients, totalPrice }) {
    const ingres = [];

    for (let ingredientName in ingredients) {
        ingres.push({
            name: ingredientName,
            amount: ingredients[ingredientName]
        });
    }

    const ingreOutput = ingres.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount})
            </span>
    });

    return (
        <div className={styles.order}>
            <p>Ingredients:</p>
            {ingreOutput}
            <p>Price :</p>
            <span style={{ margin: '0 8px' }}><strong>Rp {Number.parseFloat(totalPrice).toFixed(2)}</strong></span>
        </div>
    )
}

export default Order;