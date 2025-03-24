import dotenv from "dotenv";

dotenv.config();

export default {
    MONGODB_URL: process.env.MONGODB_URL || "mongodb://127.0.0.1/ecommerce_website",
    JWT_SECRET: process.env.JWT_SECRET || "somethingsecret"
};
