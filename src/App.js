import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import Spinner from "./components/UI/Spinner/Spinner";

import * as actions from "./store/actions/index";

const Auth = lazy(() => import("./containers/Auth/Auth"));
const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
const Orders = lazy(() => import("./containers/Orders/Orders"));

function App({ onTryAutoSignIn, isAuthenticated }) {
    useEffect(() => {
        onTryAutoSignIn();
    }, [onTryAutoSignIn]);

    let routes = (
        <Switch>
            <Route path="/auth" component={Auth} />
            <Route exact path="/" component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
    );

    if (isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/logout" component={Logout} />
                <Route exact path="/" component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<Spinner />}>{routes}</Suspense>
            </Layout>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignIn: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
