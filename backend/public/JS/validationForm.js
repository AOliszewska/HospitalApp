function validationForm(){
    console.log('dziala3');
    const pacjentinput = document.getElementById('_idUzytkownik');
    const chorobainput= document.getElementById('_idChoroba');
    const objawyinput = document.getElementById('opisObjawow');
    const datawystawieniainput = document.getElementById('dataWystawienia');
    const zwolnieniedoinput = document.getElementById('zwolnienieDo');
    const cenawizytyinput = document.getElementById('cenaWizyty');

    const errorpacjent = document.getElementById('errorpacjent');
    const errorchoroba= document.getElementById('errorchoroba');
    const errorobjawy = document.getElementById('errorobjawy');
    const errordatawystawienia = document.getElementById('errordatawystawienia');
    const errorzwolnieniedo = document.getElementById('errorzwolnieniedo');
    const errorcenawizyty = document.getElementById('errorcenawizyty');

    const errorSummary=document.getElementById('errorSummary');
    resetErrors([pacjentinput, chorobainput, objawyinput, datawystawieniainput, zwolnieniedoinput, cenawizytyinput],
        [errorpacjent, errorchoroba, errorobjawy, errordatawystawienia, errorzwolnieniedo, errorcenawizyty], errorSummary);

    const required = document.getElementById('errorMessage-required').innerText;
    const size = document.getElementById('errorMessage-size').innerText;
    const to = document.getElementById('errorMessage-to').innerText;
    const characters = document.getElementById('errorMessage-characters').innerText;
    const number = document.getElementById('errorMessage-number').innerText;
    const numberSize = document.getElementById('errorMessage-numberSize').innerText;
    const and = document.getElementById('errorMessage-and').innerText;
    const date = document.getElementById('errorMessage-date').innerText;
    const future = document.getElementById('errorMessage-future').innerText;
    const later = document.getElementById('errorMessage-later').innerText;
    const form = document.getElementById('errorMessage-form').innerText;

    let valid =true;

    let nowDate= new Date(),
        month = '' + (nowDate.getMonth()+1),
        day=''+nowDate.getDate(),
        year=nowDate.getFullYear();
    if(month.length<2)
        month='0'+month;
    if(day.length<2)
        day='0'+day;
    const nowString = [year,month,day].join('-');



    if(!checkRequired(pacjentinput.value)){
        console.log(required);
        valid=false;
        pacjentinput.classList.add("error-input");
        errorpacjent.innerText=required;
    }
    if(!checkRequired(chorobainput.value)){
        valid=false;
        chorobainput.classList.add("error-input");
        errorchoroba.innerText=required;
    }

    if(!checkRequired(objawyinput.value)){
        valid=false;
        objawyinput.classList.add("error-input");
        errorobjawy.innerText=required;
    }else if (!checkTextLengthRange(objawyinput.value, 2, 100)){
        valid=false;
        objawyinput.classList.add("error-input");
        errorobjawy.innerText=size + 2 + to + 100 + characters;
    }

    if(!checkRequired(cenawizytyinput.value)){
        valid=false;
        cenawizytyinput.classList.add("error-input");
        errorcenawizyty.innerText=required;
    }else if(!checkNumber(cenawizytyinput.value)){
        valid=false;
        cenawizytyinput.classList.add("error-input");
        errorcenawizyty.innerText =number;
    }else if(!checkNumberRange(cenawizytyinput.value, 0, 9999)){
        valid=false;
        cenawizytyinput.classList.add("error-input");
        errorcenawizyty.innerText =numberSize + 0 + and + 9999;
    }

    if(!checkRequired(datawystawieniainput.value)){
        valid=false;
        datawystawieniainput.classList.add("error-input");
        errordatawystawienia.innerText=required;
    }else if(!checkDate(datawystawieniainput.value)){
        valid=false;
        datawystawieniainput.classList.add("error-input");
        errordatawystawienia.innerText=date;
    }else if(!checkDateIfAfter(datawystawieniainput.value, nowString)) {
        valid = false;
        datawystawieniainput.classList.add("error-input");
        errordatawystawienia.innerText = future;
    }else if (checkRequired(datawystawieniainput.value) && checkDate(zwolnieniedoinput.value) && zwolnieniedoinput.value!=="" && ! checkDateIfAfter(datawystawieniainput.value, zwolnieniedoinput.value)){
        valid=false;
        datawystawieniainput.classList.add("error-input");
        errordatawystawienia.innerText = later;
    }

    if(zwolnieniedoinput.value!=="") {
        console.log(zwolnieniedoinput.value)
        if (!checkDate(zwolnieniedoinput.value)) {
            valid = false;
            zwolnieniedoinput.classList.add("error-input");
            errorzwolnieniedo.innerText = date;
        }
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
    function checkNumber(value){
        if(!value){
            return false;
        }
        return !isNaN(value);

    }
    function checkNumberRange(value, min, max){
        if(!value){
            return false;
        }
        if(isNaN(value)){
            return false;
        }
        value=parseFloat(value);
        if(value<min){
            return false;
        }
        return value <= max;

    }
    function checkDate(value){
        if(!value){
            return false;
        }
        const pattern = /(\d{4})-(\d{2})-(\d{2})/;
        return pattern.test(value);

    }
    function checkDateIfAfter (value, compareTo){
        console.log(compareTo);
        if(!value){
            return false;

        }

        if(!compareTo){
            return false;

        }
        const pattern = /(\d{4})-(\d{2})-(\d{2})/;
        if(!pattern.test(value)){
            return false;
        }
        if(!pattern.test(compareTo)){
            return false;
        }
        const valueDate= new Date(value);
        const compareToDate= new Date(compareTo);
        if(valueDate.getTime() > compareToDate.getTime()){
            return false;
        }
        return true;
    }
    function checkDateIfBefore (value, compareTo){
        if(!value){
            return false;
        }
        if(!compareTo){
            return false;
        }
        const pattern = /(\d{4})-(\d{2})-(\d{2})/;
        if(!pattern.test(value)){
            return false;
        }
        if(!pattern.test(compareTo)){
            return false;
        }
        const valueDate= new Date(value);
        const compareToDate= new Date(compareTo);
        if(valueDate.getTime() < compareToDate.getTime()){
            return false;
        }
        return true;
    }
}
