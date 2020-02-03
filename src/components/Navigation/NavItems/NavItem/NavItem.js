import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.css';

function NavItem({ children, link }) {
    return  (
        <li className={styles.navItem}>
            <NavLink exact activeClassName={styles.active} to={link}>{children}</NavLink>
        </li>
    )
}

export default NavItem;