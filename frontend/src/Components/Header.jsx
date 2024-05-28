import React, { useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:4000/profile", {
          credentials: "include",
        });
        if (response.ok) {
          const userInfo = await response.json();
          setUserInfo(userInfo);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [setUserInfo]);

  const logout = async () => {
    try {
      await fetch("http://localhost:4000/logout", {
        credentials: "include",
        method: "POST",
      });
      setUserInfo(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const username = userInfo?.username;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mt-3">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand ms-5">
            MyBlog
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {username ? (
                <>
                  <li className="nav-item me-4">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/create"
                    >
                      Create new post
                    </NavLink>
                  </li>
                  <li className="nav-item me-4">
                    <a href="#" className="nav-link" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item me-4">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item me-4">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
