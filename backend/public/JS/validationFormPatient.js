function validationForm(){
    console.log("dziala1");
const imieinput = document.getElementById('imie');
const nazwiskoinput= document.getElementById('nazwisko');
const emailinput = document.getElementById('email');
const adresZamieszkaniainput = document.getElementById('miejsceZamieszkania');
const telefoninput = document.getElementById('telefon');
const peselinput = document.getElementById('pesel');
const dataUrodzeniainput = document.getElementById('dataUrodzenia');
const hasloinput = document.getElementById('haslo');

const errorimie = document.getElementById('errorImie');
const errornazwisko= document.getElementById('errorNazwisko');
const erroremail = document.getElementById('errorEmail');
const erroradresZamieszkania = document.getElementById('errorAdresZamieszkania');
const errortelefon = document.getElementById('errorTelefon');
const errorpesel = document.getElementById('errorPesel');
const errordataUrodzenia = document.getElementById('errordataUrodzenia');
const errorhaslo = document.getElementById('errorhaslo');

const errorSummary=document.getElementById('errorSummary');

resetErrors([imieinput, nazwiskoinput, emailinput,adresZamieszkaniainput, telefoninput, peselinput, dataUrodzeniainput, hasloinput],
    [errorimie,  errornazwisko, erroremail, erroradresZamieszkania, errortelefon, errorpesel, errordataUrodzenia, errorhaslo], errorSummary);

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
    const email = document.getElementById('errorMessage-email').innerText;

let valid =true;
let nowDate= new Date(),
    month = '' + (nowDate.getMonth()+1),
    day=''+(nowDate.getDate()),
    // problem z data za wczesnie 21 dni
    year=nowDate.getFullYear();
if(month.length<2)
    month='0'+month;
if(day.length<2)
    day='0'+day;
const nowString = [year,month,day].join('-');

if(!checkRequired(imieinput.value)){
    valid=false;
    imieinput.classList.add("error-input");
    errorimie.innerText=required;
}else if (!checkTextLengthRange(imieinput.value, 2, 20)){
    valid=false;
    imieinput.classList.add("error-input");
    errorimie.innerText=size + 2 + to + 20 + characters;
}
    if(!checkRequired(hasloinput.value)){
        valid=false;
        hasloinput.classList.add("error-input");
        errorhaslo.innerText=required;
    }else if (!checkTextLengthRange(hasloinput.value, 2, 30)){
        valid=false;
        hasloinput.classList.add("error-input");
        errorhaslo.innerText=size + 2 + to + 30 + characters;
    }
if(!checkRequired(nazwiskoinput.value)){
    valid=false;
    nazwiskoinput.classList.add("error-input");
    errornazwisko.innerText=required;
}else if (!checkTextLengthRange(nazwiskoinput.value, 2, 20)){
    valid=false;
    nazwiskoinput.classList.add("error-input");
    errornazwisko.innerText=size + 2 + to + 20 + characters;
}
if(!checkRequired(emailinput.value)){
    valid=false;
    emailinput.classList.add("error-input");
    erroremail.innerText=required;
}else if (!checkTextLengthRange(emailinput.value, 2, 40)){
    valid=false;
    emailinput.classList.add("error-input");
    erroremail.innerText= size + 2 + to + 40 + characters;
}else if(!checkEmail(emailinput.value)){
    valid=false;
    emailinput.classList.add("error-input");
    erroremail.innerText=email;
}
if(!checkRequired(adresZamieszkaniainput.value)){
    valid=false;
    adresZamieszkaniainput.classList.add("error-input");
    erroradresZamieszkania.innerText=required;
}else if (!checkTextLengthRange(adresZamieszkaniainput.value, 2, 40)){
    valid=false;
    adresZamieszkaniainput.classList.add("error-input");
    erroradresZamieszkania.innerText=size + 2 + to + 40 + characters;
}
    if(telefoninput.value!=="") {
        if (!checkTextLengthRange(telefoninput.value, 2, 20)) {
            valid = false;
            telefoninput.classList.add("error-input");
            errortelefon.innerText = size + 2 + to + 20 + characters;
        }
    }
    if(peselinput.value!=="") {
        if (!checkTextLengthRange(peselinput.value, 2, 20)) {
            valid = false;
            peselinput.classList.add("error-input");
            errorpesel.innerText = size + 2 + to + 20 + characters;
        }
    }
if(!checkRequired(dataUrodzeniainput.value)){
    valid=false;
    dataUrodzeniainput.classList.add("error-input");
    errordataUrodzenia.innerText=required;
}else if(!checkDate(dataUrodzeniainput.value)){
    valid=false;
    dataUrodzeniainput.classList.add("error-input");
    errordataUrodzenia.innerText=date;
}else if(!checkDateIfAfter(dataUrodzeniainput.value, nowString)) {
    valid = false;
    dataUrodzeniainput.classList.add("error-input");
    errordataUrodzenia.innerText = future;
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

function checkDate(value){
    if(!value){
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);

}
function checkDateIfAfter (value, compareTo){
    console.log(compareTo +" tu");
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
function checkEmail(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return re.test(value);
}
}
