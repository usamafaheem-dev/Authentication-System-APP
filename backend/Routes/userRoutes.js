import express from "express"
import { registerUser, verification, login, logout, forgetPassword, verifyOTP, changePassword } from "../Controllers/userControllers.js"
import { isAuthorized } from "../Middleware/isAuthorized.js"
import { changePasswordSchema, forgetPasswordSchema, loginValidationSchema, registerValidationSchema, validateUser, verifyOtpSchema } from "../validation/validate.js"




const router = express.Router()

router.post("/register", validateUser(registerValidationSchema), registerUser)
router.get('/verify/:token', verification);
router.post("/login", validateUser(loginValidationSchema), login)
router.post("/logout", isAuthorized, logout)
router.post("/forgetpassword", validateUser(forgetPasswordSchema), forgetPassword)
router.post("/verify-otp/:email", validateUser(verifyOtpSchema), verifyOTP)
router.post("/change-password/:email", validateUser(changePasswordSchema), changePassword)




export default router