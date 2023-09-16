const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter title"],
    },
    discription: {
        type: String,
        required: [true, "Enter discription"],
    },
    image: {
        type: String,
        required: [true, "Enter image"],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Enter uer id"],
    },
}, { timestamps: true });

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;