const mongoose = require('mongoose');

const conncetDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Database Connected');
    }
    catch(err){
        console.log("Database connection error :"+err);
    }
}

module.exports=conncetDb;