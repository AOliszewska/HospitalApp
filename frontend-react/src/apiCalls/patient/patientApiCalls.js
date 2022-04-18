import { patientDetailsList} from "./patientApiMockData";
import {getCurrentUser} from "../../helpers/authHelper";

const patientsBaseUrl= 'http://localhost:3000/api/user'

export function getPatientApiCall(){
    const user = getCurrentUser()
    let token
    if(user && user.token){
        token= user.token
    }
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
        },
    }
    const promise = fetch(patientsBaseUrl, options)
    return promise;
}

export function getPatientByIdApiCall(id){
    const user = getCurrentUser()
    let token
    if(user && user.token){
        token= user.token
    }
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
        },
    }
    const url = `${patientsBaseUrl}/${id}`;
    const promise = fetch(url, options);
    return promise;
}

export function addPatientApiCall(patient){
    const user = getCurrentUser()
    const userString = JSON.stringify(patient);
    let token
    if(user && user.token){
        token= user.token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
        },
        body: userString
    }
    const promise = fetch(patientsBaseUrl, options);
    return promise;
}

export function updatePatientApiCall(userId, patient){
    const user = getCurrentUser()
    const url = `${patientsBaseUrl}/${userId}`;
    const userString = JSON.stringify(patient);
    let token
    if(user && user.token){
        token= user.token
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
        },
        body: userString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deletePatientApiCall(idUser){
    const url = `${patientsBaseUrl}/${idUser}`;
    const usertoken = getCurrentUser()
    let token
    if(usertoken && usertoken.token){
        token= usertoken.token
    }
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
        }
    }
    const promise = fetch(url, options);
    return promise;
}
