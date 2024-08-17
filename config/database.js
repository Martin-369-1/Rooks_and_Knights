const mongoose = require('mongoose');

const conncetDb = async () => {
    mongoose.connect(process.env.MONGO_URI)
        .then((res) => console.log("Database is connected")
        )
        .catch((err) => console.log(err)
        )
}

module.exports = conncetDb;