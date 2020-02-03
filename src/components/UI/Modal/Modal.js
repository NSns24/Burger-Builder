import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.css';

function Modal({ children, show, modalClosed }) {
    return (
        <Aux>
            <Backdrop show={show} clicked={modalClosed} />
            <div
                className={styles.Modal}
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}>
                {children}
            </div>
        </Aux>
    )
}

export default React.memo(Modal, (prevProps, nextProps) => prevProps.show === nextProps.show && prevProps.children === nextProps.children);