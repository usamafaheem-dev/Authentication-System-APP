import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const mongoConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1); // stop server if DB connection fails
    }
};
