import {getCurrentUser} from "../../helpers/authHelper";

const medicineBaseUrl= 'http://localhost:3000/api/medicine'

export function getMedicineApiCall(){
    const promise = fetch(medicineBaseUrl)
    return promise;
}

export function getMedicineByIdApiCall(id){
    const url = `${medicineBaseUrl}/${id}`;
    const promise = fetch(url);
    return promise;
}


export function addMedicineApiCall(patient){
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

export function updateMedicineApiCall(userId, patient){
    console.log(patient);
    const url = `${medicineBaseUrl}/${userId}`;
    const userString = JSON.stringify(patient);
    const user = getCurrentUser()
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

export function deleteMedicineApiCall(idMedicine){
    const url = `${medicineBaseUrl}/${idMedicine}`;
    let token
    const user = getCurrentUser()
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
