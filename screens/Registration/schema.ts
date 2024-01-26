import * as Yup from 'yup';

let errorValues = {
  email: {
    invalid: 'Invalid email address',
    required: 'Email is required',
  },
  username: {
    min: 'Please enter a valid name',
    max: 'Name is too long',
    required: 'Name is required',
  },
  password: {
    min: 'Password must be grater than 8',
    max: 'Password is too long',
    required: 'Password is required',
    strong: 'Must contain uppercase, lowercase, number and special character',
  },
  confirmPassword: {
    required: 'Please confirm your password',
    mismatch: 'Passwords must match',
  },
  
};

export const signupSchema = Yup.object({
  email: Yup.string()
    .email(errorValues.email.invalid)
    .required(errorValues.email.required),
  username: Yup.string()
    .trim()
    .matches(/(?!^\d+$)^.+$/, 'Please enter a valid name')
    .min(2, errorValues.username.min)
    .max(25, errorValues.username.max)
    .required(errorValues.username.required),
  password: Yup.string()
    .min(8, errorValues.password.min)
    .max(60, errorValues.password.max)
    .required(errorValues.password.required)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*/])(?=.{8,})/,
      errorValues.password.strong,
    ),
  confirmPassword: Yup.string()
    .required(errorValues.confirmPassword.required)
    .oneOf([Yup.ref('password'), ], errorValues.confirmPassword.mismatch),
  
});

