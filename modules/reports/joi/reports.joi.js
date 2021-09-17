const Joi = require('joi');

module.exports = {
    createReportSchema:{
        body: Joi.object().required().keys({
            reportComment: Joi.string().required(),
        }),
        params: Joi.object().required().keys({
            id: Joi.string().required(),
        }),
    }, 
};