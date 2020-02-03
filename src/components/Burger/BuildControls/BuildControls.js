import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import styles from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

function BuildControls({ addIngredient, removeIngredient, disabledInfo, totalPrice, purchaseable, ordered, isAuth }) {
    return (
        <div className={styles.buildControls}>
            <p>Current Price : <strong>{totalPrice.toFixed(2)}</strong></p>
            {controls.map(control => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    added={() => addIngredient(control.type)}
                    removed={() => removeIngredient(control.type)}
                    disabled={disabledInfo[control.type]} />
            ))}
            <button
                className={styles.OrderButton}
                disabled={!purchaseable}
                onClick={ordered}>
                {isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
            </button>
        </div>
    )
}

export default BuildControls;