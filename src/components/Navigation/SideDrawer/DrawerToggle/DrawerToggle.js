import React from 'react';

import styles from './DrawerToggle.module.css';

function DrawerToggle({ clicked }) {
    return (
        <div onClick={clicked} className={styles.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default DrawerToggle;