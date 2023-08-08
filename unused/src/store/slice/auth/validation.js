import * as Yup from "yup"

export const registerValidationSchema = Yup.object({
    username : Yup.string().required("Username is required"),
    password : Yup.string().required("Password is required"),
    email : Yup.string().email("Invalid Email").required("Email is required"),
    confirmpassword : Yup.string().oneOf([Yup.ref("password"),null],"password must match")
})

export const loginValidationSchema = Yup.object({
    username : Yup.string().required("Username is required"),
    password : Yup.string().required("Password is required")
})

export const verifyValidationSchema = Yup.object({
    otp : Yup.string().required("OTP is required")
})

export const forgetValidationSchema = Yup.object({
    email : Yup.string().email("Invalid Email").required("Email is required")
})

export const resetValidationSchema = Yup.object({
    otp : Yup.string().required("OTP is required"),
    password : Yup.string().required("Password is required")
})

export const updateValidationSchema = Yup.object({
    username : Yup.string().required("Username is required"),
    password : Yup.string().required("Password is required"),
    email : Yup.string().email("Invalid Email").required("Email is required")
})