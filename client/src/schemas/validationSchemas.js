import * as Yup from "yup"

export const registrationSchema = Yup.object({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters long")
        .max(20, "Name must be not longer than 20 characters")
        .required("Name is required"),
    surname: Yup.string()
        .min(2, "Surname must be at least 2 characters long")
        .max(20, "Surname must be not longer than 20 characters")
        .required("Surname is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})', 'Password must contain one lower and upper case letter and a number '),
    isSeller: Yup.bool()
})

export const loginSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})', 'Password must contain one lower and upper case letter and a number ')
})

export const brandSchema = Yup.object({
    name: Yup.string()
        .min(2, "Minimum 2 characters long")
        .required("Name is required"),
})
