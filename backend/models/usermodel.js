import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        dropDups: true
    },
    password: { type: String, required: false },
    phoneNumber: {type: String, required: false},
    isAdmin: { type: Boolean, required: true, default: false },
    avatar: { type: String, require: false, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"},
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
