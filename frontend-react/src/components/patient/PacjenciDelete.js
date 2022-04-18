import React from "react";
import {Redirect, useParams} from "react-router-dom";
import {deletePatientApiCall, getPatientApiCall} from "../../apiCalls/patient/patientApiCalls";

function PacjenciDelete() {
    let {userId} = useParams();
    userId = parseInt(userId);

    let response;

    let notice = 'Pomyślnie usunięto pacjenta';

    let promise = deletePatientApiCall(userId)
    let user = getPatientApiCall();
    if (promise) {
        promise.then( (data) => {
                    response = data
                    if (response.status === 201 || response.status === 500) {
                        notice = 'Błąd przy usuwaniu pacjenta';
                    }
                })

    }

    return (

        <Redirect to={{
            pathname: "/Patients",
            state: {
                notice: notice
            }
        }} />
    )
}

export default PacjenciDelete;