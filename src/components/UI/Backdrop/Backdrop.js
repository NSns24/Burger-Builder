import React from 'react';

import styles from './Backdrop.module.css';

function Backdrop({ show, clicked }) {
    return (
        show ? <div className={styles.backdrop} onClick={clicked}></div> : null
    )
}

export default Backdrop;