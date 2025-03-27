import express from "express";
import config from "./config";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";

const path = require("path");

dotenv.config();

const PORT = process.env.PORT || 6000;
const mongodbUrl = config.MONGODB_URL;

mongoose
    .connect(mongodbUrl)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.error("MongoDB connection error:", error));

const app = express();

app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// Serve static assests if in production

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () =>
    console.log(
        "************************************************** \n The Server has started at : http://localhost:6000"
    )
);
