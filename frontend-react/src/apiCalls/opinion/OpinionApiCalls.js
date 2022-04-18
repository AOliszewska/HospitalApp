import {getCurrentUser} from "../../helpers/authHelper";

const medicineBaseUrl= 'http://localhost:3000/api/opinion'

export function getOpinionApiCall(){
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
    const promise = fetch(medicineBaseUrl,options)
    return promise;
}


export function getOpinionDoctorApiCall(id){
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
    const url = `${medicineBaseUrl}/${id}`;
    const promise = fetch(url,options);
    return promise;
}
export function getOpinionDoctorDetailsApiCall(id){
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
    const url = `${medicineBaseUrl}/details/${id}`;
    const promise = fetch(url,options);
    return promise;
}

export function getOpinionIdApiCall(id){
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
    const url = `${medicineBaseUrl}/opinion/${id}`;
    const promise = fetch(url,options);
    return promise;
}
export function addOpinionApiCall(patient){
    const user = getCurrentUser()
    const userString = JSON.stringify(patient);
    console.log(userString);
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
    const promise = fetch(medicineBaseUrl, options);
    return promise;
}

export function updateOpinionApiCall(userId, patient){
    const user = getCurrentUser()
    const url = `${medicineBaseUrl}/${userId}`;
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
export function deleteOpinionApiCall(idMedicine){
    const url = `${medicineBaseUrl}/${idMedicine}`;
    const user =getCurrentUser();
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