import React, { useState, useEffect } from "react";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/posts").then((response) => {
      response.json().then((post) => {
        setPosts(post);
      });
    });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <>
          {posts.length > 0 &&
            posts.map((post) => <Post key={post.id} {...post} />)}
        </>
      </div>
    </div>
  );
};

export default Posts;
