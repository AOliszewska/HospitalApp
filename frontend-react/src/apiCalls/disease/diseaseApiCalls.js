import {getCurrentUser} from "../../helpers/authHelper";

const BaseUrl= 'http://localhost:3000/api/disease'

export function getDiseaseApiCall(){
    const promise = fetch(BaseUrl)
    return promise;
}

export function getDiseaseByIdApiCall(id){
    const url = `${BaseUrl}/${id}`;
    const promise = fetch(url);
    return promise;
}
export function deleteDiseaseApiCall(diseaseId){
    const url = `${BaseUrl}/${diseaseId}`;
    const user = getCurrentUser()
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

export function addDiseaseApiCall(disease){
    const userString = JSON.stringify(disease);
    const user = getCurrentUser()
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
    const promise = fetch(BaseUrl, options);
    return promise;
}

export function updateDiseaseApiCall(diseaseId, disease){
    const user = getCurrentUser()
    let token
    if(user && user.token){
        token= user.token
    }
    const url = `${BaseUrl}/${diseaseId}`;
    const userString = JSON.stringify(disease);
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