const mongoose = require("mongoose");

const DBconnect = async (req, res) => {
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, })
        console.log("database connect successful");
    } catch (error) {
        console.log("database can not connect", error);

    }
}

module.exports = DBconnect;