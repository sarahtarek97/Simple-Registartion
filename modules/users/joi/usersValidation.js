const Joi = require('joi');

module.exports = {
    signUpSchema:{
        body: Joi.object().required().keys({
            userName: Joi.string().required().messages({
                'string.empty':'sorry name is required',
            }),
            email: Joi.string().required().email().messages({
                'string.email':'sorry enter valid email',
                'string.empty':'sorry email is required',

            }),
            password: Joi.string().required().messages({
                'string.empty':'sorry password is required',
            }),
            cPassword: Joi.string().required().messages({
                'string.empty':'sorry password confirmation is required',
            }),
            phone: Joi.string().required().messages({
                'string.empty':'sorry number is required',
            }),
            location: Joi.string().required().messages({
                'string.empty':'sorry location is required',
            }),
            role: Joi.string().optional(),
            
        }),
    },
    signInSchema:{
        body: Joi.object().required().keys({
            email: Joi.string().required().email().messages({
                'string.email':'sorry enter valid email',
                'string.empty':'sorry email is required',
            }),
            password: Joi.string().required(),
        }),   
    },
    updateUserSchema:{
        body: Joi.object().required().keys({
            userName: Joi.string().required(),
        }),
        params: Joi.object().required().keys({
            id: Joi.string(),
        }),
    }, 
    updatePasswordSchema:{
        body: Joi.object().required().keys({
            oldPassword: Joi.string().required(),
            password: Joi.string().required().messages({
                'string.empty':'sorry password is required',
            }),
            cPassword: Joi.string().required().messages({
                'string.empty':'sorry password confirmation is required',
            }),
        })
    },
    deleteSuperAdminSchema:{
        body: Joi.object().optional().keys({
            id: Joi.string(),
        }),
        params: Joi.object().required().keys({
                id: Joi.string().required(),
        }),
    },
    blockUserSchema:{
        body: Joi.object().optional().keys({
            id: Joi.string(),
        }),
        params: Joi.object().required().keys({
            id: Joi.string().required(),
        }),
    }
};