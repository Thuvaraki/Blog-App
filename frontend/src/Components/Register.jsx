import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify(register),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("registration successful");
    } else {
      alert("registration failed");
    }
  };

  return (
    <div className="container col-12 col-md-6 mt-5 mb-5">
      <h2 className="hotel-color text-center mb-5">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="username" className="col-12 col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-12 col-sm-10">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={register.username}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="email" className="col-12 col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-12 col-sm-10">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={register.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label
            htmlFor="inputPassword"
            className="col-12 col-sm-2 col-form-label"
          >
            Password
          </label>
          <div className="col-12 col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              name="password" // Corrected the name attribute
              value={register.password}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3 d-flex justify-content-center align-items-center">
          <button
            type="submit"
            className="btn btn-secondary"
            style={{ marginRight: "10px" }}
          >
            Register
          </button>
          <span style={{ marginLeft: "10px" }}>
            Already have an account?
            <Link to={"/login"} style={{ marginLeft: "5px" }}>
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
