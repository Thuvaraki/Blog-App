import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const Post = (posts) => {
  return (
    <div
      className="card mb-3"
      style={{ maxWidth: "1150px", margin: "0 auto", border: "none" }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <Link to={`/posts/${posts._id}`}>
              <img
                src={"http://localhost:4000/" + posts.cover}
                className="card-img mt-1 mb-1"
                alt="Image for blog"
                style={{ width: "100%", height: "200px" }}
              />
            </Link>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <Link
                to={`/posts/${posts._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3 className="card-title">{posts.title}</h3>
              </Link>
              <p className="card-text">
                {posts.author.username}
                <time className="ms-4">
                  {formatISO9075(new Date(posts.createdAt))}
                </time>
              </p>
              <p className="card-text">{posts.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
