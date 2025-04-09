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
    console.log("signinUser = ", signinUser)
    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            phoneNumber: signinUser.phoneNumber,
            avatar: signinUser.avatar,
            token: getToken(signinUser),
        });
    } else {
        res.status(401).send({ message: "Invalid Email or Password." });
    }
});
router.post("/register", async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
    });
    const newUser = await user.save();
    if (newUser) {
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            phoneNumber: newUser.phoneNumber,
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

        const { email, name, picture } = ticket.getPayload();
        const user = await User.findOne({ email });

        if (user === null) {
            const newUser = new User({
                name,
                email,
                password: "", 
                isAdmin: false,
                avatar: picture,
            });

            await newUser.save();
            user = newUser;
        }

        const authToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.json({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: authToken,
            avatar: user.avatar
        });
    }catch (error){
        res.send({message: error.message})
    }
});

router.get("/list-user", async (req, res) => {
    const user = await User.find({})
    res.send(user)
})

router.put("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: getToken(updatedUser)
            });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (user) {
            res.send({ message: "User deleted successfully" });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user._id); 
    if (user && user.isAdmin) {
        next();
    } else {
        res.status(403).send({ message: "Admin access required" });
    }
};

export default router;
