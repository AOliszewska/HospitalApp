import React from "react";
import {Redirect, useParams} from "react-router-dom";
import {deleteDiseaseApiCall, getDiseaseApiCall} from "../../apiCalls/disease/diseaseApiCalls";


function ChorobaDelete() {
    let {diseaseId} = useParams();
    diseaseId = parseInt(diseaseId);

    let response;

    let notice = 'Pomyślnie usunięto chorobę';

    let promise = deleteDiseaseApiCall(diseaseId)
    let disease = getDiseaseApiCall();

    if (promise) {
        promise.then( (data) => {
            response = data
            if (response.status === 201 || response.status === 500) {
                notice = 'Błąd przy usuwaniu choroby';
            }
        })

    }

    return (
        <Redirect to={{
            pathname: "/Disease",
            state: {
                notice: notice
            }
        }} />
    )
}

export default ChorobaDelete;