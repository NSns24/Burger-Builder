import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import styles from './Toolbar.module.css';

function Toolbar({ toggleSide, isAuth }) {
    return (
        <header className={styles.toolbar}>
            <DrawerToggle clicked={toggleSide} />
            <div className={styles.logo}>
                <Logo />
            </div>
            <nav className={styles.desktopOnly}>
                <NavItems isAuth={isAuth} />
            </nav>
        </header>
    )
}

export default Toolbar;