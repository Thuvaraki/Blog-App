import React from "react";
import Post from "./Post";

const Posts = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <Post />
      </div>
      <div className="row">
        <Post />
      </div>
      <div className="row">
        <Post />
      </div>
      <div className="row">
        <Post />
      </div>
    </div>
  );
};

export default Posts;
