import {getCurrentUser} from "../../helpers/authHelper";

const medicineBaseUrl= 'http://localhost:3000/api/prescription'

export function getPrescriptionApiCall(){
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
    const promise = fetch(medicineBaseUrl, options)
    return promise;
}

export function getPrescriptionByIdApiCall(id){
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
    const promise = fetch(url, options);
    return promise;
}
export function getPrescriptionSingleByIdApiCall(userdiseaseId,id){
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
    const url = `${medicineBaseUrl}/${userdiseaseId}/${id}`;
    const promise = fetch(url, options);
    return promise;
}

export function addPresApiCall(patient){
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
    const promise = fetch(medicineBaseUrl, options);
    return promise;
}

export function updatePresApiCall(userId, patient){
    const url = `${medicineBaseUrl}/${userId}`;
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

export function deletePrescriptionApiCall(idMedicine){
    const url = `${medicineBaseUrl}/${idMedicine}`;
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
