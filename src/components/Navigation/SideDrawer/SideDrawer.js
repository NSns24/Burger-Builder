import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

import styles from './SideDrawer.module.css';

function SideDrawer({ closedSide, open, isAuth }) {
    let attachedClass = [styles.sideDrawer, styles.close];

    if (open) {
        attachedClass = [styles.sideDrawer, styles.open];
    }

    return (
        <Aux>
            <Backdrop show={open} clicked={closedSide} />
            <div className={attachedClass.join(' ')} onClick={closedSide}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems isAuth={isAuth} />
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer;