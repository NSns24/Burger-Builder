import React, { useState } from "react";
import { connect } from "react-redux";
import Aux from "../Aux/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import styles from "./Layout.module.css";

function Layout({ children, isAuthenticated }) {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const closeSideDrawerHandler = () => {
        setSideDrawerIsVisible(false);
    };

    const toggleSideDrawerHandler = () => {
        setSideDrawer(prevState => !prevState);
    };

    return (
        <Aux>
            <Toolbar
                isAuth={isAuthenticated}
                toggleSide={toggleSideDrawerHandler}
            />
            <SideDrawer
                isAuth={isAuthenticated}
                closedSide={closeSideDrawerHandler}
                open={sideDrawerIsVisible}
            />
            <main className={styles.content}>{children}</main>
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
