const express=require('express');
const Post = require('../models/Post');

const blogRouter=express.Router();

blogRouter.post('/create',async(req,res)=>{
    try {
        const{title,author,content}=req.body;

        const post=new Post({
            title,
            author,
            content
        })
        
        const savedPost=await post.save()
        res.status(200).json({
            message:"Post Created Successfully",
            savedPost
        })
        
    } catch (error) {
        res.send("Error Creating Blog",error)
    }
})

blogRouter.get('/allposts',async(req,res)=>{
    try {
        const posts=await Post.find();
        res.json({
            message:"Got All Posts",
            posts
        })
    } catch (error) {
        res.send("Error Reading All Blogs")
    }
})

blogRouter.get('/getPost/:id',async(req,res)=>{
    try {
        const{id}=req.params.id;
        const post=await Post.findOne(id)
        res.json({
            message:"Read Post",
            post
        })
        
    } catch (error) {
        res.send("Error Reading Blog")
    }
})

blogRouter.delete("/posts/:id", async (req, res) => {
    try {
      const postId = req.params.id;
      const deletedPost = await Post.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });


blogRouter.patch("/posts/:id", async (req, res) => {
  const postId = req.params.id;
  const updates = req.body; 
  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, updates, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});





module.exports=blogRouter;