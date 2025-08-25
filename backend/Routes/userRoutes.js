import express from "express";
import {
    registerUser,
    login,
    logout,
    forgetPassword,
    changePassword,
    verification,
    verifyOTP
    // NEW: verify email code

} from "../Controllers/userControllers.js";

import { isAuthorized } from "../Middleware/isAuthorized.js";

import {
    registerValidationSchema,
    loginValidationSchema,
    forgetPasswordSchema,
    changePasswordSchema,
    verifyOtpSchema,
    validateUser,

} from "../validation/validate.js";

const router = express.Router();

// Register user + send OTP
router.post("/register", validateUser(registerValidationSchema), registerUser);

// Verify OTP for email (user enters code)
router.post("/verify/register/otp/:email", validateUser(verifyOtpSchema), verification);



// Login/logout
router.post("/login", validateUser(loginValidationSchema), login);
router.post("/logout", isAuthorized, logout);

// Forget/reset password
router.post("/forgetpassword", validateUser(forgetPasswordSchema), forgetPassword);
router.post("/verify/forgetpassword/otp/:email", validateUser(verifyOtpSchema), verifyOTP);
router.post("/change-password/:email", validateUser(changePasswordSchema), changePassword);

export default router;
