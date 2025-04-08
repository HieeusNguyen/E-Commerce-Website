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
    phoneNumber: {type: String, required: true},
    isAdmin: { type: Boolean, required: true, default: false },
    avatar: { type: String, require: false, default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw1Fr6OlssU4zGb6uHxA69aY&ust=1743850813489000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMjnn9acvowDFQAAAAAdAAAAABAE"},
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
