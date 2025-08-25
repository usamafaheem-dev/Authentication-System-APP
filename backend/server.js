import express from "express"
const app = express()
import dotenv from "dotenv"
import { mongoConnection } from "./database/db.js"
import router from "./Routes/userRoutes.js"
import cors from "cors"
dotenv.config()
const PORT = process.env.PORT || 3000
app.use(cors())



mongoConnection()

app.use(express.json())
app.use("/user", router)
app.listen(PORT, () => {

    console.log(`server is running on the port ${PORT}`)
})