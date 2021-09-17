const Joi = require('joi');

module.exports = {
    createAdvSchema:{
        body: Joi.object().required().keys({
            name: Joi.string().required(),
            description: Joi.string().required(),
        })
    }, 
    updateAdvNameSchema:{
        body: Joi.object().required().keys({
            name: Joi.string().required(),
        }),
        params: Joi.object().required().keys({
            id: Joi.string().required()

        })
    },
    deleteSingleAdvSchema:{
        body: Joi.object().optional().keys({
            id: Joi.string(),
        }),
        params: Joi.object().required().keys({
            id: Joi.string().required()
        })
    }
};