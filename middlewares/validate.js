import Joi from 'joi';

const allowedCategories = ['electronics', 'clothing', 'food', 'other'];

const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  price: Joi.number().greater(0).required(),
  category: Joi.string().valid(...allowedCategories).required(),
  stock: Joi.number().integer().min(0).default(0),
  description: Joi.string().max(500).allow('', null).optional()
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  price: Joi.number().greater(0),
  category: Joi.string().valid(...allowedCategories),
  stock: Joi.number().integer().min(0),
  description: Joi.string().max(500).allow('', null)
}).min(1); // Для PATCH хотя бы одно поле должно быть передано

export const validateProduct = (isPatch = false) => (req, res, next) => {
  const schema = isPatch ? updateProductSchema : createProductSchema;
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: 'Ошибка валидации',
      details: error.details.map(err => err.message)
    });
  }

  req.body = value; // Записываем очищенные данные (с дефолтным stock: 0, если не передан)
  next();
};
