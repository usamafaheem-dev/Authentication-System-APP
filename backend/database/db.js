import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()


export const mongoConnection = async (req, res) => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/auth-notes-app`)
        console.log("database connected successfully")
    } catch (error) {
        console.log("something went wrong", error)
    }
}