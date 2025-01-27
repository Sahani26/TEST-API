const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
 
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
 
const cors = require('cors');
 
const path = require("path");
dotenv.config();
app.use(express.json()); //you can send any json file json object
 
  

const port = process.env.PORT || 3000;

app.use(cors({
  origin: `${process.env.FRONT}`
}));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify:true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("MongoDB connection failed:", error.message);
});

 
 
// app.get("./test", console.log('testdo'))
 
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
 

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});