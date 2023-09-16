const mongoose = require("mongoose");
const blogModel = require("../models/blogModel.js");
const userModel = require("../models/userModel.js");

exports.allBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "blog not get",
                error,
            });
        }
        return res.status(200).send({
            success: true,
            blogCount: blogs.length,
            message: "all blog geting",
            blogs,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while geting blog",
            error,
        })
    }
}


exports.ctreateBlogController = async (req, res) => {
    try {
        const { title, discription, image, user } = req.body;

        if (!title || !discription || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please Provide ALl Fields",
            });
        }
        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "unable to find user",

            })
        }
        const newBlog = new blogModel({ title, discription, image, user });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session })
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session })
        await session.commitTransaction();
        await newBlog.save();
        return res.status(200).send({
            success: true,
            message: "Blog created successful",
            newBlog,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while creating blog",
            error,
        })
    }
}


exports.singleBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "blog not found with this is",
            });
        }
        return res.status(200).send({
            success: true,
            message: " Get sibgleBlog successful",
            blog,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while geting single blog",
            error,
        })
    }
}


exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, discription, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        return res.status(200).send({
            success: true,
            message: "Blog updated successful",
            blog,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while updating blog",
            error,
        })
    }
}


exports.deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findByIdAndDelete(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog deleted successful",
            blog,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while updating blog",
            error,
        })
    }
}

exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if (!userBlog) {
            return res.status(400).send({
                success: false,
                message: "Blog not found with this id",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Blog find with this id successfuly",
            userBlog,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in user blog",
            error,
        })
    }
}