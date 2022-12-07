const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/enotes"

const connectToMongo = () => {
    mongoose.connect(mongoURI, (err) => {
      if(err)
        res.json({DB_Error : err.message})
      else
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectToMongo;