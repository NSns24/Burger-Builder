import React from 'react';
import NavItem from './NavItem/NavItem';

import styles from './NavItems.module.css';

function NavItems({ isAuth }) {
    return (
        <ul className={styles.navItems}>
            <NavItem link="/">Burger Builder</NavItem>
            {isAuth ?
                <>
                    <NavItem link="/orders">Orders</NavItem>
                    <NavItem link="/logout">Logout</NavItem>
                </> :
                <NavItem link="/auth">Authenticate</NavItem>
            }
        </ul>
    )
}

export default NavItems;