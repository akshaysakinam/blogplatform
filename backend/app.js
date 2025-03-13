const express =require('express');
const connectDB = require('./utils/db');
const blogRouter = require('./routes/blogRoutes');
const mongoose=require('mongoose')
const app=express();
const PORT=5000;


app.use(express.json())

app.use('/',blogRouter)




connectDB
  .then(() => {
    console.log("Database connected succesfully!");
    app.listen(PORT, () => {
      console.log("Server is listening on port:",PORT);
    });
  })
  .catch((err) => {
    console.error("Database could not be connected");
  });