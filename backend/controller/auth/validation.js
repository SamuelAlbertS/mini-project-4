import * as Yup from "yup"

export const RegisterValidationSchema = Yup.object({
    username : Yup.string().required("Username is required"),
    password : Yup.string().required("Password is required"),
    email : Yup.string().email("Invalid Email").required("Email is required")
})

export const LoginValidationSchema = Yup.object({
    username : Yup.string().required("Username is required"),
    password : Yup.string().required("Password is required")
})

export const VerifyValidationSchema = Yup.object({
    otp : Yup.string().required("OTP is required")
})

export const ForgetValidationSchema = Yup.object({
    email : Yup.string().email("Invalid Email").required("Email is required")
})

export const ResetValidationSchema = Yup.object({
    otp : Yup.string().required("OTP is required"),
    password : Yup.string().required("Password is required")
})

export const UpdateValidationSchema = Yup.object({
    username : Yup.string().required("Username is required"),
    password : Yup.string().required("Password is required"),
    email : Yup.string().email("Invalid Email").required("Email is required")
})