import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 100 characters',
  }),

  email: Joi.string().email().messages({
    'string.email': 'Email must be valid',
  }),

  role: Joi.string().valid('SUPERADMIN', 'ADMIN', 'AGENCY').messages({
    'any.only': 'Role must be one of: SUPERADMIN, ADMIN, AGENCY',
  }),

  isActive: Joi.boolean(),
}).min(1).messages({
  'object.min': 'At least one field must be provided for update',
});

export const validateUpdateUser = (data) => {
  return updateUserSchema.validate(data, { abortEarly: false });
};
