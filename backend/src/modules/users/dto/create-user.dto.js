import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 100 characters',
  }),

  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid',
  }),

  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters',
  }),

  role: Joi.string().valid('SUPERADMIN', 'ADMIN', 'AGENCY').default('AGENCY').messages({
    'any.only': 'Role must be one of: SUPERADMIN, ADMIN, AGENCY',
  }),

  isActive: Joi.boolean().default(true),
});

export const validateCreateUser = (data) => {
  return createUserSchema.validate(data, { abortEarly: false });
};
