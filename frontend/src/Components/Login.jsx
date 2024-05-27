import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const success = await loginUser(login);
    // if (success) {
    //   navigate(redirectUrl, { replace: true });
    // } else {
    //   setErrorMessage("Invalid username or password. Please try again.");
    // }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <div className="container col-6 mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <h2 className="text-center mb-5">Login</h2>
      <form onSubmit={handleSubmit}>
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
              value={login.email}
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
              value={login.password}
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
            Login
          </button>
          <span style={{ marginLeft: "10px" }}>
            Don't' have an account yet?
            <Link to={"/register"} style={{ marginLeft: "5px" }}>
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
