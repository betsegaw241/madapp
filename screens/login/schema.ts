import * as Yup from "yup";

let errorValues = {
  email: {
    invalid: "Invalid email address",
    required: "Email is required",
  },
  password: {
    min: "Password must be grater than 8",
    max: "Password is too long",
    required: "Password is required",
    strong: "Must contain uppercase, lowercase, number and special character",
  },
};

export const signInSchema = Yup.object({
  email: Yup.string()
    .email(errorValues.email.invalid)
    .required(errorValues.email.required),

  password: Yup.string()
    .min(8, errorValues.password.min)
    .max(60, errorValues.password.max)
    .required(errorValues.password.required)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*/])(?=.{8,})/,
      errorValues.password.strong
    ),
});

export const forgetSchema = Yup.object({
  email: Yup.string()
    .email(errorValues.email.invalid)
    .required(errorValues.email.required),
});
