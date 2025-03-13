import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/allposts");
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, []);

  
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const newPost = { title, author, content };
      const response = await axios.post("http://localhost:3000/create", newPost);
      alert(response.data.message);
      setTitle("");
      setAuthor("");
      setContent("");
      setPosts([...posts, response.data.savedPost]); // Update posts list
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

 
  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/posts/${postId}`);
      alert(response.data.message);
      setPosts(posts.filter((post) => post._id !== postId)); // Remove the post from the list
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  
  const handleUpdatePost = async (postId, newContent) => {
    try {
      const response = await axios.patch(`http://localhost:3000/posts/${postId}`, { content: newContent });
      alert(response.data.message);
      setPosts(posts.map((post) => (post._id === postId ? response.data.updatedPost : post))); // Update the post in the list
    } catch (error) {
      console.error("Error updating post", error);
    }
  };

  return (
    <div className="App">
      <h1>Blog Application</h1>

      
      <form onSubmit={handleCreatePost}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>

    
      <h2>All Posts</h2>
      <div>
        {posts.map((post) => (
          <div key={post._id} style={{ border: "1px solid #ddd", marginBottom: "10px", padding: "10px" }}>
            <h3>{post.title}</h3>
            <p><strong>Author:</strong> {post.author}</p>
            <p>{post.content}</p>
            <button onClick={() => handleDeletePost(post._id)}>Delete Post</button>
            <button
              onClick={() => {
                const newContent = prompt("Enter new content:", post.content);
                if (newContent) {
                  handleUpdatePost(post._id, newContent);
                }
              }}
            >
              Edit Post
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
