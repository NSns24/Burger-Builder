import React from 'react';

import styles from './Input.module.css';

function Input(props) {
    let inputEl = null;
    const inputClasses = [styles.inputEl];
    let validationError = null;

    if (props.invalid && props.touched) {
        inputClasses.push(styles.invalid);
        validationError = <p className={styles.validationError}>{props.errorMessage || 'Invalid Input'}</p>;
    }

    switch(props.elementType) {
        case 'input':
            inputEl = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />
            break;
        case 'textarea':
            inputEl = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />
            break;
        case 'select':
            inputEl = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                        <option value="">Select Dropdown</option>
                        {props.elementConfig.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                        ))}
                </select>
            )
            break;
        default:
            inputEl = <input 
                className={styles.inputEl} 
                {...props.elementConfig} 
                value={props.value} />
    }

    return (
        <div className={styles.input}>
            <label className={styles.label}>{props.label}</label>
            {inputEl}
            {validationError}
        </div>
    )
}

export default Input;