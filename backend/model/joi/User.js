const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "notEmpty";
                break;
            case "string.min":
                err.message ="len_2";
                break;
            case "string.max":
                err.message=err.local.limit===20? (err.local.limit===40? "len_2_40":"len_2_20") : (err.local.limit===40? "len_2_40":"len_2_150")
                console.log(err.message)
                break;
            case "date.base":
                err.message="date";
                break;
            case "string.email":
                err.message="email";
                break;
            default:
                break;
        }
    });
    return errors;
}
const uzytkownikSchema = Joi.object({
    _idUzytkownik: Joi.number()
        .optional()
        .allow(""),
    imie: Joi.string()
        .min(2)
        .max(20)
        .required()
        .error(errMessages),
    nazwisko: Joi.string()
        .min(2)
        .max(20)
        .required()
        .error(errMessages),
    dataUrodzenia: Joi.date()
        .required()
        .error(errMessages),
    email: Joi.string()
        .email()
        .required()
        .min(2)
        .max(40)
        .error(errMessages),
    miejsceZamieszkania: Joi.string()
        .min(2)
        .max(40)
        .required()
        .error(errMessages),
    telefon: Joi.string()
        .allow("")
        .allow('')
        .allow(null)
        .optional()
        .min(2)
        .max(20)
        .error(errMessages),
    pesel: Joi.string()
        .allow("")
        .allow('')
        .allow(null)
        .optional()
        .min(2)
        .max(20)
        .error(errMessages),
    haslo: Joi.string()
        .allow('')
        .min(2)
        .max(150)
        .error(errMessages),
    _idRola: Joi.number()
        .required()
        .error(errMessages),
});

module.exports = uzytkownikSchema;