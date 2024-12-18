import { checkSchema } from "express-validator";



export const UserCreateSchema = checkSchema({
  user_id: {
    in: ['body'],
    isInt: true,
    toInt: true,
    errorMessage: 'User ID must be an integer',
  },
  username: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    isLength: {
      options: { min: 3 },
      errorMessage: 'Username must be at least 3 characters long',
    },
    errorMessage: 'Username is required and must be a string',
  },
  password: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long',
    },
    errorMessage: 'Password is required and must be a string',
  },
  email: {
    in: ['body'],
    isEmail: true,
    notEmpty: true,
    errorMessage: 'A valid email is required',
  },
  role: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    isIn: {
      options: [['patient', 'doctor', 'admin']],
      errorMessage: 'Role must be either "patient", "doctor", or "admin"',
    },
    errorMessage: 'Role is required and must be a string',
  },
  first_name: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'First name is required and must be a string',
  },
  last_name: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Last name is required and must be a string',
  },
  date_of_birth: {
    in: ['body'],
    toDate: true,
    errorMessage: 'Date of birth is required and must be a valid date',
  },
  address: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Address is required and must be a string',
  },
  state: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'State is required and must be a string',
  },
  createdAt: {
    in: ['body'],
    isISO8601: true,
    toDate: true,
    errorMessage: 'CreatedAt must be a valid date',
  },
  updatedAt: {
    in: ['body'],
    isISO8601: true,
    toDate: true,
    errorMessage: 'UpdatedAt must be a valid date',
  },
});

export const loginUserSchema = checkSchema({
  username: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Username is required and must be a string',
  },
  password: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Password is required and must be a string',
  },
});
