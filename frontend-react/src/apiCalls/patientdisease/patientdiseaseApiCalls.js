import {getCurrentUser} from "../../helpers/authHelper";

const patientsBaseUrl= 'http://localhost:3000/api/userdisease'
const userBaseUrl= 'http://localhost:3000/api/userdisease/one'

export function getPatientDiseaseApiCall(){
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

export function getPatientDiseaseByIdApiCall(id){
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
    const promise = fetch(url,options);
    return promise;
}
export function getPatientDiseaseSingleApiCall(id){
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
    const url = `${userBaseUrl}/${id}`;
    const promise = fetch(url, options);
    return promise;
}

export function addPatientDiseaseApiCall(patient){
    const userString = JSON.stringify(patient);
    const user = getCurrentUser();
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

export function updatePatientDiseaseApiCall(userId, patient){
    const url = `${patientsBaseUrl}/${userId}`;
    const userString = JSON.stringify(patient);
    const user = getCurrentUser();
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

export function deletePatientDiseaseApiCall(idUser){
    const url = `${patientsBaseUrl}/${idUser}`;
    const user = getCurrentUser();
    let token
    if(user && user.token){
        token= user.token
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

