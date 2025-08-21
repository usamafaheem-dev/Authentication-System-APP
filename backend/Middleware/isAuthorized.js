
import jwt from "jsonwebtoken";
import { User } from "../Model/userModel.js";

export const isAuthorized = async (req, res, next) => {
    try {
        // first step create auth header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).send({
                success: false,
                message: "Token is missing or invalid"
            })
        }
        // 2nd step to take a token from autorizatoin header
        const token = authHeader.split(" ")[1]

        //  3rd verify the token 
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {

            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(400).send({
                        success: false,
                        message: "Token is expired,use refersh token generate again"
                    })
                }
                return res.status(400).send({
                    success: false,
                    message: "Access token is missing or invalid "
                })
            }
            // 4th step we can find id though decoded
            const { id } = decoded;
            let user = await User.findById(id)
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "User not found"
                })
            }
            req.userId = user._id
            next()

        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}