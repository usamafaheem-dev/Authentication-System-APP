// userController.js
import { User } from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { emailverify, loginSuccess, otpSend, verifySuccess } from "../emailverify/verifyEmail.js";
import { session } from "../Model/sessions.js";

dotenv.config();

// Register user
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (await User.findOne({ username })) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        if (await User.findOne({ email })) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "10m" });
        newUser.token = token;

        await newUser.save();

        await emailverify(token, email);

        res.status(201).json({ success: true, message: "User created successfully. Verification email sent!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Verify email
export const verification = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ success: false, message: "Invalid authorization" });
        }

        const token = authHeader.split(" ")[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            return res.status(400).json({ success: false, message: error.name === "TokenExpiredError" ? "Token expired" : "Token invalid" });
        }

        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        user.isVerified = true;
        user.token = null;
        await user.save();

        await verifySuccess(user.username, user.email);

        res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(401).json({ success: false, message: "All fields required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ success: false, message: "Unauthorized user" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ success: false, message: "Incorrect password" });

        if (!user.isVerified) return res.status(401).json({ success: false, message: "Verify your account first" });

        const existingSession = await session.findOne({ userId: user._id });
        if (existingSession) await session.deleteOne({ userId: user._id });

        await session.create({ userId: user._id });

        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "10d" });
        const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "30d" });

        user.isLoggedIn = true;
        await user.save();

        await loginSuccess(user.username, user.email);

        res.status(200).json({ success: true, message: `Welcome back ${user.username}`, accessToken, refreshToken, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Logout
export const logout = async (req, res) => {
    try {
        const userId = req.userId;
        await session.deleteMany({ userId });
        await User.findByIdAndUpdate(userId, { isLoggedIn: false });
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Forget password
export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(404).json({ success: false, message: "Email required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        await otpSend(email, otp);

        res.status(200).json({ success: true, message: "OTP sent to email" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    const { otp } = req.body;
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        if (!user.otp || !user.otpExpiry) return res.status(404).json({ success: false, message: "OTP not generated" });
        if (user.otpExpiry < new Date()) return res.status(400).json({ success: false, message: "OTP expired" });
        if (otp !== user.otp) return res.status(400).json({ success: false, message: "Invalid OTP" });

        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.status(200).json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Change password
export const changePassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const { email } = req.params;

    try {
        if (!newPassword || !confirmPassword) return res.status(400).json({ success: false, message: "All fields required" });
        if (newPassword !== confirmPassword) return res.status(400).json({ success: false, message: "Passwords do not match" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
