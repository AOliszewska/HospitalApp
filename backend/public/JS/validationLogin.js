function validationForm(){
    console.log('dziala3');
    const logininput = document.getElementById('loginEmail');
    const passwordinput= document.getElementById('loginPassword');

    const errorlogin = document.getElementById('errorLogin');
    const errorpassword= document.getElementById('errorPassword');

    const errorSummary=document.getElementById('loginErrors');

    resetErrors([logininput, passwordinput],
        [errorlogin, errorpassword], errorSummary);

    const required = document.getElementById('errorMessage-required').innerText;
    const size = document.getElementById('errorMessage-size').innerText;
    const to = document.getElementById('errorMessage-to').innerText;
    const characters = document.getElementById('errorMessage-characters').innerText;
    const form = document.getElementById('errorMessage-form').innerText;
    const email = document.getElementById('errorMessage-email').innerText;

    let valid =true;
    if(!checkRequired(passwordinput.value)){
        valid=false;
        passwordinput.classList.add("error-input");
        errorpassword.innerText=required;
    }else if (!checkTextLengthRange(passwordinput.value, 2, 30)){
        valid=false;
        passwordinput.classList.add("error-input");
        errorpassword.innerText=size + 2 + to + 30 + characters;
    }

    if(!checkRequired(logininput.value)){
        valid=false;
        logininput.classList.add("error-input");
        errorlogin.innerText=required;
    }else if (!checkTextLengthRange(logininput.value, 2, 40)){
        valid=false;
        logininput.classList.add("error-input");
        errorlogin.innerText=size + 2 + to + 40 + characters;
    }else if(!checkEmail(logininput.value)){
        valid=false;
        logininput.classList.add("error-input");
        errorlogin.innerText=email;
    }

    if(!valid){
        errorSummary.innerText=form;
    }
    return valid;


    function resetErrors (inputs, errorTexts, errorInfo){
        for(let i=0; i<inputs.length; i++){
            inputs[i].classList.remove("error-input");
        }
        for(let i=0; i<errorTexts.length; i++){
            errorTexts[i].innerText="";
        }
        errorInfo.innerText="";
    }
    function checkRequired(value){
        if(!value){

            return false;
        }
        value=value.toString().trim();
        if( value === ""){
            return false;
        }
        if(value === "null"){
            return false;
        }
        return true;
    }
    function checkTextLengthRange(value, min, max){
        if(!value){
            return false;
        }
        value=value.toString().trim();
        const length = value.length;
        if(max && length > max){
            return false;
        }
        return !(min && length < min);

    }
    function checkEmail(value){
        if(!value){
            return false;
        }
        value = value.toString().trim();
        const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        return re.test(value);
    }
}
