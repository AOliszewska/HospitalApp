import React from "react";
import {Redirect, useParams} from "react-router-dom";
import {deletePatientDiseaseApiCall, getPatientDiseaseApiCall} from "../../apiCalls/patientdisease/patientdiseaseApiCalls";

function PacjenciChorobaDelete() {
    let {userId} = useParams();
    userId = parseInt(userId);
    let response;
    let notice = 'Pomyślnie usunięto leczenie';
    console.log(userId);
    let promise = deletePatientDiseaseApiCall(userId)
    let user = getPatientDiseaseApiCall();
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
            pathname: "/PacjentChoroba",
            state: {
                notice: notice
            }
        }} />
    )
}
export default PacjenciChorobaDelete;