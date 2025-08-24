import yup from "yup"

export const registerValidationSchema = yup.object({
    username: yup.string().trim().min(3, "Username must be at least 3 characters").required("Username is required"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup.string().min(4, "Password must be at least 4 characters").required("Password is required")
});

export const loginValidationSchema = yup.object({
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup.string().required("Password is required")
});
export const forgetPasswordSchema = yup.object({
    email: yup.string().email("Invalid Email").required("Email is required")
});

export const verifyOtpSchema = yup.object({
    otp: yup.string()
        .length(6, "OTP must be 6 digits")
        .required("OTP is required")
});

export const changePasswordSchema = yup.object({
    newPassword: yup
        .string()
        .min(4, "Password must be at least 4 characters")
        .required("New Password is required"),
    confirmPassword: yup
        .string()
        .min(4, "Password must be at least 4 characters")
        .required("Confirm Password is required"),
});





export const validateUser = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        return res.status(400).send({
            message: "Validation failed",
            errors: err.errors
        });
    }
};



