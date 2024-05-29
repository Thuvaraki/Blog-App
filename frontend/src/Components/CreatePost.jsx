import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const createPost = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("file", file);
    data.set("content", content);

    const response = await fetch("http://localhost:4000/newPost", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container col-6 mt-5 mb-5">
      <h2 className="text-center mb-4">Create New Post</h2>
      <form onSubmit={createPost}>
        <div className="mb-3 row">
          <div className="col-12 col-sm-10">
            <input
              type="title"
              className="form-control"
              id="title"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col-12 col-sm-10">
            <input
              type="summary"
              className="form-control"
              id="summary"
              name="summary"
              placeholder="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col-12 col-sm-10">
            <input
              type="file"
              className="form-control"
              id="file"
              name="file"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col-12 col-sm-10">
            <ReactQuill
              value={content}
              onChange={setContent}
              placeholder="Enter the content here"
            />
          </div>
        </div>

        <div className="d-flex justify-content-center align align-items-center">
          <button type="submit" className="btn btn-secondary">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
