import React from "react";
import {Redirect, Route} from "react-router-dom";
import {isDoctor} from "./helpers/authHelper";

function ProtectedDoctorRoute({component: Component, ...restOfProps}){

    const isAuth = isDoctor();

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuth ? <Component {...props} /> : <Redirect to="/"/>
            }
        />
    );
}
export default ProtectedDoctorRoute;
