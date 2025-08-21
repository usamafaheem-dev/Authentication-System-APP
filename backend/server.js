import express from "express"
const app = express()
import dotenv from "dotenv"
import { mongoConnection } from "./database/db.js"
import router from "./Routes/userRoutes.js"
dotenv.config()
const PORT = process.env.PORT || 3000
    



app.use(express.json())
app.use("/user",router)
app.listen(PORT, () => {
    mongoConnection()
    console.log(`server is running on the port ${PORT}`)
})