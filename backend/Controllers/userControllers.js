import { User } from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { emailverify, loginSuccess, otpSend, verifySuccess } from "../emailverify/verifyEmail.js";
import { session } from "../Model/sessions.js";

dotenv.config();

// register user
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // validation
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }

        // check username
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).send({
                success: false,
                message: "username already exist"
            });
        }

        // check email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exist"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const UserCreate = new User({
            username,
            email,
            password: hashedPassword
        });

        // create token
        const token = jwt.sign(
            { id: UserCreate._id },
            process.env.SECRET_KEY,
            { expiresIn: "10m" }
        );

        UserCreate.token = token;

        // save user first
        const userCreatedSuccess = await UserCreate.save();

        // then send email
        try {
            await emailverify(token, email);
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "User created but email could not be sent"
            });
        }

        return res.status(201).send({
            success: true,
            message: "User created successfully"
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// verification
export const verification = async (req, res) => {
    try {
        // first step
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).send({
                success: false,
                message: "Authorization is failed or invalid"
            });
        }

        // 2nd step
        const token = authHeader.split(" ")[1];

        // 3rd step (verify token)
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(400).send({
                    success: false,
                    message: "Token is expired"
                });
            }
            return res.status(400).send({
                success: false,
                message: "Token verification is failed"
            });
        }

        // fourth step (find user)
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user not found"
            });
        }

        user.token = null;
        user.isVerified = true;
        await user.save();
        try {
            await verifySuccess(user.username, user.email);
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "User created but email could not be sent"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Email verified successfully"
        });


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

// login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Fill all the feilds"
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Unotherized user"
            })
        }
        const passwordVerify = await bcrypt.compare(password, user.password)
        if (!passwordVerify) {
            return res.status(401).send({
                success: false,
                message: "Incorrect Password"
            })
        }
        // user verify or not
        if (user.isVerified !== true) {
            return res.status(401).send({
                success: false,
                message: "Verify your account then login"
            })
        }
        //   delete existing sessions
        const existingSessions = await session.findOne({ userId: user._id })
        if (existingSessions) {
            await session.deleteOne({ userId: user._id })
        }
        // create a new sessions
        await session.create({ userId: user._id })
        // create token
        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "10d" })
        const refershToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "30d" })

        // 
        user.isLoggedIn = true
        await user.save();

        try {
            await loginSuccess(user.username, user.email);
            console.log("Login email sent successfully");
        } catch (error) {
            console.error("❌ Email send failed:", error);
            return res.status(500).send({
                success: false,
                message: "User created but email could not be sent"
            });
        }

        return res.status(200).send({
            success: true,
            message: `Welcome back dear ${user.username}`,
            accessToken,
            refershToken,
            user
        })



    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message

        })
    }


}

// logout
export const logout = async (req, res) => {
    try {
        const userId = req.userId;
        await session.deleteMany({ userId })
        await User.findByIdAndUpdate(userId, { isLoggedIn: false })
        return res.status(200).send({
            success: true,
            message: "Logged Out successfully"
        })


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

//forget password

export const forgetPassword = async (req, res) => {

    try {
        const { email } = req.body;
        if (!email) {
            res.status(404).send({
                success: false,
                message: "Fill the feild first"
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        const otp = Math.floor(100000 + (Math.random() * 900000))
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)

        user.otp = otp;
        user.otpExpiry = otpExpiry;

        await otpSend(email, otp);

        await user.save();

        return res.status(200).send({
            success: true,
            message: "OTP sent to email"
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

// otp verify
export const verifyOTP = async (req, res) => {

    const { otp } = req.body;
    const email = req.params.email

    if (!otp) {
        return res.status(401).send({
            success: false,
            message: 'OTP is required'
        });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        if (!user.otp || !user.otpExpiry) {
            return res.status(404).send({
                success: false,
                message: 'OTP not generated or already verified'
            });
        }
        if (user.otpExpiry < new Date()) {
            return res.status(404).send({
                success: false,
                message: 'OTP has expired. Please request a new one'
            });
        }
        if (otp !== user.otp) {
            return res.status(404).send({
                success: false,
                message: 'Invalid OTP'
            });
        }

        user.otp = null;
        user.otpExpiry = null;
        await user.save()
        return res.status(200).send({
            success: true,
            message: 'OTP verified successfully'
        });



    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        });

    }



}

export const changePassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const email = req.params.email
    if (!newPassword || !confirmPassword) {
        return res.status(401).send({
            success: false,
            message: 'Fill all the fields'
        });
    }
    if (newPassword !== confirmPassword) {
        return res.status(401).send({
            success: false,
            message: 'New password and confirm password must match'
        });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword;
        user.save()
        return res.status(200).send({
            success: true,
            message: 'Password successfully changed'
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Internal Server error'
        });
    }
}