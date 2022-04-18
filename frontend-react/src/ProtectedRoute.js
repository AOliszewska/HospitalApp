import React from "react";
import {Redirect, Route} from "react-router-dom";
import {isAuthenticated} from "./helpers/authHelper";

function ProtectedRoute({component: Component, ...restOfProps}){

    const isAuth = isAuthenticated();

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuth ? <Component {...props} /> : <Redirect to="/login"/>
            }
        />
    );
}
export default ProtectedRoute;
