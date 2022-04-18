const Joi = require('joi');
const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "notEmpty";
                break;
            case "string.min":
                err.message="len_2"
                break;
            case "string.max":
                err.message=err.local.limit===25? err.message="len_2_25" :"len_2_100"
                break;
            case "boolean.base":
                err.message= "notEmpty";
                break;
            default:
                err.message="taktak"
                break;
        }
    });
    return errors;
}
const chorobaSchema = Joi.object({
    _idChoroba: Joi.number()
        .optional()
        .allow(""),
    nazwa: Joi.string()
        .min(2)
        .max(25)
        .required()
        .error(errMessages),
    opis: Joi.string()
        .min(2)
        .max(100)
        .required()
        .error(errMessages),
    zakazna: Joi.boolean()
        .required()
        .error(errMessages)
});
module.exports = chorobaSchema;