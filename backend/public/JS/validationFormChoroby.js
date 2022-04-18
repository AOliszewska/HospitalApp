function validationForm() {
    console.log('dziala choroby');
    const nazwainput = document.getElementById('nazwa');
    const opisinput = document.getElementById('opis');
    const zakaznainput = document.getElementById('zakazna');

    const errornazwa = document.getElementById('errorNazwa');
    const erroropis = document.getElementById('errorOpis');
    const errorzakazna = document.getElementById('errorZakazna');

    const errorSummary = document.getElementById('errorSummary');

    resetErrors([ nazwainput, opisinput, zakaznainput],
        [errornazwa,  erroropis, errorzakazna], errorSummary);

    const required = document.getElementById('errorMessage-required').innerText;
    const size = document.getElementById('errorMessage-size').innerText;
    const to = document.getElementById('errorMessage-to').innerText;
    const characters = document.getElementById('errorMessage-characters').innerText;
    const form = document.getElementById('errorMessage-form').innerText;

    let valid =true;
    if(!checkRequired(nazwainput.value)){
        valid=false;
        nazwainput.classList.add("error-input");
        errornazwa.innerText=required;
    }else if (!checkTextLengthRange(nazwainput.value, 2, 25)){
        valid=false;
        nazwainput.classList.add("error-input");
        errornazwa.innerText=size + 2 + to + 25 + characters;
    }

    if(!checkRequired(opisinput.value)){
        valid=false;
        opisinput.classList.add("error-input");
        erroropis.innerText=required;
    }else if (!checkTextLengthRange(opisinput.value, 2, 100)) {
        valid = false;
        opisinput.classList.add("error-input");
        erroropis.innerText = size + 2 + to + 100 + characters;
    }

    if(!checkRequired(zakaznainput.value)){
        valid=false;
        zakaznainput.classList.add("error-input");
        errorzakazna.innerText=required;
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


}