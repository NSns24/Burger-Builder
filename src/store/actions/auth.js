import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userID) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userID: userID
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userID');
    return {
        type: actionTypes.AUTH_INIT_LOGOUT
    }
}

export const logoutSuccess = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(logout());
    //     }, expirationTime * 1000);
    // }
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime   
    }
}

export const auth = (email, password, isSignUp) => {
    // return dispatch => {
    //     dispatch(authStart());

    //     const API_KEY = 'AIzaSyB5b9I8G-RJmqLgGzdrJD224WYwMcQLz9o';

    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     };

    //     let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + API_KEY;

    //     if (!isSignUp) {
    //         url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + API_KEY;
    //     }

    //     axios.post(url, authData)
    //         .then(res => {
    //             const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
    //             localStorage.setItem('token', res.data.idToken);
    //             localStorage.setItem('expirationDate', expDate);
    //             localStorage.setItem('userID', res.data.localId);
    //             dispatch(authSuccess(res.data.idToken, res.data.localId));
    //             dispatch(checkAuthTimeout(res.data.expiresIn));
    //         })
    //         .catch(err => {
    //             dispatch(authFail(err.response.data.error));
    //         });
    // }
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignUp: isSignUp
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         dispatch(logout());
    //     }
    //     else {
    //         const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //         if (expirationDate > new Date()) {
    //             const userID = localStorage.getItem('userID');
    //             dispatch(authSuccess(token, userID));
    //             dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    //         }
    //         else {
    //             dispatch(logout());
    //         }
    //     }
    // }
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}