const Joi = require('joi');

module.exports = {
    createPostSchema:{
        body: Joi.object().required().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            
        })
    }, 
    editPostSchema:{
        body: Joi.object().required().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
        }),
    },
    deletePostSchema:{
        params: Joi.object().required().keys({
           id: Joi.required(),
        }),
        body: Joi.object().required().keys({
            id: Joi.required(),
         }),
    },
    blockPostSchema:{
        params: Joi.object().required().keys({
            id: Joi.required(),
         }),
         body: Joi.object().required().keys({
             id: Joi.required(),
          }),
    },
     
};