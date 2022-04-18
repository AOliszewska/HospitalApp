import React from "react";

const formMode = {
    NEW: 'NEW',
    EDIT: 'EDIT',
    DELETE: 'DELETE'
}
export const formValidationKeys ={
    notEmpty: 'notEmpty',
    len_2_40: 'len_2_40',
    len_2_20: 'len_2_20',
    len_2_30: 'len_2_30',
    isEmail : 'isEmail',
    future: 'future',
    date:'date',
    formErrors:'formErrors',
    len_2_25: 'len_2_25',
    len_2_100 : 'len_2_100',
    emailExists :'emailExists',
    num_0_9999 : 'num_0_9999',
    number : 'number',
    later : 'later',
    past: 'past',
    len_2:'len_2',
    Login: 'Login'
}
export function getValidationErrorKey(error){
    if(error===""){
        return "";
    }
    return `validationMessage.${error}`
}

export default formMode