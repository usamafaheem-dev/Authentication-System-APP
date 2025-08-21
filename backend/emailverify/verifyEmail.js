import nodemailer from "nodemailer"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import handlebars from "handlebars"

const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)



export const emailverify = async (token, email) => {
    const tempSource = fs.readFileSync(path.join(__dirName, "template.hbs"), "utf-8")
    const temp = handlebars.compile(tempSource);
    const htmlToSend = temp({ token })


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    })
    const emailCofigiration = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Email Verification",
        html: htmlToSend

    }
    await transporter.sendMail(emailCofigiration, function (error, info) {
        if (error) {
            throw error
        }
        console.log("Email send successfully");
        console.log(info);
    })
}

export const verifySuccess = async (username, email) => {
    const tempSource = fs.readFileSync(path.join(__dirName, "verifySuccessTem.hbs"), "utf-8")
    const temp = handlebars.compile(tempSource);
    const htmlToSend = temp({ username })


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    })
    const emailCofigiration = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Email Verification Success",
        html: htmlToSend

    }
    await transporter.sendMail(emailCofigiration, function (error, info) {
        if (error) {
            throw error
        }
        console.log("Email verified successfully");
    })
}
export const loginSuccess = async (username, email) => {
    const tempSource = fs.readFileSync(
        path.join(__dirName, "LoginSuccess.hbs"), "utf-8"
    )
    const temp = handlebars.compile(tempSource);
    const htmlToSend = temp({ username })


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    })
    const emailCofigiration = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Login Success",
        html: htmlToSend

    }
    await transporter.sendMail(emailCofigiration, function (error, info) {
        if (error) {
            throw error
        }
        console.log("Login successfully");
    })
}

export const otpSend = async ( email,otp) => {
    const tempSource = fs.readFileSync(
        path.join(__dirName, "otpSend.hbs"), "utf-8"
    )
    const temp = handlebars.compile(tempSource);
    const htmlToSend = temp({ otp , email })


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    })
    const emailCofigiration = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Forget Password",
        html: htmlToSend

    }
    await transporter.sendMail(emailCofigiration, function (error, info) {
        if (error) {
            throw error
        }
        console.log("Login successfully");
    })
}