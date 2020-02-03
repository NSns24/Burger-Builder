import React from 'react'

import styles from './Button.module.css';

function Button({ children, clicked, btnType, disabled }) {
    return (
        <button
            disabled={disabled}
            className={[styles.Button, styles[btnType]].join(' ')}
            onClick={clicked}>
            {children}
        </button>
    )
}

export default Button;