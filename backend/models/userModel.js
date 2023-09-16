const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    }]
}, { timestamps: true });

const userModel = mongoose.model("User", usersSchema);

module.exports = userModel;