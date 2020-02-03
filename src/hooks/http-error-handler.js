import { useState, useEffect } from "react";

export const useHttpErrorHandler = httpClient => {
    const [error, setError] = useState(null);

    const reqInterceptors = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    const resInterceptors = httpClient.interceptors.response.use(
        res => res,
        err => {
            setError(err);
            return Promise.reject(err);
        }
    );

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptors);
            httpClient.interceptors.response.eject(resInterceptors);
        };
    }, [resInterceptors, reqInterceptors]);

    const errorConfirmHandler = () => {
        setError(null);
    };

    return [error, errorConfirmHandler];
};
