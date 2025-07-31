const Joi = require('joi');

exports.create = Joi.object({
  title: Joi.string().required(),
  type: Joi.string().valid('Movie', 'TV Show').required(),
  director: Joi.string().required(),
  budget: Joi.string().required(),
  location: Joi.string().required(),
  duration: Joi.string().required(),
  year: Joi.string().required(),
  posterUrl: Joi.string().uri().optional()
}).unknown(true)

exports.update = Joi.object({
  title: Joi.string(),
  type: Joi.string().valid('Movie', 'TV Show'),
  director: Joi.string(),
  budget: Joi.string(),
  location: Joi.string(),
  duration: Joi.string(),
  year: Joi.string(),
  posterUrl: Joi.string().uri().optional()
}).unknown(true)
