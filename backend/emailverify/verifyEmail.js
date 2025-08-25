// emailService.js
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

// Send verification email
export const emailverify = async (email, otp) => {
    const tempSource = fs.readFileSync(path.join(__dirName, "template.hbs"), "utf-8");
    const template = handlebars.compile(tempSource);
    const htmlToSend = template({ email, otp });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    });

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Email Verification",
        html: htmlToSend,
        replyTo: process.env.USER_EMAIL
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);
};

// Send email on successful verification
export const verifySuccess = async (username, email) => {
    const tempSource = fs.readFileSync(path.join(__dirName, "verifySuccessTem.hbs"), "utf-8");
    const template = handlebars.compile(tempSource);
    const htmlToSend = template({ username });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    });

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Email Verified Successfully",
        html: htmlToSend
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification success email sent to:", email);
};

// Send login success email
export const loginSuccess = async (username, email) => {
    const tempSource = fs.readFileSync(path.join(__dirName, "LoginSuccess.hbs"), "utf-8");
    const template = handlebars.compile(tempSource);
    const htmlToSend = template({ username });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    });

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Login Success",
        html: htmlToSend
    };

    await transporter.sendMail(mailOptions);
    console.log("Login success email sent to:", email);
};

// Send OTP for forget password
export const otpSend = async (email, otp) => {
    const tempSource = fs.readFileSync(path.join(__dirName, "otpSend.hbs"), "utf-8");
    const template = handlebars.compile(tempSource);
    const htmlToSend = template({ otp, email });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    });

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "OTP for Password Reset",
        html: htmlToSend
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP email sent to:", email);
};
