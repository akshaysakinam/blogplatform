const mongoose=require('mongoose')

const connectDB=mongoose.connect("mongodb+srv://Akshay123:veVttUaH6w87WK2@cluster0.kwkch.mongodb.net/DoBlog")

module.exports=connectDB;