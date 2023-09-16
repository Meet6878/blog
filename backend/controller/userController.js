const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("req.body", req.body)
        if (!username || !email || !password) {
            return res.status(401).send({
                success: false,
                message: "Please Fill all fields",
            })
        }
        const exitingUser = await userModel.findOne({ email });
        if (exitingUser) {
            return res.status(400).send({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).send({
            success: true,
            message: "New User Created",
            newUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Error when registrar",
            error,
        })
    }
};

exports.getAllUserController = async (req, res) => {
    try {
        const user = await userModel.find({});
        if (!user) {
            return res.status(404).send({ success: false, message: "No user found" }
            );
        }
        return res.status(200).send({
            count: user.length,
            success: true,
            message: "all users get successfully",
            user,
        })

    } catch (error) {
        console.log("error to get all uers", error);
        return res.status(401).send({
            success: false,
            message: "Error when fatch all users",
            error,
        })
    }
};

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "please enter email or password"
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "email is not registerd",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { // if password not correct, return error message.
            return res.status(500).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        return res.status(200).send({
            success: true,
            message: "login successful",
            user,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        })
    }
}