import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";

const SinglePost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const response = fetch(`http://localhost:4000/posts/${id}`).then(
      (response) => {
        response.json().then((post) => {
          setPost(post);
        });
      }
    );
  }, []);

  if (!post) return null;

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ textAlign: "center", marginTop: "10px" }}>{post.title}</h2>

      <p style={{ textAlign: "center" }}>by {post.author.username}</p>

      <p style={{ textAlign: "center" }}>
        <time>{formatISO9075(new Date(post.createdAt))}</time>
      </p>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src={`http://localhost:4000/${post.cover}`}
          alt="Image for blog"
          style={{ maxWidth: "1000px", maxHeight: "300px", margin: "0 auto" }}
        />
      </div>

      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default SinglePost;
