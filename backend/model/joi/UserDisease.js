const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "notEmpty";
                break;
            case "string.min":
                err.message ="len_2_100";
                break;
            case "string.max":
                err.message="len_2_100";
                break;
            case "date.base":
                err.message="date";
                break;
            case "string.email":
                err.message="email";
                break;
            case "number.max":
                err.message="len_0_9999";
                break;
            case "number.min":
                err.message="len_0_9999";
                break;
            case "number.base":
                err.message = "number";
                break;
            case "string.base":
                err.message = "notEmpty";
                break;
            default:
                break;
        }
    });
    return errors;
}
const uzytkownikChorobaSchema = Joi.object({
    _idUzytkownikChoroba: Joi.number()
        .optional()
        .allow(""),
    _idUzytkownik: Joi.number()
        .required()
        .error(errMessages),
    _idChoroba: Joi.number()
        .required()
        .error(errMessages),
    opisObjawow: Joi.string()
        .min(2)
        .max(100)
        .required()
        .error(errMessages),
    dataWystawienia: Joi.date()
        .required()
        .error(errMessages),
    zwolnienieDo: Joi.date()
        .allow("")
        .error(errMessages),
    cenaWizyty: Joi.number()
        .required()
        .max(9999)
        .error(errMessages),
});
module.exports = uzytkownikChorobaSchema;