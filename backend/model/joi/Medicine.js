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
                err.message=err.local.limit===30? "len_2_30":"len_2_100"
                break;
            case "boolean.base":
                err.message= "notEmpty";
                break;
            case "number.empty":
                err.message= "notEmpty";
                break;
            case "number.max":
                err.message="num_0_9999";
                break;
            case "number.min":
                err.message="num_0_9999";
                break;
            case "number.base":
                err.message= "number";
                break;
            default:

                break;
        }
    });
    return errors;
}
const LekarstwoSchema = Joi.object({
    _idLekarstwa: Joi.number()
        .allow("")
        .optional()
        .error(errMessages),
    cena: Joi.number()
        .required()
        .max(9999)
        .error(errMessages),
    opisLekarstwa: Joi.string()
        .min(2)
        .max(100)
        .required()
        .error(errMessages),
    nazwa: Joi.string()
        .min(2)
        .max(30)
        .required()
        .error(errMessages)
});
module.exports = LekarstwoSchema;