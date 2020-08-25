import { Joi, celebrate, Segments } from "celebrate"

export const registerBody = celebrate({
  [Segments.BODY]: Joi.object({
    firstname: Joi.string().min(3).max(10).required(),
    lastname: Joi.string().min(3).max(10).required(),
    username: Joi.string().alphanum().min(3).max(8).trim().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .min(8)
      .max(30)
      .lowercase()
      .trim()
      .required(),
    password: Joi.string().required(),
    confirmpassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .error(new Error("Password must be same")),
  }),
})

export const loginBody = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .min(8)
      .max(30)
      .lowercase()
      .trim()
      .required(),
    password: Joi.string().required(),
  }),
})

export const resetPassBody = celebrate({
  [Segments.BODY]: Joi.object({
    password: Joi.string().required(),
    confirmpassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .error(new Error("Password must be same")),
  }),
})
