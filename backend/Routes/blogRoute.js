const express = require("express");
const { allBlogController, ctreateBlogController, deleteBlogController, singleBlogController, updateBlogController, userBlogController } = require("../controller/blogController");

const router = express.Router();

router.get("/all-blog", allBlogController);

router.post("/create-blog", ctreateBlogController);

router.get("/singleblog/:id", singleBlogController);

router.put("/update-blog/:id", updateBlogController);

router.delete("/delete-blog/:id", deleteBlogController);

router.get("/user-blog/:id", userBlogController);

module.exports = router;