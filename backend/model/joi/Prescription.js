const Joi = require('joi');
const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "notEmpty";
                break;
            case "string.min":
                err.message = "len_2_100"
                break;
            case "string.max":
                err.message="len_2_100";
                break;
            case "boolean.base":
                err.message= "notEmpty";
                break;
            case "date.base":
                err.message="date";
                break;
            case "number.base":
                err.message="notEmpty";
                break;
            default:
                break;
        }
    });
    return errors;
}
const ReceptaSchema = Joi.object({
    _idRecepta: Joi.number()
        .optional()
        .allow(""),
    _idLekarstwa: Joi.number()
        .required()
        .error(errMessages),
    _idUzytkownikChoroba: Joi.number()
        .required()
        .error(errMessages),
    dataWaznosci: Joi.date()
        .required()
        .error(errMessages),
    opisRecepty: Joi.string()
        .min(2)
        .max(100)
        .required()
        .error(errMessages)
});
module.exports = ReceptaSchema;