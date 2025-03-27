import express from "express";
import User from "../models/userModel";
import { getToken } from "../util";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import config from "../config";

const router = express.Router();

router.post("/signin", async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        });
    } else {
        res.status(401).send({ message: "Invalid Email or Password." });
    }
});
router.post("/register", async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const newUser = await user.save();
    if (newUser) {
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        });
    } else {
        res.status(401).send({ message: "Invalid Userdata." });
    }
});

router.get("/logout", async (req,res) => {
    try{
        res.cookie("userInfo", "", {maxAge: 1});
        res.redirect("/");
    }catch (error){
        res.send({message: error.message})
    }
})

router.post("/google-login", async (req, res) => {
    try{
        const { token } = req.body;
        const client = new OAuth2Client("805980811634-g0rtmvm57jkkhfird8mdq8e3b60sgq2m.apps.googleusercontent.com");
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "805980811634-g0rtmvm57jkkhfird8mdq8e3b60sgq2m.apps.googleusercontent.com", 
        });

        const { email, name } = ticket.getPayload();
        const user = await User.findOne({ email });

        if (user === null) {
            const newUser = new User({
                name,
                email,
                password: "", 
                isAdmin: false
            });

            await newUser.save();
        }

        const authToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: authToken,
        });
    }catch (error){
        res.send({message: error.message})
    }
});

export default router;
