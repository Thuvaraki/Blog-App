import React from "react";
import { formatISO9075 } from "date-fns";

const Post = (posts) => {
  return (
    <div
      className="card mb-3"
      style={{ maxWidth: "1150px", margin: "0 auto", border: "none" }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <img
              // src="https://cdn.pixabay.com/photo/2016/09/08/18/45/cube-1655118_1280.jpg"
              src={"http://localhost:4000/" + posts.cover}
              className="card-img mt-1 mb-1"
              alt="Image for blog"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h4 className="card-title">{posts.title} </h4>
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
