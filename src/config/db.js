import mongoose from "mongoose";


function connectTODB() {

  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("server is connnected to DB!")
    })
    .catch(err => {
      console.log("Error connecting to DB");
      process.exit(1);
    })

}


export default connectTODB;