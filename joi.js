// const Joi = require('@hapi/joi');

const schema = Joi.object().keys({

    name: Joi.string().min(3).max(20).required(),

    email: Joi.string().email().required(),

    password: Joi.number().min(18).integer() 
})