import express from "express";
const app = express();
import dotenv from "dotenv";
import { mongoConnection } from "./database/db.js";
import router from "./Routes/userRoutes.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/user", router);

// ✅ Connect MongoDB first, then start server
mongoConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
