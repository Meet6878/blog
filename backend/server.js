const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const DBconnect = require("./db.js");
const path = require("path");

dotenv.config();

const userRoute = require("./Routes/userRoute");
const blogRoute = require("./Routes/blogRoute");
//


DBconnect();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
// });




//route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
})


