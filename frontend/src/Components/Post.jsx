import React from "react";

const Post = () => {
  return (
    <div
      className="card mb-3"
      style={{ maxWidth: "1150px", margin: "0 auto", border: "none" }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <img
              src="https://cdn.pixabay.com/photo/2016/09/08/18/45/cube-1655118_1280.jpg"
              className="card-img mt-1 mb-1"
              alt="Image for blog"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h4 className="card-title">Card title</h4>
              <p className="card-text">
                Author name
                <time className="ms-4">2023-01-06</time>
              </p>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                corrupti hic ratione debitis ea laborum odit, voluptatum quam
                ipsum qui at consequuntur alias atque, natus molestias dolore
                optio. Voluptates ratione ut dolores est maiores tempora in
                explicabo odio perferendis unde?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
