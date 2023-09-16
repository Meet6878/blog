const express = require("express");
const { getAllUserController, loginController, registerController } = require("../controller/userController");

const router = express.Router();

router.post("/register", registerController);

router.get("/get-alluser", getAllUserController);

router.post("/login", loginController);

module.exports = router;