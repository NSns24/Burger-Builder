import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import styles from './Logo.module.css';

function Logo() {
    return (
        <div className={styles.logo}>
            <img src={burgerLogo} alt="BurgerBuilder" />
        </div>
    )
}

export default Logo;